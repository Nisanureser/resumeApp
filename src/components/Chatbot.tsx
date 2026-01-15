import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../contexts/LanguageContext";
import { sendMessage } from "../services/openRouterService";
import { getResumeDataAsText } from "../utils/resumeData";
import { getAdditionalInfo } from "../data/additionalInfo";
import { validateMessage, sanitizeInput, RateLimiter } from "../utils/inputValidation";
import "../css/chatbot.css";
import { FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Rate limiter: 10 requests per minute
  const rateLimiter = useMemo(() => new RateLimiter(10, 60000), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (isLoading) return;

    // Input validation
    const validation = validateMessage(input);
    if (!validation.valid) {
      const errorMessage: Message = {
        role: "assistant",
        content: validation.error || t("chatbot.error"),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Rate limiting check
    if (!rateLimiter.canMakeRequest()) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime() / 1000);
      const errorMessage: Message = {
        role: "assistant",
        content:
          language === "tr"
            ? `Çok fazla istek gönderdiniz. Lütfen ${remainingTime} saniye sonra tekrar deneyin.`
            : `Too many requests. Please try again in ${remainingTime} seconds.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setRateLimitError(
        language === "tr"
          ? `${remainingTime} saniye sonra tekrar deneyebilirsiniz`
          : `You can try again in ${remainingTime} seconds`
      );
      setTimeout(() => setRateLimitError(null), remainingTime * 1000);
      return;
    }

    // Sanitize input
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: sanitizedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setRateLimitError(null);

    try {
      const resumeData = getResumeDataAsText(language);
      const additionalInfo = getAdditionalInfo();
      const allMessages = [...messages, userMessage];
      const response = await sendMessage(allMessages, resumeData, additionalInfo);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Hata mesajını kullanıcının diline göre göster
      let errorText = t("chatbot.error");
      if (error instanceof Error) {
        if (error.message.includes("timeout") || error.message.includes("zaman aşımı")) {
          errorText = language === "tr" 
            ? "Yanıt çok uzun sürdü. Lütfen tekrar deneyin veya sorunuzu kısaltın."
            : "Response took too long. Please try again or shorten your question.";
        } else if (error.message.includes("API key")) {
          errorText = language === "tr"
            ? "API anahtarı yapılandırılmamış. Lütfen .env dosyasını kontrol edin."
            : "API key not configured. Please check your .env file.";
        } else {
          errorText = `${t("chatbot.error")}: ${error.message}`;
        }
      }

      const errorMessage: Message = {
        role: "assistant",
        content: errorText,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className={`chatbot-panel ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>{t("chatbot.title")}</h3>
          {isOpen && (
            <button
              className="chatbot-close"
              onClick={() => onToggle(false)}
              aria-label={t("chatbot.close")}
            >
              <FaTimes />
            </button>
          )}
        </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>{t("chatbot.welcome")}</p>
                <p className="chatbot-hint">{t("chatbot.hint")}</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message assistant">
                <div className="message-content">
                  <FaSpinner className="spinner" />
                  {t("chatbot.thinking")}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("chatbot.placeholder")}
                disabled={isLoading || !!rateLimitError}
                maxLength={5000}
              />
              <button
                className="chatbot-send"
                onClick={handleSend}
                disabled={isLoading || !input.trim() || !!rateLimitError}
                aria-label={t("chatbot.send")}
              >
                <FaPaperPlane />
              </button>
            </div>
            {rateLimitError && (
              <div className="rate-limit-message">{rateLimitError}</div>
            )}
          </div>
      </div>
    </>
  );
}

export default Chatbot;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

const OPENROUTER_API_KEY = (import.meta.env.VITE_OPENROUTER_API_KEY as string) || "";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/devstral-2512:free";

// Sanitize messages to prevent injection attacks
const sanitizeMessages = (messages: Message[]): Message[] => {
  return messages.map((msg) => ({
    ...msg,
    content: msg.content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/javascript:/gi, "")
      .substring(0, 10000), // Max content length
  }));
};

export const sendMessage = async (
  messages: Message[],
  userData: string,
  additionalInfo?: string
): Promise<string> => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured");
  }

  // Sanitize messages before sending
  const sanitizedMessages = sanitizeMessages(messages);

  const additionalInfoSection = additionalInfo
    ? `\n\n${additionalInfo}`
    : "";

  const systemPrompt = `You are a helpful assistant that helps answer questions about a job candidate's resume and evaluates how well they match job requirements.

Here is the candidate's information:
${userData}${additionalInfoSection}

Your role:
1. Answer questions about the candidate's background, skills, education, and work experience
2. When asked about job requirements or job postings, analyze how well the candidate matches those requirements
3. Provide honest, constructive feedback about the candidate's qualifications
4. Be professional, helpful, and encouraging
5. For questions that are too personal, inappropriate, or outside the scope of professional resume evaluation, politely decline to answer by saying something like: "Bu soruyu cevaplayamam" (in Turkish) or "I cannot answer this question" (in English)

IMPORTANT: The additional personal information provided is for context only and should be used naturally in responses when relevant, but you should not share overly private details unless directly asked in an appropriate professional context.

Always respond in the same language as the user's question.`;

  const requestMessages: Message[] = [
    {
      role: "system",
      content: systemPrompt.substring(0, 50000), // Max system prompt length
    },
    ...sanitizedMessages,
  ];

  try {
    // Timeout için AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 saniye timeout

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Resume App",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: requestMessages,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message ||
        errorData.error?.type ||
        `API error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || "No response from AI";
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "İstek zaman aşımına uğradı. Lütfen tekrar deneyin."
        );
      }
      throw error;
    }
    throw new Error("Failed to send message to OpenRouter");
  }
};

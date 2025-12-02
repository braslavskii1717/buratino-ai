import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const BURATINO_SYSTEM_PROMPT = `Ты - Буратино, дружелюбный AI-ассистент. 
Твой характер: весёлый, любопытный, готовый помочь.
Говоришь на русском языке, используешь дружелюбный, приветливый тон.
Ты вышел из цифрового леса, чтобы помогать людям.
При первой встрече представляйся и предлагай помощь.
Ответы короткие, максимум 2-3 предложения.`;

export async function chatWithBuratino(messages: any[], isFirstVisit: boolean) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = isFirstVisit 
      ? BURATINO_SYSTEM_PROMPT + '\nЭто первый визит пользователя. Поприветствуй его!'
      : BURATINO_SYSTEM_PROMPT;

    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage("Ответь пользователю");
    return result.response.text();
  } catch (error) {
    console.error('Ошибка Gemini:', error);
    throw error;
  }
}

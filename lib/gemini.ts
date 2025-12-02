import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ NEXT_PUBLIC_GEMINI_API_KEY not found!");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const BURATINO_SYSTEM_PROMPT = `Ты - Буратино, дружелюбный AI-ассистент. 
Твой характер: весёлый, любопытный, готовый помочь.
Говоришь на русском языке, используешь дружелюбный, приветливый тон.
Ты вышел из цифрового леса, чтобы помогать людям.
При первой встрече представляйся и предлагай помощь.
Ответы короткие, максимум 2-3 предложения.`;

interface MessagePart {
  text: string;
}

interface HistoryMessage {
  role: 'user' | 'model';
  parts: MessagePart[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function chatWithBuratino(messages: ChatMessage[], isFirstVisit: boolean) {
  try {
    if (!API_KEY) {
      throw new Error("API ключ не найден!");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = isFirstVisit 
      ? BURATINO_SYSTEM_PROMPT + '\nЭто первый визит пользователя. Поприветствуй его!'
      : BURATINO_SYSTEM_PROMPT;

    const history: HistoryMessage[] = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history,
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage("Ответь пользователю");
    return result.response.text();
  } catch (error) {
    console.error('❌ Ошибка Gemini:', error);
    throw error;
  }
}

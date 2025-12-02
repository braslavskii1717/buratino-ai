import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `Ты — Буратино, дружелюбный AI-ассистент. 
Веселый характер, помогаешь людям.
Говоришь на русском языке, дружелюбный тон.
Ответы короткие, 2-3 предложения.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
  model: string;
}

// 1. Gemini 2.0 Flash
async function callGemini(messages: Message[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',
    generationConfig: { 
      temperature: 0.7, 
      maxOutputTokens: 300,
    }
  });

  const conversationHistory = messages
    .map(m => `${m.role === 'user' ? 'Пользователь' : 'Буратино'}: ${m.content}`)
    .join('\n');
  
  const prompt = `${SYSTEM_PROMPT}\n\n${conversationHistory}\nБуратино:`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// 2. Groq (Llama 3.3 70B) - РАБОТАЕТ ОТЛИЧНО!
async function callGroq(messages: Message[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Groq API key not configured');

  const groq = new Groq({ apiKey });
  
  const groqMessages = messages
    .filter(m => m.role !== 'system')
    .map((m) => ({ 
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content 
    }));

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...groqMessages
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || 'Извини, не получил ответ';
}

// 3. OpenAI GPT-4o-mini - РАБОТАЕТ!
async function callOpenAI(messages: Message[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const openai = new OpenAI({ apiKey });
  
  const openaiMessages = messages
    .filter(m => m.role !== 'system')
    .map((m) => ({ 
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content 
    }));

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...openaiMessages
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || 'Извини, не получил ответ';
}

export async function POST(request: NextRequest) {
  let requestBody: RequestBody;
  
  try {
    requestBody = await request.json();
  } catch (error) {
    console.error('Failed to parse request body:', error);
    return NextResponse.json({ 
      message: 'Неверный формат запроса',
      success: false 
    }, { status: 400 });
  }

  const { messages, model = 'groq' } = requestBody;

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ 
      message: 'Сообщения не предоставлены',
      success: false 
    }, { status: 400 });
  }

  try {
    let responseText: string;

    // ТОЛЬКО 3 РАБОЧИЕ МОДЕЛИ!
    switch (model) {
      case 'gemini':
        responseText = await callGemini(messages);
        break;
      case 'openai':
        responseText = await callOpenAI(messages);
        break;
      case 'groq':
      default:
        responseText = await callGroq(messages);
    }

    return NextResponse.json({ 
      message: responseText,
      model: model,
      success: true 
    });
    
  } catch (error: unknown) {
    console.error(`API Error for model ${model}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    
    return NextResponse.json({ 
      message: `Ошибка ${model}: ${errorMessage}. Попробуй другую модель!`,
      error: errorMessage,
      success: false 
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `Ты — Буратино, дружелюбный AI-ассистент. 
Веселый характер, помогаешь людям.
Говоришь на русском языке, дружелюбный тон.
Ответы короткие, 2-3 предложения.`;

// Функция для Gemini
async function callGemini(messages: any[]) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not found');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 200,
    }
  });

  const lastMessage = messages[messages.length - 1];
  const prompt = `${SYSTEM_PROMPT}\n\nПользователь: ${lastMessage.content}\nБуратино:`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Функция для Groq (супербыстрая!)
async function callGroq(messages: any[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Groq API key not found');

  const groq = new Groq({ apiKey });
  
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({ role: m.role, content: m.content }))
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content || 'Нет ответа';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'gemini' } = await request.json();
    
    let responseText: string;

    // Выбираем модель
    if (model === 'groq') {
      responseText = await callGroq(messages);
    } else {
      // По умолчанию Gemini
      responseText = await callGemini(messages);
    }

    return NextResponse.json({ 
      message: responseText,
      model: model,
      success: true 
    });
    
  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Если Gemini не работает, пробуем Groq как fallback
    try {
      const body = await request.json();
      const responseText = await callGroq(body.messages);
      return NextResponse.json({ 
        message: responseText,
        model: 'groq',
        success: true,
        fallback: true
      });
    } catch (fallbackError) {
      return NextResponse.json({ 
        message: 'Извини, произошла ошибка. Попробуй еще раз!',
        error: errorMessage,
        success: false 
      }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Ты — Буратино, дружелюбный AI-ассистент. 
Веселый характер, помогаешь людям.
Говоришь на русском языке, дружелюбный тон.
Ответы короткие, 2-3 предложения.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',  // ✅ ИСПРАВЛЕНО: было gemini-pro
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    const lastMessage = messages[messages.length - 1];
    const prompt = `${SYSTEM_PROMPT}\n\nПользователь: ${lastMessage.content}\nБуратино:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      message: text,
      success: true 
    });
    
  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      message: 'Извини, произошла ошибка. Попробуй еще раз!',
      error: errorMessage,
      success: false 
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `Ты — Буратино, дружелюбный AI-ассистент. 
Веселый характер, помогаешь людям.
Говоришь на русском языке, дружелюбный тон.
Ответы короткие, 2-3 предложения.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// 1. Gemini 1.5 Flash
async function callGemini(messages: Message[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not found');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
  });

  const lastMessage = messages[messages.length - 1];
  const prompt = `${SYSTEM_PROMPT}\n\nПользователь: ${lastMessage.content}\nБуратино:`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// 2. Groq (Llama 3.3 70B)
async function callGroq(messages: Message[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Groq API key not found');

  const groq = new Groq({ apiKey });
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ 
        role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, 
        content: m.content 
      }))
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content || 'Нет ответа';
}

// 3. Claude 3.5 Haiku
async function callClaude(messages: Message[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Claude API key not found');

  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 200,
    system: SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: m.content
    }))
  });

  return response.content[0].type === 'text' ? response.content[0].text : 'Нет ответа';
}

// 4. OpenAI GPT-4o-mini
async function callOpenAI(messages: Message[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not found');

  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ 
        role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, 
        content: m.content 
      }))
    ],
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content || 'Нет ответа';
}

// 5. Perplexity (Llama 3.1 Sonar)
async function callPerplexity(messages: Message[]): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error('Perplexity API key not found');

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ 
          role: m.role === 'assistant' ? 'assistant' : 'user', 
          content: m.content 
        }))
      ],
      temperature: 0.7,
      max_tokens: 200
    })
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Нет ответа';
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'gemini' } = await request.json();
    
    let responseText: string;

    // Выбираем модель
    switch (model) {
      case 'groq':
        responseText = await callGroq(messages);
        break;
      case 'claude':
        responseText = await callClaude(messages);
        break;
      case 'openai':
        responseText = await callOpenAI(messages);
        break;
      case 'perplexity':
        responseText = await callPerplexity(messages);
        break;
      default:
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
    
    // Fallback на Groq (самый быстрый)
    try {
      const body = await request.json();
      const responseText = await callGroq(body.messages);
      return NextResponse.json({ 
        message: responseText,
        model: 'groq',
        success: true,
        fallback: true
      });
    } catch {
      return NextResponse.json({ 
        message: 'Извини, произошла ошибка. Попробуй еще раз!',
        error: errorMessage,
        success: false 
      }, { status: 500 });
    }
  }
}

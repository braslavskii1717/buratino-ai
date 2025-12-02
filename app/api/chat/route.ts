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

interface RequestBody {
  messages: Message[];
  model: string;
}

// 1. Gemini 2.0 Flash (ИСПРАВЛЕНО!)
async function callGemini(messages: Message[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',  // ПРАВИЛЬНАЯ МОДЕЛЬ!
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

// 2. Groq (Llama 3.3 70B) - РАБОТАЕТ!
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

// 3. Claude 3.5 Haiku (ПРОВЕРКА БАЛАНСА)
async function callClaude(messages: Message[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Claude API key not configured');

  const anthropic = new Anthropic({ apiKey });
  
  const claudeMessages = messages
    .filter(m => m.role !== 'system')
    .map((m) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content
    }));

  const response = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: claudeMessages
  });

  const content = response.content[0];
  return content.type === 'text' ? content.text : 'Извини, не получил ответ';
}

// 4. OpenAI GPT-4o-mini
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

// 5. Perplexity (Llama 3.1 Sonar) - ИСПРАВЛЕНО!
async function callPerplexity(messages: Message[]): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error('Perplexity API key not configured');

  const perplexityMessages = messages
    .filter(m => m.role !== 'system')
    .map((m) => ({ 
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content 
    }));

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',  // ОНЛАЙН МОДЕЛЬ!
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...perplexityMessages
      ],
      temperature: 0.7,
      max_tokens: 300
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Perplexity API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Извини, не получил ответ';
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

    switch (model) {
      case 'gemini':
        responseText = await callGemini(messages);
        break;
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

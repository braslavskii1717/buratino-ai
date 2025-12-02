import { NextRequest, NextResponse } from 'next/server';
import { chatWithBuratino } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { messages, isFirstVisit } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const response = await chatWithBuratino(messages, isFirstVisit);

    return NextResponse.json({
      message: response,
      success: true,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Ошибка при общении с Буратино', success: false },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { chatWithBuratino } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { messages, isFirstVisit } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages', success: false }, { status: 400 });
    }

    const response = await chatWithBuratino(messages, isFirstVisit);

    return NextResponse.json({
      message: response,
      success: true,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Chat API error:', errorMessage);
    return NextResponse.json(
      { error: `Ошибка API: ${errorMessage}`, success: false },
      { status: 500 }
    );
  }
}

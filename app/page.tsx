'use client';
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import VideoIntro from '@/components/VideoIntro';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <VideoIntro onComplete={() => setShowIntro(false)} />;
  }

  return <ChatInterface />;
}

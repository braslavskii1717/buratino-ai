'use client';

import { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import BuratinoAvatar from '@/components/BuratinoAvatar';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('buratino_visited');
      if (visited) {
        setIsFirstVisit(false);
        setShowIntro(false);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('buratino_visited', 'true');
    }
    setShowIntro(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600" />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-100 to-green-100">
      {showIntro ? (
        <IntroAnimation onComplete={handleIntroComplete} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-12">
            🎭 Буратино AI - Твой ИИ-ассистент
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <BuratinoAvatar 
                isSpeaking={isSpeaking} 
                currentMessage={currentMessage}
              />
            </div>
            <div className="lg:w-2/3">
              <ChatInterface 
                isFirstVisit={isFirstVisit}
                onMessageReceived={(msg) => setCurrentMessage(msg)}
                onSpeakingChange={(speaking) => setIsSpeaking(speaking)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

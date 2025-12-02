'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  isFirstVisit: boolean;
  onMessageReceived: (message: string) => void;
  onSpeakingChange: (speaking: boolean) => void;
}

export default function ChatInterface({ isFirstVisit, onMessageReceived, onSpeakingChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstVisit && messages.length === 0) {
      handleSendMessage('Привет!', true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (text?: string, silent = false) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    if (!silent) {
      setMessages(prev => [...prev, userMessage]);
    }
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          isFirstVisit: silent
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
      onMessageReceived(data.message);
      
      speakMessage(data.message);
    } catch (error) {
      console.error('Ошибка:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Произошла ошибка. Попробуй ещё раз!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      onSpeakingChange(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.onend = () => onSpeakingChange(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-amber-100 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши сообщение Буратино..."
          className="flex-1 px-4 py-3 rounded-full border-2 border-amber-200 focus:border-amber-400 outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 font-semibold"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

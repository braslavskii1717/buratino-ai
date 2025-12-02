'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuratinoAvatar from './BuratinoAvatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Извини, произошла ошибка. Попробуй еще раз!' 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Ой! Что-то пошло не так 😅' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Сказочный фон с деревьями */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
        </div>
        {/* Деревья на фоне */}
        <div className="absolute bottom-0 left-10 text-6xl opacity-30">🌲</div>
        <div className="absolute bottom-0 right-20 text-7xl opacity-30">🌳</div>
        <div className="absolute bottom-0 left-1/4 text-5xl opacity-20">🍂</div>
        <div className="absolute top-20 right-10 text-4xl opacity-20">☀️</div>
      </div>

      {/* Главный контейнер */}
      <div className="relative z-10 flex flex-col h-screen max-w-5xl mx-auto p-4">
        
        {/* Заголовок в деревянном стиле */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-6 mb-4 relative"
        >
          <div className="inline-block bg-gradient-to-br from-amber-600 to-orange-700 px-8 py-4 rounded-3xl shadow-2xl border-4 border-amber-800 transform rotate-1">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
              🎭 Буратино AI
            </h1>
            <p className="text-amber-100 text-sm mt-1">Твой дружелюбный деревянный помощник!</p>
          </div>
        </motion.div>

        {/* Область чата */}
        <div className="flex-1 flex gap-4 mb-4">
          
          {/* Персонаж слева */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:block w-80 relative"
          >
            <div className="sticky top-4">
              <BuratinoAvatar isThinking={isLoading} />
            </div>
          </motion.div>

          {/* Сообщения справа */}
          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-amber-700 overflow-hidden flex flex-col">
            
            {/* Список сообщений */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-700' 
                        : 'bg-gradient-to-br from-amber-200 to-yellow-100 text-amber-900 border-2 border-amber-400'
                    }`}>
                      <p className="text-lg font-medium" style={{ textShadow: msg.role === 'user' ? '1px 1px 2px rgba(0,0,0,0.2)' : 'none' }}>
                        {msg.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-br from-amber-200 to-yellow-100 px-6 py-4 rounded-2xl shadow-lg border-2 border-amber-400">
                    <div className="flex gap-2">
                      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-3 h-3 bg-amber-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-3 h-3 bg-amber-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-3 h-3 bg-amber-600 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода в деревянном стиле */}
            <div className="p-4 bg-gradient-to-r from-amber-700 to-orange-800 border-t-4 border-amber-900">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Напиши сообщение Буратино..."
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 rounded-2xl text-lg border-4 border-amber-900 bg-amber-50 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-inner font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-8 py-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-xl border-4 border-yellow-600 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {isLoading ? '⏳' : '🚀'}
                </motion.button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

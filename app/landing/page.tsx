'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  
  const greetings = [
    "Привет! Я Буратино! 🎭",
    "Давай познакомимся! ✨",
    "Я твой дружелюбный AI-ассистент! 🤖",
    "Готов помочь тебе в любом вопросе! 🔑",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setGreeting(greetings[index]);
      index = (index + 1) % greetings.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      
      {/* МАГИЧЕСКИЕ ЧАСТИЦЫ */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 20}px`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['✨', '🎭', '🔑', '⭐', '💫'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          
          {/* КАРТОЧКА С БУРАТИНО */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            {/* Деревянная рамка */}
            <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 rounded-[3rem] p-8 shadow-2xl border-8 border-amber-900">
              
              {/* Внутренняя область */}
              <div className="bg-gradient-to-b from-amber-100 to-yellow-50 rounded-[2.5rem] p-12 border-8 border-amber-700 relative overflow-hidden">

                {/* БУРАТИНО С АНИМАЦИЕЙ */}
                <div className="relative flex flex-col items-center">
                  
                  {/* Аватар */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-64 h-64 mb-8"
                  >
                    <Image
                      src="/images/3D_Buratino_-_glavnyi_personazh_-ulybka.png"
                      alt="Буратино"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                    
                    {/* Золотой ключик */}
                    <motion.div
                      animate={{
                        rotate: [0, 20, -20, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -right-12 top-1/2 text-6xl"
                    >
                      🔑
                    </motion.div>
                  </motion.div>

                  {/* ЗАГОЛОВОК */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-6xl font-bold text-amber-900 mb-4 text-center drop-shadow-lg"
                  >
                    Буратино AI
                  </motion.h1>

                  {/* ПОДЗАГОЛОВОК */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl text-amber-700 mb-8 text-center font-medium"
                  >
                    Твой дружелюбный AI-ассистент
                  </motion.p>

                  {/* АНИМИРОВАННОЕ ПРИВЕТСТВИЕ */}
                  <motion.div
                    key={greeting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/80 backdrop-blur rounded-3xl px-8 py-6 mb-8 border-4 border-amber-400 shadow-xl"
                  >
                    <p className="text-2xl text-amber-900 font-bold text-center">
                      {greeting}
                    </p>
                  </motion.div>

                  {/* ВОЗМОЖНОСТИ */}
                  <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-2xl">
                    {[
                      { icon: '⚡', text: 'Быстрые ответы' },
                      { icon: '🎯', text: '3 умные модели' },
                      { icon: '🎤', text: 'Голосовой чат' },
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/60 backdrop-blur rounded-2xl p-6 border-4 border-amber-300 text-center shadow-lg"
                      >
                        <div className="text-5xl mb-3">{feature.icon}</div>
                        <p className="text-amber-900 font-semibold text-lg">
                          {feature.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* КНОПКА СТАРТА */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/')}
                    className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 text-amber-900 font-bold text-2xl rounded-3xl shadow-2xl border-8 border-amber-700 transition-all"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block mr-3"
                    >
                      👋
                    </motion.div>
                    Давай знакомиться!
                    <motion.div
                      className="absolute -right-4 -top-4 text-4xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </motion.button>

                  {/* ИКОНКИ */}
                  <div className="flex gap-8 mt-8">
                    {['🎭', '🥕', '🏠'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: [0, 10, -10, 0],
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="text-6xl"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ИЗБУШКА В УГЛУ */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-8 -left-8 text-8xl drop-shadow-2xl"
              >
                🏠
              </motion.div>

              {/* ЗВЁЗДЫ В УГЛАХ */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute -top-8 -right-8 text-8xl"
              >
                ⭐
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

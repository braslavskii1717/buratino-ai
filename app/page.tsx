'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [selectedModel, setSelectedModel] = useState<'groq' | 'gemini' | 'gpt4o'>('groq');
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* СКАЗОЧНЫЙ ЛЕСНОЙ ФОН */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/Skazochnyi_lesnoi_fon.png"
          alt="Сказочный лес"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Затемнение для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* МАГИЧЕСКИЕ ЧАСТИЦЫ */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          
          {/* ВЕРХНИЙ БЛОК: ЗАГОЛОВОК + СЕЛЕКТОР МОДЕЛЕЙ */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* ДЕРЕВЯННАЯ ТАБЛИЧКА С ЗАГОЛОВКОМ */}
            <div className="relative mx-auto w-fit">
              <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900">
                <div className="flex items-center gap-4">
                  {/* ИКОНКА БУРАТИНО */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg">
                    <Image
                      src="/images/3D_Buratino_-_glavnyi_personazh_-ulybka.png"
                      alt="Буратино"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                      🎭 Буратино AI
                    </h1>
                    <p className="text-amber-100 text-sm">
                      3 умные модели на выбор!
                    </p>
                  </div>
                </div>

                {/* СЕЛЕКТОР МОДЕЛЕЙ */}
                <div className="mt-4 flex gap-3">
                  {[
                    { id: 'groq', icon: '⚡', name: 'Groq' },
                    { id: 'gemini', icon: '💎', name: 'Gemini' },
                    { id: 'gpt4o', icon: '🧠', name: 'GPT-4o' },
                  ].map((model) => (
                    <motion.button
                      key={model.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedModel(model.id as any)}
                      className={`
                        px-4 py-2 rounded-xl font-semibold transition-all
                        ${selectedModel === model.id
                          ? 'bg-yellow-400 text-amber-900 shadow-lg'
                          : 'bg-amber-900/50 text-amber-100 hover:bg-amber-800/70'
                        }
                      `}
                    >
                      {model.icon} {model.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ОСНОВНАЯ КАРТОЧКА */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            
            {/* ЛЕВАЯ ПАНЕЛЬ: БУРАТИНО */}
            <div className="lg:col-span-1">
              <div className="relative bg-gradient-to-br from-amber-600 to-orange-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900">
                
                {/* Внутренняя желтая рамка */}
                <div className="bg-gradient-to-b from-amber-100 to-yellow-50 rounded-2xl p-6 border-4 border-amber-700 relative overflow-hidden">
                  
                  {/* Свечение звезды */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    className="absolute -top-8 -left-8 text-8xl"
                  >
                    ✨
                  </motion.div>

                  {/* БУРАТИНО */}
                  <div className="relative mb-6 flex justify-center">
                    {isThinking ? (
                      <motion.div
                        animate={{ 
                          rotate: [0, -5, 5, -5, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                        }}
                        className="relative w-40 h-40"
                      >
                        <Image
                          src="/images/3D_Buratino_dumaet_-sostoianie_zagruzki.png"
                          alt="Буратино думает"
                          fill
                          className="rounded-full object-cover"
                        />
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute -top-4 -right-4 text-3xl"
                        >
                          ❓
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-40 h-40"
                      >
                        <Image
                          src="/images/3D_Buratino_-_glavnyi_personazh_-ulybka.png"
                          alt="Буратино"
                          fill
                          className="rounded-full object-cover"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* ИКОНКИ */}
                  <div className="flex justify-center gap-6 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-5xl"
                    >
                      🎭
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                      className="text-5xl"
                    >
                      😊
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex justify-center mb-4 text-4xl"
                  >
                    🥕
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="flex justify-center mb-6 text-4xl"
                  >
                    🔑
                  </motion.div>

                  {/* КНОПКА */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl border-4 border-amber-800 hover:from-amber-700 hover:to-orange-800 transition-all"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    ✨ Готов помочь!
                  </motion.button>
                </div>

                {/* ИЗБУШКА */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -bottom-4 -left-4 text-5xl"
                >
                  🏠
                </motion.div>
              </div>
            </div>

            {/* ПРАВАЯ ПАНЕЛЬ: ЧАТ */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-amber-600 to-orange-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900 h-[600px] flex flex-col">
                
                {/* Область чата */}
                <div className="flex-1 bg-amber-50/90 rounded-2xl p-6 mb-4 overflow-y-auto border-4 border-amber-700">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mb-4"
                      >
                        👋
                      </motion.div>
                      <h2 className="text-3xl font-bold text-amber-900 mb-2">
                        Привет! Я Буратино!
                      </h2>
                      <p className="text-amber-700 text-lg">
                        Выбери модель и задай мне любой вопрос!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Поле ввода */}
                <div className="relative">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Напиши сообщение Буратино..."
                      className="flex-1 px-6 py-4 rounded-2xl border-4 border-amber-700 focus:border-yellow-400 focus:outline-none text-amber-900 placeholder-amber-500 bg-amber-50 text-lg font-medium"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (message.trim()) {
                          setIsThinking(true);
                          // Здесь будет логика отправки
                        }
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 font-bold rounded-2xl shadow-xl border-4 border-amber-700 transition-all"
                    >
                      ✨ Отправить
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

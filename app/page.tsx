'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function HomePage() {
  const [selectedModel, setSelectedModel] = useState<'groq' | 'gemini' | 'gpt4o'>('groq');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Прокрутка вниз
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ГОЛОСОВОЙ ВВОД (Speech-to-Text)
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
    } else {
      alert('Ваш браузер не поддерживает распознавание речи. Попробуйте Chrome.');
    }
  };

  // ОЗВУЧИВАНИЕ ОТВЕТА (Text-to-Speech)
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Чуть выше для детского голоса

      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // ОТПРАВКА СООБЩЕНИЯ
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Автоматически озвучиваем ответ
      speak(data.response);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Извини, произошла ошибка! Попробуй еще раз. 🙏',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* ЛЕСНОЙ ФОН */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/Skazochnyi_lesnoi_fon.png"
          alt="Лес"
          fill
          className="object-cover"
          priority
          quality={100}
        />
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

      {/* КОНТЕНТ */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          
          {/* ШАПКА С СЕЛЕКТОРОМ */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900 mx-auto w-fit">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-300">
                  <Image
                    src="/images/3D_Buratino_-_glavnyi_personazh_-ulybka.png"
                    alt="Буратино"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-white">🎭 Буратино AI</h1>
                  <p className="text-amber-100 text-sm">3 умные модели на выбор!</p>
                </div>

                <div className="flex gap-3">
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
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        selectedModel === model.id
                          ? 'bg-yellow-400 text-amber-900 shadow-lg'
                          : 'bg-amber-900/50 text-amber-100 hover:bg-amber-800/70'
                      }`}
                    >
                      {model.icon} {model.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ОСНОВНАЯ ОБЛАСТЬ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ЛЕВАЯ ПАНЕЛЬ: БУРАТИНО */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-amber-600 to-orange-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900">
                <div className="bg-gradient-to-b from-amber-100 to-yellow-50 rounded-2xl p-6 border-4 border-amber-700">
                  
                  {/* АВАТАР */}
                  <div className="relative mb-6 flex justify-center">
                    <motion.div
                      animate={isThinking || isSpeaking ? {
                        rotate: [0, -5, 5, -5, 0],
                      } : {}}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                      }}
                      className="relative w-40 h-40"
                    >
                      <Image
                        src={isThinking 
                          ? "/images/3D_Buratino_dumaet_-sostoianie_zagruzki.png"
                          : "/images/3D_Buratino_-_glavnyi_personazh_-ulybka.png"
                        }
                        alt="Буратино"
                        fill
                        className="rounded-full object-cover"
                      />
                      {isThinking && (
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute -top-4 -right-4 text-3xl"
                        >
                          ❓
                        </motion.div>
                      )}
                      {isSpeaking && (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-3xl"
                        >
                          🔊
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* ИКОНКИ */}
                  <div className="flex justify-center gap-6 mb-4">
                    {['🎭', '😊', '🥕', '🔑'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                        className="text-4xl"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>

                  {/* СТАТУС */}
                  <div className="text-center mb-4">
                    <p className="text-amber-800 font-semibold">
                      {isThinking ? '🤔 Думаю...' : isSpeaking ? '🔊 Говорю...' : '✨ Готов помочь!'}
                    </p>
                  </div>

                  {/* КНОПКА МИКРОФОНА */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startListening}
                    className={`w-full py-3 rounded-2xl font-bold transition-all border-4 ${
                      isListening
                        ? 'bg-red-500 text-white border-red-700 animate-pulse'
                        : 'bg-gradient-to-r from-amber-600 to-orange-700 text-white border-amber-800'
                    }`}
                  >
                    {isListening ? '🎤 Слушаю...' : '🎤 Говори со мной!'}
                  </motion.button>
                </div>

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
              <div className="bg-gradient-to-br from-amber-600 to-orange-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-900 h-[600px] flex flex-col">
                
                {/* СООБЩЕНИЯ */}
                <div className="flex-1 bg-amber-50/90 rounded-2xl p-6 mb-4 overflow-y-auto border-4 border-amber-700">
                  {messages.length === 0 ? (
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
                        <p className="text-amber-600 text-sm mt-2">
                          Можешь писать или говорить вслух 🎤
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {messages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                              msg.role === 'user'
                                ? 'bg-amber-500 text-white'
                                : 'bg-white text-amber-900'
                            } shadow-lg border-2 border-amber-700`}>
                              <p className="font-medium">{msg.content}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </div>

                {/* ПОЛЕ ВВОДА */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Напиши сообщение Буратино..."
                    className="flex-1 px-6 py-4 rounded-2xl border-4 border-amber-700 focus:border-yellow-400 focus:outline-none text-amber-900 placeholder-amber-500 bg-amber-50 text-lg font-medium"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={isThinking}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-amber-900 font-bold rounded-2xl shadow-xl border-4 border-amber-700 transition-all disabled:opacity-50"
                  >
                    ✨ Отправить
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: Props) {
  const [currentScene, setCurrentScene] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const scenes = [
    {
      image: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/8f2dc744-2617-4ba8-923d-0ec298c6f12d',
      text: 'Привет! Я Буратино - твой AI ассистент!',
      bg: 'from-amber-300 via-yellow-200 to-amber-400',
      duration: 3500
    },
    {
      image: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/c11e2cb4-62e2-4f45-81ed-e2d5cf92d318',
      text: 'Я живу в цифровом мире технологий!',
      bg: 'from-blue-400 via-cyan-300 to-blue-500',
      duration: 3500
    },
    {
      image: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/5709d5e4-c54e-4166-8c91-ca621c63c99c',
      text: 'Готов помочь тебе в любом вопросе!',
      bg: 'from-cyan-500 via-blue-400 to-indigo-500',
      duration: 3500
    }
  ];

  useEffect(() => {
    if (currentScene < scenes.length) {
      // Озвучка текста
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Остановить предыдущую озвучку
        const utterance = new SpeechSynthesisUtterance(scenes[currentScene].text);
        utterance.lang = 'ru-RU';
        utterance.rate = 0.95;
        utterance.pitch = 1.25;
        utterance.volume = 1.0;
        
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 300);
      }

      const timer = setTimeout(() => {
        if (currentScene < scenes.length - 1) {
          setCurrentScene(currentScene + 1);
        } else {
          setShowButton(true);
        }
      }, scenes[currentScene].duration);

      return () => {
        clearTimeout(timer);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [currentScene]);

  const handleSkip = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onComplete();
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${scenes[currentScene]?.bg || 'from-blue-400 to-purple-500'} flex items-center justify-center overflow-hidden transition-all duration-1000`}>
      {/* Animated tech background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {['💻', '🤖', '⚡', '✨', '🔑', '🎯', '🌟', '💡'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.7, opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative z-10 text-center px-4"
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 blur-3xl bg-white/40 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main character image */}
          <motion.div
            className="relative mb-6 mx-auto max-w-lg"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={scenes[currentScene]?.image || scenes[0].image}
              alt="Буратино AI"
              width={600}
              height={600}
              className="drop-shadow-2xl rounded-3xl"
              priority
            />
          </motion.div>

          {/* Speech text with animation */}
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl max-w-2xl mx-auto border-2 border-white/50"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.p
              className="text-2xl md:text-3xl font-bold text-gray-800"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {scenes[currentScene]?.text}
            </motion.p>
          </motion.div>

          {/* Progress indicators */}
          <div className="flex gap-3 justify-center mt-8">
            {scenes.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentScene ? 'w-16 bg-white shadow-lg' : 'w-2 bg-white/50'
                }`}
                animate={{
                  scale: index === currentScene ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentScene ? Infinity : 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-16 z-20"
          >
            <motion.button
              onClick={handleSkip}
              className="px-12 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white rounded-full text-xl md:text-2xl font-bold shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative flex items-center gap-3">
                Начать общение 🚀
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-6 py-3 bg-white/25 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/35 transition-all border border-white/30 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Пропустить →
      </motion.button>
    </div>
  );
}

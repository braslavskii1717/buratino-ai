'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: Props) {
  const [isSkipped, setIsSkipped] = useState(false);

  const handleSkip = () => {
    setIsSkipped(true);
    setTimeout(() => onComplete(), 500);
  };

  if (isSkipped) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
      >
        <div className="text-center space-y-8 p-8">
          {/* Анимированный заголовок */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-7xl">🎭</span>
              <br />
              Буратино AI
            </h1>
            <p className="text-2xl text-gray-700">
              Твой дружелюбный AI-ассистент
            </p>
          </motion.div>

          {/* Анимированные элементы */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center gap-4 text-4xl"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🎪
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            >
              🎭
            </motion.span>
          </motion.div>

          {/* Кнопка */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={handleSkip}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Давай знакомиться! 👋
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

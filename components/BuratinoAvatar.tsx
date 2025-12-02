'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
  isSpeaking: boolean;
  currentMessage: string;
}

export default function BuratinoAvatar({ isSpeaking, currentMessage }: Props) {
  const [expression, setExpression] = useState<'idle' | 'happy' | 'thinking'>('idle');

  useEffect(() => {
    if (isSpeaking) {
      setExpression('happy');
    } else if (currentMessage.includes('?')) {
      setExpression('thinking');
    } else {
      setExpression('idle');
    }
  }, [isSpeaking, currentMessage]);

  // Выбираем изображение в зависимости от состояния
  const getImageSrc = () => {
    if (isSpeaking || expression === 'happy') {
      // Радостный Буратино когда говорит
      return 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/8f2dc744-2617-4ba8-923d-0ec298c6f12d';
    } else if (expression === 'thinking') {
      // Задумчивый Буратино на вопросы
      return 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/de9516c9-b93a-42c9-9bb1-c73e63a0f1fa';
    } else {
      // Спокойный Буратино по умолчанию
      return 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/0a02af2b-c28d-4495-b92c-38dac3f26f03';
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <motion.div
        className="relative w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-6 shadow-2xl overflow-hidden"
        animate={{
          scale: isSpeaking ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          repeat: isSpeaking ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {['🍂', '🌿', '✨', '🔑'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={expression}
            initial={{ opacity: 0, scale: 0.85, rotateY: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotateY: 45 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="relative w-full h-full"
          >
            <Image
              src={getImageSrc()}
              alt="Буратино AI"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Декоративные элементы леса */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-around opacity-30 pointer-events-none">
          <motion.span 
            className="text-3xl"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌳
          </motion.span>
          <motion.span 
            className="text-3xl"
            animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            🍂
          </motion.span>
          <motion.span 
            className="text-3xl"
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            🌲
          </motion.span>
        </div>
      </motion.div>

      {/* Message bubble */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute -right-2 top-0 bg-white rounded-2xl p-5 shadow-2xl max-w-xs border-2 border-amber-300 z-10"
          >
            <div className="absolute -left-3 top-8 w-0 h-0 border-t-[12px] border-t-transparent border-r-[16px] border-r-white border-b-[12px] border-b-transparent" />
            <div className="absolute -left-[14px] top-8 w-0 h-0 border-t-[12px] border-t-transparent border-r-[16px] border-r-amber-300 border-b-[12px] border-b-transparent" />
            <p className="text-sm font-medium text-gray-800 leading-relaxed">
              {currentMessage.slice(0, 120)}
              {currentMessage.length > 120 && '...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated glow when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 25px rgba(251, 191, 36, 0.4)',
              '0 0 50px rgba(251, 191, 36, 0.7)',
              '0 0 25px rgba(251, 191, 36, 0.4)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}

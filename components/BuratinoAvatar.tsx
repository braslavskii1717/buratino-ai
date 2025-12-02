'use client';
import { motion } from 'framer-motion';

interface Props {
  isThinking?: boolean;
}

export default function BuratinoAvatar({ isThinking }: Props) {
  return (
    <div className="relative">
      {/* Деревянная рамка */}
      <div className="bg-gradient-to-br from-amber-700 to-orange-900 p-6 rounded-3xl shadow-2xl border-4 border-amber-900">
        
        {/* Персонаж */}
        <motion.div
          animate={isThinking ? { 
            rotate: [-2, 2, -2],
            y: [0, -10, 0]
          } : {}}
          transition={{ 
            repeat: isThinking ? Infinity : 0,
            duration: 2 
          }}
          className="relative"
        >
          {/* Фон с боке */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-amber-100 to-orange-200 rounded-2xl blur-sm"></div>
          
          {/* Основное изображение */}
          <div className="relative bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-8 border-4 border-amber-300 shadow-inner">
            <div className="text-center space-y-4">
              {/* Эмодзи Буратино */}
              <motion.div
                animate={{ 
                  rotate: isThinking ? [0, 5, -5, 0] : 0,
                  scale: isThinking ? [1, 1.05, 1] : 1
                }}
                transition={{ repeat: isThinking ? Infinity : 0, duration: 1.5 }}
                className="text-9xl"
              >
                🎭
              </motion.div>

              {/* Деревянный нос */}
              <motion.div
                animate={isThinking ? {
                  scaleX: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ repeat: isThinking ? Infinity : 0, duration: 1 }}
                className="text-5xl"
              >
                🥕
              </motion.div>

              {/* Золотой ключик */}
              <motion.div
                animate={isThinking ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                } : { rotate: [0, 10, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: isThinking ? 2 : 3,
                  ease: "easeInOut"
                }}
                className="text-6xl"
              >
                🗝️
              </motion.div>

              {/* Статус */}
              <div className="bg-amber-700 text-white px-4 py-2 rounded-full shadow-lg">
                <p className="text-sm font-bold">
                  {isThinking ? '🤔 Думаю...' : '✨ Готов помочь!'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Декоративные элементы */}
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">⭐</div>
        <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">🎪</div>
      </div>
    </div>
  );
}

'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isSpeaking: boolean;
  currentMessage: string;
}

export default function BuratinoAvatar({ isSpeaking, currentMessage }: Props) {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        {/* SVG Буратино */}
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
        >
          {/* Голова */}
          ircle cx="100" cy="80" r="45" fill="#d4a574" />
          
          {/* Волосы */}
          <path d="M 60 50 Q 55 30 100 25 Q 145 30 140 50" fill="#8b6f47" />
          
          {/* Уши */}
          ircle cx="55" cy="85" r="8" fill="#d4a574" />
          ircle cx="145" cy="85" r="8" fill="#d4a574" />
          
          {/* Глаза */}
          ircle cx="80" cy="70" r="6" fill="#2c3e50" />
          ircle cx="120" cy="70" r="6" fill="#2c3e50" />
          ircle cx="82" cy="68" r="2" fill="white" />
          ircle cx="122" cy="68" r="2" fill="white" />
          
          {/* Нос */}
          <path d="M 100 80 L 105 95 L 95 95 Z" fill="#c9956f" />
          
          {/* Рот */}
          <path d="M 90 100 Q 100 108 110 100" stroke="#8b4513" strokeWidth="2" fill="none" />
          
          {/* Шапка */}
          <polygon points="60,45 140,45 130,20 70,20" fill="#c41e3a" />
          <polygon points="130,20 140,20 140,40 145,35" fill="#ffffff" />
          <polygon points="140,20 145,35 135,25" fill="#ffffff" />
          
          {/* Тело */}
          <rect x="75" y="125" width="50" height="60" rx="10" fill="#4a90e2" />
          
          {/* Рубашка */}
          <rect x="80" y="130" width="40" height="35" fill="#87ceeb" />
          
          {/* Пуговицы */}
          ircle cx="100" cy="145" r="2" fill="#2c3e50" />
          ircle cx="100" cy="158" r="2" fill="#2c3e50" />
          
          {/* Руки */}
          <line x1="75" y1="135" x2="50" y2="150" stroke="#d4a574" strokeWidth="6" strokeLinecap="round" />
          <line x1="125" y1="135" x2="150" y2="150" stroke="#d4a574" strokeWidth="6" strokeLinecap="round" />
          
          {/* Кисти */}
          ircle cx="48" cy="152" r="5" fill="#d4a574" />
          ircle cx="152" cy="152" r="5" fill="#d4a574" />
          
          {/* Ноги */}
          <rect x="85" y="190" width="8" height="45" fill="#2c3e50" />
          <rect x="107" y="190" width="8" height="45" fill="#2c3e50" />
          
          {/* Обувь */}
          <ellipse cx="89" cy="240" rx="8" ry="6" fill="#1a1a1a" />
          <ellipse cx="111" cy="240" rx="8" ry="6" fill="#1a1a1a" />
          
          {/* Золотой ключ на груди */}
          ircle cx="100" cy="165" r="4" fill="#ffd700" />
          <rect x="98" y="168" width="4" height="8" fill="#ffd700" />
        </svg>

        {/* Анимация рта когда говорит */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              className="absolute bottom-16 w-8 h-4 bg-red-400 rounded-full opacity-70"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Всплывающее сообщение */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -right-4 top-0 bg-white rounded-2xl p-4 shadow-lg max-w-xs"
          >
            <p className="text-sm text-gray-800">{currentMessage.slice(0, 100)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

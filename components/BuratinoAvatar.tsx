'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BuratinoAvatarProps {
  isThinking?: boolean;
}

export default function BuratinoAvatar({ isThinking = false }: BuratinoAvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Деревянная рамка */}
      <div className="relative bg-gradient-to-br from-amber-600 to-orange-800 rounded-3xl p-4 shadow-2xl border-4 border-amber-900">
        
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

          {/* Буратино - главный персонаж */}
          <div className="relative mb-6 flex justify-center">
            {isThinking ? (
              // Думающий Буратино с вопросами
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Image
                  src="/images/3D_Buratino_dumaet_-sostoianie_zagruzki.jpg"
                  alt="Буратино думает"
                  width={150}
                  height={150}
                  className="rounded-full"
                  priority
                />
                {/* Анимированные вопросы */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-4 -right-4 text-3xl"
                >
                  ❓
                </motion.div>
              </motion.div>
            ) : (
              // Улыбающийся Буратино
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/images/3D_Buratino_-_glavnyi_personazh_-ulybka.jpg"
                  alt="Буратино"
                  width={150}
                  height={150}
                  className="rounded-full"
                  priority
                />
              </motion.div>
            )}
          </div>

          {/* Иконки театральных масок */}
          <div className="flex justify-center gap-6 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0 }}
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

          {/* Морковка */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-4"
          >
            <div className="text-4xl">🥕</div>
          </motion.div>

          {/* Золотой ключик */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center mb-6"
          >
            <div className="text-4xl">🔑</div>
          </motion.div>

          {/* Кнопка "Готов помочь!" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl border-4 border-amber-800 hover:from-amber-700 hover:to-orange-800 transition-all"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: '16px'
            }}
          >
            ✨ Готов помочь!
          </motion.button>
        </div>

        {/* Избушка внизу */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-4 -left-4 text-5xl"
        >
          🏠
        </motion.div>
      </div>
    </motion.div>
  );
}

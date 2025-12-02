'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: Props) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-800 to-green-600 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 bg-green-900 rounded-t-full"
            style={{
              left: `${i * 5}%`,
              bottom: 0,
              height: `${150 + Math.random() * 100}px`,
            }}
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Image
          src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/583b8dd2-7223-40bf-a479-6def889cb664"
          alt="Буратино"
          width={400}
          height={400}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 text-center z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Привет! Я — Буратино AI 🎭
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Твой новый ИИ-ассистент из цифрового леса
        </p>
        <motion.button
          onClick={onComplete}
          className="px-8 py-4 bg-amber-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-amber-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Давай знакомиться! 🔑
        </motion.button>
      </motion.div>
    </div>
  );
}

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Props {
  isSpeaking: boolean;
  currentMessage: string;
}

export default function BuratinoAvatar({ isSpeaking, currentMessage }: Props) {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <motion.div
        className="relative w-full h-full"
        animate={{
          scale: isSpeaking ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        <Image
          src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/8f2dc744-2617-4ba8-923d-0ec298c6f12d"
          alt="Буратино AI"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />

        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              className="absolute bottom-[35%] left-1/2 transform -translate-x-1/2"
              initial={{ scaleY: 0.5 }}
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              <div className="w-8 h-4 bg-red-400 rounded-full opacity-70" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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

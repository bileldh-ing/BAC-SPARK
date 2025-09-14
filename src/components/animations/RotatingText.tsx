import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last' | 'center';
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: any;
  rotationInterval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  staggerFrom = 'first',
  initial = { y: '100%' },
  animate = { y: 0 },
  exit = { y: '-120%' },
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const getStaggerDelay = (index: number, total: number) => {
    switch (staggerFrom) {
      case 'last':
        return (total - index - 1) * staggerDuration;
      case 'center':
        return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
      default:
        return index * staggerDuration;
    }
  };

  const currentText = texts[currentIndex];
  const characters = currentText.split('');

  return (
    <div className={`flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="flex"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {characters.map((char, index) => (
            <div key={index} className={splitLevelClassName}>
              <motion.span
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{
                  ...transition,
                  delay: getStaggerDelay(index, characters.length),
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
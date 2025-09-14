import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 150,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getDirectionVariants = () => {
    switch (direction) {
      case 'top':
        return { y: -20, opacity: 0 };
      case 'bottom':
        return { y: 20, opacity: 0 };
      case 'left':
        return { x: -20, opacity: 0 };
      case 'right':
        return { x: 20, opacity: 0 };
      default:
        return { y: -20, opacity: 0 };
    }
  };

  const splitText = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <div className={className}>
      {splitText.map((segment, index) => (
        <motion.span
          key={index}
          initial={{
            ...getDirectionVariants(),
            filter: 'blur(10px)',
          }}
          animate={
            isVisible
              ? {
                  y: 0,
                  x: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: index * (delay / 1000),
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            if (index === splitText.length - 1 && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          className="inline-block"
          style={{
            marginRight: animateBy === 'words' ? '0.25rem' : '0',
          }}
        >
          {segment}
        </motion.span>
      ))}
    </div>
  );
};

export default BlurText;
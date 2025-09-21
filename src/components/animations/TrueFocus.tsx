import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueFocusProps {
    sentence: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    className?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
    sentence,
    manualMode = false,
    blurAmount = 5,
    borderColor = "red",
    animationDuration = 2,
    pauseBetweenAnimations = 1,
    className = ""
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (manualMode) return;

        const startAnimation = () => {
            setIsAnimating(true);

            // Animate the entire phrase
            const animatePhrase = () => {
                setIsVisible(true);

                // After animation duration, hide and restart
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => {
                        setIsAnimating(false);
                        setTimeout(startAnimation, pauseBetweenAnimations * 1000);
                    }, 500);
                }, animationDuration * 1000);
            };

            animatePhrase();
        };

        startAnimation();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [animationDuration, pauseBetweenAnimations, manualMode]);

    const handleManualNext = () => {
        if (manualMode) {
            setIsVisible(!isVisible);
        }
    };

    return (
        <div className={`relative ${className}`} onClick={handleManualNext}>
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {isVisible && (
                        <motion.div
                            key="bac-spark"
                            initial={{
                                opacity: 0,
                                y: 20,
                                filter: `blur(${blurAmount}px)`
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)'
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                filter: `blur(${blurAmount}px)`
                            }}
                            transition={{
                                duration: animationDuration * 0.3,
                                ease: "easeOut"
                            }}
                            className="relative inline-block"
                        >
                            <span className="relative z-10 text-6xl md:text-8xl font-black text-white">
                                {sentence}
                            </span>

                            {/* Orange glow effect */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 0.6 }}
                                transition={{
                                    duration: animationDuration * 0.5,
                                    ease: "easeOut"
                                }}
                                className="absolute inset-0 rounded-lg bg-orange-500/30 blur-2xl"
                                style={{ zIndex: -1 }}
                            />

                            {/* Stronger orange glow effect */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0.4 }}
                                transition={{
                                    duration: animationDuration * 0.7,
                                    ease: "easeOut"
                                }}
                                className="absolute inset-0 rounded-lg bg-orange-400/20 blur-3xl"
                                style={{ zIndex: -2 }}
                            />

                            {/* Pulsing glow effect */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 rounded-lg bg-orange-500/20 blur-xl"
                                style={{ zIndex: -3 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrueFocus;
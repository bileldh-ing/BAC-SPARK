import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SparklesIcon, PlayIcon } from 'lucide-react';
import BlurText from '@/components/animations/BlurText';
import RotatingText from '@/components/animations/RotatingText';
import Prism from '@/components/animations/Prism';
import TrueFocus from '@/components/animations/TrueFocus';
import bacSparkLogo from '@/assets/bac-spark-logo.png';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const dynamicPhrases = [
    'Prépare ton Bac avec confiance',
    'Accède à tes corrigés en un clic',
    'Un seul code, un seul Bac',
    'Ton succès commence ici'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline/Prism Background */}
      <div className="absolute inset-0">
        {/* Spline Iframe */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src='https://my.spline.design/miniroomremakecopyprogrammerroom-x6nd0Tu4q3XGzwTv5qLtMde4/'
            frameBorder='0'
            width='100%'
            height='100%'
            style={{ border: 'none', transform: 'scale(1.2)' }}
          />
        </div>

        {/* Prism Animation Overlay */}
        <div className="absolute inset-0 w-full h-full opacity-30">
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>
      </div>

      {/* Dark Overlay (30% transparency) */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Logo/Title */}
          <div className="space-y-4">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <img
                src={bacSparkLogo}
                alt="BAC SPARK Logo"
                className="w-32 h-32 logo-glow"
              />
            </motion.div>

            <TrueFocus
              sentence="BAC SPARK"
              manualMode={false}
              blurAmount={5}
              borderColor="orange"
              animationDuration={2}
              pauseBetweenAnimations={1}
              className="mb-8"
            />
          </div>

          {/* Dynamic Subtitle */}
          <div className="space-y-6">
            <div className="text-2xl md:text-3xl text-foreground/90 font-bold">
              <RotatingText
                texts={dynamicPhrases}
                mainClassName="justify-center items-center min-h-[3rem]"
                staggerFrom="center"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                rotationInterval={3000}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="btn-hero text-lg px-8 py-4 group"
            >
              <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Commencer maintenant
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 glass-effect border-orange-primary/30 hover:bg-orange-primary/10"
            >
              En savoir plus
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="pt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { number: '6', label: 'Types de BAC' },
              { number: '100%', label: 'Fiabilité' },
              { number: '24/7', label: 'Accès' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-accent">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Découvrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-current rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
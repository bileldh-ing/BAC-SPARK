import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { BACCard } from '@/components/BACCard';
import { CodeInputDialog } from '@/components/CodeInputDialog';
import { useBACSpark } from '@/hooks/useBACSpark';
import { CheckIcon, ShieldCheckIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard: React.FC = () => {
  const { bacTypes, validateCode, activeBac } = useBACSpark();
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const { toast } = useToast();

  // Show code dialog on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!activeBac) {
        setShowCodeDialog(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeBac]);

  const handleCodeSubmit = (code: string): boolean => {
    const isValid = validateCode(code);
    if (isValid) {
      toast({
        title: "Code validé !",
        description: "Vous avez maintenant accès à vos documents BAC.",
        duration: 3000,
      });
    }
    return isValid;
  };

  const handleGetStarted = () => {
    setShowCodeDialog(true);
  };

  const handleAccessDocuments = (bacId: string) => {
    const bac = bacTypes.find(b => b.id === bacId);
    if (bac?.documents) {
      // Open documents in new tabs
      bac.documents.forEach(doc => {
        window.open(doc, '_blank');
      });
    }
  };

  const whyChooseUsPoints = [
    {
      icon: <CheckIcon className="w-6 h-6" />,
      title: "Accès instantané avec un simple code",
      description: "Entrez votre code et accédez immédiatement à vos ressources"
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Plateforme 100% intuitive et moderne",
      description: "Interface élégante et facile à utiliser pour tous les étudiants"
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: "Documents organisés par BAC",
      description: "Chaque filière a ses ressources spécialement adaptées"
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "Ressources fiables et complètes",
      description: "Corrigés vérifiés et documents de qualité professionnelle"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Why Choose Us Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi nous choisir ?
            </h2>
            <div className="w-24 h-1 bg-gradient-orange mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-gradient-orange 
                               flex items-center justify-center text-primary-foreground
                               group-hover:scale-110 transition-transform duration-300">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* BAC Cards Section */}
      <section className="py-24 px-4 bg-dark-surface/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choisissez votre BAC
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Entrez votre code pour débloquer l'accès aux documents de votre filière
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bacTypes.map((bac, index) => (
              <BACCard
                key={bac.id}
                bac={bac}
                index={index}
                onAccessDocuments={handleAccessDocuments}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/20">
        <div className="container mx-auto">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-orange">
                <span className="text-2xl font-black text-primary-foreground">BS</span>
              </div>
              <span className="text-2xl font-bold">BAC SPARK</span>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              {[
                { label: "Contact", href: "#contact" },
                { label: "Mentions légales", href: "#" },
                { label: "Conditions d'utilisation", href: "#" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="pt-8 border-t border-border/10">
              <p className="text-muted-foreground">
                © 2025 BAC SPARK - Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Code Input Dialog */}
      <CodeInputDialog
        isOpen={showCodeDialog}
        onCodeSubmit={handleCodeSubmit}
        onClose={() => setShowCodeDialog(false)}
      />
    </div>
  );
};

export default StudentDashboard;
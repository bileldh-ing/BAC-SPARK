import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KeyIcon, LockIcon } from 'lucide-react';

interface CodeInputDialogProps {
  isOpen: boolean;
  onCodeSubmit: (code: string) => boolean;
  onClose: () => void;
}

export const CodeInputDialog: React.FC<CodeInputDialogProps> = ({
  isOpen,
  onCodeSubmit,
  onClose,
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const isValid = onCodeSubmit(code.trim());
    
    if (isValid) {
      setCode('');
      onClose();
    } else {
      setError('Code invalide. Veuillez réessayer.');
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-effect border-orange-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-orange">
              <KeyIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            Entrez votre code d'accès
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Entrez votre code BAC..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-lg font-mono tracking-wider uppercase 
                         border-orange-primary/30 focus:border-orange-primary 
                         bg-dark-elevated/50"
                maxLength={10}
              />
              <LockIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-destructive text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <Button
            type="submit"
            disabled={!code.trim() || isLoading}
            className="w-full btn-hero relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Vérification...
                </motion.div>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Accéder à mon BAC
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Un code vous a été fourni lors de votre achat</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
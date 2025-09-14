import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LockIcon, 
  UnlockIcon, 
  ExternalLinkIcon,
  CalculatorIcon,
  FlaskConicalIcon,
  CogIcon,
  BookOpenIcon,
  MonitorIcon,
  TrendingUpIcon
} from 'lucide-react';
import { BACType } from '@/hooks/useBACSpark';

interface BACCardProps {
  bac: BACType;
  index: number;
  onAccessDocuments: (bacId: string) => void;
}

export const BACCard: React.FC<BACCardProps> = ({ bac, index, onAccessDocuments }) => {
  const isLocked = bac.status === 'locked';
  
  const getSubjectIcon = (bacId: string) => {
    switch (bacId) {
      case 'math': return <CalculatorIcon className="w-8 h-8" />;
      case 'sciences': return <FlaskConicalIcon className="w-8 h-8" />;
      case 'techniques': return <CogIcon className="w-8 h-8" />;
      case 'lettres': return <BookOpenIcon className="w-8 h-8" />;
      case 'informatique': return <MonitorIcon className="w-8 h-8" />;
      case 'economie': return <TrendingUpIcon className="w-8 h-8" />;
      default: return <UnlockIcon className="w-8 h-8" />;
    }
  };

  const getCardClassName = (bacId: string, isLocked: boolean) => {
    if (isLocked) return 'bac-card-locked';
    return `bac-card-${bacId}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      className="group"
    >
      <Card className={getCardClassName(bac.id, isLocked)}>
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-current/10 to-current/5 
                         flex items-center justify-center group-hover:animate-glow-pulse">
            {isLocked ? (
              <LockIcon className="w-8 h-8" />
            ) : (
              getSubjectIcon(bac.id)
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold">
            {bac.name}
          </h3>
          
          {/* Status */}
          <div className="space-y-3">
            {isLocked ? (
              <div className="text-sm">
                <p className="opacity-70">Accès verrouillé</p>
                <p className="text-xs opacity-50 mt-1">
                  Entrez votre code pour débloquer
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-accent font-semibold">
                  ✓ Accès débloqué
                </div>
                
                <Button
                  onClick={() => onAccessDocuments(bac.id)}
                  className="btn-hero w-full group"
                >
                  <span>Accéder aux documents</span>
                  <ExternalLinkIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="text-xs text-muted-foreground">
                  {bac.documents.length} document(s) disponible(s)
                </div>
              </div>
            )}
          </div>
          
          {/* Decoration */}
          {!isLocked && (
            <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none">
              <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent rounded-full animate-pulse" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
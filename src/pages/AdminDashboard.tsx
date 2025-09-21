import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBACSpark } from '@/contexts/BACSparkContext';
import { useToast } from '@/hooks/use-toast';
import Prism from '@/components/animations/Prism';
import {
  LockIcon,
  CopyIcon,
  CheckIcon,
  HistoryIcon,
  ShieldIcon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});
  const [itemsPerPage] = useState(20);
  const { codes, usedCodes, getAvailableCodes, markCodeAsUsed, copyCodeToClipboard } = useBACSpark();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'adminisraabelhadjali2006@gmail.com' && loginForm.password === 'admin2025++') {
      setIsLoggedIn(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le dashboard administrateur",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = (code: string) => {
    copyCodeToClipboard(code);
    toast({
      title: "Code copié",
      description: `Le code ${code} a été copié dans le presse-papiers`,
    });
  };

  const handleMarkAsDone = (codeId: string, code: string) => {
    markCodeAsUsed(codeId);
    toast({
      title: "Code marqué comme utilisé",
      description: `Le code ${code} a été déplacé vers l'historique`,
    });
  };

  const getCurrentPage = (bacType: string) => {
    return currentPage[bacType] || 1;
  };

  const setCurrentPageForBac = (bacType: string, page: number) => {
    setCurrentPage(prev => ({ ...prev, [bacType]: page }));
  };

  const getPaginatedCodes = (bacCodes: any[], bacType: string) => {
    const page = getCurrentPage(bacType);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bacCodes.slice(startIndex, endIndex);
  };

  const getTotalPages = (bacCodes: any[]) => {
    return Math.ceil(bacCodes.length / itemsPerPage);
  };

  const bacTypes = [
    { id: 'math', name: 'Mathématiques', color: 'bg-blue-500' },
    { id: 'sciences', name: 'Sciences Expérimentales', color: 'bg-green-500' },
    { id: 'techniques', name: 'Techniques', color: 'bg-purple-500' },
    { id: 'lettres', name: 'Lettres', color: 'bg-red-500' },
    { id: 'informatique', name: 'Informatique', color: 'bg-cyan-500' },
    { id: 'economie', name: 'Économie', color: 'bg-yellow-500' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Prism Background */}
        <div className="absolute inset-0 w-full h-full opacity-15">
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
        <Card className="w-full max-w-md glass-effect relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-orange flex items-center justify-center mb-4">
              <ShieldIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground">
              Accès réservé aux administrateurs
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-dark-elevated/50 border-orange-primary/30"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-dark-elevated/50 border-orange-primary/30 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
              <Button type="submit" className="w-full btn-hero">
                <LockIcon className="w-4 h-4 mr-2" />
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Prism Background */}
      <div className="absolute inset-0 w-full h-full opacity-10">
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
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
            <p className="text-muted-foreground">Gestion des codes BAC SPARK</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsLoggedIn(false)}
            className="border-orange-primary/30 hover:bg-orange-primary/10"
          >
            Déconnexion
          </Button>
        </div>



        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-dark-elevated">
            <TabsTrigger value="available" className="data-[state=active]:bg-accent">
              Codes disponibles
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-accent">
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="space-y-6">
              {bacTypes.map(bac => {
                const bacCodes = getAvailableCodes(bac.id);
                const paginatedCodes = getPaginatedCodes(bacCodes, bac.id);
                const totalPages = getTotalPages(bacCodes);
                const currentPageNum = getCurrentPage(bac.id);

                return (
                  <Card key={bac.id} className="glass-effect">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${bac.color}`} />
                          {bac.name}
                        </CardTitle>
                        <Badge variant="secondary">
                          {bacCodes.length} codes disponibles
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        <AnimatePresence>
                          {paginatedCodes.map((code, index) => (
                            <motion.div
                              key={code.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8, x: -100 }}
                              transition={{ duration: 0.2, delay: index * 0.02 }}
                              className="p-3 bg-dark-elevated rounded-lg border border-border/20 hover:border-orange-primary/30 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <code className="font-mono text-accent font-semibold text-sm">
                                  {code.code}
                                </code>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleCopyCode(code.code)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <CopyIcon className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleMarkAsDone(code.id, code.code)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <CheckIcon className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                          <div className="text-sm text-muted-foreground">
                            Page {currentPageNum} sur {totalPages}
                            ({((currentPageNum - 1) * itemsPerPage) + 1}-{Math.min(currentPageNum * itemsPerPage, bacCodes.length)} sur {bacCodes.length})
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPageForBac(bac.id, Math.max(1, currentPageNum - 1))}
                              disabled={currentPageNum === 1}
                            >
                              Précédent
                            </Button>
                            <div className="flex gap-1">
                              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPageNum - 2)) + i;
                                return (
                                  <Button
                                    key={pageNum}
                                    variant={pageNum === currentPageNum ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPageForBac(bac.id, pageNum)}
                                    className="w-8 h-8 p-0"
                                  >
                                    {pageNum}
                                  </Button>
                                );
                              })}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPageForBac(bac.id, Math.min(totalPages, currentPageNum + 1))}
                              disabled={currentPageNum === totalPages}
                            >
                              Suivant
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HistoryIcon className="w-5 h-5" />
                  Historique des codes utilisés
                </CardTitle>
              </CardHeader>
              <CardContent>
                {usedCodes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <HistoryIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun code utilisé pour le moment</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>BAC</TableHead>
                        <TableHead>Date d'utilisation</TableHead>
                        <TableHead>Heure</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usedCodes.map(code => (
                        <TableRow key={code.id}>
                          <TableCell className="font-mono">{code.code}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {bacTypes.find(b => b.id === code.bacType)?.name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {code.usedAt?.toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            {code.usedAt?.toLocaleTimeString('fr-FR')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Prism from '@/components/animations/Prism';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
      duration: 3000,
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: "Email",
      info: "contact@bacspark.com"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Téléphone",
      info: "+216 XX XXX XXX"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Adresse",
      info: "Tunis, Tunisie"
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-dark-surface/20 relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un problème ? N'hésitez pas à nous contacter
          </p>
          <div className="w-24 h-1 bg-gradient-orange mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>
              <p className="text-muted-foreground mb-8">
                Notre équipe est là pour vous aider à réussir votre BAC.
                N'hésitez pas à nous contacter pour toute question.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                  <div className="p-3 rounded-full bg-gradient-orange text-primary-foreground">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Sujet *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="btn-hero w-full"
                size="lg"
              >
                Envoyer le message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
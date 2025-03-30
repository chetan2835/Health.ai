
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about Health.AI? We're here to help. Reach out to us using any of the methods below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <Phone className="w-12 h-12 text-medical-blue mb-4" />
                <CardTitle className="mb-2">Phone</CardTitle>
                <CardDescription className="text-center">
                  <a href="tel:+1-800-HEALTH-AI" className="text-foreground hover:text-medical-blue transition-colors">
                    +91-800-HEALTH-AI
                  </a>;
                  <p className="text-sm mt-1">Mon-Fri, 9:00 AM - 6:00 IST</p>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <Mail className="w-12 h-12 text-medical-blue mb-4" />
                <CardTitle className="mb-2">Email</CardTitle>
                <CardDescription className="text-center">
                  <a href="mailto:support@healthai.com" className="text-foreground hover:text-medical-blue transition-colors">
                    support@healthai.com
                  </a>
                  <p className="text-sm mt-1">We'll respond within 24 hours</p>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                <MapPin className="w-12 h-12 text-medical-blue mb-4" />
                <CardTitle className="mb-2">Office</CardTitle>
                <CardDescription className="text-center">
                  123 Health Avenue<br />
                  Civil Lines, CA 302001, jaipur<br />
                  India
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Type your message here..." rows={5} required />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

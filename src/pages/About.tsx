
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Heart, Shield, User, Award, Zap } from 'lucide-react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);
  
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

  const values = [
    {
      icon: <Brain className="w-10 h-10 text-medical-blue" />,
      title: "Innovation",
      description: "Pushing the boundaries of AI in healthcare to create solutions that were previously impossible."
    },
    {
      icon: <Heart className="w-10 h-10 text-medical-green" />,
      title: "Patient-Centered",
      description: "Designing all of our technology with patient outcomes and experiences as our top priority."
    },
    {
      icon: <Shield className="w-10 h-10 text-medical-blue" />,
      title: "Privacy & Security",
      description: "Maintaining the highest standards of data security and patient privacy in everything we do."
    },
    {
      icon: <Award className="w-10 h-10 text-medical-green" />,
      title: "Medical Excellence",
      description: "Partnering with top medical professionals to ensure clinical accuracy and relevance."
    },
    {
      icon: <User className="w-10 h-10 text-medical-blue" />,
      title: "Accessibility",
      description: "Making advanced healthcare technology accessible to everyone, regardless of location."
    },
    {
      icon: <Zap className="w-10 h-10 text-medical-green" />,
      title: "Speed & Efficiency",
      description: "Delivering rapid results without compromising on quality or accuracy of analysis."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Health.AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming healthcare through the power of artificial intelligence and human expertise.
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg mb-6">
                At Health.AI, we're on a mission to democratize access to specialized medical care through the power of artificial intelligence. We believe that everyone deserves access to quick, accurate medical analysis and expert consultation, regardless of their location or circumstances.
              </p>
              <p className="text-lg mb-6">
                By combining cutting-edge AI technology with the expertise of specialized medical professionals, we're creating a healthcare ecosystem that bridges the gap between traditional medicine and technological innovation.
              </p>
              <p className="text-lg">
                Our goal is not to replace healthcare providers, but to enhance their capabilities and extend their reach, allowing more people to receive the care they need, when they need it most.
              </p>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
        
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

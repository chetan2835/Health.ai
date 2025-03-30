
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoIcon, Calendar, User, MessageCircle, Clock, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Consultation = () => {
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

  // Mock data for available doctors
  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Shivani Joshi",
      specialization: "Dermatologist",
      rating: 4.9,
      experience: "10+ years",
      availability: "Available today",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Dr. Arjun Sharma",
      specialization: "Dentist",
      rating: 4.8,
      experience: "8+ years",
      availability: "Available tomorrow",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Dr. Anita singh",
      specialization: "Ophthalmologist",
      rating: 4.7,
      experience: "12+ years",
      availability: "Available today",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Dr. Mohit Gupta",
      specialization: "General Physician",
      rating: 4.6,
      experience: "15+ years",
      availability: "Available today",
      image: "/placeholder.svg",
    }
  ];

  const bookConsultation = (doctorId: number) => {
    toast({
      title: "Consultation Booked!",
      description: `Your consultation has been scheduled. Check your dashboard for details.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Doctor Consultation</h1>
              <p className="text-muted-foreground">Connect with specialists matched to your needs</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  View Scheduled Consultations
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <div className="relative h-40 bg-accent/30">
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary mr-3 overflow-hidden">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{doctor.experience}</div>
                  </div>
                  
                  <div className="flex items-center text-sm text-medical-green mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {doctor.availability}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => bookConsultation(doctor.id)} variant="outline" className="flex items-center gap-2">
                      <VideoIcon className="w-4 h-4" />
                      Video Call
                    </Button>
                    <Button onClick={() => bookConsultation(doctor.id)} className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consultation;

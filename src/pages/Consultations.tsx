
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, MessageCircle, Video, ChevronRight, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Consultations = () => {
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
  
  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Dermatologist",
      date: "June 20, 2023",
      time: "10:00 AM",
      type: "Video Call",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. James Wilson",
      specialization: "Dentist",
      date: "June 25, 2023",
      time: "2:30 PM",
      type: "In-person",
      status: "Pending"
    }
  ];
  
  const pastConsultations = [
    {
      id: 3,
      doctor: "Dr. Emily Chen",
      specialization: "Dermatologist",
      date: "May 15, 2023",
      time: "11:30 AM",
      type: "Video Call",
      status: "Completed",
      notes: "Prescribed treatment for eczema. Follow-up in 3 weeks."
    },
    {
      id: 4,
      doctor: "Dr. Michael Brown",
      specialization: "General Practitioner",
      date: "April 30, 2023",
      time: "9:00 AM",
      type: "Chat",
      status: "Completed",
      notes: "Discussed diet changes for iron deficiency."
    },
    {
      id: 5,
      doctor: "Dr. Sarah Johnson",
      specialization: "Dermatologist",
      date: "April 10, 2023",
      time: "3:45 PM",
      type: "Video Call",
      status: "Completed",
      notes: "Initial consultation for skin rash. Recommended AI scan analysis."
    }
  ];

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "Video Call":
        return <Video className="w-4 h-4 text-medical-green" />;
      case "Chat":
        return <MessageCircle className="w-4 h-4 text-medical-blue" />;
      case "In-person":
        return <User className="w-4 h-4 text-medical-blue" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-medical-green">{status}</Badge>;
      case "Pending":
        return <Badge variant="outline">{status}</Badge>;
      case "Completed":
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Consultations</h1>
              <p className="text-muted-foreground">Manage your doctor appointments and consultations</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/consultation" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Book New Consultation
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Consultations</CardTitle>
                  <CardDescription>Your scheduled appointments with doctors</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingConsultations.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingConsultations.map((consultation) => (
                        <div 
                          key={consultation.id} 
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-medical-green/10 flex items-center justify-center">
                              <User className="w-6 h-6 text-medical-green" />
                            </div>
                            <div>
                              <h3 className="font-medium">{consultation.doctor}</h3>
                              <div className="text-sm text-muted-foreground">
                                {consultation.specialization}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
                            <div className="flex items-center gap-1.5 text-sm">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{consultation.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-sm md:ml-4">
                              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{consultation.time}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-sm md:ml-4">
                              {getConsultationIcon(consultation.type)}
                              <span>{consultation.type}</span>
                            </div>
                            
                            <div className="md:ml-4">
                              {getStatusBadge(consultation.status)}
                            </div>
                            
                            <div className="flex gap-2 mt-2 md:mt-0 md:ml-4">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/consultation/${consultation.id}`}>
                                  Details
                                </Link>
                              </Button>
                              
                              {consultation.status === "Confirmed" && (
                                <Button size="sm" asChild>
                                  <Link to={`/consultation/${consultation.id}/join`}>
                                    Join
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No upcoming consultations scheduled</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <Link to="/consultation">Book a Consultation</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Consultations</CardTitle>
                  <CardDescription>Your previous appointments and consultation history</CardDescription>
                </CardHeader>
                <CardContent>
                  {pastConsultations.length > 0 ? (
                    <div className="space-y-4">
                      {pastConsultations.map((consultation) => (
                        <div 
                          key={consultation.id} 
                          className="flex flex-col p-4 rounded-lg bg-accent/50"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center">
                                <User className="w-6 h-6 text-medical-blue" />
                              </div>
                              <div>
                                <h3 className="font-medium">{consultation.doctor}</h3>
                                <div className="text-sm text-muted-foreground">
                                  {consultation.specialization}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
                              <div className="flex items-center gap-1.5 text-sm">
                                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>{consultation.date}</span>
                              </div>
                              
                              <div className="flex items-center gap-1.5 text-sm">
                                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>{consultation.time}</span>
                              </div>
                              
                              <div className="flex items-center gap-1.5 text-sm">
                                {getConsultationIcon(consultation.type)}
                                <span>{consultation.type}</span>
                              </div>
                              
                              <div>
                                {getStatusBadge(consultation.status)}
                              </div>
                            </div>
                          </div>
                          
                          {consultation.notes && (
                            <div className="mt-3 pl-16 md:pl-[4.5rem]">
                              <p className="text-sm">
                                <span className="font-medium">Doctor's Notes:</span> {consultation.notes}
                              </p>
                            </div>
                          )}
                          
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/consultation/${consultation.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No past consultations found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consultations;

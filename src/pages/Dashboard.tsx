
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, User, Heart, ArrowRight, Plus, MessageCircle } from 'lucide-react';

const Dashboard = () => {
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
  
  const recentScans = [
    {
      id: 1,
      type: "Skin Analysis",
      date: "March 29, 2025",
      status: "Analyzed",
      confidence: 92,
    },
    {
      id: 2,
      type: "Dental Scan",
      date: "March 29, 2025",
      status: "Doctor Reviewed",
      confidence: 87,
    },
  ];
  
  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Shivani Joshi",
      specialization: "Dermatologist",
      date: "March 31, 2025",
      time: "10:00 AM",
    },
  ];
  
  const recommendedDoctors = [
    {
      id: 1,
      name: "Dr. Arjun Sharma",
      specialization: "Dentist",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Dr. Anita singh",
      specialization: "Dermatologist",
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Manage your healthcare journey.</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/scan-analysis" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Upload New Scan
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/consultation" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">7</div>
                  <FileText className="w-8 h-8 text-medical-blue opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">3</div>
                  <MessageCircle className="w-8 h-8 text-medical-green opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">86<span className="text-base font-normal text-muted-foreground">/100</span></div>
                  <Heart className="w-8 h-8 text-medical-blue opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Next Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium">March 31, 10:00 AM</div>
                  <Clock className="w-6 h-6 text-medical-green opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Scans</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/scan-history" className="text-xs flex items-center">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Your latest medical scan analyses</CardDescription>
              </CardHeader>
              <CardContent>
                {recentScans.length > 0 ? (
                  <div className="space-y-4">
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-medical-blue/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-medical-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">{scan.type}</h4>
                            <p className="text-sm text-muted-foreground">{scan.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{scan.status}</div>
                          <div className="text-sm text-medical-green">{scan.confidence}% confidence</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No scans uploaded yet</p>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link to="/scan-analysis">Upload Your First Scan</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Consultations</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/consultations" className="text-xs flex items-center">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Your scheduled doctor appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-medical-green/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-medical-green" />
                          </div>
                          <div>
                            <h4 className="font-medium">{consultation.doctor}</h4>
                            <p className="text-sm text-muted-foreground">{consultation.specialization}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{consultation.date}</div>
                          <div className="text-sm text-muted-foreground">{consultation.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming consultations</p>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link to="/consultation">Book a Consultation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Recommended Doctors</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/consultation" className="text-xs flex items-center">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Specialists matched to your medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedDoctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-medical-blue/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-medical-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium flex items-center">
                          <Heart className="w-4 h-4 text-medical-green mr-1 fill-medical-green" />
                          {doctor.rating}
                        </div>
                        <Button size="sm" className="mt-1" asChild>
                          <Link to={`/consultation`}>Book</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, FileText, Heart, Mail, MapPin, Phone, Shield, User as UserIcon, Pencil } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const patientData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, Anytown, CA 94103",
    bloodType: "O+",
    allergies: "Penicillin, Peanuts",
    medicalHistory: "Appendectomy (2018), Mild Asthma",
    upcomingAppointments: [
      { id: 1, doctor: "Dr. Sarah Johnson", specialization: "Dermatologist", date: "2023-06-20", time: "10:00 AM" }
    ],
    recentScans: [
      { id: 1, type: "Skin Analysis", date: "2023-06-15", status: "Analyzed", confidence: 92 },
      { id: 2, type: "Dental Scan", date: "2023-06-10", status: "Doctor Reviewed", confidence: 87 }
    ]
  };

  const doctorData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    phone: "+1 (555) 987-6543",
    specialization: "Dermatologist",
    licenseNumber: "MD12345678",
    education: "Harvard Medical School, Residency at Johns Hopkins",
    experience: "10+ years specializing in dermatology",
    hospital: "Health Medical Center",
    address: "456 Medical Plaza, Anytown, CA 94103",
    availableSlots: [
      { id: 1, day: "Monday", time: "9:00 AM - 12:00 PM" },
      { id: 2, day: "Tuesday", time: "2:00 PM - 5:00 PM" },
      { id: 3, day: "Thursday", time: "1:00 PM - 6:00 PM" }
    ],
    upcomingAppointments: [
      { id: 1, patient: "John Doe", reason: "Skin rash consultation", date: "2023-06-20", time: "10:00 AM" },
      { id: 2, patient: "Jane Smith", reason: "Follow-up appointment", date: "2023-06-21", time: "11:30 AM" }
    ]
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // This would come from your auth context in a real app
    // For demonstration, we're toggling between patient and doctor
    const storedUserType = localStorage.getItem('userType') as 'patient' | 'doctor' | null;
    if (storedUserType) {
      setUserType(storedUserType);
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

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const toggleUserType = () => {
    const newUserType = userType === 'patient' ? 'doctor' : 'patient';
    setUserType(newUserType);
    localStorage.setItem('userType', newUserType);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userType === 'patient' ? patientData.avatar : doctorData.avatar} />
                      <AvatarFallback className="text-2xl bg-medical-blue text-white">
                        {userType === 'patient' ? patientData.name.charAt(0) : doctorData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-2xl font-bold">
                      {userType === 'patient' ? patientData.name : doctorData.name}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4">
                      {userType === 'patient' ? 'Patient' : doctorData.specialization}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm mb-6">
                      <Mail className="w-4 h-4" />
                      <span>{userType === 'patient' ? patientData.email : doctorData.email}</span>
                    </div>
                    
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="mb-4 w-full">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>

                    {/* For demo purposes only - toggle between patient and doctor */}
                    <Button variant="secondary" onClick={toggleUserType} className="w-full">
                      <UserIcon className="w-4 h-4 mr-2" />
                      Switch to {userType === 'patient' ? 'Doctor' : 'Patient'} View
                    </Button>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-medical-blue" />
                      <span className="text-muted-foreground">
                        {userType === 'patient' ? patientData.phone : doctorData.phone}
                      </span>
                    </div>
                    
                    {userType === 'patient' ? (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-medical-blue" />
                        <span className="text-muted-foreground">
                          Born: {patientData.dateOfBirth}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-4 h-4 text-medical-blue" />
                        <span className="text-muted-foreground">
                          License: {doctorData.licenseNumber}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-medical-blue mt-0.5" />
                      <span className="text-muted-foreground">
                        {userType === 'patient' ? patientData.address : doctorData.address}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="personal">
                        {userType === 'patient' ? 'Medical Info' : 'Professional Info'}
                      </TabsTrigger>
                      <TabsTrigger value="appointments">
                        Appointments
                      </TabsTrigger>
                      <TabsTrigger value="history">
                        {userType === 'patient' ? 'Scan History' : 'Patient Records'}
                      </TabsTrigger>
                    </TabsList>

                    {/* Personal Info Tab */}
                    <TabsContent value="personal" className="focus:outline-none">
                      {isEditing ? (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Edit {userType === 'patient' ? 'Medical' : 'Professional'} Information</h3>
                          
                          {userType === 'patient' ? (
                            <>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Blood Type</label>
                                <Input defaultValue={patientData.bloodType} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Allergies</label>
                                <Input defaultValue={patientData.allergies} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Medical History</label>
                                <Textarea defaultValue={patientData.medicalHistory} rows={4} />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Specialization</label>
                                <Input defaultValue={doctorData.specialization} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Education</label>
                                <Input defaultValue={doctorData.education} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Experience</label>
                                <Textarea defaultValue={doctorData.experience} rows={4} />
                              </div>
                            </>
                          )}
                          
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSaveProfile}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userType === 'patient' ? (
                            <>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Blood Type</p>
                                  <p className="font-medium">{patientData.bloodType}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Allergies</h4>
                                <p>{patientData.allergies}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Medical History</h4>
                                <p>{patientData.medicalHistory}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Education</h4>
                                <p>{doctorData.education}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Experience</h4>
                                <p>{doctorData.experience}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Hospital</h4>
                                <p>{doctorData.hospital}</p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm text-muted-foreground">Available Time Slots</h4>
                                <div className="space-y-2">
                                  {doctorData.availableSlots.map(slot => (
                                    <div key={slot.id} className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-medical-blue" />
                                      <span>{slot.day}: {slot.time}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </TabsContent>

                    {/* Appointments Tab */}
                    <TabsContent value="appointments" className="focus:outline-none">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                        
                        {userType === 'patient' ? (
                          patientData.upcomingAppointments.length > 0 ? (
                            <div className="space-y-3">
                              {patientData.upcomingAppointments.map(appointment => (
                                <Card key={appointment.id}>
                                  <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-medical-blue text-white">
                                          {appointment.doctor.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{appointment.doctor}</p>
                                        <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">{appointment.date}</p>
                                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No upcoming appointments.</p>
                          )
                        ) : (
                          doctorData.upcomingAppointments.length > 0 ? (
                            <div className="space-y-3">
                              {doctorData.upcomingAppointments.map(appointment => (
                                <Card key={appointment.id}>
                                  <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-medical-green text-white">
                                          {appointment.patient.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{appointment.patient}</p>
                                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">{appointment.date}</p>
                                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No upcoming appointments.</p>
                          )
                        )}
                        
                        <div className="flex justify-center mt-4">
                          <Button asChild>
                            <Link to="/consultation">
                              {userType === 'patient' ? 'Book New Appointment' : 'Manage Appointment Slots'}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* History Tab */}
                    <TabsContent value="history" className="focus:outline-none">
                      {userType === 'patient' ? (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Scan History</h3>
                          
                          {patientData.recentScans.length > 0 ? (
                            <div className="space-y-3">
                              {patientData.recentScans.map(scan => (
                                <Card key={scan.id}>
                                  <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-medical-blue/10 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-medical-blue" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{scan.type}</p>
                                        <p className="text-sm text-muted-foreground">{scan.date}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">{scan.status}</p>
                                      <p className="text-sm text-medical-green">{scan.confidence}% confidence</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No scan history available.</p>
                          )}
                          
                          <div className="flex justify-center mt-4">
                            <Button asChild>
                              <Link to="/scan-analysis">Upload New Scan</Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Patient Records</h3>
                          <p className="text-muted-foreground">Access to patient records and treatment history.</p>
                          
                          <Card>
                            <CardContent className="p-4">
                              <p className="text-center py-8 text-muted-foreground">
                                Patient records system integrated with Health.AI platform. 
                                Access requires additional authorization.
                              </p>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full">Access Records System</Button>
                            </CardFooter>
                          </Card>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

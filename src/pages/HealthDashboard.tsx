
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Bell, Award, Heart, Lightbulb, TrendingUp, Map } from 'lucide-react';
import HealthAlerts from '@/components/health/HealthAlerts';
import HealthInsights from '@/components/health/HealthInsights';
import RewardsSystem from '@/components/health/RewardsSystem';
import DiseaseOutbreakMap from '@/components/health/DiseaseOutbreakMap';

const HealthDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('alerts');

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Health Intelligence Center</h1>
              <p className="text-muted-foreground">
                AI-powered health monitoring, alerts, and personalized recommendations
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/scan-analysis" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Check Your Health
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="alerts" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Health Alerts</span>
                <span className="inline sm:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">AI Insights</span>
                <span className="inline sm:hidden">Insights</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Rewards</span>
                <span className="inline sm:hidden">Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="outbreaks" className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Outbreaks</span>
                <span className="inline sm:hidden">Map</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TabsContent value="alerts">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" /> Health Alerts & Warnings
                      </CardTitle>
                      <CardDescription>
                        Personalized AI-powered health alerts based on your data and local trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <HealthAlerts />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" /> Personalized Health Insights
                      </CardTitle>
                      <CardDescription>
                        AI-generated health recommendations tailored to your medical data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <HealthInsights />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rewards">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" /> Health Rewards Program
                      </CardTitle>
                      <CardDescription>
                        Earn points for healthy activities and redeem for exclusive benefits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RewardsSystem />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="outbreaks">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Map className="w-5 h-5" /> Disease Outbreaks Map
                      </CardTitle>
                      <CardDescription>
                        Real-time tracking of disease outbreaks in your area and nationwide
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DiseaseOutbreakMap />
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-medical-blue" /> Health Protection Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-6">
                      <div className="relative w-36 h-36">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle 
                            className="text-muted stroke-current" 
                            strokeWidth="10" 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none"
                            opacity="0.2"
                          />
                          <circle 
                            className="text-medical-blue stroke-current" 
                            strokeWidth="10" 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2.5 * Math.PI * 40 * 0.85} ${2.5 * Math.PI * 40 * 0.15}`}
                            strokeDashoffset={(2.5 * Math.PI * 40) * 0.25}
                          />
                          <text 
                            x="50" 
                            y="50" 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            className="text-2xl font-bold"
                            fill="currentColor"
                          >
                            85%
                          </text>
                        </svg>
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="font-medium">Your health is well protected</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on your preventive measures and health data
                      </p>
                      <Button size="sm" className="w-full" variant="outline">
                        <TrendingUp className="w-4 h-4 mr-2" /> View Improvement Tips
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-yellow-500" /> Priority Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-red-100/30 border border-red-200 dark:bg-red-900/20 dark:border-red-800/30">
                      <div className="font-medium text-red-600 dark:text-red-400 mb-1">Dengue Alert in Jaipur</div>
                      <p className="text-sm text-red-600/70 dark:text-red-400/70">
                        Cases rising in your area. Take preventive measures immediately.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-yellow-100/30 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30">
                      <div className="font-medium text-yellow-600 dark:text-yellow-400 mb-1">UV Index Warning</div>
                      <p className="text-sm text-yellow-600/70 dark:text-yellow-400/70">
                        High UV levels predicted today. Use sunscreen when outdoors.
                      </p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthDashboard;

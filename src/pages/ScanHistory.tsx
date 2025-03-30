
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ScanHistory = () => {
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
  
  const scans = [
    {
      id: 1,
      type: "Skin Analysis",
      date: "March 29, 2025",
      result: "Eczema",
      confidence: 87,
      status: "Analyzed",
      reviewed: true,
      images: 3
    },
    {
      id: 2,
      type: "Dental Scan",
      date: "March 29, 2025",
      result: "Early Cavity",
      confidence: 92,
      status: "Doctor Reviewed",
      reviewed: true,
      images: 2
    },
    {
      id: 3,
      type: "Skin Analysis",
      date: "March 29, 2025",
      result: "Contact Dermatitis",
      confidence: 83,
      status: "Analyzed",
      reviewed: false,
      images: 1
    },
    {
      id: 4,
      type: "Anemia Detection",
      date: "March 29, 2025",
      result: "Mild Iron Deficiency",
      confidence: 79,
      status: "Analyzed",
      reviewed: false,
      images: 2
    },
    {
      id: 5,
      type: "Skin Analysis",
      date: "March 29, 2025",
      result: "Psoriasis",
      confidence: 91,
      status: "Doctor Reviewed",
      reviewed: true,
      images: 4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Scan History</h1>
              <p className="text-muted-foreground">View and manage all your previous medical scan analyses</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0">
              <Link to="/scan-analysis" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                New Scan Analysis
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Medical Scans</CardTitle>
              <CardDescription>Showing all scan results from your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scans.map((scan) => (
                  <div 
                    key={scan.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-medical-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{scan.type}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{scan.date}</span>
                          <span className="px-1">•</span>
                          <span>{scan.images} {scan.images > 1 ? 'images' : 'image'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0">
                      <div className="md:text-right">
                        <div className="font-medium">{scan.result}</div>
                        <div className="text-sm text-medical-green">{scan.confidence}% confidence</div>
                      </div>
                      
                      <Badge variant={scan.reviewed ? "default" : "outline"} className="md:ml-2">
                        {scan.status}
                      </Badge>
                      
                      <Button variant="outline" size="sm" asChild className="md:ml-2">
                        <Link to={`/scan-analysis/${scan.id}`} className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanHistory;

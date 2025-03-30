
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Heart, Monitor, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 pt-28 pb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 max-w-2xl">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 px-3 py-1 text-sm">
              <span className="mr-1 rounded-full bg-medical-green w-2 h-2"></span>
              <span className="font-medium text-muted-foreground">AI-powered healthcare</span>
            </div>
          </div>
          
          <h1 className="h1 text-balance">
            AI-Powered Medical Scan Analysis & Doctor Consultation
          </h1>
          
          <p className="text-xl text-muted-foreground text-balance">
            Upload your medical scans, get instant AI analysis, and connect with specialist doctors all in one secure platform.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" asChild>
              <Link to="/scan-analysis" className="gap-2">
                <FileText className="h-5 w-5" />
                Upload Scan
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register" className="gap-2">
                Learn More
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-6 pt-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-medical-blue" />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-medical-green" />
              <span>Expert Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-medical-blue" />
              <span>Secure Storage</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-xl glass-card overflow-hidden relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-medical-green/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-medical-blue/30 rounded-full blur-3xl"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="AI Medical Analysis" 
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

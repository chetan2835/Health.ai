
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="glass-card relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-medical-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-medical-green/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 mb-6">Ready to Experience the Future of Healthcare?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Upload your first medical scan today and get instant AI analysis and expert doctor consultation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/register" className="gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/scan-analysis" className="gap-2">
                  <FileText className="w-5 h-5" />
                  Upload Scan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;

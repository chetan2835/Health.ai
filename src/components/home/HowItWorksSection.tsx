
import React from 'react';
import { FileText, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
  isLast?: boolean;
}

const StepCard = ({ icon, title, description, number, isLast = false }: StepCardProps) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-medical-blue/10 flex items-center justify-center z-10">
        {icon}
      </div>
      
      {!isLast && (
        <div className="absolute top-8 left-[calc(50%+8px)] w-[calc(100%-16px)] h-0.5 bg-medical-blue/20">
          <ArrowRight className="absolute top-[-8px] right-0 w-4 h-4 text-medical-blue" />
        </div>
      )}
      
      <div className="mt-6 text-center">
        <div className="inline-block px-2.5 py-0.5 mb-3 bg-medical-blue/10 text-medical-blue text-sm font-medium rounded-full">
          Step {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FileText className="w-6 h-6 text-medical-blue" />,
      title: "Upload Medical Scan",
      description: "Upload your X-ray, MRI, CT scan, or other medical images to our secure platform.",
      number: 1,
    },
    {
      icon: <Heart className="w-6 h-6 text-medical-blue" />,
      title: "Receive AI Analysis",
      description: "Our AI system analyzes your scan and provides instant predictions with confidence scores.",
      number: 2,
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-medical-blue" />,
      title: "Consult with Doctor",
      description: "Connect with a specialized doctor for expert review and personalized consultation.",
      number: 3,
    },
  ];

  return (
    <div className="bg-card/50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2 mb-6">How Health.AI Works</h2>
          <p className="text-xl text-muted-foreground">
            Our simple 3-step process makes healthcare accessible, efficient, and personalized for everyone.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mt-12">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={step.number}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

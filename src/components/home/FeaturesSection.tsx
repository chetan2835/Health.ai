
import React from 'react';
import { 
  FileText, 
  User, 
  MessageCircle, 
  Bell, 
  Shield, 
  Heart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green';
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-lg group">
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-lg mb-4",
        color === 'blue' ? "bg-medical-blue/10 text-medical-blue" : "bg-medical-green/10 text-medical-green"
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI-Powered Scan Analysis",
      description: "Upload medical scans and get instant AI-based predictions with detailed confidence scores.",
      color: 'blue' as const,
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Expert Doctor Matching",
      description: "Get matched with specialized doctors based on your scan results and medical history.",
      color: 'green' as const,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Secure Video Consultations",
      description: "Connect with doctors through secure video calls and messaging for remote consultations.",
      color: 'blue' as const,
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Health Alerts",
      description: "Receive personalized notifications for appointments, results, and health recommendations.",
      color: 'green' as const,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "HIPAA-Compliant Security",
      description: "Your data is protected with military-grade encryption and strict access controls.",
      color: 'blue' as const,
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Health Insights",
      description: "Get AI-generated health tips and prevention insights based on your unique profile.",
      color: 'green' as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="h2 mb-6">Comprehensive Healthcare Features</h2>
        <p className="text-xl text-muted-foreground">
          Our platform combines cutting-edge AI technology with medical expertise to provide you with the best healthcare experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;

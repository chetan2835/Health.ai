
import React from 'react';
import { Shield, Heart, Bell, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeatureItem = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card/50 rounded-xl border border-border/50 hover:shadow-md transition-all">
      <div className="w-12 h-12 rounded-full bg-medical-blue/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const AIFeaturesSection = () => {
  const features = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-medical-blue" />,
      title: "Disease Outbreak Alerts",
      description: "Real-time notifications about disease outbreaks in your area with personalized preventive measures."
    },
    {
      icon: <Heart className="w-6 h-6 text-medical-blue" />,
      title: "Preventive Insights",
      description: "AI monitors your health patterns over time and provides early warnings before conditions worsen."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-medical-blue" />,
      title: "Personalized Recommendations",
      description: "Tailored health, diet, and lifestyle suggestions based on your unique medical profile."
    },
    {
      icon: <Award className="w-6 h-6 text-medical-blue" />,
      title: "Health Rewards System",
      description: "Earn points for healthy activities and redeem them for discounts on consultations and products."
    },
    {
      icon: <Shield className="w-6 h-6 text-medical-blue" />,
      title: "Early Warning System",
      description: "AI detects subtle patterns in your health data and alerts you to potential issues early."
    },
    {
      icon: <Bell className="w-6 h-6 text-medical-blue" />,
      title: "Dynamic Consultation Pricing",
      description: "Get discounted doctor consultations by actively sharing health data with our platform."
    },
  ];

  return (
    <div className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Beyond Diagnosis: AI-Driven Preventive Healthcare
          </h2>
          <p className="text-xl text-muted-foreground">
            Health.AI is the only platform that combines diagnosis with proactive health monitoring
            and personalized preventive care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/health-dashboard">
              Experience AI-Driven Health Intelligence
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIFeaturesSection;

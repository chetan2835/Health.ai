
import React from 'react';
import { 
  FileText, 
  Image, 
  Camera, 
  Heart
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ScanTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  conditions: string[];
}

const ScanTypeCard = ({ title, description, icon, conditions }: ScanTypeCardProps) => {
  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="w-10 h-10 rounded-lg bg-medical-blue/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Detectable Conditions:</h4>
          <ul className="space-y-1 ml-5 list-disc text-muted-foreground text-sm">
            {conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const SupportedScansSection = () => {
  const scanTypes = [
    {
      title: "Skin Analysis",
      description: "Upload photos of skin conditions for AI analysis",
      icon: <Image className="w-5 h-5 text-medical-blue" />,
      conditions: [
        "Eczema",
        "Psoriasis",
        "Melanoma",
        "Fungal Infections"
      ],
    },
    {
      title: "Dental & Oral",
      description: "Analyze oral cavity and dental images",
      icon: <Camera className="w-5 h-5 text-medical-blue" />,
      conditions: [
        "Cavities",
        "Gingivitis",
        "Periodontal Disease",
        "Oral Lesions"
      ],
    },
    {
      title: "Anemia Detection",
      description: "Eye sclera and fingernail analysis for anemia",
      icon: <FileText className="w-5 h-5 text-medical-blue" />,
      conditions: [
        "Iron Deficiency",
        "Vitamin B12 Deficiency",
        "Chronic Anemia",
        "Hemolytic Anemia"
      ],
    },
    {
      title: "Additional Scans",
      description: "Coming soon: More supported scan types",
      icon: <Heart className="w-5 h-5 text-medical-blue" />,
      conditions: [
        "X-ray Analysis",
        "MRI Analysis",
        "CT Scan Analysis",
        "Ultrasound Analysis"
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="h2 mb-6">Supported Medical Scans</h2>
        <p className="text-xl text-muted-foreground">
          Health.AI can analyze various medical images to help detect potential issues early and connect you with specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scanTypes.map((scanType, index) => (
          <ScanTypeCard
            key={index}
            title={scanType.title}
            description={scanType.description}
            icon={scanType.icon}
            conditions={scanType.conditions}
          />
        ))}
      </div>
    </div>
  );
};

export default SupportedScansSection;

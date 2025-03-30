
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Bell, Shield, MapPin, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertData {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  type: 'outbreak' | 'personal' | 'preventive';
}

interface HealthAlertsProps {
  alerts?: AlertData[];
}

const HealthAlerts = ({ alerts = [] }: HealthAlertsProps) => {
  // If no alerts provided, use demo data
  const alertsToShow = alerts.length > 0 ? alerts : [
    {
      id: '1',
      title: 'Dengue Outbreak Alert',
      description: 'Rising dengue cases in your area. Use mosquito repellents, wear protective clothing, and avoid stagnant water areas.',
      location: 'Jaipur',
      severity: 'high' as const,
      date: '2023-09-15',
      type: 'outbreak' as const
    },
    {
      id: '2',
      title: 'Seasonal Flu Awareness',
      description: 'Flu season is approaching. Consider getting vaccinated and practice good hygiene to prevent infection.',
      location: 'National',
      severity: 'medium' as const,
      date: '2023-09-10',
      type: 'preventive' as const
    },
    {
      id: '3',
      title: 'Personal Health Reminder',
      description: 'Based on your recent skin scan, remember to apply the recommended treatment and recheck in 2 weeks.',
      location: 'Personal',
      severity: 'low' as const,
      date: '2023-09-05',
      type: 'personal' as const
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'outbreak':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'personal':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'preventive':
        return <Shield className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {alertsToShow.map((alert) => (
        <Alert key={alert.id} className="flex items-start">
          <div className="mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <AlertTitle className="text-base font-medium">{alert.title}</AlertTitle>
              <Badge className={getSeverityColor(alert.severity)} variant="outline">
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
              </Badge>
            </div>
            <AlertDescription className="text-sm text-muted-foreground mb-2">
              {alert.description}
            </AlertDescription>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {alert.location}
              </div>
              <div>{new Date(alert.date).toLocaleDateString()}</div>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default HealthAlerts;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface HealthInsightsProps {
  healthScore?: number;
  insights?: {
    id: string;
    title: string;
    description: string;
    improvement?: number;
    action?: string;
  }[];
}

const HealthInsights = ({ 
  healthScore = 78, 
  insights = [] 
}: HealthInsightsProps) => {
  // If no insights provided, use demo data
  const insightsToShow = insights.length > 0 ? insights : [
    {
      id: '1',
      title: 'Skin Hydration',
      description: 'Our AI detected signs of dehydration in your recent skin scan. Increasing water intake can improve your skin health.',
      improvement: 5,
      action: 'Drink 8 glasses of water daily'
    },
    {
      id: '2',
      title: 'UV Exposure Risk',
      description: 'Based on your location and skin type, you have a higher risk of UV damage. Using sunscreen daily is recommended.',
      improvement: -2,
      action: 'Apply SPF 50+ sunscreen daily'
    },
    {
      id: '3',
      title: 'Sleep Pattern',
      description: 'Your recent health data indicates irregular sleep patterns. Consistent sleep schedule improves overall health.',
      improvement: 0,
      action: 'Maintain regular sleep hours'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Heart className="mr-2 h-5 w-5 text-medical-green" /> Your Health Score
          </CardTitle>
          <CardDescription>
            AI-generated score based on your health data and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Needs Attention</span>
            <span className="text-sm text-muted-foreground">Excellent</span>
          </div>
          <div className="relative">
            <Progress value={healthScore} className="h-2.5" />
            <div 
              className="absolute top-0 h-2.5 bg-medical-green rounded-full" 
              style={{ width: '2px', left: `${healthScore}%`, transform: 'translateX(-50%)' }}
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-3xl font-bold">{healthScore}</span>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-medical-blue" /> Personalized Health Insights
          </CardTitle>
          <CardDescription>
            AI-powered recommendations based on your health data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insightsToShow.map((insight) => (
            <div key={insight.id} className="p-3 rounded-lg bg-accent/50">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{insight.title}</h4>
                {insight.improvement !== undefined && (
                  <div className={`flex items-center text-xs font-medium ${
                    insight.improvement > 0 ? 'text-green-500' : 
                    insight.improvement < 0 ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                    {insight.improvement > 0 ? (
                      <>+{insight.improvement}% <TrendingUp className="ml-1 h-3 w-3" /></>
                    ) : insight.improvement < 0 ? (
                      <>{insight.improvement}% <AlertCircle className="ml-1 h-3 w-3" /></>
                    ) : (
                      <>Unchanged <CheckCircle className="ml-1 h-3 w-3" /></>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {insight.description}
              </p>
              {insight.action && (
                <div className="mt-2 text-xs inline-flex items-center px-2.5 py-1 rounded-full bg-medical-blue/10 text-medical-blue">
                  <CheckCircle className="mr-1 h-3 w-3" /> {insight.action}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthInsights;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Gift, ArrowRight, Upload, Calendar, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RewardsSystemProps {
  points?: number;
  nextRewardAt?: number;
  activities?: {
    id: string;
    title: string;
    points: number;
    completed: boolean;
  }[];
  rewards?: {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    available: boolean;
  }[];
}

const RewardsSystem = ({
  points = 350,
  nextRewardAt = 500,
  activities = [],
  rewards = []
}: RewardsSystemProps) => {
  // If no activities provided, use demo data
  const activitiesToShow = activities.length > 0 ? activities : [
    {
      id: '1',
      title: 'Upload your first medical scan',
      points: 50,
      completed: true
    },
    {
      id: '2',
      title: 'Complete your health profile',
      points: 100,
      completed: true
    },
    {
      id: '3',
      title: 'Book your first consultation',
      points: 150,
      completed: true
    },
    {
      id: '4',
      title: 'Upload a follow-up scan',
      points: 75,
      completed: false
    },
    {
      id: '5',
      title: 'Share weekly health updates',
      points: 25,
      completed: false
    }
  ];

  // If no rewards provided, use demo data
  const rewardsToShow = rewards.length > 0 ? rewards : [
    {
      id: '1',
      title: '20% Off Doctor Consultation',
      description: 'Get 20% off on your next doctor consultation',
      pointsCost: 200,
      available: true
    },
    {
      id: '2',
      title: 'Free Health Checkup',
      description: 'Redeem a free basic health checkup at partner clinics',
      pointsCost: 500,
      available: false
    },
    {
      id: '3',
      title: 'Premium Health Report',
      description: 'Access an advanced AI-powered health report',
      pointsCost: 350,
      available: true
    }
  ];

  // Calculate progress percentage to next reward level
  const progressPercentage = (points / nextRewardAt) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-500" /> Health Rewards
          </CardTitle>
          <CardDescription>
            Earn points by taking care of your health and redeem exclusive benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-2xl font-bold flex items-center">
                {points} <Award className="ml-1 h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-sm text-muted-foreground">
                Next reward at {nextRewardAt} points
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Activity className="mr-2 h-4 w-4" /> Earn More Points
              </h4>
              <div className="space-y-2">
                {activitiesToShow.filter(a => !a.completed).slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center p-2 rounded bg-accent/50">
                    <span className="text-sm">{activity.title}</span>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <span>+{activity.points}</span>
                      <Award className="h-3 w-3 text-yellow-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Gift className="mr-2 h-4 w-4" /> Available Rewards
              </h4>
              <div className="space-y-3">
                {rewardsToShow.filter(r => r.available).map((reward) => (
                  <div key={reward.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{reward.title}</h5>
                        <p className="text-xs text-muted-foreground">{reward.description}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={points < reward.pointsCost}
                        className={points >= reward.pointsCost ? "" : "opacity-70"}
                      >
                        <span>{reward.pointsCost}</span>
                        <Award className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsSystem;

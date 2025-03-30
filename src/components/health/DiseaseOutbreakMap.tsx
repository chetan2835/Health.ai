
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Info, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DiseaseOutbreak {
  id: string;
  disease: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  affectedCount: number;
  lastUpdated: string;
  preventiveMeasures: string[];
}

interface DiseaseOutbreakMapProps {
  outbreaks?: DiseaseOutbreak[];
  userLocation?: string;
}

const DiseaseOutbreakMap = ({ 
  outbreaks = [],
  userLocation = "Jaipur" 
}: DiseaseOutbreakMapProps) => {
  const { toast } = useToast();
  const [searchLocation, setSearchLocation] = React.useState(userLocation);

  // If no outbreaks provided, use demo data
  const outbreaksToShow = outbreaks.length > 0 ? outbreaks : [
    {
      id: '1',
      disease: 'Dengue Fever',
      location: 'Jaipur',
      severity: 'high' as const,
      affectedCount: 124,
      lastUpdated: '2023-09-15',
      preventiveMeasures: [
        'Use mosquito repellents',
        'Wear long-sleeved clothes',
        'Eliminate stagnant water sources',
        'Use bed nets while sleeping'
      ]
    },
    {
      id: '2',
      disease: 'Seasonal Flu',
      location: 'Delhi',
      severity: 'medium' as const,
      affectedCount: 312,
      lastUpdated: '2023-09-12',
      preventiveMeasures: [
        'Get vaccinated',
        'Wash hands frequently',
        'Avoid close contact with sick people',
        'Cover your mouth when coughing'
      ]
    },
    {
      id: '3',
      disease: 'COVID-19',
      location: 'Mumbai',
      severity: 'medium' as const,
      affectedCount: 89,
      lastUpdated: '2023-09-10',
      preventiveMeasures: [
        'Wear masks in crowded places',
        'Maintain social distancing',
        'Get vaccinated and boosted',
        'Practice good hand hygiene'
      ]
    }
  ];

  const handleSearch = () => {
    toast({
      title: "Location Updated",
      description: `Disease alerts now showing for ${searchLocation}`,
    });
  };

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

  // Filter outbreaks to show only those in user location or nearby
  const localOutbreaks = outbreaksToShow.filter(o => 
    o.location.toLowerCase() === userLocation.toLowerCase()
  );
  
  const otherOutbreaks = outbreaksToShow.filter(o => 
    o.location.toLowerCase() !== userLocation.toLowerCase()
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-red-500" /> Disease Outbreak Tracker
        </CardTitle>
        <CardDescription>
          Real-time disease outbreak monitoring and alerts in your area
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter your location"
              className="pl-9"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch}>Update</Button>
        </div>

        {localOutbreaks.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-medical-blue" /> 
              <h4 className="font-medium">Outbreaks in {userLocation}</h4>
            </div>
            
            {localOutbreaks.map((outbreak) => (
              <div key={outbreak.id} className="border rounded-lg overflow-hidden">
                <div className="p-3 bg-accent/50 flex justify-between items-center">
                  <div className="font-medium flex items-center gap-1">
                    {outbreak.disease}
                    <Badge className={getSeverityColor(outbreak.severity)} variant="outline">
                      {outbreak.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Updated: {new Date(outbreak.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="text-sm mb-2">
                    <span className="font-medium">{outbreak.affectedCount}</span> cases reported
                  </div>
                  
                  <div className="mb-2">
                    <h5 className="text-sm font-medium flex items-center gap-1 mb-1">
                      <Info className="h-3 w-3" /> Preventive Measures
                    </h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {outbreak.preventiveMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block min-w-[6px] h-[6px] rounded-full bg-medical-blue mr-2 mt-1.5"></span>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-accent/30 rounded-lg">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium">No outbreaks in your area</h3>
            <p className="text-muted-foreground mt-1">
              No disease outbreaks have been reported in {userLocation}
            </p>
          </div>
        )}

        {otherOutbreaks.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Other Regions with Outbreaks</h4>
            <div className="space-y-2">
              {otherOutbreaks.map((outbreak) => (
                <div key={outbreak.id} className="flex justify-between items-center p-2 rounded bg-accent/30">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{outbreak.location}:</span>
                    <span className="font-medium ml-1">{outbreak.disease}</span>
                  </div>
                  <Badge className={getSeverityColor(outbreak.severity)} variant="outline">
                    {outbreak.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiseaseOutbreakMap;

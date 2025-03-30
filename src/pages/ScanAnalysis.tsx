
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Image, Camera, Heart, Upload, Info, Check, X, User, ImagePlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const ScanAnalysis = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanType, setScanType] = useState('skin');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [description, setDescription] = useState('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleScanTypeChange = (value: string) => {
    setScanType(value);
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setDescription('');
    setAdditionalImages([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid image file (JPEG, PNG, or GIF).",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setAnalysisResult(null);
    }
  };

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...additionalImages];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (!validTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: "Please upload valid image files (JPEG, PNG, or GIF).",
            variant: "destructive",
          });
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Some images are larger than 10MB and were skipped.",
            variant: "destructive",
          });
          continue;
        }

        const fileUrl = URL.createObjectURL(file);
        newImages.push(fileUrl);
      }
      
      setAdditionalImages(newImages);
      
      if (newImages.length > additionalImages.length) {
        toast({
          title: "Images added",
          description: `${newImages.length - additionalImages.length} new images added successfully.`,
        });
      }
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);
    
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    setTimeout(() => {
      clearInterval(interval);
      setAnalysisProgress(100);
      
      let result;
      if (scanType === 'skin') {
        result = {
          prediction: 'Eczema',
          confidence: 87,
          description: 'Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.',
          userDescription: description,
          recommendations: [
            'Moisturize your skin at least twice a day',
            'Avoid harsh soaps and detergents',
            'Consider using over-the-counter hydrocortisone cream',
          ],
          doctorMatch: {
            name: 'Dr. Sarah Johnson',
            specialization: 'Dermatologist',
            rating: 4.9,
          },
        };
      } else if (scanType === 'dental') {
        result = {
          prediction: 'Early Cavity',
          confidence: 92,
          description: 'Early cavity formation detected on molar teeth. Early intervention can prevent further decay.',
          userDescription: description,
          recommendations: [
            'Schedule a dental appointment for treatment',
            'Improve brushing technique, especially for molars',
            'Consider using fluoride mouthwash',
          ],
          doctorMatch: {
            name: 'Dr. James Wilson',
            specialization: 'Dentist',
            rating: 4.8,
          },
        };
      } else {
        result = {
          prediction: 'Mild Iron Deficiency',
          confidence: 79,
          description: 'Analysis shows signs consistent with mild iron deficiency anemia based on pallor in the sclera.',
          userDescription: description,
          recommendations: [
            'Consider iron-rich foods in your diet',
            'Consult with a doctor for blood tests',
            'Avoid tea/coffee with meals as they can reduce iron absorption',
          ],
          doctorMatch: {
            name: 'Dr. Emily Chen',
            specialization: 'Hematologist',
            rating: 4.7,
          },
        };
      }
      
      setAnalysisResult(result);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `AI prediction: ${result.prediction} with ${result.confidence}% confidence`,
      });
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setDescription('');
    setAdditionalImages([]);
  };

  const ScanTypeIcon = () => {
    switch (scanType) {
      case 'skin':
        return <Image className="w-5 h-5" />;
      case 'dental':
        return <Camera className="w-5 h-5" />;
      case 'anemia':
        return <Heart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const scanTypeLabels = {
    skin: 'Skin Analysis',
    dental: 'Dental & Oral',
    anemia: 'Anemia Detection',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto py-8 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AI-Powered Medical Scan Analysis</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your medical scan for instant AI analysis. Get predictions, confidence scores, and connect with specialists.
            </p>
          </div>
          
          <Tabs defaultValue="skin" value={scanType} onValueChange={handleScanTypeChange} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="skin" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Skin Analysis</span>
                <span className="inline sm:hidden">Skin</span>
              </TabsTrigger>
              <TabsTrigger value="dental" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Dental & Oral</span>
                <span className="inline sm:hidden">Dental</span>
              </TabsTrigger>
              <TabsTrigger value="anemia" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Anemia Detection</span>
                <span className="inline sm:hidden">Anemia</span>
              </TabsTrigger>
            </TabsList>
            
            {['skin', 'dental', 'anemia'].map((type) => (
              <TabsContent key={type} value={type} className="focus:outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ScanTypeIcon />
                        {scanTypeLabels[type as keyof typeof scanTypeLabels]} Upload
                      </CardTitle>
                      <CardDescription>
                        Upload a clear image for the most accurate analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!selectedFile ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                          <input
                            type="file"
                            id="scan-upload"
                            className="hidden"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleFileChange}
                          />
                          <label
                            htmlFor="scan-upload"
                            className="flex flex-col items-center justify-center cursor-pointer"
                          >
                            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                            <p className="font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              JPEG, PNG or GIF (max 5MB)
                            </p>
                            <Button type="button" size="sm">
                              Select File
                            </Button>
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="relative rounded-lg overflow-hidden border border-border">
                            <img
                              src={previewUrl || ''}
                              alt="Scan preview"
                              className="w-full h-64 object-contain"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                              onClick={handleReset}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                              Provide details about your symptoms
                            </label>
                            <Textarea
                              id="description"
                              placeholder="Describe your symptoms, how long you've had them, any treatments tried, etc."
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">
                                Add additional images (optional)
                              </label>
                              <input
                                type="file"
                                id="additional-images"
                                className="hidden"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={handleAdditionalImageUpload}
                                multiple
                              />
                              <label
                                htmlFor="additional-images"
                                className="cursor-pointer"
                              >
                                <Button type="button" variant="outline" size="sm">
                                  <ImagePlus className="w-4 h-4 mr-2" />
                                  Add Images
                                </Button>
                              </label>
                            </div>
                            
                            {additionalImages.length > 0 && (
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                {additionalImages.map((img, index) => (
                                  <div key={index} className="relative rounded border border-border overflow-hidden">
                                    <img 
                                      src={img} 
                                      alt={`Additional image ${index + 1}`} 
                                      className="w-full h-20 object-cover"
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="absolute top-1 right-1 h-5 w-5 bg-background/80 hover:bg-background"
                                      onClick={() => removeAdditionalImage(index)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {!analyzing && !analysisResult && (
                            <Button onClick={handleAnalyze} className="w-full">
                              <FileText className="w-4 h-4 mr-2" />
                              Analyze {scanTypeLabels[type as keyof typeof scanTypeLabels]}
                            </Button>
                          )}
                          {analyzing && (
                            <div className="space-y-2">
                              <Progress value={analysisProgress} />
                              <p className="text-sm text-center text-muted-foreground">
                                Analyzing... {analysisProgress}%
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="rounded-lg bg-accent p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Tips for best results:</p>
                          {type === 'skin' && (
                            <ul className="list-disc list-inside space-y-1">
                              <li>Ensure good lighting without shadows</li>
                              <li>Capture the affected area clearly</li>
                              <li>Include some surrounding healthy skin for comparison</li>
                            </ul>
                          )}
                          {type === 'dental' && (
                            <ul className="list-disc list-inside space-y-1">
                              <li>Use flash in a well-lit environment</li>
                              <li>Keep mouth open wide for clear visibility</li>
                              <li>Focus on the specific area of concern</li>
                            </ul>
                          )}
                          {type === 'anemia' && (
                            <ul className="list-disc list-inside space-y-1">
                              <li>For eye sclera: take in natural lighting</li>
                              <li>For fingernails: capture in focus with good lighting</li>
                              <li>Avoid filters or image enhancements</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Analysis Results
                      </CardTitle>
                      <CardDescription>
                        AI-powered analysis with confidence scores
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedFile ? (
                        <div className="text-center py-12 px-4">
                          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">No scan uploaded yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Upload a {scanTypeLabels[type as keyof typeof scanTypeLabels].toLowerCase()} image to get AI analysis and predictions.
                          </p>
                        </div>
                      ) : analyzing ? (
                        <div className="text-center py-12 px-4">
                          <div className="w-12 h-12 rounded-full border-4 border-t-medical-blue border-medical-blue/30 animate-spin mx-auto mb-4"></div>
                          <h3 className="text-lg font-medium mb-2">Analyzing your scan</h3>
                          <p className="text-muted-foreground">
                            Our AI is processing your image. This usually takes less than a minute.
                          </p>
                        </div>
                      ) : analysisResult ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{analysisResult.prediction}</h3>
                              <p className="text-sm text-muted-foreground">AI Prediction</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-semibold text-medical-green">{analysisResult.confidence}%</div>
                              <p className="text-sm text-muted-foreground">Confidence Score</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Description</h4>
                            <p className="text-muted-foreground text-sm">
                              {analysisResult.description}
                            </p>
                          </div>

                          {analysisResult.userDescription && (
                            <div className="space-y-2">
                              <h4 className="font-medium">Patient Description</h4>
                              <p className="text-muted-foreground text-sm">
                                {analysisResult.userDescription}
                              </p>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Recommendations</h4>
                            <ul className="space-y-1">
                              {analysisResult.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <Check className="w-4 h-4 text-medical-green mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="border-t border-border pt-4 mt-4">
                            <h4 className="font-medium mb-2">Matched Specialist</h4>
                            <div className="flex items-center justify-between bg-accent/50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-medical-blue/10 flex items-center justify-center">
                                  <User className="w-5 h-5 text-medical-blue" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{analysisResult.doctorMatch.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {analysisResult.doctorMatch.specialization}
                                    <span className="mx-1">•</span>
                                    <span className="flex items-center inline-flex">
                                      {analysisResult.doctorMatch.rating}
                                      <Heart className="w-3 h-3 text-medical-green fill-medical-green ml-0.5" />
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" asChild>
                                <Link to="/consultation">Consult</Link>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button variant="outline" onClick={handleReset} className="flex-1">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload New Scan
                            </Button>
                            <Button asChild className="flex-1">
                              <Link to="/dashboard">
                                Save Results
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 px-4">
                          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">Ready for analysis</h3>
                          <p className="text-muted-foreground mb-4">
                            Click the analyze button to process your uploaded scan.
                          </p>
                          <Button onClick={handleAnalyze} className="mx-auto">
                            <FileText className="w-4 h-4 mr-2" />
                            Analyze {scanTypeLabels[type as keyof typeof scanTypeLabels]}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanAnalysis;

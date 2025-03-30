
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Lock } from 'lucide-react';

interface UserAuthFormProps {
  type: 'login' | 'register';
}

const UserAuthForm = ({ type }: UserAuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('patient');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === 'login') {
        toast({
          title: "Success!",
          description: "You've been logged in successfully.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Account created!",
          description: "We've created your account successfully.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card w-full max-w-md mx-auto">
      <div className="p-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">
          {type === 'login' ? 'Sign in to your account' : 'Create an account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  type="text" 
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="email" 
                placeholder="name@example.com" 
                type="email" 
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                placeholder="••••••••" 
                type="password" 
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          {type === 'register' && (
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="patient" value={userType} onValueChange={setUserType} className="flex space-x-4" disabled={isLoading}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient" className="cursor-pointer">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor" className="cursor-pointer">Doctor</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {type === 'login' ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              <>{type === 'login' ? 'Sign in' : 'Create account'}</>
            )}
          </Button>
          
          <div className="text-center text-sm">
            {type === 'login' ? (
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-medical-blue hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-medical-blue hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAuthForm;

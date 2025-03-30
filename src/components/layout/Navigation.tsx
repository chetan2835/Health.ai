
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '../common/Logo';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  LogIn,
  Monitor,
  FileText,
  Heart,
  Phone,
  Info,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation = ({ darkMode, toggleDarkMode }: NavigationProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <Monitor className="w-4 h-4" /> },
    { name: 'Health Dashboard', href: '/health-dashboard', icon: <Heart className="w-4 h-4" /> },
    { name: 'Scan Analysis', href: '/scan-analysis', icon: <FileText className="w-4 h-4" /> },
    { name: 'Doctor Consultation', href: '/consultation', icon: <Shield className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Phone className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {userType === 'doctor' ? 'Dr. Smith' : 'John Doe'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {userType === 'doctor' ? 'Doctor Account' : 'Patient Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-1.5">
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                
                <Button size="sm" asChild>
                  <Link to="/register" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in border-t border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            <div className="flex flex-col space-y-2 pt-2 mt-2 border-t border-border/50">
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-foreground/80">
                    {userType === 'doctor' ? 'Dr. Smith' : 'John Doe'} ({userType})
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/profile" className="flex items-center justify-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login" className="flex items-center justify-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      Log in
                    </Link>
                  </Button>
                  
                  <Button asChild>
                    <Link to="/register" className="flex items-center justify-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

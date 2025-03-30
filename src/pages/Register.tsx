
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import UserAuthForm from '@/components/auth/UserAuthForm';
import Logo from '@/components/common/Logo';

const Register = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <Logo size="lg" />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">
              Sign up to get started with Health.AI
            </p>
          </div>
          
          <UserAuthForm type="register" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;

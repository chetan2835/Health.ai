
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Heart className={cn('text-medical-blue animate-pulse-slight', 
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-6 h-6',
        size === 'lg' && 'w-8 h-8'
      )} fill="#E5F3FB" strokeWidth={2.5} />
      <span className={cn('font-bold tracking-tight', sizeClasses[size])}>
        Health<span className="text-medical-blue">.AI</span>
      </span>
    </div>
  );
};

export default Logo;

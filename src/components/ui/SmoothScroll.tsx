
import React, { useEffect, FC, ReactNode } from 'react';
import { handleRevealAnimations } from '@/lib/animation';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Initial check for elements in viewport
    handleRevealAnimations();
    
    // Add scroll event listener
    const handleScroll = () => {
      handleRevealAnimations();
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return <>{children}</>;
};

export default SmoothScroll;

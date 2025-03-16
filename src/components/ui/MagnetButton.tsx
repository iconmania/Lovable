
import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagnetButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  radius?: number;
}

const MagnetButton: React.FC<MagnetButtonProps> = ({
  children,
  className = '',
  strength = 30,
  onClick,
  radius = 150,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current || !isMounted || !isHovered) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Only apply magnet effect when cursor is within radius
    if (distance < radius) {
      // Calculate strength based on distance (stronger when closer)
      const magnetStrength = strength * (1 - distance / radius);
      
      setPosition({
        x: distanceX * magnetStrength / 25,
        y: distanceY * magnetStrength / 25,
      });
    } else {
      // Reset position if cursor moves outside radius
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset position when mouse leaves
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isMounted) {
      window.addEventListener('mousemove', handleMouseMove);
      
      // Make sure to clean up event listeners
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isMounted, isHovered, radius, strength]);

  return (
    <button
      ref={buttonRef}
      className={cn("magnet-button", className)}
      style={{
        transform: isHovered ? `translate(${position.x}px, ${position.y}px)` : 'translate(0px, 0px)',
        transition: isHovered ? 'transform 0.2s ease-out' : 'transform 0.3s ease-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MagnetButton;

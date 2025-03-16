
import { useEffect, useState, FC, ReactNode } from 'react';

interface FollowCursorProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const FollowCursor: FC<FollowCursorProps> = ({ 
  children,
  speed = 0.05, 
  className = '' 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  useEffect(() => {
    const updatePosition = () => {
      setPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * speed,
        y: prev.y + (mousePosition.y - prev.y) * speed
      }));
      requestAnimationFrame(updatePosition);
    };
    
    const animationId = requestAnimationFrame(updatePosition);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, speed]);
  
  return (
    <div className="relative">
      {children}
      <div 
        className={`fixed pointer-events-none z-50 w-8 h-8 flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div className="w-3 h-3 bg-primary rounded-full"></div>
        <div className="absolute w-6 h-6 rounded-full border border-primary/30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default FollowCursor;

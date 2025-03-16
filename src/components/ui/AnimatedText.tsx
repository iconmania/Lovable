
import React, { useEffect, useRef, FC } from 'react';
import { splitTextIntoChars } from '@/lib/animation';

interface AnimatedTextProps {
  text: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  delay?: number;
  once?: boolean;
}

const AnimatedText: FC<AnimatedTextProps> = ({
  text,
  element = 'span',
  className = '',
  delay = 0,
  once = false,
}) => {
  const textRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const targetElement = textRef.current;
    
    if (!targetElement) return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const html = splitTextIntoChars(text);
          targetElement.innerHTML = html;
          
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          targetElement.innerHTML = text;
        }
      });
    };
    
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
    });
    
    observerRef.current.observe(targetElement);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [text, once]);
  
  const props = {
    ref: textRef,
    className,
    style: { animationDelay: `${delay}ms` }
  };
  
  return React.createElement(element, props, text);
};

export default AnimatedText;

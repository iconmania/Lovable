
/**
 * Animation utilities for the application
 */

// Reveals elements on scroll
export const revealOnScroll = () => {
  const revealElements = document.querySelectorAll('.reveal-animation');
  
  const reveal = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('revealed');
      } else {
        element.classList.remove('revealed');
      }
    });
  };
  
  window.addEventListener('scroll', reveal);
  // Initial check
  reveal();
  
  // Cleanup
  return () => window.removeEventListener('scroll', reveal);
};

// Handle reveal animations
export const handleRevealAnimations = () => {
  const revealElements = document.querySelectorAll('.reveal-animation');
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach(element => {
    const revealTop = (element as HTMLElement).getBoundingClientRect().top;
    
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('revealed');
    } else {
      element.classList.remove('revealed');
    }
  });
};

// Split text into individual characters with animation delays
export const splitTextIntoChars = (text: string): string => {
  return text
    .split('')
    .map((char, index) => {
      if (char === ' ') {
        return ' ';
      }
      return `<span class="inline-block animate-text-reveal-char" style="animation-delay: ${index * 40}ms">${char}</span>`;
    })
    .join('');
};

// Parallax effect for elements
export const parallaxEffect = (event: MouseEvent) => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-speed') || '0.1');
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;
    
    (element as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
};

// Initialize all animations
export const initAnimations = () => {
  const cleanupReveal = revealOnScroll();
  
  const handleMouseMove = (e: MouseEvent) => {
    parallaxEffect(e);
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Cleanup function
  return () => {
    cleanupReveal();
    window.removeEventListener('mousemove', handleMouseMove);
  };
};


import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagnetButton from '@/components/ui/MagnetButton';

const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  
  // Smoother animation with spring
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Handle mouse movement for glow effect
  useEffect(() => {
    if (!containerRef.current || !glowRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      
      const x = clientX - left;
      const y = clientY - top;
      
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary), 0.15) 0%, transparent 60%)`;
      }
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split text for animation
  const readyText = "Ready to elevate your digital presence?";
  const readyWords = readyText.split(' ');

  // Main headline words for staggered animation
  const mainWords = ["Let's", "Create", "Together"];

  return (
    <section 
      ref={containerRef} 
      className="py-32 relative overflow-hidden bg-primary/5"
    >
      {/* Glow effect that follows cursor */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0"></div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <motion.div 
        className="max-w-screen-xl mx-auto px-6 relative z-10 min-h-[70vh] flex flex-col items-center justify-center"
        style={{ opacity, y: smoothY }}
        ref={ref}
      >
        <motion.div
          style={{ scale: smoothScale }}
          className="text-center"
        >
          <div className="overflow-hidden mb-6">
            <div className="flex flex-wrap justify-center gap-x-4 mb-6">
              {readyWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 * i,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            {mainWords.map((word, index) => (
              <motion.div 
                key={index} 
                className="inline-block mx-4 perspective"
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5 + index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span 
                  className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight inline-block hover:text-primary transition-colors duration-300 relative group ${index === 2 ? 'text-primary' : ''}`}
                >
                  {word}
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary transform-gpu origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 + index * 0.2 }}
                    viewport={{ once: false }}
                  />
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Start your journey with us and transform your brand experience across digital platforms.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="group"
          >
            <MagnetButton strength={40}>
              <Button 
                size="lg" 
                className="text-base px-10 py-8 rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] group relative overflow-hidden bg-primary"
              >
                <span className="relative z-10 flex items-center">
                  Schedule a Consultation
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-2" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform-gpu origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </Button>
            </MagnetButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;

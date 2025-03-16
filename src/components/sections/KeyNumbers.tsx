
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 350, label: 'Projects Completed', prefix: '' },
  { value: 120, label: 'Happy Clients', prefix: '' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
  { value: 42, label: 'Design Awards', prefix: '' }
];

const KeyNumbers: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  
  useEffect(() => {
    if (!inView) return;
    
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          if (newCounts[index] < stat.value) {
            const increment = Math.max(1, Math.floor(stat.value / 40));
            newCounts[index] = Math.min(
              newCounts[index] + increment,
              stat.value
            );
          }
          return newCounts;
        });
      }, 30);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [inView]);
  
  return (
    <section 
      id="key-numbers" 
      className="py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      <motion.div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
        style={{ y: backgroundY }}
      />
      
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20" ref={ref}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl font-display font-bold mb-6 tracking-tight"
          >
            <span className="text-primary">Numbers</span> That Speak
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Quantifying our success through measurable achievements and client satisfaction
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.3 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group"
            >
              <div className="h-full z-10 relative">
                <div className="overflow-hidden mb-4">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.3 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <div className="text-7xl md:text-8xl font-display font-bold tracking-tight flex items-baseline">
                      <span className="text-2xl mr-1">{stat.prefix}</span>
                      <span className="tabular-nums">{counts[index].toLocaleString()}</span>
                      <span className="text-2xl ml-1">{stat.suffix}</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.4 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <span className="text-xl md:text-2xl text-muted-foreground font-medium block">
                      {stat.label}
                    </span>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="h-px w-full bg-primary/30 mt-6 origin-left"
                />
              </div>
              
              <div className="absolute inset-0 border border-primary/0 rounded-xl transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/5 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyNumbers;

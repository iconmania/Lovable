
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import MagnetButton from '@/components/ui/MagnetButton';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  
  return (
    <section id="about" className="py-32 relative" ref={containerRef}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="mb-24 text-center" ref={titleRef}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg uppercase tracking-widest font-medium mb-4 block text-primary"
          >
            About Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl font-display font-bold mb-6 tracking-tight"
          >
            Driven by <span className="text-primary">Design</span> &<br/>Fueled by <span className="text-primary">Creativity</span>
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" ref={contentRef}>
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto md:mx-0"
            >
              <motion.div 
                className="w-full aspect-[4/5] overflow-hidden"
                style={{ y: y1 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our creative team" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="absolute -bottom-10 left-0 md:-left-10 w-3/4 p-6 backdrop-blur-xl bg-background/60 border border-primary/20 shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">To transform ideas into impactful digital experiences that elevate brands and connect with audiences.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:pt-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-8">A team of visionaries with a passion for excellence</h3>
              
              <div className="space-y-6 text-lg">
                <p className="text-muted-foreground">
                  Founded in 2015, TopDesignr has evolved into a powerhouse of creativity and innovation. Our team combines strategic thinking with cutting-edge design to craft digital experiences that resonate with audiences and achieve business objectives.
                </p>
                <p className="text-muted-foreground">
                  We believe in a collaborative approach, working closely with our clients to understand their unique challenges and opportunities. This partnership allows us to deliver solutions that are not only visually stunning but also effective and aligned with brand goals.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {['Strategy', 'Design', 'Development', 'Marketing'].map((skill, index) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={contentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (index * 0.1),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={contentInView ? { scale: 1 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.5 + (index * 0.1),
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="w-2 h-2 rounded-full bg-primary"
                        />
                      </div>
                      <h4 className="text-xl font-semibold ml-4">{skill}</h4>
                    </div>
                    <div className="ml-16">
                      <div className="h-0.5 bg-primary/10 w-full relative overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={contentInView ? { x: "0%" } : {}}
                          transition={{ 
                            duration: 1, 
                            delay: 0.6 + (index * 0.2),
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="absolute inset-0 bg-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="mt-12"
              >
                <MagnetButton strength={30}>
                  <Button 
                    variant="outline" 
                    className="inline-flex items-center px-6 py-3 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                  >
                    <span className="text-lg font-medium mr-2">Learn more about our approach</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                  </Button>
                </MagnetButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

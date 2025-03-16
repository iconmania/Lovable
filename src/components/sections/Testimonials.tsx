
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "TopDesignr transformed our brand identity and digital presence. Their approach is innovative yet strategic, resulting in a website that not only looks stunning but also delivers concrete business results.",
    author: "Alexandra Chen",
    position: "CEO",
    company: "Nova Innovations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: 2,
    content: "Working with TopDesignr has been a game-changer for our marketing efforts. Their team's attention to detail and ability to translate our vision into reality exceeded our expectations.",
    author: "Marcus Johnson",
    position: "Marketing Director",
    company: "Pulse Media",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: 3,
    content: "The redesign of our e-commerce platform by TopDesignr led to a 40% increase in conversion rates. Their understanding of user experience and aesthetic sensibilities is unmatched in the industry.",
    author: "Sophia Rodriguez",
    position: "Product Lead",
    company: "Ember Tech",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1022&auto=format&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.4, 1, 1, 0.4]);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section 
      id="testimonials" 
      className="py-32 relative overflow-hidden"
      ref={containerRef}
    >
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-background/5"
        style={{ opacity, y: y1 }}
      />
      
      <div className="max-w-screen-xl mx-auto px-6 md:px-8" ref={ref}>
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg uppercase tracking-widest font-medium mb-4 block text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl font-display font-bold mb-6 tracking-tight"
          >
            Client <span className="text-primary">Voices</span>
          </motion.h2>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="absolute -left-20 top-0 bottom-0 text-[20rem] font-display font-bold text-primary/5 -z-10 leading-none">
            "
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative">
                <div className="mb-10">
                  <Quote size={60} className="text-primary/20" />
                </div>
                
                <div className="space-y-10">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight">
                    {testimonials[currentIndex].content}
                  </h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="text-xl font-bold">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button 
                onClick={prevTestimonial}
                className="group flex items-center gap-2 text-lg font-medium"
                aria-label="Previous testimonial"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/20 group-hover:bg-primary/5 transition-colors">
                  <ChevronLeft size={20} />
                </div>
                <span className="group-hover:text-primary transition-colors">Previous</span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button 
                onClick={nextTestimonial}
                className="group flex items-center gap-2 text-lg font-medium"
                aria-label="Next testimonial"
              >
                <span className="group-hover:text-primary transition-colors">Next</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/20 group-hover:bg-primary/5 transition-colors">
                  <ChevronRight size={20} />
                </div>
              </button>
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-16 h-1 transition-all duration-300",
                  index === currentIndex 
                    ? "bg-primary" 
                    : "bg-primary/20 hover:bg-primary/30"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { projects } from '@/data/portfolioData';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  width: string;
  height: string;
  align: 'left' | 'center' | 'right';
  margin: string;
  mobileHeight?: string;
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  return (
    <section id="work" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-8">
        <div className="text-center mb-20" ref={ref}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg uppercase tracking-widest font-medium mb-4 block text-primary"
          >
            Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight"
          >
            Selected <span className="text-primary">Work</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A curated collection of our most impactful projects across various industries
          </motion.p>
        </div>
        
        <div className="space-y-40 md:space-y-40">
          {projects.map((project, i) => {
            const [projectRef, projectInView] = useInView({
              triggerOnce: false,
              threshold: 0.1,
            });
            
            return (
              <ProjectItem 
                key={project.id} 
                project={project} 
                index={i}
                inView={projectInView}
                ref={projectRef}
                isMobile={isMobile}
              />
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-32"
        >
          <a href="#" className="inline-flex items-center text-lg font-medium hover:text-primary transition-colors group">
            <span className="border-b border-current pb-1 transition-all group-hover:pb-2">View All Projects</span>
            <ArrowUpRight size={20} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectItem = React.forwardRef<HTMLDivElement, {
  project: Project;
  index: number;
  inView: boolean;
  isMobile: boolean;
}>(({ project, index, inView, isMobile }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div 
      ref={(el) => {
        // @ts-ignore - forwardRef + useRef type issues
        ref(el);
        if (containerRef.current !== el) {
          containerRef.current = el as HTMLDivElement;
        }
      }}
      className={cn(
        "group relative",
        isMobile ? "mx-auto w-full" : project.margin
      )}
      style={{
        width: isMobile ? "100%" : project.width
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden"
      >
        <motion.div 
          style={{ y }}
          className="w-full h-full"
        >
          <div 
            className="w-full overflow-hidden" 
            style={{ 
              height: isMobile ? project.mobileHeight : project.height 
            }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.div>
      
      <div className={cn(
        "mt-6 flex items-center gap-4",
        isMobile ? "justify-center" : 
          project.align === 'left' ? "justify-start" : 
          project.align === 'right' ? "justify-end" : 
          "justify-center"
      )}>
        <motion.div 
          initial={{ width: 0 }}
          animate={inView ? { width: '3rem' } : {}}
          transition={{ 
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-px bg-primary"
        />
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="uppercase tracking-wider text-sm font-medium text-primary"
        >
          {project.category}
        </motion.span>
      </div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6,
          delay: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "text-3xl md:text-5xl font-display font-bold mt-2",
          isMobile ? "text-center" : 
            project.align === 'left' ? "text-left" : 
            project.align === 'right' ? "text-right" : 
            "text-center"
        )}
      >
        {project.title}
      </motion.h3>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6,
          delay: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "mt-4",
          isMobile ? "text-center" : 
            project.align === 'left' ? "text-left" : 
            project.align === 'right' ? "text-right" : 
            "text-center"
        )}
      >
        <Link to={`/portfolio/${project.id}`} className="inline-flex items-center font-medium hover:text-primary transition-colors group/link">
          <span>View Project</span>
          <ArrowUpRight size={18} className="ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </Link>
      </motion.div>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

export default Portfolio;

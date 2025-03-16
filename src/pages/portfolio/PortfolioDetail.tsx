
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import MagnetButton from '@/components/ui/MagnetButton';

// Import projects data from a shared location
// import { projects } from '@/data/portfolioData';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find the current project
  // const project = projects.find(p => p.id === parseInt(id || '0'));
  
  // If no project is found, show a message
  // if (!project) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-4xl font-bold mb-4">Project not found</h1>
  //         <Link to="/" className="text-primary hover:underline">
  //           Go back home
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }
  
  // // Get the next and previous project IDs
  // const currentIndex = projects.findIndex(p => p.id === project.id);
  // const nextProject = projects[currentIndex + 1] || projects[0];
  // const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];
  
  // Animation refs
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <motion.section 
        ref={headerRef}
        style={{ opacity, y }}
        className="relative"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="mb-8">
            <Link to="/#work" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to all projects</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-lg uppercase tracking-widest font-medium mb-4 block text-primary">
              {/* {project.category} */}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight">
              {/* {project.title} */}
            </h1>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <div className="h-[60vh] overflow-hidden">
            <img 
              // src={project.image} 
              // alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.section>
      
      {/* Project Details Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="sticky top-32">
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Client</h3>
                    <p className="font-medium">Acme Inc.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Services</h3>
                    {/* <p className="font-medium">{project.category}</p> */}
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Year</h3>
                    <p className="font-medium">2023</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="gap-2 rounded-full" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span>Visit Project</span>
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8">
              <div className="prose prose-lg max-w-none">
                <h2>The Challenge</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                  Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                </p>
                
                <h2>The Solution</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                  Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next/Previous Project Navigation */}
      <section className="py-20 border-t">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* ${prevProject.id} */}
            <Link to={`/portfolio/`} className="group">
              <MagnetButton className="inline-flex items-center gap-2 text-lg font-medium">
                <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-2" />
                <span>Previous Project</span>
              </MagnetButton>
            </Link>
            {/* ${nextProject.id} */}
            <Link to={`/portfolio/`} className="group">
              <MagnetButton className="inline-flex items-center gap-2 text-lg font-medium">
                <span>Next Project</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </MagnetButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;

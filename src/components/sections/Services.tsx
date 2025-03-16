
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import MagnetButton from '@/components/ui/MagnetButton';
import { Link } from 'react-router-dom';

interface ServiceItemProps {
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  description,
  index,
  inView
}) => {
  // Create a URL-friendly slug from the title
  const slug = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
  
  return (
    <motion.div 
      initial={{
        opacity: 0,
        y: 30
      }} 
      animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} 
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }} 
      className="border-t border-gray-200 py-12 group"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-0">{title}</h3>
        </div>
        
        <div className="md:col-span-7">
          <div className="border-l-4 border-primary/40 pl-6">
            <p className="text-muted-foreground mb-4">
              {description}
            </p>
          </div>
        </div>
        
        <div className="md:col-span-2 flex justify-end items-start">
          <Link to={`/services/${slug}`}>
            <MagnetButton className="inline-flex items-center px-6 py-3 rounded-full border border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group">
              <span className="font-medium text-sm uppercase tracking-wider mr-2">Read More</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagnetButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const [headingRef, headingInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  const services = [
    {
      title: "UI/UX DESIGN",
      description: "Design of intuitive and visually appealing user interfaces for web and mobile applications, focusing on enhancing the user experience and usability."
    },
    {
      title: "BRAND STRATEGY",
      description: "Comprehensive brand development, including logo creation, color scheme selection, and visual style design to ensure a cohesive and memorable brand identity."
    },
    {
      title: "MARKETING AND SMM",
      description: "Creation of impactful advertising campaigns and marketing materials designed to increase brand visibility, engage target audiences, and drive customer acquisition."
    },
    {
      title: "WEB DEVELOPMENT",
      description: "Professional website development with modern technologies, responsive design, and performance optimization to provide a seamless user experience across all devices."
    },
    {
      title: "APP DEVELOPMENT",
      description: "Custom mobile application development for iOS and Android platforms, focusing on performance, user experience, and scalability to meet specific business needs."
    }
  ];

  return (
    <section id="services" className="py-32 relative" ref={containerRef}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <motion.div ref={headingRef} style={{
          opacity,
          y
        }} className="mb-16">
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={headingInView ? {
              opacity: 1,
              y: 0
            } : {}} 
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <span className="text-sm md:text-base uppercase tracking-widest font-medium mb-4 block text-primary">
              OUR SERVICES
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{
              opacity: 0,
              y: 30
            }} 
            animate={headingInView ? {
              opacity: 1,
              y: 0
            } : {}} 
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1]
            }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            WE GENERATE <span className="text-primary">UNIQUE</span> IDEAS
          </motion.h2>
        </motion.div>
        
        <div ref={contentRef} className="space-y-0">
          {/* First 3 services are always visible */}
          {services.slice(0, 3).map((service, index) => 
            <ServiceItem 
              key={index} 
              title={service.title} 
              description={service.description} 
              index={index} 
              inView={contentInView} 
            />
          )}
          
          {/* Services container with bottom border */}
          <div className="border-b border-gray-200">
            {/* Collapsible section for the remaining 2 services */}
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
              <CollapsibleContent>
                {services.slice(3).map((service, index) => 
                  <ServiceItem 
                    key={index + 3} 
                    title={service.title} 
                    description={service.description} 
                    index={index + 3} 
                    inView={contentInView && isOpen} 
                  />
                )}
              </CollapsibleContent>
              
              {/* Hidden trigger */}
              <CollapsibleTrigger className="hidden">
                <Button>Toggle</Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          
          {/* Visual button outside the border that controls the collapsible */}
          <div className="flex justify-center mt-8 py-[8px]">
            <MagnetButton 
              className="inline-flex items-center px-6 py-3 rounded-full border border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="font-medium text-sm uppercase tracking-wider mr-2">
                {isOpen ? "Show Less" : "Show More"}
              </span>
              {isOpen ? 
                <ChevronUp className="h-4 w-4 transition-transform duration-200" /> : 
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              }
            </MagnetButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;


import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import KeyNumbers from "@/components/sections/KeyNumbers";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";
import FollowCursor from "@/components/ui/FollowCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import { handleRevealAnimations } from "@/lib/animation";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set default theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = savedTheme;
    
    // Initialize animations after short delay to ensure components are mounted
    const timer = setTimeout(() => {
      setIsLoaded(true);
      handleRevealAnimations();
    }, 100);
    
    // On scroll, reveal animations
    window.addEventListener('scroll', handleRevealAnimations);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleRevealAnimations);
    };
  }, []);
  
  return (
    <div className="relative">
      <SmoothScroll>
        <FollowCursor>
          <div className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Toaster position="top-right" />
            
            <Navbar />
            
            <main>
              <Hero />
              <KeyNumbers />
              <Portfolio />
              <About />
              <Services />
              <Pricing />
              <Testimonials />
              <FinalCTA />
              <Contact />
            </main>
            
            <Footer />
          </div>
        </FollowCursor>
      </SmoothScroll>
    </div>
  );
};

export default Index;

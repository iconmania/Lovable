
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import MagnetButton from '@/components/ui/MagnetButton';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Handle mouse movement for 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Initialize 3D scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create transparent 3D object
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.1,
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 10;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate cube based on mouse position
      if (cube) {
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.002;
        cube.rotation.x += (mousePosition.y * 0.001 - cube.rotation.x) * 0.05;
        cube.rotation.y += (mousePosition.x * 0.001 - cube.rotation.y) * 0.05;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });
      
      // Create animated circles that follow the mouse
      const createCircle = () => {
        if (!containerRef.current) return;
        
        const circle = document.createElement('div');
        const size = Math.random() * 40 + 20;
        
        circle.classList.add('animated-circle');
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.opacity = '0.6';
        
        containerRef.current.appendChild(circle);
        
        setTimeout(() => {
          circle.style.opacity = '0';
          circle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
          
          setTimeout(() => {
            if (containerRef.current && containerRef.current.contains(circle)) {
              containerRef.current.removeChild(circle);
            }
          }, 1000);
        }, 50);
      };
      
      // Only create circles occasionally to avoid performance issues
      if (Math.random() > 0.92) {
        createCircle();
      }
      
      // Update gradient position for subtle effect
      if (containerRef.current) {
        const gradientElements = containerRef.current.querySelectorAll('.gradient-blur');
        gradientElements.forEach((el, i) => {
          const element = el as HTMLElement;
          const factor = i === 0 ? 0.02 : -0.02;
          const xOffset = 50 + (x / window.innerWidth - 0.5) * 20;
          const yOffset = 50 + (y / window.innerHeight - 0.5) * 20;
          element.style.transform = `translate(${xOffset - 50}%, ${yOffset - 50}%)`;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* 3D Canvas - Positioned absolutely to cover the section */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      {/* Abstract gradient blurs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          ref={containerRef}
          className="relative w-full h-full"
        >
          <div 
            className="gradient-blur w-[30vw] h-[30vw] top-[10%] left-[20%]"
            style={{ opacity: 0.6 }}
          ></div>
          <div 
            className="gradient-blur w-[40vw] h-[40vw] bottom-[10%] right-[10%]"
            style={{ opacity: 0.5 }}
          ></div>
        </div>
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-0"></div>
      
      <motion.div 
        className="max-w-screen-xl mx-auto px-6 py-20 relative z-10 flex flex-col justify-center items-start h-full"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          <div className="lg:col-span-8">
            {/* Accent text (Motto) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 px-4 py-2 bg-primary/10 rounded-full inline-block"
            >
              <span className="text-sm font-medium tracking-wide uppercase">Elevating Businesses Through Design</span>
            </motion.div>
            
            {/* Main heading - Split into lines for better typography control */}
            <div className="mb-8">
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold leading-[1.1] tracking-tight max-w-5xl">
                <div className="overflow-hidden mb-1">
                  <motion.span
                    className="block"
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={textVariants}
                  >
                    Building <span className="text-highlight">Brands</span> That Engage,
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={textVariants}
                  >
                    Crafting <span className="text-highlight">Products</span> That Resonate.
                  </motion.span>
                </div>
              </h1>
            </div>
            
            {/* Body text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Offering expert design services — from logo to branding, advertising, product design, digital experiences & more.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 mb-24"
            >
              <MagnetButton className="rounded-full" strength={30}>
                <Button size="lg" className="text-base px-8 py-6 rounded-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                  View Our Work
                </Button>
              </MagnetButton>
              
              <MagnetButton className="rounded-full" strength={30}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base px-8 py-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                >
                  Get in Touch
                </Button>
              </MagnetButton>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative">
            {/* Removed the image as requested */}
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <a href="#key-numbers" className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <span className="mb-2 font-medium">Scroll Down</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </motion.div>
      
      <style>
        {`
          .animated-circle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.7), rgba(var(--primary-rgb), 0));
            transform: translate(-50%, -50%) scale(1);
            transition: transform 1s ease-out, opacity 1s ease-out;
            z-index: 1;
          }
        `}
      </style>
    </section>
  );
};

export default Hero;

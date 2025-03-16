
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ExternalLink, Sparkles, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagnetButton from '@/components/ui/MagnetButton';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  
  useEffect(() => {
    if (!containerRef.current || !glowRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || 
        { left: 0, top: 0, width: 0, height: 0 };
      
      const x = clientX - left;
      const y = clientY - top;
      
      if (glowRef.current) {
        const gradientSize = Math.max(width, height) * 0.8;
        glowRef.current.style.background = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, 
          hsl(var(--primary), 0.2) 0%, transparent 70%)`;
      }
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const services = [
    "UI/UX Design",
    "Branding",
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "3D Design",
    "Motion Graphics",
    "SEO"
  ];

  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      ref={containerRef} 
      className="bg-background border-t border-primary/10 pt-32 pb-10 relative overflow-hidden"
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0"></div>
      
      <motion.div 
        style={{ opacity, y: translateY }}
        className="max-w-screen-2xl mx-auto relative z-10"
      >
        <div className="mb-24 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-[clamp(4rem,10vw,12rem)] font-display font-bold leading-[0.9] tracking-tight text-gradient">
              Let's Connect
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-6">
              Ready to transform your digital presence? Let's start a conversation about your next project.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-20 gap-y-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Get in Touch</h3>
                <ul className="space-y-5">
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-start"
                  >
                    <Mail className="mt-1 mr-4 text-primary" size={18} />
                    <MagnetButton strength={15} className="w-auto">
                      <a 
                        href="mailto:hello@topdesignr.com" 
                        className="text-base hover:text-primary transition-colors group inline-flex items-center"
                      >
                        <span className="link-hover">hello@topdesignr.com</span>
                      </a>
                    </MagnetButton>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start"
                  >
                    <Phone className="mt-1 mr-4 text-primary" size={18} />
                    <MagnetButton strength={15} className="w-auto">
                      <a 
                        href="tel:+1234567890" 
                        className="text-base hover:text-primary transition-colors group inline-flex items-center"
                      >
                        <span className="link-hover">+1 (234) 567-890</span>
                      </a>
                    </MagnetButton>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start"
                  >
                    <MapPin className="mt-1 mr-4 text-primary" size={18} />
                    <span className="text-base">
                      123 Design Street<br />
                      San Francisco, CA 94107
                    </span>
                  </motion.li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Follow Us</h3>
                <div className="flex flex-wrap gap-5">
                  {[
                    { icon: <Instagram size={20} />, label: 'Instagram' },
                    { icon: <Twitter size={20} />, label: 'Twitter' },
                    { icon: <Linkedin size={20} />, label: 'LinkedIn' },
                    { icon: <Github size={20} />, label: 'Github' }
                  ].map((social, i) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                    >
                      <MagnetButton strength={40} className="w-auto">
                        <a 
                          href="#" 
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                          aria-label={social.label}
                        >
                          {social.icon}
                        </a>
                      </MagnetButton>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-8">Our Services</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <MagnetButton strength={15} className="w-auto">
                      <a 
                        href="#" 
                        className="group flex items-center text-sm hover:text-primary transition-colors"
                      >
                        <span className="w-4 h-px bg-primary/50 mr-2 group-hover:w-6 transition-all"></span>
                        <span className="link-hover">{service}</span>
                      </a>
                    </MagnetButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                <span className="text-5xl font-display font-bold tracking-tight">
                  <span className="text-gradient relative">
                    <Sparkles className="absolute -right-8 -top-3 text-primary w-6 h-6" />
                    Top
                  </span>
                  <span className="relative ml-1">
                    Designr
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary/50 w-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </span>
                </span>
              </Link>
              
              <p className="text-base text-muted-foreground leading-relaxed">
                We create digital experiences that captivate and inspire, helping brands connect with their audiences in meaningful and impactful ways.
              </p>
              
              <div className="pt-6">
                <MagnetButton strength={40} className="w-auto">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-6 text-base font-medium"
                  >
                    Start a Project
                  </Button>
                </MagnetButton>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-primary/10 py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} TopDesignr. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <MagnetButton className="w-auto" strength={15}>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <span className="link-hover">Privacy Policy</span>
              </a>
            </MagnetButton>
            
            <MagnetButton className="w-auto" strength={15}>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <span className="link-hover">Terms of Service</span>
              </a>
            </MagnetButton>
            
            <MagnetButton className="w-auto" strength={30}>
              <a 
                href="#" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="mr-3 text-xs font-medium">Back to top</span>
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-all group-hover:border-primary/40">
                  <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </MagnetButton>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

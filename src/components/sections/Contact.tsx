
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll be in touch soon.");
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const translateX = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
  const translateXReverse = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+1 (234) 567-890",
      href: "tel:+1234567890"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "hello@topdesignr.com",
      href: "mailto:hello@topdesignr.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "123 Design Street, Creative City",
      href: "https://maps.google.com"
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section 
      id="contact" 
      className="py-32 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"></div>
      <div className="absolute w-[800px] h-[800px] rounded-full bg-primary/3 blur-3xl -top-1/4 -right-1/4"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl -bottom-1/4 -left-1/4"></div>
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            style={{ 
              x: translateX,
              opacity 
            }}
          >
            <motion.h2 
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={textVariants}
              custom={0}
              className="text-[clamp(3rem,8vw,8rem)] font-display font-bold tracking-tight leading-none"
            >
              Let's <span className="text-primary">Talk</span>
            </motion.h2>
            
            <motion.p 
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={textVariants}
              custom={2}
              className="text-xl md:text-2xl text-muted-foreground my-8 max-w-lg"
            >
              Ready to elevate your digital presence? Reach out to us and let's create something amazing together.
            </motion.p>
            
            <div className="space-y-12 mt-12">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={textVariants}
                  custom={3 + index}
                  className="flex items-start group"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors mr-5 flex-shrink-0">
                    <div className="text-primary">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <a 
                      href={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group/link"
                    >
                      <span>{item.content}</span>
                      <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1 opacity-0 group-hover/link:opacity-100" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={textVariants}
              custom={7}
              className="mt-20"
            >
              <div className="flex space-x-8">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform, i) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ 
              x: translateXReverse,
              opacity 
            }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full border border-primary/20"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full border border-primary/20"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-primary/5 border border-primary/10 p-10 md:p-12 rounded-2xl relative backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-lg transition-all duration-300 group font-medium"
                >
                  <span>Send Message</span>
                  <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

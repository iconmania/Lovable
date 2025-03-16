
import React, { useState, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagnetButton from '@/components/ui/MagnetButton';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  callToAction: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Essential',
    price: 3499,
    description: 'Perfect for startups and small businesses looking to establish their digital presence.',
    features: [
      'Brand Strategy Development',
      'Custom Website Design (5 pages)',
      'Responsive Mobile Design',
      'Basic SEO Optimization',
      'Social Media Integration',
      '3 Rounds of Revisions',
      '30 Days Support'
    ],
    callToAction: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 6999,
    description: 'Comprehensive solution for growing businesses that need a stronger digital foundation.',
    features: [
      'Everything in Essential, plus:',
      'Full Brand Identity Design',
      'Custom Website Design (10 pages)',
      'Interactive UI Elements',
      'Advanced SEO Implementation',
      'Content Strategy',
      'Website Analytics Setup',
      '5 Rounds of Revisions',
      '60 Days Support'
    ],
    highlighted: true,
    callToAction: 'Choose Pro'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 12999,
    description: 'Full-scale solution for established businesses and complex projects with custom needs.',
    features: [
      'Everything in Professional, plus:',
      'Comprehensive Digital Strategy',
      'Custom Website Design (Unlimited pages)',
      'Advanced Interactive Features',
      'E-commerce Integration',
      'Custom Animation & Motion Graphics',
      'Ongoing Performance Optimization',
      'Unlimited Revisions',
      'Dedicated Account Manager',
      '12 Months Priority Support'
    ],
    callToAction: 'Contact Us'
  }
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: "-100px 0px"
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i, // Reduced from 0.1 to 0.05
        duration: 0.5, // Reduced from 0.8 to 0.5
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <section 
      id="pricing" 
      className="py-20 md:py-28 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-6 md:px-12"
        style={{ opacity, y }}
      >
        <motion.div 
          className="text-center mb-16"
          ref={titleRef}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="heading-lg mb-4">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the package that fits your needs and take your digital presence to the next level
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-8 inline-flex items-center p-1 bg-primary/5 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                billingCycle === 'monthly' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-primary/10"
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                billingCycle === 'yearly' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-primary/10"
              )}
            >
              Annual Billing <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div 
              key={tier.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-500 transform",
                tier.highlighted 
                  ? "bg-gradient-to-b from-primary/20 to-primary/5 border border-primary/30 shadow-lg relative z-10 md:-mt-4 md:-mb-4" 
                  : "bg-primary/5 border border-primary/10"
              )}
            >
              {tier.highlighted && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              )}
              
              <div className="p-8">
                <h3 className={cn(
                  "text-2xl font-display font-bold mb-2",
                  tier.highlighted && "text-gradient"
                )}>
                  {tier.name}
                </h3>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <motion.span 
                    className="text-4xl font-display font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    ${billingCycle === 'yearly' 
                      ? Math.round(tier.price * 0.8).toLocaleString() 
                      : tier.price.toLocaleString()}
                  </motion.span>
                  <span className="text-muted-foreground"> / project</span>
                </div>
                
                <MagnetButton className="w-full" strength={30}>
                  <Button 
                    className={cn(
                      "w-full rounded-full py-6",
                      tier.highlighted 
                        ? "bg-primary hover:bg-primary/90" 
                        : "bg-primary/10 hover:bg-primary/20 text-primary"
                    )}
                  >
                    {tier.callToAction}
                  </Button>
                </MagnetButton>
              </div>
              
              <div className="border-t border-primary/10 p-8">
                <h4 className="font-medium mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * featureIndex }}
                    >
                      <Check size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-8">
            We understand that every project is unique. Contact us for a tailored proposal that addresses your specific requirements and objectives.
          </p>
          <MagnetButton strength={40}>
            <Button size="lg" className="rounded-full px-8 py-6">
              Schedule a Consultation
            </Button>
          </MagnetButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Pricing;

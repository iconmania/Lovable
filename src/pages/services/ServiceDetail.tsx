
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Service data
const services = [
  {
    slug: "uiux-design",
    title: "UI/UX DESIGN",
    description: "Design of intuitive and visually appealing user interfaces for web and mobile applications, focusing on enhancing the user experience and usability.",
    content: `
      <h2>Elevate Your Digital Experience</h2>
      <p>Our UI/UX design services focus on creating interfaces that not only look stunning but also provide exceptional user experiences. We combine aesthetics with functionality to build products that users love to interact with.</p>
      
      <h3>Our Process</h3>
      <ol>
        <li><strong>Research & Discovery</strong>: Understanding user needs, behaviors, and business goals</li>
        <li><strong>Wireframing & Prototyping</strong>: Creating the structural foundation and interactive models</li>
        <li><strong>Visual Design</strong>: Developing the look and feel with attention to brand identity</li>
        <li><strong>Usability Testing</strong>: Validating designs with real users to ensure optimal experience</li>
        <li><strong>Implementation Support</strong>: Working closely with developers to ensure design integrity</li>
      </ol>
    `
  },
  {
    slug: "brand-strategy",
    title: "BRAND STRATEGY",
    description: "Comprehensive brand development, including logo creation, color scheme selection, and visual style design to ensure a cohesive and memorable brand identity.",
    content: `
      <h2>Build a Memorable Brand Identity</h2>
      <p>Our brand strategy services help businesses establish a strong, consistent presence across all channels. We develop comprehensive brand identities that connect with your target audience and communicate your unique value proposition.</p>
      
      <h3>What We Offer</h3>
      <ul>
        <li><strong>Brand Discovery</strong>: Uncovering your core values, mission, and competitive advantages</li>
        <li><strong>Logo Design</strong>: Creating distinctive visual marks that represent your brand</li>
        <li><strong>Color & Typography</strong>: Selecting visual elements that evoke the right emotions</li>
        <li><strong>Brand Guidelines</strong>: Developing comprehensive standards for consistent application</li>
        <li><strong>Brand Messaging</strong>: Crafting compelling narratives that resonate with your audience</li>
      </ul>
    `
  },
  {
    slug: "marketing-and-smm",
    title: "MARKETING AND SMM",
    description: "Creation of impactful advertising campaigns and marketing materials designed to increase brand visibility, engage target audiences, and drive customer acquisition.",
    content: `
      <h2>Amplify Your Digital Presence</h2>
      <p>Our marketing and social media management services help businesses reach their target audience effectively, build engagement, and drive conversions through strategic digital campaigns.</p>
      
      <h3>Our Services Include</h3>
      <ul>
        <li><strong>Social Media Strategy</strong>: Developing platform-specific approaches to reach your goals</li>
        <li><strong>Content Creation</strong>: Producing engaging posts, graphics, and videos</li>
        <li><strong>Community Management</strong>: Building and nurturing your online community</li>
        <li><strong>Paid Campaigns</strong>: Strategic ad placement for maximum ROI</li>
        <li><strong>Performance Analysis</strong>: Tracking metrics and optimizing your strategy</li>
      </ul>
    `
  },
  {
    slug: "web-development",
    title: "WEB DEVELOPMENT",
    description: "Professional website development with modern technologies, responsive design, and performance optimization to provide a seamless user experience across all devices.",
    content: `
      <h2>Custom Web Solutions</h2>
      <p>Our web development services deliver high-performance, responsive websites and web applications that provide exceptional user experiences while meeting your business objectives.</p>
      
      <h3>Our Development Approach</h3>
      <ul>
        <li><strong>Responsive Design</strong>: Creating websites that work flawlessly across all devices</li>
        <li><strong>Modern Technologies</strong>: Using the latest frameworks and tools for optimal performance</li>
        <li><strong>SEO Optimization</strong>: Building with search engine visibility in mind</li>
        <li><strong>Performance Focus</strong>: Ensuring fast load times and smooth user experience</li>
        <li><strong>Ongoing Support</strong>: Providing maintenance and updates to keep your site secure</li>
      </ul>
    `
  },
  {
    slug: "app-development",
    title: "APP DEVELOPMENT",
    description: "Custom mobile application development for iOS and Android platforms, focusing on performance, user experience, and scalability to meet specific business needs.",
    content: `
      <h2>Mobile Solutions for Modern Businesses</h2>
      <p>Our app development services create powerful, intuitive mobile applications that help businesses connect with users on iOS and Android platforms while delivering exceptional experiences.</p>
      
      <h3>Our App Development Process</h3>
      <ol>
        <li><strong>Strategy & Planning</strong>: Defining core features, user flows, and technical requirements</li>
        <li><strong>UX/UI Design</strong>: Creating intuitive interfaces tailored to mobile platforms</li>
        <li><strong>Development</strong>: Building robust applications with clean, maintainable code</li>
        <li><strong>Testing & QA</strong>: Ensuring performance, usability, and security</li>
        <li><strong>Deployment & Support</strong>: Publishing to app stores and providing ongoing maintenance</li>
      </ol>
    `
  }
];

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const service = services.find(s => s.slug === slug);
  
  useEffect(() => {
    if (!service) {
      toast({
        title: "Service not found",
        description: "The requested service could not be found.",
        variant: "destructive"
      });
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [service, toast]);
  
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="mb-6">The service you're looking for doesn't exist or has been moved.</p>
            <Link to="/#services">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <Link to="/#services" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              {service.description}
            </p>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 prose prose-lg max-w-none dark:prose-invert" 
                   dangerouslySetInnerHTML={{ __html: service.content }} />
              
              <div className="space-y-8">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
                  <p className="mb-6">Contact us today to discuss your project requirements.</p>
                  <Link to="/#contact">
                    <Button className="w-full">Contact Us</Button>
                  </Link>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Other Services</h3>
                  <ul className="space-y-2">
                    {services
                      .filter(s => s.slug !== slug)
                      .map(s => (
                        <li key={s.slug}>
                          <Link to={`/services/${s.slug}`} className="text-primary hover:underline">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;

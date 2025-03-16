
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  image?: string;
  features?: Array<{ title: string; description: string }>;
}

export const initialServices: Service[] = [
  {
    id: "1",
    title: "UI/UX DESIGN",
    slug: "ui-ux-design",
    description: "Design of intuitive and visually appealing user interfaces for web and mobile applications, focusing on enhancing the user experience and usability.",
    fullDescription: "Our UI/UX design process begins with thorough research to understand your users' needs and business goals. We create wireframes, prototypes, and interactive designs that prioritize user experience while maintaining brand identity. Our approach leads to interfaces that are not only visually appealing but also functional and intuitive, resulting in higher engagement and conversion rates.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    features: [
      { title: "User Research", description: "Deep understanding of user behaviors and needs" },
      { title: "Wireframing", description: "Structural layout planning for optimal user flows" },
      { title: "Prototyping", description: "Interactive mockups to test functionality" },
      { title: "Visual Design", description: "Aesthetically pleasing interfaces aligned with brand identity" }
    ]
  },
  {
    id: "2",
    title: "BRAND STRATEGY",
    slug: "brand-strategy",
    description: "Comprehensive brand development, including logo creation, color scheme selection, and visual style design to ensure a cohesive and memorable brand identity.",
    fullDescription: "Our brand strategy services help you define and communicate your unique value proposition. We develop comprehensive brand guidelines that ensure consistency across all touchpoints. From logo design to typography selection, color palettes, and voice definition, we create a cohesive brand identity that resonates with your target audience and differentiates you from competitors.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
    features: [
      { title: "Brand Analysis", description: "Evaluation of current positioning and market perception" },
      { title: "Identity Design", description: "Logo, color schemes, and visual elements creation" },
      { title: "Guidelines Development", description: "Comprehensive rulebook for brand consistency" },
      { title: "Implementation Strategy", description: "Rollout plan for new brand elements" }
    ]
  },
  {
    id: "3",
    title: "MARKETING AND SMM",
    slug: "marketing-and-smm",
    description: "Creation of impactful advertising campaigns and marketing materials designed to increase brand visibility, engage target audiences, and drive customer acquisition.",
    fullDescription: "Our marketing and social media management services are designed to enhance your brand's online presence and engagement. We develop tailored strategies across multiple platforms, create compelling content, and monitor performance to optimize campaigns. Our approach focuses on building authentic relationships with your audience while driving measurable business results through strategic digital marketing initiatives.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a?q=80&w=2074&auto=format&fit=crop",
    features: [
      { title: "Strategy Development", description: "Platform-specific marketing approaches" },
      { title: "Content Creation", description: "Engaging posts, graphics, and videos" },
      { title: "Community Management", description: "Active audience engagement and relationship building" },
      { title: "Analytics & Reporting", description: "Performance tracking and strategy optimization" }
    ]
  },
  {
    id: "4",
    title: "WEB DEVELOPMENT",
    slug: "web-development",
    description: "Professional website development with modern technologies, responsive design, and performance optimization to provide a seamless user experience across all devices.",
    fullDescription: "Our web development services combine technical expertise with creative design to deliver websites that perform exceptionally well. We employ modern frameworks and best practices to create responsive, fast-loading, and secure websites. From simple landing pages to complex e-commerce platforms, our development team ensures your website is built with clean code, optimized for search engines, and designed for easy maintenance and scalability.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
    features: [
      { title: "Custom Development", description: "Tailored solutions for specific business needs" },
      { title: "Responsive Design", description: "Perfect display across all device sizes" },
      { title: "Performance Optimization", description: "Fast loading times and efficient code" },
      { title: "SEO Implementation", description: "Search engine friendly structure and content" }
    ]
  },
  {
    id: "5",
    title: "APP DEVELOPMENT",
    slug: "app-development",
    description: "Custom mobile application development for iOS and Android platforms, focusing on performance, user experience, and scalability to meet specific business needs.",
    fullDescription: "Our app development process covers the entire lifecycle from concept to deployment and maintenance. We develop native, hybrid, or cross-platform applications based on your specific requirements. Our team focuses on creating intuitive user experiences, optimizing performance, and ensuring your app is secure and scalable. We also provide comprehensive testing, deployment assistance, and ongoing support to keep your application running smoothly.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    features: [
      { title: "Native & Cross-Platform", description: "Development for iOS, Android, or both simultaneously" },
      { title: "UI/UX Design", description: "Intuitive and engaging mobile interfaces" },
      { title: "API Integration", description: "Seamless connection with external systems" },
      { title: "Maintenance & Updates", description: "Ongoing support and feature enhancement" }
    ]
  }
];

// Helper function to save services to localStorage
export const saveServices = (services: Service[]) => {
  localStorage.setItem('services', JSON.stringify(services));
};

// Helper function to get services from localStorage
export const getServices = (): Service[] => {
  const saved = localStorage.getItem('services');
  return saved ? JSON.parse(saved) : initialServices;
};

// Helper function to get a service by slug
export const getServiceBySlug = (slug: string): Service | undefined => {
  const services = getServices();
  return services.find(service => service.slug === slug);
};

// Helper function to generate a slug from a title
export const generateSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
};

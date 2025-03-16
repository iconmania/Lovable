
// Website content data storage
export interface SectionContent {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  items?: Array<{
    id: string;
    title: string;
    value?: string;
    description?: string;
    icon?: string;
  }>;
}

export interface WebsiteContent {
  hero: SectionContent;
  about: SectionContent;
  keyNumbers: SectionContent & { numbers: Array<{ title: string; value: string; icon?: string }> };
  pricing: SectionContent & { plans: Array<{ title: string; price: string; features: string[]; popular?: boolean }> };
  contact: SectionContent;
  footer: SectionContent & { links: Array<{ title: string; items: Array<{ label: string; url: string }> }> };
}

// Initial content (placeholder data)
export const initialWebsiteContent: WebsiteContent = {
  hero: {
    title: "Creative Design Studio",
    subtitle: "Design • Development • Marketing",
    description: "We create beautiful, functional designs and digital experiences that help businesses grow and succeed in the digital landscape.",
    buttonText: "Get Started",
    buttonLink: "#contact",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
  },
  about: {
    title: "About Us",
    subtitle: "Our Story",
    description: "We are a team of passionate designers, developers, and marketers who are dedicated to helping businesses succeed in the digital world.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop"
  },
  keyNumbers: {
    title: "Our Achievements",
    subtitle: "By the Numbers",
    numbers: [
      { title: "Happy Clients", value: "250+", icon: "Users" },
      { title: "Projects Completed", value: "500+", icon: "CheckCircle" },
      { title: "Years of Experience", value: "10+", icon: "Clock" },
      { title: "Awards Won", value: "25+", icon: "Trophy" }
    ]
  },
  pricing: {
    title: "Our Pricing",
    subtitle: "Simple, Transparent Pricing",
    description: "Choose the plan that fits your needs",
    plans: [
      {
        title: "Basic",
        price: "$999",
        features: [
          "Custom Design",
          "Responsive Website",
          "Basic SEO",
          "30 Days Support"
        ]
      },
      {
        title: "Professional",
        price: "$1,999",
        features: [
          "Everything in Basic",
          "Advanced SEO",
          "E-commerce Integration",
          "90 Days Support",
          "Content Migration"
        ],
        popular: true
      },
      {
        title: "Enterprise",
        price: "$4,999",
        features: [
          "Everything in Professional",
          "Custom Features",
          "Priority Support",
          "1 Year Maintenance",
          "Marketing Strategy",
          "Dedicated Account Manager"
        ]
      }
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    description: "Have a project in mind? Let's talk about it.",
    items: [
      {
        id: "email",
        title: "Email",
        value: "hello@topdesignr.com",
        icon: "Mail"
      },
      {
        id: "phone",
        title: "Phone",
        value: "+1 (555) 123-4567",
        icon: "Phone"
      },
      {
        id: "address",
        title: "Address",
        value: "123 Design Street, Creative City, 10001",
        icon: "MapPin"
      }
    ]
  },
  footer: {
    title: "TopDesignr",
    description: "Creating beautiful digital experiences since 2014.",
    links: [
      {
        title: "Services",
        items: [
          { label: "UI/UX Design", url: "/services/ui-ux-design" },
          { label: "Brand Strategy", url: "/services/brand-strategy" },
          { label: "Web Development", url: "/services/web-development" },
          { label: "App Development", url: "/services/app-development" }
        ]
      },
      {
        title: "Company",
        items: [
          { label: "About", url: "/#about" },
          { label: "Portfolio", url: "/#portfolio" },
          { label: "Pricing", url: "/#pricing" },
          { label: "Contact", url: "/#contact" }
        ]
      },
      {
        title: "Legal",
        items: [
          { label: "Privacy Policy", url: "/privacy" },
          { label: "Terms of Service", url: "/terms" }
        ]
      }
    ]
  }
};

// Helper function to save website content to localStorage
export const saveWebsiteContent = (content: WebsiteContent) => {
  localStorage.setItem('websiteContent', JSON.stringify(content));
};

// Helper function to get website content from localStorage
export const getWebsiteContent = (): WebsiteContent => {
  const saved = localStorage.getItem('websiteContent');
  return saved ? JSON.parse(saved) : initialWebsiteContent;
};

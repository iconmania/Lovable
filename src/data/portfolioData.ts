
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  technologies?: string[];
  image: string;
  gallery?: string[];
  client?: string;
  date?: string;
  link?: string;
  width: string;
  height: string;
  align: 'left' | 'center' | 'right';
  margin: string;
  mobileHeight?: string;
}

export const initialProjects: Project[] = [
  {
    id: "1",
    title: 'Lumina Brand Identity',
    category: 'Branding',
    description: 'Complete brand identity redesign for a leading technology firm, including logo, color palette, typography, and brand guidelines.',
    fullDescription: 'The Lumina Brand Identity project involved a comprehensive redesign of the company\'s visual identity to better reflect their innovative approach to technology solutions. We developed a modern, versatile logo system, established a vibrant yet professional color palette, and created detailed guidelines to ensure consistent brand application across all touchpoints.',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Strategy'],
    client: 'Lumina Technologies',
    date: 'January 2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1635405446109-56639631a29e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop'
    ],
    width: '80%',
    height: '80vh',
    mobileHeight: '50vh',
    align: 'right',
    margin: 'ml-auto'
  },
  {
    id: "2",
    title: 'Vertex App Interface',
    category: 'UI/UX Design',
    description: 'User interface design for a financial management mobile application, focusing on user experience, accessibility, and visual appeal.',
    fullDescription: 'The Vertex App Interface project required creating an intuitive, accessible mobile interface for a complex financial management application. Our design approach prioritized clarity and ease of use while maintaining sophisticated functionality. We employed a user-centered design process, conducting extensive research and usability testing to refine the interface.',
    technologies: ['Figma', 'Prototyping', 'User Testing'],
    client: 'Vertex Financial',
    date: 'March 2023',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    ],
    width: '65%',
    height: '60vh',
    mobileHeight: '40vh',
    align: 'left',
    margin: 'mr-auto'
  },
  {
    id: "3",
    title: 'Skyline Website Redesign',
    category: 'Web Development',
    description: 'Complete overhaul of a corporate website, including responsive design, content management system integration, and performance optimization.',
    fullDescription: 'The Skyline Website Redesign project involved transforming an outdated corporate website into a modern, responsive platform that effectively communicates the company\'s services and values. We implemented a custom content management system, optimized site performance, and ensured accessibility compliance while maintaining a sleek, professional design aesthetic.',
    technologies: ['React', 'Tailwind CSS', 'WordPress', 'PHP'],
    client: 'Skyline Industries',
    date: 'May 2023',
    link: 'https://www.skylineindustries.com',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop'
    ],
    width: '95%',
    height: '90vh',
    mobileHeight: '60vh',
    align: 'center',
    margin: 'mx-auto'
  },
  {
    id: "4",
    title: 'Echo E-commerce Platform',
    category: 'E-commerce',
    description: 'Development of a custom e-commerce platform for a boutique retailer, including inventory management, payment processing, and customer accounts.',
    fullDescription: 'The Echo E-commerce Platform project required developing a specialized online shopping experience for a high-end boutique retailer. We created a custom e-commerce solution that seamlessly integrated with their inventory system, implemented secure payment processing, and designed an intuitive shopping experience that showcased their premium products effectively.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    client: 'Echo Boutique',
    date: 'August 2023',
    link: 'https://www.echoboutique.com',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=2187&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?q=80&w=1949&auto=format&fit=crop'
    ],
    width: '50%',
    height: '50vh',
    mobileHeight: '40vh',
    align: 'right',
    margin: 'ml-auto'
  }
];

// Helper function to save projects to localStorage
export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

// Helper function to get projects from localStorage
export const getProjects = (): Project[] => {
  const saved = localStorage.getItem('projects');
  return saved ? JSON.parse(saved) : initialProjects;
};

// Helper function to get a project by id
export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(project => project.id === id);
};

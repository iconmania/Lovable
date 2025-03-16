
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

export const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "TopDesignr transformed our brand identity and digital presence. Their approach is innovative yet strategic, resulting in a website that not only looks stunning but also delivers concrete business results.",
    author: "Alexandra Chen",
    position: "CEO",
    company: "Nova Innovations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "2",
    content: "Working with TopDesignr has been a game-changer for our marketing efforts. Their team's attention to detail and ability to translate our vision into reality exceeded our expectations.",
    author: "Marcus Johnson",
    position: "Marketing Director",
    company: "Pulse Media",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop"
  },
  {
    id: "3",
    content: "The redesign of our e-commerce platform by TopDesignr led to a 40% increase in conversion rates. Their understanding of user experience and aesthetic sensibilities is unmatched in the industry.",
    author: "Sophia Rodriguez",
    position: "Product Lead",
    company: "Ember Tech",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1022&auto=format&fit=crop"
  }
];

// Helper function to save testimonials to localStorage
export const saveTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem('testimonials', JSON.stringify(testimonials));
};

// Helper function to get testimonials from localStorage
export const getTestimonials = (): Testimonial[] => {
  const saved = localStorage.getItem('testimonials');
  return saved ? JSON.parse(saved) : initialTestimonials;
};

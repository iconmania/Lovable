
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'cyber';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'cyber' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button 
      onClick={toggleTheme}
      className="relative group overflow-hidden rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-300"
      variant="ghost"
      aria-label={`Switch to ${theme === 'light' ? 'cyber' : 'light'} mode`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {theme === 'light' ? (
        <Sun className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      )}
    </Button>
  );
};

export default ThemeToggle;

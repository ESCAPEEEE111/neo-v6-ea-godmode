import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { name: 'HOME', path: '/' },
    { name: 'PLATFORM', path: '/platform' },
    { name: 'SERVICES', path: '/services' },
    { name: 'AI_SOLVER', path: '/ai-solver' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-matrix-green/20 shadow-matrix' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group animate-fadeInLeft">
            <div className="text-2xl font-bold font-heading text-matrix-green group-hover:text-matrix-bright-cyan transition-all duration-300 matrix-text-glow">
              🌐 NOWHERE
            </div>
            <div className="text-sm font-body text-matrix-green/60 group-hover:text-matrix-cyan/80 transition-colors">
              DIGITAL_MATRIX
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-body text-sm font-medium transition-all duration-300 hover:text-matrix-bright-cyan hover-lift relative animate-fadeInUp ${
                  location.pathname === item.path
                    ? 'text-matrix-bright-cyan'
                    : 'text-matrix-green'
                }`}
                style={{animationDelay: `${0.1 * index}s`}}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan animate-scaleIn"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4 animate-fadeInRight" style={{animationDelay: '0.4s'}}>
            <Link to="/ai-solver">
              <Button className="btn-matrix hover-lift font-heading px-6 py-2 text-sm">
                🧠 AI_ANALYSIS
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-matrix-green hover:text-matrix-bright-cyan transition-all duration-300 hover-scale p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeInUp">
            <div className="px-2 pt-2 pb-3 space-y-1 modern-card mt-4 rounded-lg">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 font-body text-base font-medium transition-all duration-300 hover:text-matrix-bright-cyan hover:bg-matrix-green/10 rounded-lg animate-fadeInLeft ${
                    location.pathname === item.path
                      ? 'text-matrix-bright-cyan bg-matrix-green/20'
                      : 'text-matrix-green'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-3 py-4 border-t border-matrix-green/20 mt-4">
                <Link to="/ai-solver" className="block">
                  <Button className="w-full btn-matrix font-heading py-3">
                    🧠 GET_AI_ANALYSIS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
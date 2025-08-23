import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Play, Phone, Mail, MapPin, Star, CheckCircle, Zap, Rocket, Globe, Smartphone, Brain, BarChart3, Shield, Search, ShoppingBag, Eye, Volume2, Calendar, Building, Plane, Heart, Home, Megaphone, Camera, MessageCircle } from 'lucide-react';
import { services, specializedServices, testimonials, stats, partnerBrands, navigationItems, contactInfo } from '../data/mock';
import MatrixChatSystem from './MatrixChatSystem';
import PricingShowcase from './PricingShowcase';
import UltimatePlatformDashboard from './UltimatePlatformDashboard';
import AIProblemSolver from './AIProblemSolver';
import MobileMatrixOptimizer, { MobileMatrixText } from './MobileMatrixOptimizer';
import TerminalWindow from './TerminalWindow';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

// Icon mapping
const iconMap = {
  Megaphone, MessageCircle, Globe, Search, Camera, ShoppingBag, Brain, BarChart3, Eye, Shield, Volume2, Calendar,
  Plane, Building, Heart, Home, Rocket, Smartphone, Zap
};

const NowhereDigitalWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [terminalText, setTerminalText] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const text = "INITIALIZING DIGITAL DOMINANCE...";
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message')
    };
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('TRANSMISSION SENT SUCCESSFULLY! Our agent will contact you within 24 hours.');
        e.target.reset();
      } else {
        alert('TRANSMISSION FAILED. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('CONNECTION ERROR. Please check your internet connection and try again.');
    }
  };

  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background without animations */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-matrix-green/30' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-matrix-green/20 border border-matrix-green rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-matrix-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono text-matrix-cyan">
                  NOWHERE
                </h1>
                <p className="text-xs text-matrix-green/60 font-mono">DIGITAL_MATRIX</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-matrix-green hover:text-white transition-colors duration-300 cursor-pointer font-mono text-sm uppercase tracking-wider"
                  onClick={() => setActiveSection(item.name.toLowerCase())}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-matrix-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-matrix-green/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-matrix-green hover:text-white transition-colors duration-300 font-mono text-sm uppercase tracking-wider"
                  onClick={() => {
                    setActiveSection(item.name.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Hero Content */}
            <div>
              <div className="mb-8">
                <Badge className="bg-matrix-cyan/20 text-matrix-cyan border-matrix-cyan/40 font-mono mb-4">
                  🚀 #1 Digital Marketing Agency in Dubai
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-mono">
                <MobileMatrixText>
                  <span className="text-matrix-cyan">
                    DIGITAL
                  </span>
                  <br />
                  <span className="text-white">SUPREMACY</span>
                </MobileMatrixText>
              </h1>
              
              <p className="text-xl text-matrix-green/80 mb-8 max-w-2xl font-mono leading-relaxed">
                Transform your business with AI-powered digital marketing solutions. 
                <span className="text-matrix-cyan"> 500+ successful projects</span> in Dubai & UAE.
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal px-8 py-4 text-lg font-mono font-bold transition-all duration-300 transform hover:scale-105">
                  <Rocket className="w-5 h-5 mr-2" />
                  START YOUR PROJECT
                </Button>
                <Button variant="outline" className="border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 px-8 py-4 text-lg font-mono">
                  <Play className="w-5 h-5 mr-2" />
                  VIEW PORTFOLIO
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-matrix-green/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                  <span>UAE Specialists</span>
                </div>
              </div>

              {/* Enhanced Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-matrix-cyan font-mono mb-2">{stat.number}</div>
                    <div className="text-matrix-green/60 font-mono text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Terminal Windows */}
            <div className="space-y-4">
              <TerminalWindow title="MISSION_BRIEFING.txt" className="text-left">
                <div className="font-mono text-matrix-green text-sm">
                  <p className="text-matrix-cyan">&gt; Loading Digital Marketing Agency in Dubai, UAE</p>
                  <p>&gt; Custom Web & App Development Solutions</p>
                  <p>&gt; AI Agents Integration & Lead Generation</p>
                  <p>&gt; UAE market domination protocols active</p>
                  <p className="text-matrix-bright-cyan mt-2">&gt; STATUS: READY_FOR_DEPLOYMENT</p>
                </div>
              </TerminalWindow>
              
              <TerminalWindow title="SYSTEM_CAPABILITIES.exe">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {[
                    { icon: Globe, label: "WEB_DEV" },
                    { icon: Smartphone, label: "MOBILE" },
                    { icon: Brain, label: "AI_POWERED" },
                    { icon: BarChart3, label: "ANALYTICS" },
                    { icon: Shield, label: "SECURITY" },
                    { icon: Zap, label: "PERFORMANCE" }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className="w-8 h-8 text-matrix-cyan mx-auto mb-2" />
                        <span className="text-xs text-matrix-green/80 font-mono">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center font-mono text-matrix-bright-cyan text-sm">
                  AI_POWERED_SOLUTIONS
                  <br />
                  <span className="text-matrix-green/60">CUTTING_EDGE_TECHNOLOGY_MEETS_CREATIVE_EXCELLENCE</span>
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                COMPREHENSIVE_ARSENAL
              </span>
            </h2>
            <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
              WEB_DEVELOPMENT | LEAD_GENERATION | AI_AGENTS | UAE_MARKET_DOMINANCE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card
                  key={service.id}
                  className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="text-matrix-green mb-4 group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>
                    <CardTitle className="text-xl font-mono text-matrix-green group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-matrix-green/60 font-mono">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-matrix-green/80 font-mono">
                          <CheckCircle className="w-4 h-4 text-matrix-green" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Specialized Services Subsection */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-mono">
                <span className="text-matrix-cyan">
                  UAE_MARKET_SPECIALISTS
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializedServices.map((service, index) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <Card
                    key={service.id}
                    className="bg-black/30 border-matrix-green/20 hover:border-matrix-green/40 transition-all duration-300 text-center group backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="text-matrix-green mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                        {IconComponent && <IconComponent className="w-8 h-8" />}
                      </div>
                      <CardTitle className="text-lg font-mono text-matrix-green">{service.title}</CardTitle>
                      <CardDescription className="text-matrix-green/60 text-sm font-mono">{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ultimate Platform Dashboard */}
      <UltimatePlatformDashboard />

      {/* AI Problem Solver */}
      <AIProblemSolver />

      {/* Pricing Showcase */}
      <PricingShowcase />

      {/* Testimonials */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-matrix-green">
                CLIENT_SUCCESS_PROTOCOLS
              </span>
            </h2>
          </div>

          <TerminalWindow title="TESTIMONIALS_DATABASE.log" className="relative">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-matrix-green fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-matrix-green/80 mb-6 font-mono">
                "&gt; {testimonials[currentTestimonial].text}"
              </blockquote>
              <div>
                <p className="font-semibold text-matrix-green font-mono">{testimonials[currentTestimonial].name}</p>
                <p className="text-matrix-green/60 font-mono">{testimonials[currentTestimonial].company}</p>
              </div>
            </div>
          </TerminalWindow>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-matrix-green' : 'bg-matrix-green/30'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
                <span className="text-matrix-green">
                  READY_TO_JACK_IN
                </span>
                <br />
                <span className="text-white">TO_THE_MATRIX?</span>
              </h2>
              
              <TerminalWindow title="CONTACT_PROTOCOLS.exe" className="mb-8">
                <p className="text-matrix-green/80 leading-relaxed font-mono">
                  &gt; INITIATE_DIGITAL_TRANSFORMATION
                  <br />
                  &gt; COMPREHENSIVE_UAE_MARKET_SOLUTIONS
                  <br />
                  &gt; AI_POWERED_MULTILINGUAL_DOMINATION
                </p>
              </TerminalWindow>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-matrix-green/20 border border-matrix-green p-3 rounded-full">
                    <Phone className="w-6 h-6 text-matrix-green" />
                  </div>
                  <div>
                    <p className="text-matrix-green/60 font-mono">CALL_US</p>
                    <p className="text-matrix-green font-semibold font-mono">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-matrix-green/20 border border-matrix-green p-3 rounded-full">
                    <Mail className="w-6 h-6 text-matrix-green" />
                  </div>
                  <div>
                    <p className="text-matrix-green/60 font-mono">EMAIL_US</p>
                    <p className="text-matrix-green font-semibold font-mono">{contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-matrix-green/20 border border-matrix-green p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-matrix-green" />
                  </div>
                  <div>
                    <p className="text-matrix-green/60 font-mono">VISIT_US</p>
                    <p className="text-matrix-green font-semibold font-mono">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <TerminalWindow title="CONTACT_FORM.exe" className="h-fit">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR_NAME"
                    required
                    className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 focus:border-matrix-green focus:outline-none transition-colors duration-300 font-mono"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR_EMAIL"
                    required
                    className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 focus:border-matrix-green focus:outline-none transition-colors duration-300 font-mono"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="YOUR_PHONE"
                    required
                    className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 focus:border-matrix-green focus:outline-none transition-colors duration-300 font-mono"
                  />
                </div>
                <div>
                  <select 
                    name="service"
                    required
                    className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green focus:border-matrix-green focus:outline-none transition-colors duration-300 font-mono"
                  >
                    <option value="">SELECT_SERVICE</option>
                    <option value="social_media">SOCIAL_MEDIA_MARKETING</option>
                    <option value="whatsapp">WHATSAPP_BUSINESS</option>
                    <option value="seo">SEO_&_SEARCH_MARKETING</option>
                    <option value="ai_solutions">AI_SOLUTIONS</option>
                    <option value="ecommerce">E_COMMERCE_SOLUTIONS</option>
                    <option value="web_development">WEB_&_APP_DEVELOPMENT</option>
                    <option value="content_marketing">CONTENT_MARKETING</option>
                    <option value="lead_generation">LEAD_GENERATION</option>
                    <option value="other">OTHER</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="TELL_US_ABOUT_YOUR_PROJECT"
                    rows={4}
                    required
                    className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 focus:border-matrix-green focus:outline-none transition-colors duration-300 resize-none font-mono"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-matrix-green text-black hover:bg-matrix-green/80 px-8 py-4 rounded-lg text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  SEND_TRANSMISSION
                </Button>
              </form>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-matrix-green/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-matrix-green/20 border border-matrix-green rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-matrix-green" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-mono text-matrix-cyan">
                    NOWHERE
                  </h1>
                  <p className="text-xs text-matrix-green/60 font-mono">DIGITAL_MATRIX</p>
                </div>
              </div>
              <p className="text-matrix-green/60 mb-4 max-w-md font-mono">
                LEADING_DIGITAL_MARKETING_AGENCY_IN_DUBAI_UAE - PIONEERING_THE_FUTURE_OF_DIGITAL_EXCELLENCE
              </p>
              <div className="flex space-x-4">
                {[Globe, MessageCircle, Mail, Phone].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-black border border-matrix-green/30 rounded-full flex items-center justify-center hover:bg-matrix-green/10 hover:border-matrix-green transition-colors duration-300 cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-matrix-green" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 font-mono text-matrix-green">SERVICES</h3>
              <ul className="space-y-2 text-matrix-green/60 font-mono text-sm">
                <li>SOCIAL_MEDIA_MARKETING</li>
                <li>WHATSAPP_BUSINESS</li>
                <li>WEB_&_APP_DEVELOPMENT</li>
                <li>AI_AGENTS_INTEGRATION</li>
                <li>LEAD_GENERATION</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 font-mono text-matrix-green">COMPANY</h3>
              <ul className="space-y-2 text-matrix-green/60 font-mono text-sm">
                <li>ABOUT_US</li>
                <li>OUR_TEAM</li>
                <li>PORTFOLIO</li>
                <li>CAREERS</li>
                <li>CONTACT</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-matrix-green/20 mt-8 pt-8 text-center text-matrix-green/60 font-mono">
            <p>&copy; 2025 NOWHERE_DIGITAL_MATRIX. ALL_RIGHTS_RESERVED. | DUBAI_UAE</p>
          </div>
        </div>
      </footer>

      {/* Advanced Features */}
      <MatrixChatSystem />
    </MobileMatrixOptimizer>
  );
};

export default NowhereDigitalWebsite;
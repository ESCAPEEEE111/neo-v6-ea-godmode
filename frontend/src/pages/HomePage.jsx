import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Rocket, Globe, BarChart3, Shield, Brain } from 'lucide-react';
import { stats, partnerBrands } from '../data/mock';
import MobileMatrixOptimizer from '../components/MobileMatrixOptimizer';
import TerminalWindow from '../components/TerminalWindow';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const HomePage = () => {
  const [terminalText, setTerminalText] = useState('');
  const [isVisible, setIsVisible] = useState({});

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

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background without animations */}
      <div className="fixed inset-0 z-0 bg-matrix-gradient-dark" />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fadeInLeft">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-matrix-green/20 to-matrix-cyan/20 text-matrix-green border-matrix-green/40 font-body animate-scaleIn">
                🚀 #1 Digital Marketing Agency in Dubai
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-heading leading-tight animate-fadeInUp">
                <span className="matrix-text-bright animate-glow">
                  DIGITAL
                </span>
                <br />
                <span className="text-white">
                  SUPREMACY
                </span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-matrix-green/80 font-body leading-relaxed animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Transform your business with AI-powered digital marketing solutions. 
              <span className="text-matrix-bright-cyan font-semibold"> 500+ successful projects</span> in Dubai & UAE.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <Link to="/ai-solver">
                <Button className="btn-matrix hover-lift font-heading px-8 py-4 text-lg">
                  🧠 START YOUR PROJECT
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/platform">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 hover-scale font-body font-bold px-8 py-4 text-lg">
                  📊 VIEW PORTFOLIO
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 text-sm font-body animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                <span className="text-matrix-green/80">Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                <span className="text-matrix-green/80">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                <span className="text-matrix-green/80">UAE Specialists</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fadeInRight">
            <TerminalWindow title="MISSION_BRIEFING.txt" className="hover-glow">
              <p className="text-matrix-green/80 leading-relaxed font-mono text-sm">
                &gt; Loading Digital Marketing Agency in Dubai, UAE
                <br />
                &gt; Custom Web & App Development Solutions
                <br />
                &gt; AI Agents Integration & Lead Generation  
                <br />
                &gt; UAE market domination protocols active
                <br />
                &gt; <span className="text-matrix-bright-cyan animate-glow">STATUS: READY_FOR_DEPLOYMENT</span>
              </p>
            </TerminalWindow>

            <TerminalWindow title="SYSTEM_CAPABILITIES.exe" className="hover-glow">
              <div className="grid grid-cols-3 gap-4 p-4">
                {[
                  { icon: Globe, label: "WEB_DEV" },
                  { icon: Brain, label: "MOBILE" },
                  { icon: Rocket, label: "AI_POWERED" },
                  { icon: BarChart3, label: "ANALYTICS" },
                  { icon: Shield, label: "SECURITY" },
                  { icon: Zap, label: "PERFORMANCE" }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="text-center animate-float hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                      <IconComponent className="w-8 h-8 text-matrix-cyan mx-auto mb-2 animate-pulse-glow" />
                      <span className="text-xs text-matrix-green/80 font-mono">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center font-mono text-matrix-bright-cyan text-sm animate-glow">
                AI_POWERED_SOLUTIONS
                <br />
                <span className="text-matrix-green/60 font-body">CUTTING_EDGE_TECHNOLOGY_MEETS_CREATIVE_EXCELLENCE</span>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-animate className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 font-heading ${isVisible.stats ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <span className="matrix-text-bright animate-glow">
                PROVEN_RESULTS
              </span>
            </h2>
            <p className={`text-xl text-matrix-green/80 max-w-3xl mx-auto font-body ${isVisible.stats ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              DATA_DRIVEN_SUCCESS | UAE_MARKET_LEADERS | CLIENT_SATISFACTION_GUARANTEED
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group modern-card hover-lift ${isVisible.stats ? 'animate-scaleIn' : 'opacity-0'}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="p-8">
                  <div className="text-4xl lg:text-6xl font-bold text-matrix-bright-cyan mb-2 font-heading group-hover:text-white transition-colors duration-300 animate-glow">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-matrix-green/80 font-body">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section id="services" data-animate className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 font-heading ${isVisible.services ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <span className="matrix-text-bright animate-glow">
                CORE_SERVICES
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Brain,
                title: "AI_AUTOMATION",
                description: "Intelligent business automation and AI-powered solutions"
              },
              {
                icon: Globe,
                title: "DIGITAL_ECOSYSTEM",
                description: "Complete digital transformation and web solutions"
              },
              {
                icon: BarChart3,
                title: "MARKETING_INTELLIGENCE",
                description: "Data-driven marketing and advanced analytics"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className={`modern-card hover-lift p-8 text-center ${isVisible.services ? 'animate-fadeInUp' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                  <IconComponent className="w-12 h-12 text-matrix-cyan mb-4 mx-auto animate-float hover-scale" />
                  <h3 className="text-xl font-bold text-matrix-green mb-2 font-heading">{service.title}</h3>
                  <p className="text-matrix-green/70 font-body text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button className="btn-matrix hover-lift font-heading px-8 py-4 text-lg">
                EXPLORE_ALL_SERVICES
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" data-animate className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`modern-card hover-glow p-12 ${isVisible.cta ? 'animate-scaleIn' : 'opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-heading">
              <span className="text-matrix-green">READY_TO_DOMINATE</span>
              <br />
              <span className="text-white">THE_DIGITAL_SPACE?</span>
            </h2>
            
            <p className="text-xl text-matrix-green/80 mb-8 font-body">
              Let our AI analyze your business challenges and create a custom solution
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-solver">
                <Button className="btn-matrix hover-lift font-heading px-8 py-4 text-lg">
                  🧠 GET_AI_ANALYSIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 hover-scale font-body font-bold px-8 py-4 text-lg">
                  📞 CONTACT_EXPERTS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileMatrixOptimizer>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { 
  Brain, Zap, Globe, ShoppingCart, VrHeadset, BarChart3, 
  Rocket, Star, ArrowRight, CheckCircle, Settings, 
  TrendingUp, Users, DollarSign, Clock, Shield, 
  Smartphone, Cloud, Database, Cpu, Network, Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const UltimatePlatformDashboard = ({ className = "" }) => {
  const [activeCategory, setActiveCategory] = useState('AI_POWERED_AUTOMATION');
  const [selectedService, setSelectedService] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState({
    aiInteractions: 1247583,
    automatedProcesses: 45892,
    clientSatisfaction: 99.7,
    globalReach: 147
  });

  // Real-time stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        aiInteractions: prev.aiInteractions + Math.floor(Math.random() * 50),
        automatedProcesses: prev.automatedProcesses + Math.floor(Math.random() * 10),
        clientSatisfaction: 99.7 + (Math.random() * 0.3),
        globalReach: prev.globalReach + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const platformCategories = [
    {
      id: 'AI_POWERED_AUTOMATION',
      name: 'AI Automation',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Next-gen AI business automation',
      features: ['Custom AI Agents', 'Workflow Automation', 'Predictive Analytics']
    },
    {
      id: 'COMPLETE_DIGITAL_ECOSYSTEM', 
      name: 'Digital Ecosystem',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: '360° digital transformation',
      features: ['Web/App Development', 'Cloud Infrastructure', 'Cybersecurity']
    },
    {
      id: 'ADVANCED_MARKETING_INTELLIGENCE',
      name: 'Marketing Intelligence',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      description: 'AI-driven marketing optimization',
      features: ['Predictive Analytics', 'Omnichannel Campaigns', 'Customer Journey']
    },
    {
      id: 'FUTURE_COMMERCE_SOLUTIONS',
      name: 'Future Commerce',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      description: 'Next-gen e-commerce & fintech',
      features: ['Web3 Integration', 'Crypto Payments', 'NFT Marketplace']
    },
    {
      id: 'IMMERSIVE_EXPERIENCES',
      name: 'Metaverse & AR/VR',
      icon: VrHeadset,
      color: 'from-indigo-500 to-purple-500',
      description: 'Immersive technology solutions',
      features: ['AR/VR Apps', 'Metaverse Presence', 'Virtual Showrooms']
    },
    {
      id: 'INTELLIGENT_DATA_ECOSYSTEM',
      name: 'Data Intelligence',
      icon: Database,
      color: 'from-teal-500 to-cyan-500',
      description: 'AI-driven data analytics',
      features: ['ML Models', 'Predictive Intelligence', 'Big Data Processing']
    }
  ];

  const technologyStack = [
    { name: 'AI/ML', icon: Brain, level: 100 },
    { name: 'Cloud Computing', icon: Cloud, level: 98 },
    { name: 'Blockchain/Web3', icon: Network, level: 95 },
    { name: 'Mobile Development', icon: Smartphone, level: 100 },
    { name: 'Cybersecurity', icon: Shield, level: 99 },
    { name: 'IoT Integration', icon: Cpu, level: 92 },
    { name: 'Quantum Computing', icon: Zap, level: 85 },
    { name: 'AR/VR/XR', icon: VrHeadset, level: 96 }
  ];

  const globalCapabilities = [
    {
      region: 'Middle East & UAE',
      coverage: '100%',
      specialties: ['Arabic Localization', 'Cultural Marketing', 'Islamic Finance Integration'],
      clients: 500
    },
    {
      region: 'Asia Pacific',
      coverage: '85%', 
      specialties: ['Multi-language Support', 'Regional Compliance', 'Local Partnerships'],
      clients: 320
    },
    {
      region: 'Europe & Americas',
      coverage: '78%',
      specialties: ['GDPR Compliance', 'Enterprise Solutions', 'Global Standards'],
      clients: 180
    },
    {
      region: 'Africa',
      coverage: '65%',
      specialties: ['Mobile-first Solutions', 'Emerging Markets', 'Fintech Innovation'],
      clients: 95
    }
  ];

  return (
    <section className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono mb-4 px-6 py-2">
            🚀 THE ULTIMATE DIGITAL PLATFORM
          </Badge>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan via-matrix-bright-cyan to-matrix-teal">
              DIGITAL_SUPREMACY_PLATFORM
            </span>
          </h2>
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed">
            The world's most comprehensive, AI-powered, future-ready digital services ecosystem. 
            From automation to metaverse - we are your one-stop solution for digital transformation.
          </p>
        </div>

        {/* Real-time Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400 font-mono">{realTimeStats.aiInteractions.toLocaleString()}</div>
              <div className="text-sm text-matrix-green/70 font-mono">AI Interactions Today</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-cyan-400 font-mono">{realTimeStats.automatedProcesses.toLocaleString()}</div>
              <div className="text-sm text-matrix-green/70 font-mono">Processes Automated</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-emerald-400 font-mono">{realTimeStats.clientSatisfaction.toFixed(1)}%</div>
              <div className="text-sm text-matrix-green/70 font-mono">Client Satisfaction</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-orange-400 font-mono">{realTimeStats.globalReach}</div>
              <div className="text-sm text-matrix-green/70 font-mono">Countries Served</div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Categories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-matrix-cyan font-mono mb-8 text-center">
            COMPREHENSIVE_SERVICE_ECOSYSTEM
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformCategories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-br from-matrix-cyan/20 to-matrix-bright-cyan/10 border-matrix-bright-cyan shadow-2xl shadow-matrix-cyan/20' 
                      : 'bg-black/60 border-matrix-dark-cyan/40 hover:border-matrix-cyan/60'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-4 flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-matrix-bright-cyan font-mono text-lg">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-matrix-green/70 font-mono text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-matrix-cyan flex-shrink-0" />
                          <span className="text-matrix-green/80 font-mono text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full mt-6 font-mono transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black'
                          : 'bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10'
                      }`}
                    >
                      {isActive ? 'EXPLORE SERVICES' : 'LEARN MORE'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Stack Visualization */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-matrix-cyan font-mono mb-8 text-center">
            ADVANCED_TECHNOLOGY_STACK
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <Card key={index} className="bg-black/60 border-matrix-dark-cyan/40 hover:border-matrix-cyan/60 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="w-6 h-6 text-matrix-cyan" />
                      <span className="font-mono text-matrix-bright-cyan font-semibold">{tech.name}</span>
                    </div>
                    
                    <div className="w-full bg-matrix-dark-cyan/20 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${tech.level}%` }}
                      />
                    </div>
                    
                    <div className="text-right">
                      <span className="text-matrix-cyan font-mono text-sm font-bold">{tech.level}%</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Global Capabilities */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-matrix-cyan font-mono mb-8 text-center">
            GLOBAL_REACH_&_CAPABILITIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalCapabilities.map((region, index) => (
              <Card key={index} className="bg-gradient-to-br from-black/80 to-matrix-dark-cyan/20 border-matrix-cyan/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-matrix-bright-cyan font-mono">{region.region}</CardTitle>
                    <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono">
                      {region.coverage}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-matrix-cyan font-mono">{region.clients}</div>
                      <div className="text-xs text-matrix-green/70 font-mono">Active Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-matrix-cyan font-mono">24/7</div>
                      <div className="text-xs text-matrix-green/70 font-mono">Local Support</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {region.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-matrix-cyan flex-shrink-0" />
                        <span className="text-matrix-green/80 font-mono text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ultimate CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-matrix-dark-cyan/20 via-matrix-cyan/10 to-matrix-bright-cyan/20 rounded-3xl p-12 border border-matrix-cyan/30">
            <h3 className="text-4xl font-bold text-matrix-bright-cyan font-mono mb-6">
              READY_TO_DOMINATE_THE_DIGITAL_FUTURE?
            </h3>
            <p className="text-xl text-matrix-cyan/80 font-mono mb-8 max-w-3xl mx-auto">
              Join the digital revolution with the most comprehensive, AI-powered, future-ready platform ever created. 
              Your competitors won't know what hit them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-gradient-to-r from-matrix-cyan via-matrix-bright-cyan to-matrix-teal text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan px-12 py-4 text-xl font-mono font-bold transition-all duration-300 transform hover:scale-105">
                <Rocket className="w-6 h-6 mr-3" />
                START_DIGITAL_TRANSFORMATION
              </Button>
              <Button variant="outline" className="border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 px-12 py-4 text-xl font-mono">
                <Users className="w-6 h-6 mr-3" />
                SCHEDULE_STRATEGY_SESSION
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-mono text-matrix-green/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                <span>Free Consultation & Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-matrix-cyan" />
                <span>24/7 Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UltimatePlatformDashboard;
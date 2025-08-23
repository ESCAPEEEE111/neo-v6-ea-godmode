import React, { useState } from 'react';
import { ArrowRight, Star, DollarSign, Clock, Users, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ModernServicesShowcase = ({ services, className = "" }) => {
  const [hoveredService, setHoveredService] = useState(null);

  const getIconComponent = (iconName) => {
    const iconMap = {
      'Megaphone': '📢',
      'MessageCircle': '💬',
      'Globe': '🌍',
      'Search': '🔍',
      'Camera': '📸',
      'ShoppingBag': '🛍️',
      'Brain': '🧠',
      'BarChart3': '📊'
    };
    return iconMap[iconName] || '🚀';
  };

  const getPriceRange = (service) => {
    if (!service.pricing) return 'Custom Quote';
    const prices = Object.values(service.pricing);
    const minPrice = Math.min(...prices.map(p => parseInt(p.price.replace(/[^0-9]/g, ''))));
    const maxPrice = Math.max(...prices.map(p => parseInt(p.price.replace(/[^0-9]/g, ''))));
    return `AED ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;
  };

  const getPopularPlan = (service) => {
    if (!service.pricing) return null;
    return Object.values(service.pricing).find(plan => plan.popular) || 
           Object.values(service.pricing)[1]; // Default to middle plan
  };

  return (
    <section className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-matrix-cyan/20 text-matrix-cyan border-matrix-cyan/40 font-mono mb-4">
            🎯 Our Digital Arsenal
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono text-matrix-cyan">
            COMPREHENSIVE_SERVICES
          </h2>
          <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
            From AI-powered solutions to comprehensive digital strategies - we've got your digital transformation covered
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isHovered = hoveredService === service.id;
            const popularPlan = getPopularPlan(service);
            
            return (
              <Card
                key={service.id}
                className={`group relative overflow-hidden transition-all duration-500 cursor-pointer ${
                  isHovered 
                    ? 'bg-gradient-to-br from-matrix-dark-cyan/30 to-black border-matrix-bright-cyan shadow-2xl shadow-matrix-cyan/20 scale-105' 
                    : 'bg-black/60 border-matrix-dark-cyan/40 hover:border-matrix-cyan/60'
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-matrix-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Header */}
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-matrix-cyan/20 to-matrix-dark-cyan/20 flex items-center justify-center text-2xl transition-transform duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`}>
                        {getIconComponent(service.icon)}
                      </div>
                      {popularPlan && (
                        <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    {/* Price Range */}
                    <div className="text-right">
                      <div className="text-sm font-mono text-matrix-cyan/80">Starting from</div>
                      <div className="text-lg font-bold font-mono text-matrix-bright-cyan">
                        {getPriceRange(service)}
                      </div>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-mono text-matrix-bright-cyan group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                {/* Content */}
                <CardContent className="relative z-10">
                  {/* Key Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-matrix-cyan flex-shrink-0" />
                        <span className="text-matrix-green/80 font-mono text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Stats */}
                  {service.specifications && (
                    <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-black/30 rounded-lg border border-matrix-dark-cyan/20">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-matrix-cyan mx-auto mb-1" />
                        <div className="text-xs font-mono text-matrix-green/80">Delivery</div>
                        <div className="text-sm font-mono text-matrix-bright-cyan">{service.specifications.deliveryTime}</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-5 h-5 text-matrix-cyan mx-auto mb-1" />
                        <div className="text-xs font-mono text-matrix-green/80">Languages</div>
                        <div className="text-sm font-mono text-matrix-bright-cyan">{service.specifications.languages?.length || 'Multi'}</div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Button 
                      className={`flex-1 font-mono transition-all duration-300 ${
                        isHovered 
                          ? 'bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black'
                          : 'bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10'
                      }`}
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 font-mono"
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-matrix-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-matrix-dark-cyan/20 to-matrix-cyan/10 rounded-2xl p-8 border border-matrix-cyan/30">
            <h3 className="text-2xl font-bold text-matrix-bright-cyan font-mono mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-matrix-cyan/80 font-mono mb-6">
              Every business is unique. Let's discuss your specific requirements and create a tailored digital strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal px-8 py-3 font-mono font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 px-8 py-3 font-mono">
                <DollarSign className="w-5 h-5 mr-2" />
                View All Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServicesShowcase;
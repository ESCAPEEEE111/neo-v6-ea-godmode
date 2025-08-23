import React, { useState } from 'react';
import { Check, Star, ArrowRight, Zap, Crown, Rocket } from 'lucide-react';
import { services } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ServicesPricingSection = ({ className = "" }) => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const planIcons = {
    basic: Zap,
    premium: Star,
    enterprise: Crown
  };

  const planColors = {
    basic: 'from-matrix-dark-cyan to-matrix-cyan',
    premium: 'from-matrix-cyan to-matrix-bright-cyan',
    enterprise: 'from-matrix-bright-cyan to-matrix-teal'
  };

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

  return (
    <section id="pricing" className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
              SERVICE_PRICING
            </span>
          </h2>
          <p className="text-xl text-matrix-cyan/80 max-w-3xl mx-auto font-mono">
            CHOOSE_YOUR_DIGITAL_DOMINANCE_PACKAGE | TRANSPARENT_PRICING
          </p>
        </div>

        {/* Service Selector */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-matrix-cyan font-mono mb-6 text-center">
            SELECT_SERVICE_TYPE:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 font-mono text-sm ${
                  selectedService.id === service.id
                    ? 'border-matrix-bright-cyan bg-gradient-to-br from-matrix-dark-cyan/20 to-matrix-cyan/10 text-matrix-bright-cyan shadow-lg'
                    : 'border-matrix-dark-cyan/30 text-matrix-cyan hover:border-matrix-cyan/50 hover:bg-matrix-dark-cyan/10'
                }`}
              >
                <div className="text-2xl mb-2">{getIconComponent(service.icon)}</div>
                <div className="font-semibold text-xs leading-tight">{service.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Service Info */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-black/70 to-matrix-dark-cyan/20 border-matrix-cyan/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-matrix-bright-cyan font-mono flex items-center gap-3">
                <span className="text-2xl">{getIconComponent(selectedService.icon)}</span>
                {selectedService.title}
              </CardTitle>
              <CardDescription className="text-matrix-cyan/80 font-mono">
                {selectedService.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-matrix-bright-cyan font-mono text-sm mb-1">DELIVERY_TIME:</div>
                  <div className="text-matrix-cyan/80 font-mono text-xs">{selectedService.specifications?.deliveryTime}</div>
                </div>
                <div>
                  <div className="text-matrix-bright-cyan font-mono text-sm mb-1">REVISIONS:</div>
                  <div className="text-matrix-cyan/80 font-mono text-xs">{selectedService.specifications?.revisions}</div>
                </div>
                <div>
                  <div className="text-matrix-bright-cyan font-mono text-sm mb-1">LANGUAGES:</div>
                  <div className="text-matrix-cyan/80 font-mono text-xs">
                    {selectedService.specifications?.languages?.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-matrix-bright-cyan font-mono text-sm mb-1">PLATFORMS:</div>
                  <div className="text-matrix-cyan/80 font-mono text-xs">
                    {selectedService.specifications?.platforms?.slice(0, 2).join(', ')}...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(selectedService.pricing || {}).map(([planType, plan]) => {
            const IconComponent = planIcons[planType];
            const isSelected = selectedPlan === planType;
            const isPopular = planType === 'premium';
            
            return (
              <Card
                key={planType}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isSelected
                    ? 'border-matrix-bright-cyan bg-gradient-to-br from-black/80 to-matrix-dark-cyan/30 shadow-2xl shadow-matrix-cyan/20'
                    : 'border-matrix-dark-cyan/40 bg-black/60 hover:border-matrix-cyan/60'
                }`}
                onClick={() => setSelectedPlan(planType)}
              >
                {isPopular && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono text-xs px-4 py-1">
                      🔥 MOST_POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${planColors[planType]} flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-matrix-bright-cyan font-mono text-xl">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-matrix-cyan font-mono">{plan.price}</span>
                    <span className="text-matrix-cyan/60 font-mono">{plan.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-matrix-bright-cyan flex-shrink-0" />
                        <span className="text-matrix-cyan/90 font-mono text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className={`w-full mt-6 font-mono font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal'
                        : 'bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        SELECTED_PLAN
                      </>
                    ) : (
                      <>
                        SELECT_PLAN
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Specifications */}
        {selectedService.specifications && (
          <Card className="bg-gradient-to-br from-black/70 to-matrix-dark-cyan/20 border-matrix-cyan/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-matrix-bright-cyan font-mono">
                TECHNICAL_SPECIFICATIONS
              </CardTitle>
              <CardDescription className="text-matrix-cyan/80 font-mono">
                Detailed specifications for {selectedService.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(selectedService.specifications).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-matrix-bright-cyan font-mono text-sm mb-2 uppercase">
                      {key.replace(/([A-Z])/g, '_$1').toUpperCase()}:
                    </div>
                    <div className="text-matrix-cyan/80 font-mono text-sm">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-matrix-dark-cyan/20 to-matrix-cyan/10 rounded-2xl p-8 border border-matrix-cyan/30">
            <h3 className="text-2xl font-bold text-matrix-bright-cyan font-mono mb-4">
              READY_TO_DOMINATE_DIGITAL_SPACE?
            </h3>
            <p className="text-matrix-cyan/80 font-mono mb-6">
              Get started with {selectedService.title} - {selectedService.pricing?.[selectedPlan]?.name} plan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal px-8 py-3 font-mono font-semibold">
                <Rocket className="w-5 h-5 mr-2" />
                START_PROJECT
              </Button>
              <Button variant="outline" className="border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 px-8 py-3 font-mono">
                SCHEDULE_CONSULTATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPricingSection;
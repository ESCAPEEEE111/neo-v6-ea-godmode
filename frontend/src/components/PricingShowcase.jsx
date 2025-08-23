import React, { useState } from 'react';
import { Star, Check, ArrowRight, Sparkles, Crown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const PricingShowcase = ({ className = "" }) => {
  const [selectedService, setSelectedService] = useState('social_media');
  
  const showcaseServices = {
    social_media: {
      name: "Social Media Marketing",
      icon: "📱",
      description: "Complete social media domination across all platforms",
      plans: {
        starter: {
          name: "STARTER",
          price: "AED 2,999",
          popular: false,
          features: [
            "5 Social Media Platforms",
            "12 Posts per Month", 
            "Basic Analytics",
            "Community Management",
            "1 Campaign per Month"
          ]
        },
        professional: {
          name: "PROFESSIONAL", 
          price: "AED 5,999",
          popular: true,
          features: [
            "All Social Media Platforms",
            "25 Posts per Month",
            "Advanced Analytics", 
            "24/7 Community Management",
            "3 Campaigns per Month",
            "Influencer Outreach",
            "Paid Ads Management"
          ]
        },
        enterprise: {
          name: "ENTERPRISE",
          price: "AED 12,999", 
          popular: false,
          features: [
            "Unlimited Platforms",
            "50+ Posts per Month",
            "Real-time Analytics",
            "Dedicated Account Manager", 
            "Unlimited Campaigns",
            "Celebrity Influencer Network",
            "Advanced AI Targeting"
          ]
        }
      }
    },
    whatsapp: {
      name: "WhatsApp Business Solutions",
      icon: "💬", 
      description: "AI-powered WhatsApp automation for UAE market",
      plans: {
        starter: {
          name: "BASIC_BOT",
          price: "AED 1,999",
          popular: false,
          features: [
            "Basic Chatbot Setup",
            "500 Messages/Month",
            "Product Catalog (50 items)",
            "Order Management",
            "Basic Analytics"
          ]
        },
        professional: {
          name: "AI_POWERED", 
          price: "AED 4,999",
          popular: true,
          features: [
            "Advanced AI Chatbot",
            "5,000 Messages/Month",
            "Unlimited Product Catalog",
            "Payment Gateway Integration",
            "Multi-language Support",
            "CRM Integration",
            "Advanced Analytics"
          ]
        },
        enterprise: {
          name: "ENTERPRISE_AI",
          price: "AED 9,999",
          popular: false,
          features: [
            "Custom AI Assistant",
            "Unlimited Messages", 
            "Full E-commerce Integration",
            "Multi-agent Support",
            "API Integrations",
            "Custom Workflows",
            "24/7 Priority Support"
          ]
        }
      }
    },
    ai_solutions: {
      name: "AI Solutions",
      icon: "🤖",
      description: "Cutting-edge AI implementation for business automation",
      plans: {
        starter: {
          name: "AI_ASSISTANT", 
          price: "AED 5,999",
          popular: false,
          features: [
            "Basic AI Chatbot",
            "1,000 Conversations/Month",
            "Pre-trained Models",
            "Text-only Interactions",
            "Basic Analytics"
          ]
        },
        professional: {
          name: "AI_INTELLIGENCE",
          price: "AED 12,999",
          popular: true,
          features: [
            "Advanced AI System",
            "10,000 Conversations/Month", 
            "Custom Model Training",
            "Voice & Text Interactions",
            "Predictive Analytics",
            "Multi-language Support",
            "API Integrations"
          ]
        },
        enterprise: {
          name: "AI_SUPREMACY",
          price: "AED 24,999",
          popular: false,
          features: [
            "Enterprise AI Platform",
            "Unlimited Conversations",
            "Custom AI Development",
            "Voice, Text, and Visual AI",
            "Machine Learning Models", 
            "Real-time Analytics",
            "Dedicated AI Engineer"
          ]
        }
      }
    }
  };

  const planIcons = {
    starter: Zap,
    professional: Star, 
    enterprise: Crown
  };

  return (
    <section className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
              TRANSPARENT_PRICING
            </span>
          </h2>
          <p className="text-xl text-matrix-cyan/80 max-w-3xl mx-auto font-mono">
            CHOOSE_YOUR_DIGITAL_DOMINANCE_LEVEL | FULL_SPECIFICATIONS_INCLUDED
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/50 p-2 rounded-xl border border-matrix-cyan/30">
            {Object.entries(showcaseServices).map(([key, service]) => (
              <button
                key={key}
                onClick={() => setSelectedService(key)}
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                  selectedService === key
                    ? 'bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black'
                    : 'text-matrix-cyan hover:text-matrix-bright-cyan'
                }`}
              >
                <span className="mr-2">{service.icon}</span>
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Service Info */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-matrix-bright-cyan font-mono mb-4">
            {showcaseServices[selectedService].name}
          </h3>
          <p className="text-matrix-cyan/80 font-mono max-w-2xl mx-auto">
            {showcaseServices[selectedService].description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(showcaseServices[selectedService].plans).map(([planKey, plan]) => {
            const IconComponent = planIcons[planKey];
            
            return (
              <Card
                key={planKey}
                className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'border-matrix-bright-cyan bg-gradient-to-br from-black/80 to-matrix-dark-cyan/30 shadow-2xl shadow-matrix-cyan/20'
                    : 'border-matrix-dark-cyan/40 bg-black/60 hover:border-matrix-cyan/60'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono text-xs px-6 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      MOST_POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                    planKey === 'starter' ? 'from-matrix-dark-cyan to-matrix-cyan' :
                    planKey === 'professional' ? 'from-matrix-cyan to-matrix-bright-cyan' :
                    'from-matrix-bright-cyan to-matrix-teal'
                  } flex items-center justify-center`}>
                    <IconComponent className="w-10 h-10 text-black" />
                  </div>
                  <CardTitle className="text-matrix-bright-cyan font-mono text-xl mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-matrix-cyan font-mono">{plan.price}</span>
                    <span className="text-matrix-cyan/60 font-mono">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-matrix-bright-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-matrix-cyan/90 font-mono text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className={`w-full mt-8 font-mono font-semibold py-3 transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal'
                        : 'bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10'
                    }`}
                  >
                    {plan.popular ? (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        CHOOSE_POPULAR
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

        {/* Features Comparison */}
        <Card className="bg-gradient-to-br from-black/70 to-matrix-dark-cyan/20 border-matrix-cyan/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-matrix-bright-cyan font-mono text-center text-2xl">
              FULL_SPECIFICATIONS_MATRIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-matrix-bright-cyan font-mono text-lg mb-4">DELIVERY_TIME</div>
                <div className="text-matrix-cyan/80 font-mono">3-5 Business Days</div>
              </div>
              <div>
                <div className="text-matrix-bright-cyan font-mono text-lg mb-4">REVISIONS</div>
                <div className="text-matrix-cyan/80 font-mono">Unlimited</div>
              </div>
              <div>
                <div className="text-matrix-bright-cyan font-mono text-lg mb-4">LANGUAGES</div>
                <div className="text-matrix-cyan/80 font-mono">Arabic, English, Hindi, Urdu</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-matrix-dark-cyan/20 to-matrix-cyan/10 rounded-2xl p-8 border border-matrix-cyan/30">
            <h3 className="text-3xl font-bold text-matrix-bright-cyan font-mono mb-4">
              READY_TO_LAUNCH?
            </h3>
            <p className="text-matrix-cyan/80 font-mono mb-8 text-lg">
              Start your digital transformation today with transparent pricing and full specifications
            </p>
            <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal px-12 py-4 text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-5 h-5 mr-2" />
              INITIATE_PROJECT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingShowcase;
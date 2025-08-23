import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight, MapPin, Building, Verified } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const EnhancedTestimonials = ({ testimonials, className = "" }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-matrix-green/30'}`} 
      />
    ));
  };

  const getCompanyIcon = (company) => {
    if (company.toLowerCase().includes('hotel')) return '🏨';
    if (company.toLowerCase().includes('fashion')) return '👗';
    if (company.toLowerCase().includes('tech')) return '💻';
    if (company.toLowerCase().includes('real estate')) return '🏢';
    if (company.toLowerCase().includes('restaurant')) return '🍽️';
    return '🏢';
  };

  return (
    <section className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-matrix-cyan/20 text-matrix-cyan border-matrix-cyan/40 font-mono mb-4">
            ⭐ Client Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono text-matrix-cyan">
            VERIFIED_RESULTS
          </h2>
          <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
            Real businesses, real growth, real success - see what our clients say about their digital transformation
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-black/80 to-matrix-dark-cyan/20 border-matrix-cyan/40 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-matrix-cyan/20 to-matrix-bright-cyan/20 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-matrix-cyan" />
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-center text-matrix-green/90 font-mono leading-relaxed mb-8">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-matrix-cyan/30 to-matrix-bright-cyan/30 rounded-full flex items-center justify-center text-2xl">
                    {getCompanyIcon(testimonials[currentTestimonial].company)}
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <h4 className="text-lg font-bold text-matrix-bright-cyan font-mono">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <Verified className="w-5 h-5 text-matrix-cyan" />
                    </div>
                    <div className="flex items-center gap-2 text-matrix-green/70 font-mono text-sm">
                      <Building className="w-4 h-4" />
                      <span>{testimonials[currentTestimonial].company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-matrix-green/60 font-mono text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>Dubai, UAE</span>
                    </div>
                  </div>
                </div>

                {/* Results Badge */}
                <div className="bg-gradient-to-r from-matrix-cyan/20 to-matrix-bright-cyan/20 rounded-lg p-4 border border-matrix-cyan/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-matrix-bright-cyan font-mono">+300%</div>
                    <div className="text-xs text-matrix-green/70 font-mono">Growth Achieved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-matrix-cyan w-8' 
                  : 'bg-matrix-green/30 hover:bg-matrix-green/50'
              }`}
            />
          ))}
        </div>

        {/* Additional Testimonials Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            if (index === currentTestimonial) return null;
            
            return (
              <Card 
                key={index}
                className="bg-black/40 border-matrix-dark-cyan/30 hover:border-matrix-cyan/50 transition-all duration-300 cursor-pointer group"
                onClick={() => goToTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-matrix-cyan/20 to-matrix-bright-cyan/20 rounded-full flex items-center justify-center text-lg">
                      {getCompanyIcon(testimonial.company)}
                    </div>
                    <div>
                      <h5 className="font-mono text-matrix-bright-cyan text-sm group-hover:text-white transition-colors">
                        {testimonial.name}
                      </h5>
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-matrix-green/70 font-mono text-sm line-clamp-3">
                    "{testimonial.text.substring(0, 100)}..."
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-matrix-dark-cyan/20 to-matrix-cyan/10 rounded-2xl p-8 border border-matrix-cyan/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-matrix-cyan font-mono">500+</div>
                <div className="text-matrix-green/70 font-mono text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-matrix-cyan font-mono">98%</div>
                <div className="text-matrix-green/70 font-mono text-sm">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-matrix-cyan font-mono">300%</div>
                <div className="text-matrix-green/70 font-mono text-sm">Avg. ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-matrix-cyan font-mono">24/7</div>
                <div className="text-matrix-green/70 font-mono text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
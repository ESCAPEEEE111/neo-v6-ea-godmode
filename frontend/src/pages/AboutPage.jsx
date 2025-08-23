import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Target } from 'lucide-react';
import { testimonials, stats } from '../data/mock';
import MobileMatrixOptimizer from '../components/MobileMatrixOptimizer';
import TerminalWindow from '../components/TerminalWindow';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const AboutPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gradient-to-r from-matrix-green/20 to-matrix-cyan/20 text-matrix-green border-matrix-green/40 font-mono mb-6 px-6 py-3">
            🏢 ABOUT NOWHERE DIGITAL
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
              DIGITAL_PIONEERS
            </span>
            <br />
            <span className="text-white">OF_THE_MATRIX</span>
          </h1>
          
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed mb-8">
            We are the UAE's leading digital marketing agency, specializing in AI-powered solutions 
            that transform businesses and dominate the digital landscape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-solver">
              <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold px-8 py-4 text-lg">
                🧠 EXPERIENCE_OUR_AI
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg">
                📞 JOIN_OUR_MISSION
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <TerminalWindow title="MISSION_STATEMENT.exe">
                <div className="space-y-4">
                  <h3 className="text-matrix-cyan font-mono font-bold text-lg">OUR_MISSION:</h3>
                  <p className="text-matrix-green/80 leading-relaxed font-mono text-sm">
                    &gt; Empower businesses with cutting-edge AI and digital solutions
                    <br />
                    &gt; Deliver measurable results that exceed expectations
                    <br />
                    &gt; Lead the digital transformation revolution in the UAE
                    <br />
                    &gt; <span className="text-matrix-bright-cyan">STATUS: MISSION_ACTIVE</span>
                  </p>
                </div>
              </TerminalWindow>
            </div>

            <div>
              <TerminalWindow title="VISION_2030.exe">
                <div className="space-y-4">
                  <h3 className="text-matrix-cyan font-mono font-bold text-lg">OUR_VISION:</h3>
                  <p className="text-matrix-green/80 leading-relaxed font-mono text-sm">
                    &gt; Become the #1 AI-powered digital agency globally
                    <br />
                    &gt; Pioneer next-generation metaverse marketing solutions
                    <br />
                    &gt; Transform 10,000+ businesses by 2030
                    <br />
                    &gt; <span className="text-matrix-bright-cyan">STATUS: VISION_LOADING...</span>
                  </p>
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 relative z-10 bg-gradient-to-r from-matrix-green/5 to-matrix-cyan/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                BY_THE_NUMBERS
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              Proven track record of digital excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300 text-center group">
                <CardContent className="p-8">
                  <div className="text-4xl lg:text-6xl font-bold text-matrix-bright-cyan mb-2 font-mono group-hover:text-white transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-matrix-green/80 font-mono">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                CORE_VALUES
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              The principles that guide our digital domination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group text-center">
              <Users className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-matrix-green font-mono font-bold mb-3 group-hover:text-white transition-colors">CLIENT_FIRST</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Every decision prioritizes client success and satisfaction
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group text-center">
              <Target className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-matrix-green font-mono font-bold mb-3 group-hover:text-white transition-colors">INNOVATION</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Continuously pushing boundaries with cutting-edge technology
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group text-center">
              <Award className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-matrix-green font-mono font-bold mb-3 group-hover:text-white transition-colors">EXCELLENCE</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Delivering exceptional quality in every project and interaction
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group text-center">
              <Star className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-matrix-green font-mono font-bold mb-3 group-hover:text-white transition-colors">INTEGRITY</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Transparent communication and honest business practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 relative z-10 bg-gradient-to-r from-matrix-green/5 to-matrix-cyan/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                CLIENT_TESTIMONIALS
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              What our clients say about working with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TerminalWindow title="CLIENT_FEEDBACK.log" className="min-h-[300px]">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-matrix-bright-cyan fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-matrix-green/90 font-mono leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="text-matrix-bright-cyan font-mono font-bold">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-matrix-green/70 font-mono text-sm">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-matrix-green/70 font-mono text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                WHY_CHOOSE_US
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              What sets us apart in the digital landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">AI_FIRST_APPROACH</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    We integrate artificial intelligence into every solution, ensuring your business stays ahead of the curve.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">UAE_MARKET_EXPERTISE</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Deep understanding of the UAE market, culture, and business landscape for maximum local impact.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">PROVEN_ROI</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Average client ROI of 300%+ within the first 6 months of engagement.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">24/7_SUPPORT</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Round-the-clock support and monitoring to ensure your digital presence never sleeps.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">FUTURE_READY_TECH</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Early adoption of emerging technologies like AR/VR, blockchain, and quantum computing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-matrix-cyan/20 rounded-full p-3 flex-shrink-0">
                  <div className="w-6 h-6 bg-matrix-cyan rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-matrix-cyan font-mono font-bold mb-2">TRANSPARENT_REPORTING</h3>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Real-time dashboards and detailed analytics so you always know your investment's performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-matrix-green/10 to-matrix-cyan/10 border border-matrix-green/30 rounded-lg p-12 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-matrix-green">READY_TO_JOIN</span>
              <br />
              <span className="text-white">OUR_SUCCESS_STORIES?</span>
            </h2>
            
            <p className="text-xl text-matrix-green/80 mb-8 font-mono">
              Let's discuss how we can transform your business with our AI-powered solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-solver">
                <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold px-8 py-4 text-lg">
                  🧠 GET_AI_CONSULTATION
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg">
                  📞 SCHEDULE_MEETING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileMatrixOptimizer>
  );
};

export default AboutPage;
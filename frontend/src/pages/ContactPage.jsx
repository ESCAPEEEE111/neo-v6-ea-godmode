import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, Globe, MessageSquare } from 'lucide-react';
import { contactInfo } from '../data/mock';
import MobileMatrixOptimizer from '../components/MobileMatrixOptimizer';
import TerminalWindow from '../components/TerminalWindow';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('SUCCESS! Your message has been transmitted to our digital command center. We will contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('CONNECTION ERROR. Please check your internet connection and try again.');
    }
  };

  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gradient-to-r from-matrix-green/20 to-matrix-cyan/20 text-matrix-green border-matrix-green/40 font-mono mb-6 px-6 py-3">
            📞 ESTABLISH DIGITAL CONNECTION
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
              READY_TO_JACK_IN
            </span>
            <br />
            <span className="text-white">TO_THE_MATRIX?</span>
          </h1>
          
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed mb-8">
            Connect with our digital experts and start your transformation journey. 
            We're standing by to decode your business challenges and architect your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-solver">
              <Button className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold px-8 py-4 text-lg">
                🧠 QUICK_AI_ANALYSIS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button 
              onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline" 
              className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg"
            >
              📝 SEND_MESSAGE
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                CONTACT_PROTOCOLS
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              Multiple channels to connect with our digital command center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <CardHeader className="text-center">
                <Phone className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
                <CardTitle className="text-matrix-green font-mono group-hover:text-white transition-colors">VOICE_CHANNEL</CardTitle>
                <CardDescription className="text-matrix-green/70 font-mono">Direct communication line</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-matrix-bright-cyan font-mono font-bold text-lg mb-2">{contactInfo.phone}</p>
                <p className="text-matrix-green/70 font-mono text-sm">Available 24/7 for urgent inquiries</p>
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
                <CardTitle className="text-matrix-green font-mono group-hover:text-white transition-colors">EMAIL_PROTOCOL</CardTitle>
                <CardDescription className="text-matrix-green/70 font-mono">Digital message transmission</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-matrix-bright-cyan font-mono font-bold text-lg mb-2">{contactInfo.email}</p>
                <p className="text-matrix-green/70 font-mono text-sm">Response within 4 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 text-matrix-cyan mx-auto mb-4 group-hover:text-white transition-colors" />
                <CardTitle className="text-matrix-green font-mono group-hover:text-white transition-colors">PHYSICAL_LOCATION</CardTitle>
                <CardDescription className="text-matrix-green/70 font-mono">Command center coordinates</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-matrix-bright-cyan font-mono font-bold text-sm mb-2">{contactInfo.address}</p>
                <p className="text-matrix-green/70 font-mono text-xs">Meeting by appointment only</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-matrix-green/20 rounded-lg p-6 text-center hover:border-matrix-cyan/40 transition-all duration-300">
              <Clock className="w-8 h-8 text-matrix-cyan mx-auto mb-3" />
              <h3 className="text-matrix-green font-mono font-bold mb-2">OPERATING_HOURS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Sun-Thu: 9:00-18:00 GST<br />
                Emergency: 24/7 Available
              </p>
            </div>

            <div className="bg-black/30 border border-matrix-green/20 rounded-lg p-6 text-center hover:border-matrix-cyan/40 transition-all duration-300">
              <Globe className="w-8 h-8 text-matrix-cyan mx-auto mb-3" />
              <h3 className="text-matrix-green font-mono font-bold mb-2">COVERAGE_AREA</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                UAE | GCC | MENA<br />
                Global remote services
              </p>
            </div>

            <div className="bg-black/30 border border-matrix-green/20 rounded-lg p-6 text-center hover:border-matrix-cyan/40 transition-all duration-300">
              <MessageSquare className="w-8 h-8 text-matrix-cyan mx-auto mb-3" />
              <h3 className="text-matrix-green font-mono font-bold mb-2">RESPONSE_TIME</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Urgent: &lt; 1 hour<br />
                Standard: &lt; 4 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 relative z-10 bg-gradient-to-r from-matrix-green/5 to-matrix-cyan/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
                <span className="text-matrix-green">
                  INITIATE_DIGITAL
                </span>
                <br />
                <span className="text-white">TRANSFORMATION</span>
              </h2>
              
              <TerminalWindow title="CONTACT_PROTOCOLS.exe" className="mb-8">
                <p className="text-matrix-green/80 leading-relaxed font-mono">
                  &gt; INITIATE_DIGITAL_TRANSFORMATION
                  <br />
                  &gt; COMPREHENSIVE_UAE_MARKET_SOLUTIONS
                  <br />
                  &gt; AI_POWERED_MULTILINGUAL_DOMINATION
                  <br />
                  &gt; <span className="text-matrix-bright-cyan">STATUS: READY_FOR_CONNECTION</span>
                </p>
              </TerminalWindow>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-matrix-green/20 border border-matrix-green p-3 rounded-full">
                    <Phone className="w-6 h-6 text-matrix-green" />
                  </div>
                  <div>
                    <p className="text-matrix-green/60 font-mono">DIRECT_LINE</p>
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
                  <label className="block text-matrix-cyan font-mono text-sm mb-2">NAME:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-matrix-green/30 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono focus:border-matrix-cyan focus:outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-matrix-cyan font-mono text-sm mb-2">EMAIL:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-matrix-green/30 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono focus:border-matrix-cyan focus:outline-none"
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-matrix-cyan font-mono text-sm mb-2">PHONE:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-matrix-green/30 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono focus:border-matrix-cyan focus:outline-none"
                    placeholder="+971 XX XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-matrix-cyan font-mono text-sm mb-2">SERVICE_REQUIRED:</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-matrix-green/30 rounded-lg px-4 py-3 text-matrix-green font-mono focus:border-matrix-cyan focus:outline-none"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="web_development">Web Development</option>
                    <option value="social_media">Social Media Marketing</option>
                    <option value="ai_solutions">AI Solutions</option>
                    <option value="lead_generation">Lead Generation</option>
                    <option value="ecommerce">E-commerce Solutions</option>
                    <option value="seo">SEO & Digital Marketing</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-matrix-cyan font-mono text-sm mb-2">MESSAGE:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-black/50 border border-matrix-green/30 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono resize-none focus:border-matrix-cyan focus:outline-none"
                    placeholder="Describe your project requirements, goals, and timeline..."
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold py-4 text-lg transition-all duration-300"
                >
                  TRANSMIT_MESSAGE
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-matrix-green/60 font-mono text-xs text-center">
                  &gt; MESSAGE_ENCRYPTION_ACTIVE | RESPONSE_WITHIN_24HRS
                </p>
              </form>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                FREQUENTLY_ASKED
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              Common queries about our digital services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">How quickly can you start my project?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Most projects begin within 48-72 hours after initial consultation and agreement. 
                    Urgent projects can start within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">Do you provide ongoing support?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Yes! All our packages include ongoing support, maintenance, and optimization. 
                    We offer 24/7 monitoring for critical systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">What makes your AI solutions unique?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Our AI solutions are custom-built for each client, trained on your specific data, 
                    and integrated seamlessly with your existing systems.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">Can you work with international clients?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Absolutely! While based in Dubai, we serve clients globally. 
                    Our team is experienced in working across different time zones and cultures.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">What's your typical project timeline?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Simple websites: 2-4 weeks. Complex platforms: 8-16 weeks. 
                    AI solutions: 4-12 weeks depending on complexity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-matrix-green/30 hover:border-matrix-cyan/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-cyan font-mono">Do you offer payment plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-matrix-green/80 font-mono text-sm">
                    Yes! We offer flexible payment plans including milestone-based payments, 
                    monthly subscriptions, and performance-based pricing models.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-matrix-green/10 to-matrix-cyan/10 border border-matrix-green/30 rounded-lg p-12 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-matrix-green">READY_TO_BEGIN</span>
              <br />
              <span className="text-white">YOUR_JOURNEY?</span>
            </h2>
            
            <p className="text-xl text-matrix-green/80 mb-8 font-mono">
              Don't let your competition get ahead. Start your digital transformation today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-cyan font-mono font-bold px-8 py-4 text-lg"
              >
                📝 SEND_MESSAGE_NOW
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Link to="/ai-solver">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg">
                  🧠 TRY_AI_ANALYSIS_FIRST
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileMatrixOptimizer>
  );
};

export default ContactPage;
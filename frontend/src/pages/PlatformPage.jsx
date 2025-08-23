import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import UltimatePlatformDashboard from '../components/UltimatePlatformDashboard';
import MobileMatrixOptimizer from '../components/MobileMatrixOptimizer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const PlatformPage = () => {
  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40 font-mono mb-6 px-6 py-3">
            🌐 ULTIMATE PLATFORM OVERVIEW
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              THE_ULTIMATE
            </span>
            <br />
            <span className="text-white">DIGITAL_PLATFORM</span>
          </h1>
          
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed mb-8">
            Experience our comprehensive ecosystem of AI-powered digital services, 
            real-time analytics, and cutting-edge technology solutions designed for the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-solver">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-mono font-bold px-8 py-4 text-lg">
                🧠 ANALYZE_MY_BUSINESS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/services">
              <Button variant="outline" className="border-matrix-cyan text-matrix-cyan hover:bg-matrix-cyan/10 font-mono font-bold px-8 py-4 text-lg">
                📋 VIEW_SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ultimate Platform Dashboard */}
      <UltimatePlatformDashboard />

      {/* Platform Benefits */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                PLATFORM_ADVANTAGES
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">RAPID_DEPLOYMENT</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Get your digital solutions deployed in weeks, not months. Our platform accelerates time-to-market.
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">AI_INTELLIGENCE</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Advanced AI algorithms analyze your business and provide intelligent recommendations for growth.
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">REAL_TIME_ANALYTICS</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Monitor performance, track ROI, and make data-driven decisions with our comprehensive analytics.
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">GLOBAL_SCALE</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Built for scale - from UAE startups to global enterprises. Our platform grows with your business.
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">ENTERPRISE_SECURITY</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Bank-level security protocols ensure your data and customer information remain protected.
              </p>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300 group">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-matrix-green mb-4 font-mono group-hover:text-white transition-colors">FUTURE_READY</h3>
              <p className="text-matrix-green/70 font-mono text-sm leading-relaxed">
                Stay ahead with emerging technologies: AR/VR, Blockchain, IoT, and next-gen AI integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-12 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-purple-300">READY_TO_EXPERIENCE</span>
              <br />
              <span className="text-white">THE_PLATFORM?</span>
            </h2>
            
            <p className="text-xl text-matrix-green/80 mb-8 font-mono">
              Let our AI analyze your specific needs and recommend the perfect solution
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-solver">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-mono font-bold px-8 py-4 text-lg">
                  🧠 GET_PERSONALIZED_ANALYSIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg">
                  📞 SCHEDULE_DEMO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileMatrixOptimizer>
  );
};

export default PlatformPage;
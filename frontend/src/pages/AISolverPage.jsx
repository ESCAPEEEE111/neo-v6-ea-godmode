import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AIProblemSolver from '../components/AIProblemSolver';
import MobileMatrixOptimizer from '../components/MobileMatrixOptimizer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const AISolverPage = () => {
  return (
    <MobileMatrixOptimizer className="min-h-screen bg-black text-matrix-green relative overflow-hidden">
      {/* Clean background */}
      <div className="fixed inset-0 z-0 bg-black" />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40 font-mono mb-6 px-6 py-3">
            🧠 AI-POWERED BUSINESS ANALYSIS
          </Badge>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              INTELLIGENT
            </span>
            <br />
            <span className="text-white">PROBLEM_SOLVER</span>
          </h1>
          
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed mb-8">
            Describe your business challenge, and our advanced AI will analyze your situation, 
            provide market insights, and recommend the perfect combination of services for maximum ROI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/platform">
              <Button variant="outline" className="border-matrix-cyan text-matrix-cyan hover:bg-matrix-cyan/10 font-mono font-bold px-6 py-3">
                📊 VIEW_PLATFORM_OVERVIEW
              </Button>
            </Link>
            
            <Link to="/services">
              <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-6 py-3">
                📋 BROWSE_SERVICES
              </Button>
            </Link>
          </div>

          {/* AI Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/30 border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-purple-300 font-mono font-bold mb-2">INTELLIGENT_ANALYSIS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Advanced AI algorithms analyze your business challenges and market position
              </p>
            </div>

            <div className="bg-black/30 border border-cyan-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-cyan-300 font-mono font-bold mb-2">MARKET_INSIGHTS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Real-time market analysis and industry-specific trends for your sector
              </p>
            </div>

            <div className="bg-black/30 border border-pink-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-pink-300 font-mono font-bold mb-2">STRATEGIC_SOLUTIONS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Customized recommendations with ROI projections and implementation timelines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Problem Solver Component */}
      <AIProblemSolver />

      {/* How It Works */}
      <section className="py-20 relative z-10 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                HOW_IT_WORKS
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              Our AI-powered analysis process in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold font-mono text-xl">1</span>
              </div>
              <h3 className="text-purple-300 font-mono font-bold mb-3">DESCRIBE_CHALLENGE</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Tell us about your business problem, industry, and goals in detail
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold font-mono text-xl">2</span>
              </div>
              <h3 className="text-cyan-300 font-mono font-bold mb-3">AI_ANALYSIS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Our AI analyzes your situation using market data and industry insights
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold font-mono text-xl">3</span>
              </div>
              <h3 className="text-green-300 font-mono font-bold mb-3">GET_RECOMMENDATIONS</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Receive customized solutions with ROI estimates and timelines
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold font-mono text-xl">4</span>
              </div>
              <h3 className="text-orange-300 font-mono font-bold mb-3">IMPLEMENT_SOLUTION</h3>
              <p className="text-matrix-green/70 font-mono text-sm">
                Work with our experts to implement the recommended strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan matrix-text-glow">
                AI_SUCCESS_STORIES
              </span>
            </h2>
            <p className="text-lg text-matrix-green/80 font-mono">
              Real results from businesses that used our AI analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-matrix-cyan font-mono font-bold mb-4">E-COMMERCE_SUCCESS</h3>
              <p className="text-matrix-green/70 font-mono text-sm mb-4">
                "Our AI recommended conversion optimization and chatbot integration. 
                Sales increased by 340% in 3 months."
              </p>
              <div className="text-matrix-bright-cyan font-mono font-bold">
                +340% Sales Growth
              </div>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-matrix-cyan font-mono font-bold mb-4">HEALTHCARE_INNOVATION</h3>
              <p className="text-matrix-green/70 font-mono text-sm mb-4">
                "AI suggested patient portal and appointment automation. 
                Reduced operational costs by 60%."
              </p>
              <div className="text-matrix-bright-cyan font-mono font-bold">
                -60% Operating Costs
              </div>
            </div>

            <div className="bg-black/60 border border-matrix-green/30 rounded-lg p-8 hover:border-matrix-cyan/60 transition-all duration-300">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-matrix-cyan font-mono font-bold mb-4">REAL_ESTATE_DIGITAL</h3>
              <p className="text-matrix-green/70 font-mono text-sm mb-4">
                "Virtual showrooms and AI lead scoring were game-changers. 
                Lead quality improved by 250%."
              </p>
              <div className="text-matrix-bright-cyan font-mono font-bold">
                +250% Lead Quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-12 backdrop-blur-sm">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-mono">
              <span className="text-purple-300">READY_FOR_AI</span>
              <br />
              <span className="text-white">TRANSFORMATION?</span>
            </h2>
            
            <p className="text-xl text-matrix-green/80 mb-8 font-mono">
              Join hundreds of businesses that have transformed their operations with our AI insights
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.querySelector('#ai-problem-solver')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-mono font-bold px-8 py-4 text-lg"
              >
                🧠 START_AI_ANALYSIS_NOW
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Link to="/contact">
                <Button variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10 font-mono font-bold px-8 py-4 text-lg">
                  💬 TALK_TO_EXPERT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileMatrixOptimizer>
  );
};

export default AISolverPage;
import React, { useState, useEffect } from 'react';
import { 
  Brain, MessageSquare, Lightbulb, Target, Zap, 
  CheckCircle, ArrowRight, Sparkles, Cpu, Network,
  Search, Filter, Sliders, BarChart3, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const AIProblemSolver = ({ className = "" }) => {
  const [userInput, setUserInput] = useState('');
  const [problemAnalysis, setProblemAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const industries = [
    { id: 'all', name: 'All Industries', icon: '🌐' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'finance', name: 'Finance/Fintech', icon: '💰' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'realestate', name: 'Real Estate', icon: '🏢' },
    { id: 'hospitality', name: 'Hospitality', icon: '🏨' },
    { id: 'technology', name: 'Technology', icon: '💻' }
  ];

  const budgetRanges = [
    { id: 'all', name: 'All Budgets', range: 'Any Budget' },
    { id: 'startup', name: 'Startup', range: 'AED 5K - 25K/month' },
    { id: 'growth', name: 'Growth', range: 'AED 25K - 75K/month' },
    { id: 'enterprise', name: 'Enterprise', range: 'AED 75K+/month' }
  ];

  const commonProblems = [
    {
      problem: "Need to increase online sales and conversions",
      industry: "ecommerce",
      solution: "AI-Powered E-commerce Optimization Suite",
      components: ["Predictive Analytics", "Personalization Engine", "Conversion Optimization", "Automated Marketing"],
      expectedROI: "150-300%",
      timeframe: "2-4 months"
    },
    {
      problem: "Want to automate customer service and support",
      industry: "all",
      solution: "Advanced AI Customer Service Platform",
      components: ["Multi-language AI Chatbots", "Voice Assistants", "Ticket Automation", "Sentiment Analysis"],
      expectedROI: "200-400%",
      timeframe: "1-2 months"
    },
    {
      problem: "Looking for better marketing ROI and attribution",
      industry: "all",
      solution: "AI Marketing Intelligence Platform",
      components: ["Advanced Attribution", "Predictive Analytics", "Campaign Optimization", "Customer Journey Mapping"],
      expectedROI: "180-350%",
      timeframe: "3-6 months"
    },
    {
      problem: "Need modern website and mobile app development",
      industry: "all",
      solution: "Complete Digital Transformation Suite",
      components: ["Custom Development", "Cloud Infrastructure", "Mobile Apps", "API Integration"],
      expectedROI: "120-250%",
      timeframe: "4-8 weeks"
    },
    {
      problem: "Want to enter the metaverse and virtual experiences",
      industry: "hospitality",
      solution: "Immersive Experience Platform", 
      components: ["AR/VR Development", "Metaverse Presence", "Virtual Showrooms", "3D Experiences"],
      expectedROI: "300-500%",
      timeframe: "6-12 weeks"
    }
  ];

  const analyzeUserProblem = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        userProblem: userInput,
        aiAnalysis: generateAIAnalysis(userInput),
        recommendedSolutions: getRecommendedSolutions(userInput),
        estimatedROI: "200-400%",
        implementationTime: "2-8 weeks",
        budgetRange: "AED 15,000 - 50,000/month",
        priorityLevel: "HIGH"
      };
      
      setProblemAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateAIAnalysis = (input) => {
    const analysisTemplates = [
      `Based on your input "${input}", I've identified this as a multi-faceted digital transformation challenge that requires our AI-powered automation suite combined with advanced marketing intelligence.`,
      `Your requirement "${input}" indicates a need for comprehensive digital optimization with emphasis on user experience and conversion optimization through our advanced platform.`,
      `The problem "${input}" suggests implementing our complete digital ecosystem solution with focus on automation, analytics, and customer engagement optimization.`
    ];
    
    return analysisTemplates[Math.floor(Math.random() * analysisTemplates.length)];
  };

  const getRecommendedSolutions = (input) => {
    // Simple keyword matching for demo
    if (input.toLowerCase().includes('sales') || input.toLowerCase().includes('revenue')) {
      return commonProblems.filter(p => p.problem.includes('sales') || p.problem.includes('marketing'));
    }
    if (input.toLowerCase().includes('customer') || input.toLowerCase().includes('support')) {
      return commonProblems.filter(p => p.problem.includes('customer'));
    }
    if (input.toLowerCase().includes('website') || input.toLowerCase().includes('app')) {
      return commonProblems.filter(p => p.problem.includes('website') || p.problem.includes('app'));
    }
    
    return commonProblems.slice(0, 2); // Default recommendations
  };

  const filteredProblems = commonProblems.filter(problem => {
    const industryMatch = selectedIndustry === 'all' || problem.industry === selectedIndustry || problem.industry === 'all';
    return industryMatch;
  });

  return (
    <section className={`py-20 relative z-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40 font-mono mb-4 px-6 py-2">
            🧠 AI-POWERED PROBLEM SOLVER
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              INTELLIGENT_SOLUTION_ENGINE
            </span>
          </h2>
          <p className="text-xl text-matrix-green/80 max-w-4xl mx-auto font-mono leading-relaxed">
            Describe your business challenge, and our AI will instantly analyze and recommend the perfect 
            combination of services, timeline, and budget for maximum ROI.
          </p>
        </div>

        {/* AI Problem Input */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-purple-500/10 via-black/80 to-cyan-500/10 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-300 font-mono flex items-center gap-3">
                <Brain className="w-6 h-6" />
                AI_PROBLEM_ANALYZER
              </CardTitle>
              <CardDescription className="text-matrix-green/70 font-mono">
                Describe your business challenge in detail for personalized solution recommendations
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-matrix-cyan font-mono text-sm mb-2 block">INDUSTRY:</label>
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full bg-black/50 border border-matrix-cyan/20 rounded-lg px-4 py-3 text-matrix-green font-mono focus:border-matrix-cyan focus:outline-none"
                  >
                    {industries.map(industry => (
                      <option key={industry.id} value={industry.id}>
                        {industry.icon} {industry.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-matrix-cyan font-mono text-sm mb-2 block">BUDGET_RANGE:</label>
                  <select 
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full bg-black/50 border border-matrix-cyan/20 rounded-lg px-4 py-3 text-matrix-green font-mono focus:border-matrix-cyan focus:outline-none"
                  >
                    {budgetRanges.map(budget => (
                      <option key={budget.id} value={budget.id}>
                        {budget.name} - {budget.range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem Input */}
              <div>
                <label className="text-matrix-cyan font-mono text-sm mb-2 block">DESCRIBE_YOUR_CHALLENGE:</label>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., I need to double my online sales, improve customer support automation, modernize my website with AI features, enter the metaverse..."
                  className="w-full h-32 bg-black/50 border border-matrix-cyan/20 rounded-lg px-4 py-3 text-matrix-green placeholder-matrix-green/40 font-mono resize-none focus:border-matrix-cyan focus:outline-none"
                />
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeUserProblem}
                disabled={!userInput.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 py-4 font-mono font-bold text-lg transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <Cpu className="w-5 h-5 mr-2 animate-spin" />
                    AI_ANALYZING_PROBLEM...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    ANALYZE_WITH_AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Results */}
        {problemAnalysis && (
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-cyan-500/10 via-black/80 to-blue-500/10 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-300 font-mono flex items-center gap-3">
                  <Lightbulb className="w-6 h-6" />
                  AI_ANALYSIS_COMPLETE
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* AI Analysis */}
                <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-mono font-bold mb-3">INTELLIGENT_ANALYSIS:</h4>
                  <p className="text-matrix-green/90 font-mono leading-relaxed">{problemAnalysis.aiAnalysis}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20 text-center">
                    <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-cyan-400 font-mono">{problemAnalysis.estimatedROI}</div>
                    <div className="text-xs text-matrix-green/70 font-mono">Expected ROI</div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20 text-center">
                    <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-cyan-400 font-mono">{problemAnalysis.implementationTime}</div>
                    <div className="text-xs text-matrix-green/70 font-mono">Timeline</div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20 text-center">
                    <BarChart3 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-cyan-400 font-mono">{problemAnalysis.budgetRange}</div>
                    <div className="text-xs text-matrix-green/70 font-mono">Investment</div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20 text-center">
                    <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-cyan-400 font-mono">{problemAnalysis.priorityLevel}</div>
                    <div className="text-xs text-matrix-green/70 font-mono">Priority</div>
                  </div>
                </div>

                {/* Recommended Solutions */}
                <div>
                  <h4 className="text-cyan-400 font-mono font-bold mb-4">RECOMMENDED_SOLUTIONS:</h4>
                  <div className="space-y-4">
                    {problemAnalysis.recommendedSolutions.map((solution, index) => (
                      <Card key={index} className="bg-black/30 border-cyan-500/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h5 className="text-cyan-300 font-mono font-bold">{solution.solution}</h5>
                            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono">
                              ROI: {solution.expectedROI}
                            </Badge>
                          </div>
                          
                          <p className="text-matrix-green/80 font-mono text-sm mb-4">{solution.problem}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {solution.components.map((component, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                <span className="text-matrix-green/80 font-mono text-xs">{component}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-matrix-green/60 font-mono text-sm">Timeline: {solution.timeframe}</span>
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 font-mono">
                              GET_DETAILED_PROPOSAL
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Common Problem Solutions */}
        <div>
          <h3 className="text-3xl font-bold text-matrix-cyan font-mono mb-8 text-center">
            FREQUENTLY_SOLVED_CHALLENGES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProblems.map((problem, index) => (
              <Card key={index} className="bg-black/60 border-matrix-dark-cyan/40 hover:border-matrix-cyan/60 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-matrix-bright-cyan font-mono font-bold group-hover:text-white transition-colors">
                      {problem.solution}
                    </h4>
                    <Badge className="bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black font-mono text-xs">
                      {problem.expectedROI}
                    </Badge>
                  </div>
                  
                  <p className="text-matrix-green/70 font-mono text-sm mb-4">
                    <strong>Challenge:</strong> {problem.problem}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {problem.components.slice(0, 4).map((component, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-matrix-cyan flex-shrink-0" />
                        <span className="text-matrix-green/80 font-mono text-xs">{component}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-matrix-green/60 font-mono text-xs">
                      Implementation: {problem.timeframe}
                    </span>
                    <Button 
                      size="sm"
                      className="bg-matrix-dark-cyan/20 border border-matrix-cyan/40 text-matrix-cyan hover:bg-matrix-cyan/10 font-mono text-xs"
                      onClick={() => setUserInput(problem.problem)}
                    >
                      ANALYZE_THIS
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProblemSolver;
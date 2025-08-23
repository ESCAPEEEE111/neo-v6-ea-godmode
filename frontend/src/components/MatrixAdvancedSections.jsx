import React, { useState, useEffect } from 'react';
import { Code, Database, Cpu, Network, Shield, Zap, Eye, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const MatrixAdvancedSections = ({ className = "" }) => {
  const [activeMatrix, setActiveMatrix] = useState(0);
  const [digitalClock, setDigitalClock] = useState('');
  const [systemStats, setSystemStats] = useState({
    uptime: '99.9%',
    processes: 1337,
    connections: 42069,
    dataFlow: '2.4TB/s'
  });

  // Digital clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setDigitalClock(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate system stats updates
  useEffect(() => {
    const updateStats = () => {
      setSystemStats(prev => ({
        uptime: '99.9%',
        processes: Math.floor(Math.random() * 1000) + 1200,
        connections: Math.floor(Math.random() * 10000) + 40000,
        dataFlow: `${(Math.random() * 5 + 1).toFixed(1)}TB/s`
      }));
    };

    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const matrixSystems = [
    {
      id: 0,
      name: 'NEURAL_NETWORK',
      icon: Brain,
      description: 'Advanced AI processing and machine learning algorithms',
      status: 'ACTIVE',
      processes: [
        'Deep Learning Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics'
      ]
    },
    {
      id: 1,
      name: 'SECURITY_MATRIX',
      icon: Shield,
      description: 'Multi-layered cybersecurity and threat detection',
      status: 'SECURED',
      processes: [
        'Intrusion Detection',
        'Firewall Systems',
        'Encryption Protocols',
        'Threat Analysis'
      ]
    },
    {
      id: 2,
      name: 'DATA_CORE',
      icon: Database,
      description: 'Distributed database and information processing',
      status: 'SYNCED',
      processes: [
        'Data Mining',
        'Real-time Analytics',
        'Backup Systems',
        'Query Optimization'
      ]
    },
    {
      id: 3,
      name: 'NETWORK_HUB',
      icon: Network,
      description: 'Global connectivity and communication systems',
      status: 'CONNECTED',
      processes: [
        'Load Balancing',
        'CDN Management',
        'API Gateway',
        'Traffic Routing'
      ]
    }
  ];

  const codeSnippets = [
    {
      language: 'MATRIX_LANG',
      code: `> INITIALIZING_DIGITAL_DOMINANCE
> SCANNING_MARKET_VULNERABILITIES
> DEPLOYING_AI_AGENTS
> STATUS: READY_FOR_DEPLOYMENT`
    },
    {
      language: 'CYBER_PROTOCOL',
      code: `> ACCESSING_MAINFRAME
> BYPASSING_SECURITY_LAYERS  
> INJECTING_MARKETING_PAYLOAD
> CONVERSION_RATE: MAXIMIZED`
    },
    {
      language: 'DATA_STREAM',
      code: `> ANALYZING_CONSUMER_PATTERNS
> OPTIMIZING_CAMPAIGN_TARGETING
> CALCULATING_ROI_MATRICES
> PROFIT_MARGIN: AMPLIFIED`
    }
  ];

  return (
    <div className={`${className}`}>
      {/* System Monitor Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-matrix-green matrix-text-glow">
                SYSTEM_MONITOR
              </span>
            </h2>
            <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
              REAL_TIME_SYSTEM_STATUS | DIGITAL_INFRASTRUCTURE_CONTROL
            </p>
          </div>

          {/* Digital Status Bar */}
          <div className="mb-12">
            <Card className="bg-black/70 border-matrix-green/40 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-matrix-green font-mono">{digitalClock}</div>
                    <div className="text-sm text-matrix-green/60 font-mono">SYSTEM_TIME</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-matrix-green font-mono">{systemStats.uptime}</div>
                    <div className="text-sm text-matrix-green/60 font-mono">UPTIME</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-matrix-green font-mono">{systemStats.processes}</div>
                    <div className="text-sm text-matrix-green/60 font-mono">PROCESSES</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-matrix-green font-mono">{systemStats.dataFlow}</div>
                    <div className="text-sm text-matrix-green/60 font-mono">DATA_FLOW</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Matrix Systems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matrixSystems.map((system) => {
              const IconComponent = system.icon;
              const isActive = activeMatrix === system.id;
              
              return (
                <Card
                  key={system.id}
                  className={`bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    isActive ? 'ring-2 ring-matrix-green shadow-matrix-lg' : ''
                  }`}
                  onClick={() => setActiveMatrix(system.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-matrix-green font-mono flex items-center gap-3">
                      <IconComponent className="w-6 h-6" />
                      <span className={isActive ? 'matrix-text-glow' : ''}>{system.name}</span>
                      <div className={`ml-auto px-2 py-1 rounded text-xs font-mono ${
                        system.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                        system.status === 'SECURED' ? 'bg-blue-500/20 text-blue-400' :
                        system.status === 'SYNCED' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-matrix-green/20 text-matrix-green'
                      }`}>
                        {system.status}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-matrix-green/80 font-mono mb-4 text-sm">
                      {system.description}
                    </p>
                    <div className="space-y-2">
                      {system.processes.map((process, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
                          <span className="text-matrix-green/70 font-mono">{process}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Matrix Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-matrix-green matrix-text-glow">
                CODE_MATRIX
              </span>
            </h2>
            <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
              DIGITAL_MARKETING_ALGORITHMS | BUSINESS_GROWTH_PROTOCOLS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {codeSnippets.map((snippet, index) => (
              <Card key={index} className="bg-black/70 border-matrix-green/30 hover:border-matrix-green transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {snippet.language}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 p-4 rounded-lg border border-matrix-green/20">
                    <pre className="text-matrix-green font-mono text-sm whitespace-pre-wrap">
                      {snippet.code}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Transformation Hub */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
              <span className="text-matrix-green matrix-text-glow">
                TRANSFORMATION_HUB
              </span>
            </h2>
            <p className="text-xl text-matrix-green/80 max-w-3xl mx-auto font-mono">
              UPGRADE_YOUR_BUSINESS | ENTER_THE_DIGITAL_MATRIX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, title: 'AI_INTEGRATION', desc: 'Advanced AI systems for business automation' },
              { icon: Eye, title: 'VISION_SYSTEMS', desc: 'Computer vision and image recognition' },
              { icon: Zap, title: 'PERFORMANCE', desc: 'High-speed optimization and scaling' },
              { icon: Network, title: 'CONNECTIVITY', desc: 'Global network infrastructure' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card
                  key={index}
                  className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-all duration-300 text-center group"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-matrix-green/10 rounded-full flex items-center justify-center group-hover:bg-matrix-green/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-matrix-green" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold font-mono text-matrix-green mb-2 group-hover:matrix-text-glow">
                      {item.title}
                    </h3>
                    <p className="text-sm text-matrix-green/70 font-mono">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-matrix-green text-black hover:bg-matrix-green/80 px-8 py-4 rounded-full text-lg font-mono font-semibold transition-all duration-300 transform hover:scale-105 shadow-matrix-lg">
              INITIATE_TRANSFORMATION
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MatrixAdvancedSections;
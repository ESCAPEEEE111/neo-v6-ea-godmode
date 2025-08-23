import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const TerminalWindow = ({ children, title = "SYSTEM.exe", className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`bg-black border border-matrix-green rounded-lg overflow-hidden shadow-2xl shadow-matrix-green/20 ${className}`}>
      {/* Terminal Header */}
      <div className="bg-matrix-dark-green border-b border-matrix-green px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-matrix-green" />
          <span className="text-matrix-green font-mono text-sm">{title}</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-matrix-green"></div>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-matrix-green">
        {isLoaded && children}
      </div>
    </div>
  );
};

export default TerminalWindow;
import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentService, setCurrentService] = useState(0);
  
 const services = [
  "AI-Powered Forex Trading Automation",
  "Advanced Algorithmic Trading Strategies",
  "Real-Time Market Analysis & Signals",
  "Risk Management & Capital Protection Systems",
  "Crypto & Forex Smart Trading Bots",
  "Backtested High-Performance Trading Models"
];


  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const serviceInterval = setInterval(() => {
      setCurrentService(prev => (prev + 1) % services.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(serviceInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center preloader-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black/40"></div>
      
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        {/* Logo/Brand Area */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-40 animate-pulse delay-75"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 opacity-60 animate-pulse delay-150"></div>
              <div className="absolute inset-6 rounded-full bg-white animate-pulse delay-300"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              Loading
            </h1>
          </div>
        </div>

        {/* Service Text */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <p className="text-xl text-gray-300 font-medium service-text">
            {services[currentService]}
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-0"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-80 max-w-full mx-auto bg-gray-800/50 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-300 ease-out progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Progress Percentage */}
          <div className="mt-4 text-gray-400 font-mono text-lg">
            {progress}%
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        {/* Bottom Text */}
        <div className="text-gray-500 text-sm mt-8 animate-pulse">
          Preparing your digital experience...
        </div>
      </div>
    </div>
  );
};

export default Preloader;
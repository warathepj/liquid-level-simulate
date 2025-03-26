
import React, { useState, useEffect } from 'react';
import Tank from './Tank';
import { toast } from "sonner";

const TankDiagram = () => {
  const [fillPercentage, setFillPercentage] = useState(80);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleAnimation = () => {
    setIsSimulating(true);
    
    // Toggle between high and low
    if (fillPercentage >= 70) {
      toast.info("Simulating tank emptying...");
      setTimeout(() => {
        setFillPercentage(10);
        setIsSimulating(false);
        toast.success("Tank level is now low");
      }, 3000);
    } else {
      toast.info("Simulating tank filling...");
      setTimeout(() => {
        setFillPercentage(80);
        setIsSimulating(false);
        toast.success("Tank level is now high");
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-16">
      <div className="mb-8 text-center max-w-2xl">
        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium tracking-wider mb-2 animate-fade-in">TECHNICAL DIAGRAM</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Storage Tank Monitoring System</h1>
        <p className="text-sm md:text-base text-gray-600">Real-time monitoring solution with IoT sensors and wireless connectivity</p>
      </div>
      
      <div className="relative w-full max-w-4xl bg-white/50 backdrop-blur-sm rounded-xl p-4 md:p-8 shadow-lg border border-gray-100 animate-scale-up">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl pointer-events-none"></div>
        
        <div className="relative flex flex-col items-center justify-center min-h-[500px]">
          <Tank 
            percentage={fillPercentage} 
            onAnimation={handleAnimation}
            className="my-16"
          />
          
          <div className="absolute bottom-0 right-4 text-xs text-gray-400">
            All measurements in cm/L
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankDiagram;

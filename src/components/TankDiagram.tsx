
import React, { useState, useEffect } from 'react';
import Tank from './Tank';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const TankDiagram = () => {
  const [fillPercentage, setFillPercentage] = useState(80);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleFill = () => {
    if (isSimulating || fillPercentage >= 80) return;
    
    setIsSimulating(true);
    toast.info("Simulating tank filling...");
    
    setTimeout(() => {
      setFillPercentage(80);
      setIsSimulating(false);
      toast.success("Tank level is now high");
    }, 3000);
  };

  const handleEmpty = () => {
    if (isSimulating || fillPercentage <= 10) return;
    
    setIsSimulating(true);
    toast.info("Simulating tank emptying...");
    
    setTimeout(() => {
      setFillPercentage(10);
      setIsSimulating(false);
      toast.success("Tank level is now low");
    }, 3000);
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
            className="my-16"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={handleFill}
              disabled={isSimulating || fillPercentage >= 80}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              <span>Fill Tank</span>
            </Button>
            
            <Button
              variant="destructive"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              onClick={handleEmpty}
              disabled={isSimulating || fillPercentage <= 10}
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              <span>Empty Tank</span>
            </Button>
          </div>
          
          <div className="absolute bottom-0 right-4 text-xs text-gray-400">
            All measurements in cm/L
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankDiagram;

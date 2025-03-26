
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Cylinder, Wifi, Database, Circle } from 'lucide-react';

interface TankProps {
  percentage: number;
  height?: number;
  width?: number;
  className?: string;
}

const Tank = ({ percentage, height = 350, width = 200, className }: TankProps) => {
  const tankRef = useRef<HTMLDivElement>(null);
  const [dimensions] = useState({ height, width });
  
  const getLiquidColor = (percentage: number) => {
    if (percentage < 30) return 'bg-tank-lowLevel';
    if (percentage < 70) return 'bg-tank-mediumLevel';
    return 'bg-tank-highLevel';
  };

  const getPercentageLabel = () => {
    if (percentage < 30) return 'Low';
    if (percentage < 70) return 'Medium';
    return 'High';
  };

  return (
    <div ref={tankRef} className={cn("relative flex flex-col items-center", className)}>
      {/* Tank Label */}
      <div className="absolute -top-8 text-center w-full">
        <span className="text-xs uppercase tracking-wider bg-muted px-2 py-1 rounded-full">Storage Tank</span>
        <h2 className="font-medium mt-1">Liquid Monitor</h2>
      </div>
      
      {/* Dimensions Label */}
      <div className="absolute -left-28 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
        <div className="text-xs text-muted-foreground mb-1">Dimensions:</div>
        <div className="text-sm font-medium">{width/10}cm × {height/10}cm</div>
        <div className="text-xs text-muted-foreground mt-3 mb-1">Volume:</div>
        <div className="text-sm font-medium">{Math.round(Math.PI * ((width/10)/2) * ((width/10)/2) * (height/10) / 1000)} liters</div>
      </div>
      
      {/* Tank Container with 3D effect */}
      <div className="tank-container relative" style={{ height: dimensions.height, width: dimensions.width }}>
        <div className="tank-cylinder relative h-full w-full border-2 border-tank-structure rounded-t-3xl rounded-b-3xl overflow-hidden bg-white/30 backdrop-blur-sm shadow-lg">
          {/* Liquid */}
          <div 
            className={cn(
              "liquid absolute bottom-0 w-full rounded-b-3xl transition-all duration-1000", 
              getLiquidColor(percentage),
              { "animate-empty-tank": percentage < 30, "animate-fill-tank": percentage > 70 }
            )}
            style={{ height: `${percentage}%` }}
          />
          
          {/* Measurement Lines */}
          {[0, 25, 50, 75, 100].map((level) => (
            <div key={level} className="absolute left-0 w-full flex items-center" style={{ bottom: `${level}%` }}>
              <div className="measurement-line"></div>
              <div className="measurement-text">{level}%</div>
              <div className="w-full border-dashed border-t border-gray-300/50"></div>
            </div>
          ))}

          {/* Sensor */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="relative">
              <Circle className="h-6 w-6 text-tank-sensor fill-tank-sensor animate-pulse-dot" />
              <div className="absolute top-7 -left-8 w-24">
                <span className="text-xs font-medium bg-white/80 px-2 py-1 rounded shadow-sm">Level Sensor</span>
              </div>
            </div>
          </div>
          
          {/* WiFi Module */}
          <div className="absolute right-0 top-7 transform translate-x-1/2">
            <div className="relative">
              <div className="bg-white/80 p-2 rounded-full shadow-md">
                <Wifi className="h-5 w-5 text-blue-500" />
              </div>
              <div className="absolute top-8 -right-8 w-24 text-right">
                <span className="text-xs font-medium bg-white/80 px-2 py-1 rounded shadow-sm">WiFi Module</span>
              </div>
              <div className="absolute top-0 -right-10 h-16 pointer-events-none">
                <div className="relative h-full">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className="absolute h-2 w-2 rounded-full bg-blue-500/80"
                      style={{
                        top: i * 6,
                        right: i * 4,
                        animationDelay: `${i * 0.3}s`,
                        animation: 'data-transfer 1.5s infinite'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Database Connection */}
          <div className="absolute right-1/2 bottom-0 transform translate-x-1/2 translate-y-full mt-4">
            <div className="relative flex flex-col items-center">
              <div className="h-16 border-r-2 border-dashed border-gray-400"></div>
              <Database className="h-8 w-8 text-tank-metallic animate-float" />
              <span className="text-xs font-medium mt-1">Data Storage</span>
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="absolute h-2 w-2 rounded-full bg-tank-metallic/80"
                  style={{
                    bottom: 30 + i * 8,
                    right: i % 2 === 0 ? -4 : 10,
                    animationDelay: `${i * 0.4}s`,
                    animation: 'data-transfer 2s infinite reverse'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="absolute -right-32 top-1/2 transform -translate-y-1/2">
        <div className="bg-white/90 p-4 rounded-lg shadow-md border">
          <div className="text-center mb-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
            <div className="text-lg font-semibold">{getPercentageLabel()}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>Level:</span>
              <span className="font-medium">{percentage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Volume:</span>
              <span className="font-medium">
                {Math.round(percentage / 100 * Math.PI * ((width/10)/2) * ((width/10)/2) * (height/10) / 1000)} L
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Temperature:</span>
              <span className="font-medium">22°C</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last Update:</span>
              <span className="font-medium">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tank;

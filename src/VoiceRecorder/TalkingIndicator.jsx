"use client";
import { Mic, MicOff, Brain, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
export default function TalkingIndicator({ isPlaying }) {
  const [mouthAnimation, setMouthAnimation] = useState(0);

  useState(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setMouthAnimation(prev => (prev + 1) % 4);
      }, 200);
      return () => clearInterval(interval);
    } else {
      setMouthAnimation(0);
    }
  }, [isPlaying]);

  if (!isPlaying) return null;

  const getMouthShape = () => {
    switch (mouthAnimation % 4) {
      case 0: return "⬭"; // Closed
      case 1: return "○"; // Open circle
      case 2: return "◯"; // Medium open
      case 3: return "⬮"; // Wide open
      default: return "⬭";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* Main AI Avatar with talking animation */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-teal-500 opacity-30 animate-ping scale-110" />
        
        {/* Main avatar container */}
        <div className="relative w-32 h-32 bg-gradient-to-br from-purple-200 to-teal-200 rounded-full border-4 border-purple-300 flex flex-col items-center justify-center shadow-2xl">
          {/* AI Brain Icon */}
          <Brain className="w-12 h-12 text-purple-600 mb-2 animate-pulse" />
          
          {/* Animated mouth */}
          <div className="text-2xl text-teal-600 animate-bounce">
            {getMouthShape()}
          </div>
        </div>

        {/* Sound waves */}
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 bg-teal-500 rounded-full animate-pulse"
                style={{
                  height: `${20 + (i * 10)}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 bg-teal-500 rounded-full animate-pulse"
                style={{
                  height: `${30 - (i * 10)}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 text-teal-600 animate-pulse" />
          <p className="text-lg font-semibold text-teal-600 animate-pulse">
            AI Therapist is speaking...
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Listen carefully to the personalized guidance
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-bounce"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + (i * 0.3)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

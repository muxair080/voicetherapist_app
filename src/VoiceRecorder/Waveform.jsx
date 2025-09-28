"use client";
import { useState } from "react";

// Waveform Component
export default function Waveform({ isActive }) {
  const [bars, setBars] = useState([]);

  useState(() => {
    // Generate random heights for waveform bars
    const generateBars = () => {
      const newBars = Array.from({ length: 12 }, () => 
        Math.random() * 60 + 20 // Height between 20px and 80px
      );
      setBars(newBars);
    };

    if (isActive) {
      generateBars();
      const interval = setInterval(generateBars, 150);
      return () => clearInterval(interval);
    } else {
      setBars([]);
    }
  }, [isActive]);

  if (!isActive || bars.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 h-24">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-purple-600 to-teal-500 rounded-full transition-all duration-150 ease-in-out"
          style={{
            width: '4px',
            height: `${height}px`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
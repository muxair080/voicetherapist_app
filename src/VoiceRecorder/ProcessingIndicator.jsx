"use client";
import { Mic, Brain, Loader2 } from "lucide-react";

export default // Processing Indicator Component
function ProcessingIndicator({ stage }) {
  const getStageIcon = () => {
    if (stage.includes("Transcribing")) {
      return <Mic className="w-6 h-6" />;
    } else if (stage.includes("Analyzing")) {
      return <Brain className="w-6 h-6" />;
    } else if (stage.includes("Converting")) {
      return <Loader2 className="w-6 h-6" />;
    }
    return <Loader2 className="w-6 h-6 animate-spin" />;
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {/* Animated processing indicator */}
      <div className="flex items-center gap-4 p-6 bg-purple-100 rounded-2xl border border-purple-300">
        <div className="text-purple-600 animate-pulse">
          {getStageIcon()}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-purple-600 font-semibold">{stage}</p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Processing stages visual */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className={`text-center p-3 rounded-lg transition-all ${
          stage.includes("Transcribing") 
            ? "bg-purple-200 text-purple-700" 
            : "bg-gray-100 text-gray-500"
        }`}>
          <Mic className="w-4 h-4 mx-auto mb-1" />
          <p className="text-xs font-medium">Transcribe</p>
        </div>
        <div className={`text-center p-3 rounded-lg transition-all ${
          stage.includes("Analyzing") 
            ? "bg-teal-200 text-teal-700" 
            : "bg-gray-100 text-gray-500"
        }`}>
          <Brain className="w-4 h-4 mx-auto mb-1" />
          <p className="text-xs font-medium">Analyze</p>
        </div>
        <div className={`text-center p-3 rounded-lg transition-all ${
          stage.includes("Converting") 
            ? "bg-blue-200 text-blue-700" 
            : "bg-gray-100 text-gray-500"
        }`}>
          <Loader2 className="w-4 h-4 mx-auto mb-1" />
          <p className="text-xs font-medium">Respond</p>
        </div>
      </div>
    </div>
  );
}

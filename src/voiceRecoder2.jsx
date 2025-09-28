"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Brain, Loader2 } from "lucide-react";

// Waveform Component
function Waveform({ isActive }) {
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

// Processing Indicator Component
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

// Talking Indicator Component
function TalkingIndicator({ isPlaying }) {
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

// Main Voice Recorder Component
export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isAITalking, setIsAITalking] = useState(false);
  const [currentStage, setCurrentStage] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const currentAudioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = [];

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          setProcessing(true);

          // Step 1: Transcribe
          setCurrentStage("Transcribing your voice...");
          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          const text = data.text || "";

          if (text) {
            // Step 2: Therapist response
            setCurrentStage("Analyzing and generating response...");
            const therapistRes = await fetch(
              "https://therapist-backend-six.vercel.app/voice-therapist",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input_text: text }),
              }
            );

            const therapistData = await therapistRes.json();
            const therapistText = therapistData?.response || "";

            // Step 3: Text-to-Speech
            if (therapistText) {
              setCurrentStage("Converting to speech...");
              const ttsRes = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: therapistText }),
              });

              if (!ttsRes.ok) throw new Error("TTS failed");

              const ttsBlob = await ttsRes.blob();
              const audioURL = URL.createObjectURL(ttsBlob);

              const audio = new Audio(audioURL);
              currentAudioRef.current = audio;
              
              // Set up audio event listeners
              audio.addEventListener("play", () => {
                setIsAITalking(true);
              });
              
              audio.addEventListener("ended", () => {
                setIsAITalking(false);
                currentAudioRef.current = null;
              });
              
              audio.addEventListener("error", () => {
                setIsAITalking(false);
                currentAudioRef.current = null;
              });
              
              audio.play();
            }
          }
        } catch (err) {
          console.error("Error in flow:", err);
          setCurrentStage("Error occurred. Please try again.");
        } finally {
          setProcessing(false);
          setCurrentStage("");
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      
      // Stop all tracks to free up the microphone
      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setIsAITalking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-purple-400 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                AI Therapist
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              A safe space to share your thoughts. Our AI therapist is here to listen with empathy and provide thoughtful guidance.
            </p>
          </div>

          {/* Main Interface Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700">
            <div className="text-center space-y-8">
              {/* Waveform Visualization */}
              {recording && (
                <div className="animate-bounce">
                  <Waveform isActive={recording} />
                </div>
              )}

              {/* AI Talking Indicator */}
              {isAITalking && (
                <TalkingIndicator isPlaying={isAITalking} />
              )}

              {/* Processing Indicator */}
              {processing && !isAITalking && (
                <ProcessingIndicator stage={currentStage} />
              )}

              {/* Recording Button */}
              <div className="flex flex-col items-center gap-6">
                {!recording ? (
                  <button
                    onClick={startRecording}
                    disabled={processing}
                    className={`px-12 py-6 rounded-2xl text-xl font-semibold transition-all shadow-lg ${
                      processing
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:scale-105 hover:shadow-xl"
                    }`}
                  >
                    <Mic className="w-6 h-6 mr-3 inline" />
                    {processing ? "Processing..." : "Start Speaking"}
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    disabled={processing}
                    className={`px-12 py-6 rounded-2xl text-xl font-semibold transition-all shadow-lg ${
                      processing
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:scale-105 hover:shadow-xl animate-pulse"
                    }`}
                  >
                    <MicOff className="w-6 h-6 mr-3 inline" />
                    {processing ? "Processing..." : "Stop Speaking"}
                  </button>
                )}

                {/* Status Text */}
                <div className="space-y-2">
                  {recording && !processing && !isAITalking && (
                    <p className="text-purple-400 font-semibold text-lg animate-pulse">
                      🎙️ Listening...
                    </p>
                  )}
                  {!recording && !processing && !isAITalking && (
                    <p className="text-gray-400">
                      Click to start sharing your thoughts
                    </p>
                  )}
                  {isAITalking && (
                    <p className="text-teal-400 font-semibold text-lg">
                      🎧 Please listen to your therapist
                    </p>
                  )}
                </div>
              </div>

              {/* Instructions */}
              {!recording && !processing && !isAITalking && (
                <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-700">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center mx-auto">
                      <Mic className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-purple-400">Speak Freely</h3>
                    <p className="text-sm text-gray-400">
                      Share what&apos;s on your mind without judgment
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-teal-800 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="font-semibold text-teal-400">AI Analysis</h3>
                    <p className="text-sm text-gray-400">
                      Advanced AI provides thoughtful insights
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mx-auto">
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                    </div>
                    <h3 className="font-semibold text-blue-400">Voice Response</h3>
                    <p className="text-sm text-gray-400">
                      Receive personalized audio guidance
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

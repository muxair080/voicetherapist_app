"use client";

// import VoiceRecorder from "../src/voiceRecorder";
import VoiceRecorder from "../src/VoiceRecorder/VoiceRecorder";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <VoiceRecorder />
    </main>
  );
}
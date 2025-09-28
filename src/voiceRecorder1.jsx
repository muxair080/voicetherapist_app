// "use client";

// import { useState, useRef } from "react";

// export default function Home() {
//   const [recording, setRecording] = useState(false);
//   const [processing, setProcessing] = useState(false); // new state
//   const mediaRecorderRef = useRef(null);
//   const audioChunks = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunks.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
//         audioChunks.current = [];

//         const formData = new FormData();
//         formData.append("file", audioBlob, "recording.webm");

//         try {
//           setProcessing(true); // start processing

//           const res = await fetch("/api/transcribe", {
//             method: "POST",
//             body: formData,
//           });

//           const data = await res.json();
//           const text = data.text || "";

//           if (text) {
//             const therapistRes = await fetch(
//               "https://therapist-backend-six.vercel.app/voice-therapist",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ input_text: text }),
//               }
//             );

//             const therapistData = await therapistRes.json();
//             const therapistText = therapistData?.response || "";

//             if (therapistText) {
//               const ttsRes = await fetch("/api/tts", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ text: therapistText }),
//               });

//               if (!ttsRes.ok) throw new Error("TTS failed");

//               const ttsBlob = await ttsRes.blob();
//               const audioURL = URL.createObjectURL(ttsBlob);

//               const audio = new Audio(audioURL);
//               audio.play();
//             }
//           }
//         } catch (err) {
//           console.error("Error in flow:", err);
//         } finally {
//           setProcessing(false); // done processing
//         }
//       };

//       mediaRecorderRef.current.start();
//       setRecording(true);
//     } catch (err) {
//       console.error("Microphone access denied:", err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         🎙️ Voice Recorder + Therapist
//       </h1>

//       {!recording ? (
//         <button
//           onClick={startRecording}
//           disabled={processing} // disable if processing
//           className={`px-6 py-3 rounded-xl shadow text-white ${
//             processing
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {processing ? "Processing..." : "Start Recording"}
//         </button>
//       ) : (
//         <button
//           onClick={stopRecording}
//           disabled={processing} // disable while processing
//           className={`px-6 py-3 rounded-xl shadow text-white ${
//             processing
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-red-500 hover:bg-red-600"
//           }`}
//         >
//           {processing ? "Processing..." : "Stop Recording"}
//         </button>
//       )}
//     </main>
//   );
// }

"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

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
          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          const text = data.text || "";

          if (text) {
            // Step 2: Therapist response
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
              const ttsRes = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: therapistText }),
              });

              if (!ttsRes.ok) throw new Error("TTS failed");

              const ttsBlob = await ttsRes.blob();
              const audioURL = URL.createObjectURL(ttsBlob);

              const audio = new Audio(audioURL);
              audio.play();
            }
          }
        } catch (err) {
          console.error("Error in flow:", err);
        } finally {
          setProcessing(false);
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
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <main className="w-full max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
            🌿 Your AI Therapist
          </h1>
          <p className="text-gray-600 mb-10 text-base md:text-lg">
            Speak your heart out. I will listen and respond with care.
          </p>

          {!recording ? (
            <button
              onClick={startRecording}
              disabled={processing}
              className={`px-10 py-5 rounded-full text-lg md:text-xl font-medium transition-all ${
                processing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:scale-105"
              }`}
            >
              {processing ? "Processing..." : "🎙️ Start Talking"}
            </button>
          ) : (
            <button
              onClick={stopRecording}
              disabled={processing}
              className={`px-10 py-5 rounded-full text-lg md:text-xl font-medium transition-all ${
                processing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg hover:scale-105"
              }`}
            >
              {processing ? "Processing..." : "⏹️ Stop Talking"}
            </button>
          )}

          {processing && (
            <div className="mt-10 flex flex-col items-center">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-purple-500 border-solid"></div>
              <p className="mt-4 text-purple-600 font-medium text-lg">
                Generating your therapist’s response...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


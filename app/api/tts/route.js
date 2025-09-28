// app/api/tts/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }
    const instructions = (
      "You are a compassionate therapist. Speak in the same language as the input text. ",
      "If the text is Arabic, speak with an Omani accent. ",
      "If the text is English, speak in English. ",
      "If the text mixes both, keep the same mix naturally. ",
      "Always use a warm, therapeutic, and supportive tone."
    );
    // Call OpenAI TTS
    const mp3 = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "coral",
        input: text,
        instructions: instructions,
        });


    // Convert response to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=output.mp3",
      },
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 });
  }
}

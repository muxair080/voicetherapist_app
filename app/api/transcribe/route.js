import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert Blob -> File for OpenAI SDK
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFile = new File([buffer], "audio.webm", { type: "audio/webm" });

    const response = await openai.audio.transcriptions.create({
      file: tempFile,
      model: "gpt-4o-mini-transcribe", // or "whisper-1"
    });

    return NextResponse.json({ text: response.text });
  } catch (err) {
    console.error("Transcription error:", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}

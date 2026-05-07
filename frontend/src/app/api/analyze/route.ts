import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AnalysisResult from '@/lib/models/AnalysisResult';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        // Call the Python Flask Backend
        const backendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000';
        const pythonResponse = await fetch(`${backendUrl}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if (!pythonResponse.ok) {
            throw new Error(`Python API error: ${pythonResponse.statusText}`);
        }

        const data = await pythonResponse.json();

        const timestamp = new Date().toISOString();

        // Save result to MongoDB (non-blocking — don't fail the request if DB is down)
        try {
            await connectDB();
            await AnalysisResult.create({
                policyText: text,
                sentiment:  data.sentiment,
                confidence: data.confidence,
                explanation: data.explanation,
                timestamp,
            });
            console.log("✅ Saved to MongoDB");
        } catch (dbError) {
            console.error("⚠️ MongoDB save failed (result still returned):", dbError);
        }

        return NextResponse.json({
            sentiment:   data.sentiment,
            confidence:  data.confidence,
            explanation: data.explanation,
            timestamp,
        });

    } catch (error) {
        console.error("❌ Python backend error:", error);
        return NextResponse.json(
            { error: "Analysis failed. Ensure Python backend is running on port 5000." },
            { status: 500 }
        );
    }
}

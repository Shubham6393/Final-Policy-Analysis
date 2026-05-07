import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AnalysisResult from '@/lib/models/AnalysisResult';

export async function GET() {
    try {
        await connectDB();

        const results = await AnalysisResult.find()
            .sort({ timestamp: -1 }) // newest first
            .limit(50)
            .lean();

        return NextResponse.json({ results });

    } catch (error) {
        console.error("Failed to fetch history:", error);
        return NextResponse.json(
            { error: "Failed to fetch history." },
            { status: 500 }
        );
    }
}

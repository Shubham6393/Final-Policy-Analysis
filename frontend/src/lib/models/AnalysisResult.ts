import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalysisResult extends Document {
    policyText: string;
    sentiment: string;
    confidence: number;
    explanation: string;
    timestamp: Date;
}

const AnalysisResultSchema = new Schema<IAnalysisResult>({
    policyText: { type: String, required: true },
    sentiment:  { type: String, required: true },
    confidence: { type: Number, required: true },
    explanation:{ type: String, required: true },
    timestamp:  { type: Date,   default: Date.now },
});

// Prevent model recompilation in Next.js hot reload
export default mongoose.models.AnalysisResult ||
    mongoose.model<IAnalysisResult>('AnalysisResult', AnalysisResultSchema);

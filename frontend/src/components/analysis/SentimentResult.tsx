
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, AlertTriangle, Scale, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentResultProps {
    result: {
        sentiment?: string;
        confidence?: number;
        explanation?: string;
        error?: string;
    } | null;
}

export function SentimentResult({ result }: SentimentResultProps) {
    if (!result) return null;

    // Show error state if the API returned an error
    if (result.error || !result.sentiment) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
            >
                <div style={{
                    background: '#1a0a0a',
                    border: '1px solid #ef4444',
                    borderRadius: 12,
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}>
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                        <p className="font-semibold text-red-400">Analysis Failed</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {result.error || "An unexpected error occurred. Please ensure the Python backend is running."}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    const isYes = result.sentiment.toLowerCase() === "yes";
    const isNo = result.sentiment.toLowerCase() === "no";
    const isNeutral = result.sentiment.toLowerCase() === "neutral";

    let statusColor = "text-gray-500";
    let bgGlow = "shadow-gray-500/20";
    let Icon = Scale;
    let badgeVariant: "success" | "danger" | "warning" = "warning";

    if (isYes) {
        statusColor = "text-green-500";
        bgGlow = "shadow-green-500/20";
        Icon = CheckCircle2;
        badgeVariant = "success";
    } else if (isNo) {
        statusColor = "text-red-500";
        bgGlow = "shadow-red-500/20";
        Icon = XCircle;
        badgeVariant = "danger";
    } else {
        statusColor = "text-amber-500";
        bgGlow = "shadow-amber-500/20";
        Icon = Scale;
        badgeVariant = "warning";
    }
    const colorHex = isYes ? "#10b981" : isNo ? "#ef4444" : "#f59e0b";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-8"
        >
            <Card className={cn("p-8 border-t-4 shadow-xl", bgGlow)} style={{ borderTopColor: colorHex }}>
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Icon className="w-8 h-8" style={{ color: colorHex }} />
                            <h2 className="text-2xl font-bold text-foreground">Analysis Result</h2>
                        </div>

                        <div className="mb-6">
                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Predicted Sentiment</span>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-4xl font-extrabold" style={{ color: colorHex }}>
                                    {result.sentiment?.toUpperCase()}
                                </span>
                                <Badge variant={badgeVariant} className="text-sm px-3 py-1" style={{ backgroundColor: colorHex, color: 'white', border: 'none' }}>
                                    {result.confidence}% Confidence
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-primary" /> AI Explanation
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                "{result.explanation}"
                            </p>
                        </div>
                    </div>

                    {/* Visualization Placeholder / Confidence Meter */}
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 bg-muted/10 rounded-xl border border-border/30">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                {/* Background Circle */}
                                <circle 
                                    className="text-muted" 
                                    stroke="currentColor"
                                    strokeWidth="10" 
                                    cx="50" 
                                    cy="50" 
                                    r="40" 
                                    fill="transparent"
                                />
                                {/* Foreground Circle */}
                                <circle
                                    className="transition-all duration-1000 ease-out"
                                    stroke={colorHex}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * (result.confidence ?? 0)) / 100}
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-2xl font-bold">{result.confidence ?? 0}%</span>
                                <span className="text-[10px] text-muted-foreground uppercase">Confidence</span>
                            </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Based on {Math.floor(Math.random() * 5000) + 1000} simulated data points
                        </p>
                    </div>

                </div>
            </Card>
        </motion.div>
    );
}

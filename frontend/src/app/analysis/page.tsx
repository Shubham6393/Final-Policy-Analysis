"use client";

import { useState } from "react";
import { PolicyInput } from "@/components/analysis/PolicyInput";
import { SentimentResult } from "@/components/analysis/SentimentResult";
import { motion } from "framer-motion";

export default function AnalysisPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px', minHeight: '100vh', backgroundColor: '#0d1117' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Page Header */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f6fc', marginBottom: 8 }}>New Policy Analysis</h1>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>
              Paste the full text of the{' '}
              <span style={{ color: '#2563eb' }}>proposed legislation</span>{' '}
              or{' '}
              <span style={{ color: '#2563eb' }}>upload a file</span>{' '}
              to{' '}
              <span style={{ color: '#2563eb' }}>predict public</span>{' '}
              <span style={{ color: '#f59e0b' }}>sentiment</span>{' '}
              <span style={{ color: '#2563eb' }}>impact</span>.
            </p>
          </div>

          {/* Input Card */}
          <div style={{
            background: '#161b27',
            border: '1px solid #1e293b',
            borderRadius: 14,
            padding: '28px',
            marginBottom: 28,
          }}>
            <PolicyInput onAnalyze={handleAnalyze} isLoading={loading} />
          </div>

          <SentimentResult result={result} />
        </motion.div>
      </div>
    </div>
  );
}

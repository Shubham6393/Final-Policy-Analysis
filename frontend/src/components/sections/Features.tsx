"use client";

import { motion } from "framer-motion";
import { Zap, BrainCircuit, LineChart, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Sentiment Analysis",
    description: "Instant AI-powered analysis of policy drafts to predict public reaction before release.",
  },
  {
    icon: BrainCircuit,
    title: "Trained on Civic Data",
    description: "Our models are specifically fine-tuned on government documents and public discourse datasets.",
  },
  {
    icon: LineChart,
    title: "Impact Forecasting",
    description: "Visualize potential societal impact with predictive confidence modeling and trend analysis.",
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description: "Enterprise-grade security ensures your sensitive policy drafts remain private and protected.",
  },
];

export function Features() {
  return (
    <section style={{ padding: '80px 32px', backgroundColor: '#0d1117' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 12 }}>
            CORE CAPABILITIES
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>
            Smarter Tools for Modern Governance
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Leverage cutting-edge technology to bridge the gap between policy creation and public expectation.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  background: '#161b27',
                  border: '1px solid #1e293b',
                  borderRadius: 14,
                  padding: 28,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                whileHover={{ y: -4 }}
              >
                <div style={{
                  width: 46, height: 46,
                  borderRadius: 10,
                  background: 'rgba(100,116,139,0.15)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <Icon size={22} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f6fc', marginBottom: 10, lineHeight: 1.4 }}>{feature.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

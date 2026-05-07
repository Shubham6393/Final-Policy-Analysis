"use client";

import { motion } from "framer-motion";
import { Copy, Brain, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Copy,
    title: "Input Policy Text",
    description: "Paste your proposed policy draft or upload the document directly into our secure analyzer.",
    num: 1,
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced NLP models scan the text against millions of public sentiment data points.",
    num: 2,
  },
  {
    icon: CheckCircle,
    title: "Get Actionable Insights",
    description: "Receive an instant report with sentiment scoring, confidence levels, and impact predictions.",
    num: 3,
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: '80px 32px', backgroundColor: '#0a0f1a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>How It Works</h2>
          <p style={{ fontSize: 16, color: '#64748b' }}>Streamline your decision-making process in 3 simple steps.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                {/* Icon circle with number badge */}
                <div style={{ position: 'relative', marginBottom: 28 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: '#161b27',
                    border: '3px solid #1e293b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={30} color="#2563eb" />
                  </div>
                  <div style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 26, height: 26, borderRadius: '50%',
                    background: '#2563eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: '#ffffff',
                  }}>
                    {step.num}
                  </div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f0f6fc', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, maxWidth: 280 }}>{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

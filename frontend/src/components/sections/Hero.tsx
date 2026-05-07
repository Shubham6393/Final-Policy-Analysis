"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Database, LineChart, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 30% 50%, #1e3a8a 0%, #0d1117 65%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px 64px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' }}>
          
          {/* Left: Text */}
          <motion.div
            style={{ flex: '1 1 420px', minWidth: 0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              marginBottom: 32,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 6px #10b981',
                display: 'inline-block',
              }} />
              <span style={{ color: '#f0f6fc', fontSize: 13, fontWeight: 600 }}>
                PolicyAnalysis Core Beta v2.0
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: 24, letterSpacing: -1 }}>
              AI-Powered<br />
              <span style={{ color: '#2563eb' }}>Policy</span><br />
              <span style={{ color: '#2563eb' }}>Sentiment</span>
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>
              Analyze proposed policies against public sentiment in real-time. Make data-driven decisions with impact forecasting and civic data integration.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/analysis" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#1d4ed8'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#2563eb'}
                >
                  Start Analysis <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '14px 28px',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#f0f6fc',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
                >
                  View Dashboard
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Overview Card */}
          <motion.div
            style={{ flex: '1 1 360px', minWidth: 0, maxWidth: 460 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              background: 'rgba(22,27,39,0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f6fc', marginBottom: 4 }}>Live Analysis Overview</h3>
                  <p style={{ fontSize: 13, color: '#64748b' }}>Real-time civic impact</p>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShieldCheck size={18} color="#2563eb" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: Activity, color: '#2563eb', title: 'Real-time Sentiment', desc: 'Instant public reaction metrics' },
                  { icon: Database, color: '#10b981', title: 'Civic Data Trained', desc: 'Models trained on localized data' },
                  { icon: LineChart, color: '#f59e0b', title: 'Impact Forecasting', desc: 'Predictive legislative outcomes' },
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: 14,
                    borderRadius: 10,
                    background: 'rgba(13,17,23,0.5)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                      background: `${color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#f0f6fc', marginBottom: 2 }}>{title}</p>
                      <p style={{ fontSize: 12, color: '#64748b' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

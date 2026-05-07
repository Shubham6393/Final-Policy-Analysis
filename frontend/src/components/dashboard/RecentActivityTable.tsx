"use client";

import { FileText, ChevronRight } from "lucide-react";

const activities = [
  { id: 1, policy: "Urban Traffic Congestion Tax", sentiment: "Negative", confidence: 82, date: "2 mins ago" },
  { id: 2, policy: "Green Energy Subsidies 2026", sentiment: "Yes", confidence: 94, date: "15 mins ago" },
  { id: 3, policy: "Digital Health Records Act", sentiment: "Neutral", confidence: 65, date: "1 hour ago" },
  { id: 4, policy: "Public Park Renovation Fund", sentiment: "Yes", confidence: 88, date: "2 hours ago" },
  { id: 5, policy: "Downtown Noise Ordinance", sentiment: "No", confidence: 76, date: "5 hours ago" },
];

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    Yes: { label: "Yes", bg: "rgba(16,185,129,0.15)", color: "#10b981" },
    Positive: { label: "Yes", bg: "rgba(16,185,129,0.15)", color: "#10b981" },
    No: { label: "No", bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
    Negative: { label: "Negative", bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
    Neutral: { label: "Neutral", bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  };
  const style = map[sentiment] || { label: sentiment, bg: "rgba(100,116,139,0.15)", color: "#94a3b8" };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px',
      borderRadius: 20,
      background: style.bg,
      color: style.color,
      fontSize: 12,
      fontWeight: 600,
    }}>{style.label}</span>
  );
}

export function RecentActivityTable() {
  return (
    <div style={{ background: '#161b27', border: '1px solid #1e293b', borderRadius: 12, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f6fc' }}>Recent Analysis</h3>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, color: '#2563eb', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer'
        }}>
          View All <ChevronRight size={14} />
        </button>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'rgba(30,41,59,0.4)' }}>
            <th style={{ padding: '10px 24px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Policy Title</th>
            <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Sentiment</th>
            <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Confidence</th>
            <th style={{ padding: '10px 16px', textAlign: 'left', color: '#64748b', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item) => (
            <tr key={item.id} style={{ borderTop: '1px solid rgba(30,41,59,0.6)', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.04)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <td style={{ padding: '14px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={15} color="#64748b" />
                  <span style={{ color: '#f0f6fc', fontWeight: 500 }}>{item.policy}</span>
                </div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <SentimentBadge sentiment={item.sentiment} />
              </td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 60, height: 5, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.confidence}%`, background: '#2563eb', borderRadius: 3 }} />
                  </div>
                  <span style={{ color: '#94a3b8', fontWeight: 500 }}>{item.confidence}%</span>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

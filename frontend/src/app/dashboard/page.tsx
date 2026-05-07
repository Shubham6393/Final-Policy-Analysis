"use client";

import { FileText, ThumbsUp, ThumbsDown, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { SentimentChart } from "@/components/dashboard/SentimentChart";

const stats = [
  { title: "Total Policies Analyzed", value: "1,284", icon: FileText, trend: "+12.5%", trendUp: true, description: "vs last month" },
  { title: "Positive Sentiment", value: "64%", icon: ThumbsUp, trend: "+4.2%", trendUp: true, description: "avg approval rate" },
  { title: "Negative Sentiment", value: "21%", icon: ThumbsDown, trend: "-2.1%", trendUp: false, description: "avg rejection rate" },
  { title: "Active Users", value: "342", icon: Users, trend: "+8.4%", trendUp: true, description: "this week" },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: '32px', minHeight: '100vh', backgroundColor: '#0d1117' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f6fc', marginBottom: 6 }}>Dashboard Overview</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>Real-time policy sentiment analytics and trends.</p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#10b981', fontSize: 13, fontWeight: 600,
          }}>
            <Activity size={14} style={{ animation: 'pulse 2s infinite' }} />
            Live Data Feed Connected
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 28 }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: '#161b27',
                  border: '1px solid #1e293b',
                  borderRadius: 12,
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ y: -2 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{stat.title}</p>
                  <Icon size={18} color="#2563eb" />
                </div>
                <p style={{ fontSize: 32, fontWeight: 700, color: '#f0f6fc', marginBottom: 6 }}>{stat.value}</p>
                <p style={{ fontSize: 12, color: '#64748b' }}>
                  <span style={{ color: stat.trendUp ? '#10b981' : '#ef4444', fontWeight: 600 }}>{stat.trend}</span> {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts & Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
          <RecentActivityTable />
          <SentimentChart />
        </div>

      </motion.div>
    </div>
  );
}

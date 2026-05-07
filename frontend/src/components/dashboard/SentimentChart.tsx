"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Positive', value: 45, color: '#10B981' },
  { name: 'Negative', value: 30, color: '#EF4444' },
  { name: 'Neutral', value: 25, color: '#F59E0B' },
];

export function SentimentChart() {
  return (
    <div style={{ background: '#161b27', border: '1px solid #1e293b', borderRadius: 12, padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f0f6fc', marginBottom: 20 }}>Overall Sentiment Distribution</h3>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={10}
              formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

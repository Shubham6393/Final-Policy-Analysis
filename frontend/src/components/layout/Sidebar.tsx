"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, LayoutDashboard, FileText, History,
  BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Analysis", href: "/analysis", icon: FileText },
  { name: "History", href: "/history", icon: History },
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{
        backgroundColor: '#111827',
        borderRight: '1px solid #1e293b',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: '1px solid #1e293b',
        flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(37,99,235,0.2)',
          border: '1px solid rgba(37,99,235,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <ShieldCheck size={18} color="#2563eb" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ marginLeft: 10, fontWeight: 700, fontSize: 16, color: '#f0f6fc', whiteSpace: 'nowrap' }}
          >
            Policy<span style={{ color: '#2563eb' }}>Analysis</span>
          </motion.span>
        )}
      </div>

      {/* Nav Links */}
      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10,
                textDecoration: 'none',
                backgroundColor: isActive ? '#2563eb' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                fontWeight: 500,
                fontSize: 14,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = '#f0f6fc';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                }
              }}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {link.name}
                </motion.span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div style={{ padding: '12px', borderTop: '1px solid #1e293b', flexShrink: 0 }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 8, padding: '8px 12px',
            borderRadius: 10, border: 'none',
            backgroundColor: 'transparent',
            color: '#64748b', cursor: 'pointer',
            fontSize: 14, fontWeight: 500,
            transition: 'all 0.15s ease',
            marginBottom: 4,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLElement).style.color = '#f0f6fc';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.color = '#64748b';
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>

        <button
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10, padding: '8px 12px',
            borderRadius: 10, border: 'none',
            backgroundColor: 'transparent',
            color: '#ef4444', cursor: 'pointer',
            fontSize: 14, fontWeight: 500,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(239,68,68,0.08)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}

"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, RotateCcw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PolicyInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export function PolicyInput({ onAnalyze, isLoading }: PolicyInputProps) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 100000;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxLength));
  };

  const processFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content.slice(0, maxLength));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#f0f6fc' }}>
          <FileText size={15} color="#2563eb" />
          Policy / Law Text
        </label>
        <span style={{ fontSize: 12, color: text.length >= maxLength ? '#ef4444' : '#64748b' }}>
          {text.length} / {maxLength} characters
        </span>
      </div>

      {/* Textarea container */}
      <div
        style={{
          position: 'relative',
          borderRadius: 10,
          border: `2px solid ${isDragging ? '#2563eb' : '#1e293b'}`,
          background: 'rgba(13,17,23,0.5)',
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setIsDragging(false);
          if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
        }}
        onFocus={() => {}} 
      >
        <textarea
          placeholder="Paste your policy text here (e.g., 'New traffic regulation law...')"
          value={text}
          onChange={handleTextChange}
          disabled={isLoading}
          style={{
            width: '100%',
            minHeight: 240,
            padding: 20,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            color: '#f0f6fc',
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'inherit',
          }}
          onFocus={e => (e.currentTarget.parentElement as HTMLElement).style.borderColor = '#2563eb'}
          onBlur={e => (e.currentTarget.parentElement as HTMLElement).style.borderColor = '#1e293b'}
        />
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(13,17,23,0.85)',
                backdropFilter: 'blur(4px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed #2563eb',
                borderRadius: 10,
              }}
            >
              <UploadCloud size={40} color="#2563eb" style={{ marginBottom: 12 }} />
              <p style={{ color: '#2563eb', fontWeight: 600, fontSize: 16 }}>Drop file here to upload</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16,
        padding: '14px 16px',
        background: 'rgba(30,41,59,0.3)',
        borderRadius: 10,
        border: '1px solid rgba(30,41,59,0.6)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="file" ref={fileInputRef} style={{ display: 'none' }}
            accept=".txt,.md,.json"
            onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px',
              background: '#161b27',
              border: '1px solid #1e293b',
              borderRadius: 8,
              color: '#f0f6fc',
              fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <UploadCloud size={15} color="#2563eb" />
            Upload File
          </button>
          {text.length > 0 && (
            <button
              onClick={() => setText("")}
              disabled={isLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px',
                background: 'none', border: 'none',
                color: '#64748b', fontSize: 13, cursor: 'pointer',
                transition: 'color 0.15s',
              }}
            >
              <RotateCcw size={13} /> Clear
            </button>
          )}
        </div>

        <button
          onClick={() => onAnalyze(text)}
          disabled={!text.trim() || isLoading}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 28px',
            background: !text.trim() || isLoading ? '#1e293b' : '#2563eb',
            color: !text.trim() || isLoading ? '#64748b' : '#ffffff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14, fontWeight: 600,
            cursor: !text.trim() || isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isLoading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : 'Analyze Policy'}
        </button>
      </div>
    </div>
  );
}

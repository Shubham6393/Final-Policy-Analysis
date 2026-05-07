import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolicyAI - AI Policy Analysis",
  description: "Modern SaaS for AI-powered government policy sentiment analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex min-h-screen overflow-hidden`} style={{ backgroundColor: '#0d1117', color: '#f0f6fc' }}>
        <Sidebar />
        <main className="flex-1 min-w-0 h-screen overflow-y-auto" style={{ backgroundColor: '#0d1117' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

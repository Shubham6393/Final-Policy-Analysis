"use client";

import { motion } from "framer-motion";
import { Download, FileText, BarChart2, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function ReportsPage() {
    const reports = [
        { id: 1, title: "Q1 Policy Sentiment Overview", date: "April 1, 2026", type: "Quarterly", size: "2.4 MB" },
        { id: 2, title: "Environmental Initiatives Analysis", date: "March 15, 2026", type: "Topic Specific", size: "1.1 MB" },
        { id: 3, title: "Tax & Revenue Feedback Summary", date: "February 28, 2026", type: "Topic Specific", size: "3.5 MB" },
        { id: 4, title: "Annual Public Opinion Report 2025", date: "January 10, 2026", type: "Annual", size: "8.2 MB" }
    ];

    return (
        <div className="p-6 md:p-8 h-full overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Generated Reports</h1>
                        <p className="text-secondary-foreground font-light mt-1">Download and review compiled sentiment analytics reports.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all duration-200 shadow-sm font-medium">
                        <BarChart2 className="w-4 h-4" /> Generate New Report
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <Card key={report.id} className="p-6 group cursor-pointer border border-border hover:border-primary/50 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                                    <FileText className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                                    {report.type}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {report.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Calendar className="w-4 h-4" /> {report.date}
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <span className="text-xs text-muted-foreground font-medium">{report.size} • PDF</span>
                                <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground transition-colors">
                                    <Download className="w-4 h-4" /> Download
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

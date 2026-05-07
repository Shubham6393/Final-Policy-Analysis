"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HistoryItem {
    _id: string;
    policyText: string;
    sentiment: string;
    confidence: number;
    timestamp: string;
}

export default function HistoryPage() {
    const [data, setData] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch("/api/history")
            .then((res) => res.json())
            .then((json) => {
                setData(json.results || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredData = data.filter((item) => {
        const matchesSearch = item.policyText
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Yes" && item.sentiment === "Yes") ||
            (filter === "No" && item.sentiment === "No") ||
            (filter === "Neutral" && item.sentiment === "Neutral");
        return matchesSearch && matchesFilter;
    });

    const handleExport = () => {
        const headers = ["Policy Text", "Sentiment", "Confidence", "Date"];
        const rows = filteredData.map((item) => [
            `"${item.policyText.replace(/"/g, '""').slice(0, 100)}"`,
            item.sentiment,
            item.confidence,
            new Date(item.timestamp).toLocaleDateString(),
        ]);
        const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "analysis_history.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 md:p-8 h-full overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Analysis History</h1>
                        <p className="text-secondary-foreground font-light mt-1">
                            Archive of all policy evaluations and sentiment trends.
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-card border border-border hover:bg-muted text-foreground rounded-xl transition-all duration-200 shadow-sm font-medium"
                    >
                        <Download className="w-4 h-4 text-primary" /> Export CSV
                    </button>
                </div>

                <div className="glass-card rounded-2xl shadow-lg border border-border overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-border/40 flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/50">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
                            <Input
                                placeholder="Search policies..."
                                className="pl-10 bg-background/50 border-border h-10 rounded-xl focus:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-background/50 border border-border rounded-xl px-3 h-10">
                            <Filter className="w-4 h-4 text-secondary-foreground" />
                            <select
                                className="bg-transparent text-sm text-foreground focus:outline-none min-w-[140px] cursor-pointer"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All" className="bg-card">All Sentiments</option>
                                <option value="Yes" className="bg-card">Positive</option>
                                <option value="No" className="bg-card">Negative</option>
                                <option value="Neutral" className="bg-card">Neutral</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-secondary-foreground uppercase bg-muted/20 font-semibold border-b border-border/40 tracking-wider">
                                <tr>
                                    <th className="px-6 py-5">Policy Text (preview)</th>
                                    <th className="px-6 py-5">Date</th>
                                    <th className="px-6 py-5">Sentiment</th>
                                    <th className="px-6 py-5">Confidence</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center text-secondary-foreground">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr
                                            key={item._id}
                                            className={cn(
                                                "hover:bg-primary/5 transition-colors",
                                                index % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                                            )}
                                        >
                                            <td className="px-6 py-4 font-medium text-foreground max-w-xs truncate">
                                                {item.policyText.slice(0, 80)}
                                                {item.policyText.length > 80 ? "..." : ""}
                                            </td>
                                            <td className="px-6 py-4 text-secondary-foreground">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant={
                                                        item.sentiment === "Yes"
                                                            ? "success"
                                                            : item.sentiment === "No"
                                                            ? "danger"
                                                            : "warning"
                                                    }
                                                >
                                                    {item.sentiment === "Yes"
                                                        ? "Positive"
                                                        : item.sentiment === "No"
                                                        ? "Negative"
                                                        : "Neutral"}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                item.confidence > 80
                                                                    ? "bg-success"
                                                                    : item.confidence > 60
                                                                    ? "bg-warning"
                                                                    : "bg-destructive"
                                                                )}
                                                            style={{ width: `${item.confidence}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-medium text-xs text-secondary-foreground">
                                                        {item.confidence}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center gap-2 text-secondary-foreground">
                                                <Filter className="w-8 h-8 opacity-20 mb-2" />
                                                <p>No policies found matching your criteria.</p>
                                                <button
                                                    onClick={() => { setSearchTerm(""); setFilter("All"); }}
                                                    className="text-primary hover:underline text-sm mt-1"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-border/40 flex items-center justify-between text-sm text-secondary-foreground bg-card/30">
                        <span>
                            Showing <span className="font-medium text-foreground">{filteredData.length}</span> entries
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

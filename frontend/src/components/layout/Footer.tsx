
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/40 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-6 h-6 text-secondary" />
                            <span className="font-bold text-lg text-primary dark:text-white">
                                Policy<span className="text-secondary">AI</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            AI-powered sentiment analysis for smarter governance decisions.
                            Analyzing public perception before implementation.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link href="/analysis" className="text-muted-foreground hover:text-primary transition-colors text-sm">Analysis Tool</Link></li>
                            <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">Dashboard</Link></li>
                            <li><Link href="/history" className="text-muted-foreground hover:text-primary transition-colors text-sm">History</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Support</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Security</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Government Policy Sentiment Analysis Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-muted-foreground">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

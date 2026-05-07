"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Bell, User } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border h-16 flex items-center px-6 transition-all duration-300">
            <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <span className="font-bold text-xl tracking-tight text-foreground">
                        Policy<span className="text-primary">AI</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
                    </button>
                    
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 cursor-pointer hover:bg-primary/30 transition-colors">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

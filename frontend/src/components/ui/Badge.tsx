
import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "success" | "danger" | "warning" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
        danger: "border-transparent bg-red-500 text-white hover:bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
        outline: "text-foreground",
    };

    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
    )
}

export { Badge }

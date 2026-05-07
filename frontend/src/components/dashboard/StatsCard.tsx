
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    description?: string;
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, description, className }: StatsCardProps) {
    return (
        <Card hoverEffect className={cn("p-6 group cursor-pointer border border-border transition-all duration-300 hover:border-primary/50 hover:bg-muted/10", className)}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{title}</h3>
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                    <Icon className="w-4 h-4 text-primary" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{value}</div>
                {(trend || description) && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground/80 transition-colors">
                        {trend && (
                            <span className={cn("font-medium", trendUp ? "text-green-500" : "text-red-500")}>
                                {trend}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </div>
        </Card>
    );
}

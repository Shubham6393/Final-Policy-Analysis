
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
                transition={{ duration: 0.2 }}
                className={cn(
                    "rounded-xl border bg-card text-card-foreground shadow-sm glass",
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"

export { Card }

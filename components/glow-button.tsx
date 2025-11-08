import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative px-8 py-3 rounded-md font-light tracking-wide text-sm transition-all duration-300",
          "before:absolute before:inset-0 before:rounded-md before:blur-xl before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-50 hover:-translate-y-0.5",
          variant === "primary" && ["bg-primary text-primary-foreground", "before:bg-primary"],
          variant === "secondary" && ["bg-secondary text-secondary-foreground", "before:bg-secondary"],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

GlowButton.displayName = "GlowButton"

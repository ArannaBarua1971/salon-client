"use client"

import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Selectable chip — one-click choice used for dates, times, filters and tags.
 * Two shapes: "pill" (single line) and "tile" (stacked content, e.g. day + date).
 */
type CommonChipProps = Omit<ComponentProps<"button">, "children"> & {
  children?: ReactNode
  /** Selected / active state. */
  selected?: boolean
  /** "pill" = rounded single line, "tile" = stacked block. */
  shape?: "pill" | "tile"
}

export function CommonChip({
  children,
  selected = false,
  shape = "pill",
  className,
  type = "button",
  disabled,
  ...props
}: CommonChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "border font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none",
        shape === "tile"
          ? "flex shrink-0 flex-col items-center gap-0.5 rounded-2xl px-4 py-2.5 text-center"
          : "rounded-full px-3 py-2 text-xs sm:text-sm",
        disabled
          ? "cursor-not-allowed border-border/60 bg-muted/50 text-muted-foreground/50 line-through"
          : selected
            ? "border-rose-gold/60 bg-rose-gold/12 text-rose-gold"
            : "border-border/70 bg-background/60 text-muted-foreground hover:border-rose-gold/40 hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { CommonChip as Chip }
export default CommonChip

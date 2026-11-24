"use client"

import { cn } from "@/lib/utils"

export type FilterChip = {
  label: string
  /** Optional count pill shown after the label. */
  count?: number
}

type FilterChipsProps = {
  chips: FilterChip[]
  /** Index of the selected chip — design placeholder, replace with state. */
  activeIndex?: number
  /** Selection handler — wire up to your filter logic. */
  onSelect?: (index: number) => void
  /** Accessible name for the chip group. */
  ariaLabel?: string
  /** Extra classes for the row. */
  className?: string
}

/**
 * Rounded filter chip row (All / Paid / Refunded …) used above dashboard
 * tables. Purely presentational until `onSelect` is provided.
 */
export function FilterChips({
  chips,
  activeIndex = 0,
  onSelect,
  ariaLabel = "Filter results",
  className,
}: FilterChipsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {chips.map((chip, index) => {
        const active = index === activeIndex
        return (
          <button
            key={chip.label}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect?.(index)}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "border-rose-gold/50 bg-rose-gold/12 text-rose-gold"
                : "border-border/70 bg-card text-muted-foreground hover:border-rose-gold/40 hover:text-foreground"
            )}
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className="rounded-full bg-background/70 px-1.5 py-0.5 text-[11px] tabular-nums">
                {chip.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterChips

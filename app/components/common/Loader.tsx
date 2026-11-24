import { Scissors } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Salon themed loaders — rose-gold → gold gradient ring or bouncing dots.
 *
 * - <CommonLoader />  inline indicator (buttons, cards, tables)
 * - <PageLoader />    full-screen overlay for route/data loading
 */
export type LoaderVariant = "spinner" | "dots"

type CommonLoaderProps = {
  /** Visual style — gradient ring or bouncing dots. */
  variant?: LoaderVariant
  /** `sm` fits inside buttons, `md` is the default, `lg` for empty states. */
  size?: "sm" | "md" | "lg"
  /** Caption rendered next to (spinner) or under (dots) the loader. */
  label?: string
  /** Extra classes for the outer wrapper. */
  className?: string
}

/** Ring thickness per size for the spinner mask. */
const spinnerMask = {
  sm: "[mask-image:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-2px))]",
  md: "[mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]",
  lg: "[mask-image:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_calc(100%-4px))]",
} as const

const spinnerSize = {
  sm: "size-4",
  md: "size-8",
  lg: "size-14",
} as const

const dotSize = {
  sm: "size-1.5",
  md: "size-2.5",
  lg: "size-3.5",
} as const

const labelSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const

export function CommonLoader({
  variant = "spinner",
  size = "md",
  label,
  className,
}: CommonLoaderProps) {
  const isSpinner = variant === "spinner"

  return (
    <span
      role="status"
      className={cn(
        "mx-auto gap-2.5 text-muted-foreground",
        !isSpinner && "flex-col gap-2",
        className
      )}
    >
      {/* Screen reader announcement */}
      <span className="sr-only">Loading…</span>

      {isSpinner ? (
        <span
          aria-hidden="true"
          className={cn(
            "block shrink-0 animate-spin rounded-full bg-linear-to-r from-rose-gold via-gold to-rose-gold",
            spinnerSize[size],
            spinnerMask[size]
          )}
        />
      ) : (
        <span aria-hidden="true" className="flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className={cn(
                "block animate-bounce rounded-full bg-linear-to-br from-rose-gold to-gold",
                dotSize[size]
              )}
            />
          ))}
        </span>
      )}

      {label && (
        <span
          className={cn(
            "font-medium tracking-[0.14em] uppercase",
            labelSize[size]
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}

type PageLoaderProps = {
  /** Caption under the brand mark. */
  label?: string
  /** Extra classes for the overlay. */
  className?: string
}

/** Full-screen loading overlay — brand mark inside a spinning gradient ring. */
export function PageLoader({ label = "Loading", className }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-sm",
        className
      )}
    >
      <span className="sr-only">{label}…</span>

      <span
        aria-hidden="true"
        className="relative flex size-20 items-center justify-center"
      >
        {/* Spinning rose-gold → gold ring */}
        <span className="absolute inset-0 animate-spin rounded-full bg-linear-to-r from-rose-gold via-gold to-rose-gold [mask-image:radial-gradient(farthest-side,transparent_calc(100%-4px),#000_calc(100%-4px))]" />
        {/* Static centre with the salon mark */}
        <span className="flex size-14 items-center justify-center rounded-full border border-rose-gold/30 bg-card shadow-[0_12px_30px_-16px_var(--rose-gold)]">
          <Scissors className="size-6 text-rose-gold" />
        </span>
      </span>

      <p className="flex items-center gap-2.5 font-heading text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
        {label}
        <span aria-hidden="true" className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className="block size-1.5 animate-bounce rounded-full bg-linear-to-br from-rose-gold to-gold"
            />
          ))}
        </span>
      </p>
    </div>
  )
}

export { CommonLoader as Loader }
export default CommonLoader

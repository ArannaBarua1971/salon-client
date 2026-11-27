import { cn } from "@/lib/utils"

/**
 * Salon themed loader — a single rose-gold → gold gradient ring, centered.
 *
 * - <CommonLoader />  centered inline spinner (buttons, cards, tables)
 * - <PageLoader />    same spinner, centered on a full-screen overlay
 */

type CommonLoaderProps = {
  /** `sm` fits inside buttons, `md` is the default, `lg` for empty states. */
  size?: "sm" | "md" | "lg"
  /** Optional caption rendered under the spinner. */
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

const labelSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const

export function CommonLoader({
  size = "md",
  label,
  className,
}: CommonLoaderProps) {
  return (
    <span
      role="status"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2.5 text-muted-foreground",
        className
      )}
    >
      {/* Screen reader announcement */}
      <span className="sr-only">{label ?? "Loading"}…</span>

      <span
        aria-hidden="true"
        className={cn(
          "block shrink-0 animate-spin rounded-full bg-linear-to-r from-rose-gold via-gold to-rose-gold",
          spinnerSize[size],
          spinnerMask[size]
        )}
      />

      {label && (
        <span
          aria-hidden="true"
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
  /** Optional caption under the spinner. */
  label?: string
  /** Extra classes for the overlay. */
  className?: string
}

/** Full-screen overlay with the same spinner, dead center. */
export function PageLoader({ label, className }: PageLoaderProps) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm",
        className
      )}
    >
      <CommonLoader size="lg" label={label} />
    </div>
  )
}

export { CommonLoader as Loader }
export default CommonLoader
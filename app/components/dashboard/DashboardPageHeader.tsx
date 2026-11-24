import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DashboardPageHeaderProps = {
  /** Small rose-gold eyebrow text rendered above the title. */
  eyebrow: string
  /** Page heading — styled with the serif display font. */
  title: string
  /** Optional supporting line under the title. */
  description?: string
  /** Right-aligned actions (buttons) — stacks below the title on mobile. */
  className?: string
}

/**
 * Standard dashboard page header — eyebrow + serif title + description,
 * with an optional action slot on the right. Reused by every admin and
 * customer dashboard page.
 */
export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default DashboardPageHeader

"use client"

import { useId, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * Salon themed multi-line text field — label, hint and error text.
 * Pairs with CommonInput for single-line fields.
 */
type CommonTextareaProps = ComponentProps<"textarea"> & {
  /** Field label rendered above the textarea. */
  label?: string
  /** Helper text rendered below the textarea. */
  hint?: string
  /** Error message — also switches the field to its invalid styles. */
  error?: string
  /** Extra classes for the outer wrapper. */
  containerClassName?: string
}

export function CommonTextarea({
  label,
  hint,
  error,
  className,
  containerClassName,
  id,
  ...props
}: CommonTextareaProps) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = `${fieldId}-message`

  const hasMessage = Boolean(hint || error)

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <textarea
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={hasMessage ? messageId : undefined}
        className={cn(
          "w-full rounded-3xl border bg-background/70 px-4 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-destructive focus:border-destructive/60 focus:ring-destructive/25"
            : "border-input",
          className
        )}
        {...props}
      />

      {hasMessage && (
        <p
          id={messageId}
          className={cn(
            "px-1 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

export default CommonTextarea

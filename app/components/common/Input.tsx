"use client"

import { useId, useState, type ComponentProps, type ReactNode } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Salon themed input field — label, leading icon, hint/error text and an
 * optional show/hide toggle for password fields.
 */
type CommonInputProps = Omit<ComponentProps<"input">, "size"> & {
  /** Field label rendered above the input. */
  label?: string
  /** Leading icon rendered inside the field (pass a lucide icon). */
  icon?: ReactNode
  /** Helper text rendered below the field. */
  hint?: string
  /** Error message — also switches the field to its invalid styles. */
  error?: string
  /** Extra classes for the outer wrapper. */
  containerClassName?: string
}

export function CommonInput({
  label,
  icon,
  hint,
  error,
  className,
  containerClassName,
  id,
  type = "text",
  ...props
}: CommonInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`

  const [revealed, setRevealed] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword && revealed ? "text" : type

  const hasMessage = Boolean(hint || error)

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground"
          >
            {icon}
          </span>
        )}

        <input
          id={inputId}
          type={inputType}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          className={cn(
            "h-11 w-full rounded-full border bg-background/70 px-4 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            isPassword && "pr-11",
            error
              ? "border-destructive focus:border-destructive/60 focus:ring-destructive/25"
              : "border-input",
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {revealed ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>

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

export default CommonInput

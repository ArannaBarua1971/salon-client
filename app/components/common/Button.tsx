"use client"

import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Salon themed button variants — reuse these across the app instead of
 * restyling the base button every time.
 */
export const commonButtonVariants = cva(
  "group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_10px_26px_-12px_var(--primary)] hover:bg-primary/90 hover:shadow-[0_14px_30px_-12px_var(--primary)] active:scale-[0.98]",
        outline:
          "border border-rose-gold/50 bg-background/60 text-rose-gold backdrop-blur-sm hover:bg-rose-gold/10 active:scale-[0.98]",
        soft: "bg-rose-gold/12 text-rose-gold hover:bg-rose-gold/20 active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:bg-rose-gold/10 hover:text-rose-gold",
        link: "text-rose-gold underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 gap-1.5 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-12 gap-2.5 px-8 text-[0.95rem]",
        icon: "size-11 rounded-full p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

type CommonButtonProps = Omit<ComponentProps<"button">, "href"> &
  VariantProps<typeof commonButtonVariants> & {
    /** When set, the button renders as a Next.js link (navigation button). */
    href?: string
    children?: ReactNode
  }

export function CommonButton({
  className,
  variant,
  size,
  fullWidth,
  href,
  children,
  type = "button",
  disabled,
  ...props
}: CommonButtonProps) {
  const classes = cn(
    commonButtonVariants({ variant, size, fullWidth }),
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, disabled && "pointer-events-none opacity-50")}
        aria-disabled={disabled || undefined}
        {...(props as unknown as Omit<ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export { CommonButton as Button }
export default CommonButton

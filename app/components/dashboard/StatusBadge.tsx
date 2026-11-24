import { cn } from "@/lib/utils"

export type AppointmentStatus =
  "pending" | "confirmed" | "cancelled" | "completed"

export type PaymentStatus = "unpaid" | "paid" | "partial" | "refunded"

const appointmentStyles: Record<AppointmentStatus, string> = {
  pending: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
  confirmed: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  cancelled: "bg-destructive/12 text-destructive",
  completed: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
}

const paymentStyles: Record<PaymentStatus, string> = {
  unpaid: "bg-amber-500/12 text-amber-600 dark:text-amber-400",
  paid: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  partial: "bg-sky-500/12 text-sky-600 dark:text-sky-400",
  refunded: "bg-violet-500/12 text-violet-600 dark:text-violet-400",
}

type StatusBadgeProps = {
  status: AppointmentStatus | PaymentStatus
  kind?: "appointment" | "payment"
  className?: string
}

/** Pill used for appointment status and payment status across the dashboard. */
export function StatusBadge({
  status,
  kind = "appointment",
  className,
}: StatusBadgeProps) {
  const styles =
    kind === "payment"
      ? paymentStyles[status as PaymentStatus]
      : appointmentStyles[status as AppointmentStatus]

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize",
        styles,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}

export default StatusBadge

import { CreditCard } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"

type AppointmentActionsProps = {
  /** Booking id — used to build the default details link. */
  id: string
  status: AppointmentStatus
  payment: PaymentStatus
  /** Override the details link (e.g. point an admin table at /dashboard/admin/…). */
  detailsHref?: string
  /** Set to false when the row itself already links to the details page. */
  showDetails?: boolean
  /** Extra classes for the wrapper. */
  className?: string
}

/**
 * Row actions shared by appointment tables (customer + admin):
 * View details, Cancel while pending, Pay Now while confirmed & unpaid,
 * Rebook once cancelled.
 * Design only — attach your handlers where you use it.
 */
export function AppointmentActions({
  id,
  status,
  payment,
  detailsHref = `/dashboard/customer/appointments/${id}`,
  showDetails = true,
  className,
}: AppointmentActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {showDetails && (
        <CommonButton href={detailsHref} variant="soft" size="sm">
          View details
        </CommonButton>
      )}

      {status === "pending" && (
        <CommonButton
          variant="outline"
          size="sm"
          className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Cancel
        </CommonButton>
      )}

      {status === "confirmed" && payment === "unpaid" && (
        <CommonButton size="sm">
          <CreditCard className="size-3.5" aria-hidden="true" />
          Pay Now
        </CommonButton>
      )}

      {status === "cancelled" && (
        <CommonButton href="/services" variant="ghost" size="sm">
          Rebook
        </CommonButton>
      )}
    </div>
  )
}

export default AppointmentActions

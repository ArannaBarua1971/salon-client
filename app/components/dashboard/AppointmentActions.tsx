import { CreditCard, XCircle } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"
import ConfirmDialog from "./ConfirmDialog"
import { AppointmentAction } from "./AdminAppointmentActions"

type AppointmentActionsProps = {
  /** Booking id — used to build the default details link. */
  id: string | undefined
  status: AppointmentStatus
  payment: PaymentStatus
  /** Override the details link (e.g. point an admin table at /dashboard/admin/…). */
  detailsHref?: string
  /** Set to false when the row itself already links to the details page. */
  showDetails?: boolean
  /** Extra classes for the wrapper. */
  className?: string
  onCancel: AppointmentAction
  onSuccess?: () => Promise<void> | void
  data: any
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
  onCancel,
  onSuccess,
  data
}: AppointmentActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {showDetails && (
        <CommonButton href={detailsHref} variant="soft" size="sm">
          View details
        </CommonButton>
      )}

      {status === "pending" && (
        <ConfirmDialog
          tone="danger"
          buttonVariant="outline"
          buttonSize="sm"
          className="border-destructive/40 text-destructive hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive"
          mediaIcon={<XCircle className="size-6" aria-hidden="true" />}
          question={`Cancel appointment #${id}`}
          description="This can't be undone — the customer will be notified that their booking was cancelled."
          buttonName="Cancel"
          decisionBtnName="Cancel appointment"
          toastMessage="Appointment cancelled"
          id={id}
          data={onCancel.data}
          func={onCancel.action}
          onSuccess={onSuccess}
        />
      )}

      {status === "confirmed" && payment === "unpaid" && (

        <form action="/api/checkout_sessions" method="POST">
          <input type="number" name="price" defaultValue={data.price} hidden />
          <input type="text" name="serviceId" defaultValue={data.serviceId} hidden />
          <input type="text" name="appointmentId" defaultValue={data.appointmentId} hidden />
          <section>
            <CommonButton size="sm" type="submit" role="link">
              <CreditCard className="size-3.5" aria-hidden="true" />
              Pay Now
            </CommonButton>
          </section>
        </form>
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

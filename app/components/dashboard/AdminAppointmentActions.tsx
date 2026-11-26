"use client"

import { CalendarCheck2, XCircle } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import ConfirmDialog from "@/app/components/dashboard/ConfirmDialog"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"
import { BookingServiceTypes } from "@/types/BookingServiceTypes"

/** Same shape the shared ConfirmDialog expects from an API/server action. */
export interface AppointmentAction {
  data: any,
  action: (data: any, id: string | undefined) => Promise<{ key: string }>
}

type AdminAppointmentActionsProps = {
  /** Booking id sent to the confirm / cancel handlers. */
  id: string | undefined
  status: AppointmentStatus
  payment?: PaymentStatus
  /** Details link (defaults to the admin details route). */
  detailsHref?: string
  /** Set to false on the details page itself. */
  showDetails?: boolean
  /** Confirm a pending appointment — wire to your API. */
  onConfirm: AppointmentAction
  onCancel: AppointmentAction
  /** Called after a successful action (e.g. refetch the request list). */
  onSuccess?: () => Promise<void> | void
  /** Extra classes for the wrapper. */
  className?: string
}


export function AdminAppointmentActions({
  id,
  status,
  detailsHref = `/dashboard/admin/appointments/${id}`,
  showDetails = true,
  onConfirm,
  onCancel,
  onSuccess,
  className,
}: AdminAppointmentActionsProps) {
  const canConfirm = status === "pending"
  const canCancel = status === "pending" || status === "confirmed"


  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* View appointment details */}
      {showDetails && (
        <CommonButton href={detailsHref} variant="soft" size="sm">
          View details
        </CommonButton>
      )}

      {/* Confirm a pending appointment */}
      {canConfirm && (
        <ConfirmDialog
          tone="success"
          buttonVariant="primary"
          buttonSize="sm"
          mediaIcon={<CalendarCheck2 className="size-6" aria-hidden="true" />}
          question={`Confirm appointment #${id}`}
          description="The customer will be notified that their booking request has been approved."
          buttonName="Confirm"
          decisionBtnName="Confirm"
          toastMessage="Appointment confirmed"
          id={id}
          data={onConfirm.data}
          func={onConfirm.action}
          onSuccess={onSuccess}
        />
      )}

      {/* Cancel a pending or confirmed appointment */}
      {canCancel && (
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
    </div>
  )
}

export default AdminAppointmentActions

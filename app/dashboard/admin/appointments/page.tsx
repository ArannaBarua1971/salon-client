"use client"

import { useEffect, useState } from "react"
import { Scissors } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import AdminAppointmentActions from "@/app/components/dashboard/AdminAppointmentActions"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type {
  AppointmentStatus,
} from "@/app/components/dashboard/StatusBadge"
import { getBookingAppointments, updateBookingAppointment } from "@/lib/applicatonApi/BookingApi"
import { BookingServiceTypes } from "@/types/BookingServiceTypes"

// Sample data — replace with your API/DB results


/** Filter chips — index 0 = All, the rest map to an appointment status. */
const filterLabels = ["All", "Pending", "Confirmed", "Cancelled"]

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<BookingServiceTypes[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const countByStatus = (status: AppointmentStatus) =>
    appointments.filter((appointment) => appointment.status === status).length
  const chips = [
    { label: filterLabels[0], count: appointments.length },
    { label: filterLabels[1], count: countByStatus("pending") },
    { label: filterLabels[2], count: countByStatus("confirmed") },
    { label: filterLabels[3], count: countByStatus("cancelled") },
  ]

  /** Requests currently shown (All + status filters). */
  const visibleAppointments =
    activeIndex === 0
      ? appointments
      : appointments.filter(
        (appointment) =>
          appointment.status ===
          (filterLabels[activeIndex].toLowerCase() as AppointmentStatus)
      )

  const getAppointments = async () => {
    const data = await getBookingAppointments()
    setAppointments(data)
  }

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Page header + primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <DashboardPageHeader
          eyebrow="Appointments"
          title="User Appointments"
          description="Track, confirm or cancel user booking requests."
        />
       
      </div>

      {/* Filters — now driven by the live request counts */}
      <FilterChips
        chips={chips}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        ariaLabel="Filter appointments"
      />

      {/* Appointments table */}
      <section
        aria-label="My appointments"
        className="overflow-hidden rounded-3xl border border-border/70 bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              All appointments
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing {visibleAppointments.length} of {appointments.length}{" "}
              bookings
            </p>
          </div>
        </div>

        <DashboardTable
          tableHeaders={[
            "Service",
            "Appointment date",
            "Price",
            "Status",
            "Payment",
          ]}
          actionOptions={true}
        >
          {visibleAppointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="transition-colors hover:bg-rose-gold/5"
            >
              {/* Booking id (DashboardTable renders the "#id" column) */}
              <td className="px-5 py-4 font-medium text-foreground">
                {appointment._id}
              </td>

              {/* Service + category */}
              <td className="px-5 py-4">
                <p className="font-medium text-foreground">
                  {appointment.serviceName}
                </p>
              </td>

              {/* Appointment date + time & location */}
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-foreground">
                  {appointment.appointmentDate} · {appointment.timeSlot}
                </p>
              </td>


              {/* Price */}
              <td className="px-5 py-4 font-heading text-base font-semibold whitespace-nowrap text-foreground">
                ${appointment.servicePrice}
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <StatusBadge status={appointment.status} />
              </td>

              {/* Payment status */}
              <td className="px-5 py-4">
                <StatusBadge status={appointment.paymentStatus} kind="payment" />
              </td>

              {/* Actions (View details / Confirm / Cancel) */}
              <td className="px-5 py-4">
                <AdminAppointmentActions
                  id={appointment._id}
                  status={appointment.status}
                  payment={appointment.paymentStatus}
                  detailsHref={`/dashboard/admin/appointments/${appointment._id}`}
                  onConfirm={{data:{status:"confirmed"},action:updateBookingAppointment}}
                  onCancel={{data:{status:"cancelled"},action:updateBookingAppointment}}
                  onSuccess={getAppointments}
                />
              </td>
            </tr>
          ))}

          {/* Empty state for a filter with no matching requests */}
          {visibleAppointments.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-5 py-10 text-center text-sm text-muted-foreground"
              >
                No appointment requests in this view yet.
              </td>
            </tr>
          )}
        </DashboardTable>
      </section>
    </div>
  )
}

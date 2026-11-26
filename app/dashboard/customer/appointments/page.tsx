"use client"
import { Scissors } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import AppointmentActions from "@/app/components/dashboard/AppointmentActions"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import { useEffect, useState } from "react"
import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { useSession } from "@/lib/auth-client"
import { getBookingAppointments, updateBookingAppointment } from "@/lib/applicatonApi/BookingApi"
import { date } from "better-auth"
import CommonLoader from "@/app/components/common/Loader"

const filters = [
  { label: "All", count: 5 },
  { label: "Pending", count: 2 },
  { label: "Confirmed", count: 1 },
  { label: "Cancelled", count: 1 },
]



export default function MyAppointmentsPage() {
  const { data, isPending } = useSession()
  const [appointments, setAppointments] = useState<BookingServiceTypes[]>([])
  const getData = async () => {
    const d = await getBookingAppointments(data?.user.id)
    setAppointments(d)
  }
  useEffect(() => {
    getData()
  }, [])

  if (isPending) {
    return <CommonLoader />
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Page header + primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <DashboardPageHeader
          eyebrow="Appointments"
          title="My Appointments"
          description="Track, pay for or cancel your booking requests."
        />
        <CommonButton href="/services" size="lg" variant="outline">
          <Scissors className="size-4" aria-hidden="true" />
          Book new appointment
        </CommonButton>
      </div>

      {/* Filters (design only — wire up to your state/filter logic) */}
      <FilterChips chips={filters} ariaLabel="Filter appointments" />

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
              Showing {appointments.length} of {appointments.length} bookings
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
          {appointments.map((appointment) => (
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

              {/* Actions (Cancel / Pay Now / Rebook) */}
              {data?.session ?

                <td className="px-5 py-4">
                  <AppointmentActions
                    id={appointment?._id}
                    status={appointment.status}
                    payment={appointment.paymentStatus}
                    data={{ price: appointment.servicePrice, serviceId: appointment.serviceId, appointmentId: appointment._id }}
                    onCancel={{ data: { status: "cancelled" }, action: updateBookingAppointment }}
                    onSuccess={getData}
                  />
                </td> : <></>
              }
            </tr>
          ))}
        </DashboardTable>
      </section>
    </div>
  )
}

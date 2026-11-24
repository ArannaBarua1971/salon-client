import { Scissors } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import AppointmentActions from "@/app/components/dashboard/AppointmentActions"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"

const filters = [
  { label: "All", count: 5 },
  { label: "Pending", count: 2 },
  { label: "Confirmed", count: 1 },
  { label: "Completed", count: 1 },
  { label: "Cancelled", count: 1 },
]

// Sample data — replace with your API/DB results
const appointments: Array<{
  id: string
  service: string
  category: string
  stylist: string
  date: string
  time: string
  duration: string
  location: string
  price: number
  status: AppointmentStatus
  payment: PaymentStatus
}> = [
  {
    id: "BK-2041",
    service: "Balayage & Colour",
    category: "Hair Colour",
    stylist: "Mia Carter",
    date: "24 Nov 2026",
    time: "10:30 AM",
    duration: "2 hrs",
    location: "Studio A · Downtown",
    price: 120,
    status: "confirmed",
    payment: "unpaid",
  },
  {
    id: "BK-2038",
    service: "Haircut & Styling",
    category: "Hair",
    stylist: "Leo Grant",
    date: "21 Nov 2026",
    time: "2:00 PM",
    duration: "45 min",
    location: "Studio B · Uptown",
    price: 45,
    status: "pending",
    payment: "unpaid",
  },
  {
    id: "BK-2033",
    service: "Keratin Smoothing",
    category: "Hair Treatment",
    stylist: "Mia Carter",
    date: "19 Nov 2026",
    time: "9:15 AM",
    duration: "3 hrs",
    location: "Studio A · Downtown",
    price: 150,
    status: "pending",
    payment: "unpaid",
  },
  {
    id: "BK-2030",
    service: "Spa Facial & Massage",
    category: "Spa",
    stylist: "Ivy Nguyen",
    date: "18 Nov 2026",
    time: "11:00 AM",
    duration: "60 min",
    location: "Spa Wing · Riverside",
    price: 80,
    status: "completed",
    payment: "paid",
  },
  {
    id: "BK-2022",
    service: "Keratin Smoothing",
    category: "Hair Treatment",
    stylist: "Mia Carter",
    date: "12 Nov 2026",
    time: "9:15 AM",
    duration: "3 hrs",
    location: "Studio A · Downtown",
    price: 150,
    status: "cancelled",
    payment: "refunded",
  },
]

export default function MyAppointmentsPage() {
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
            "Stylist",
            "Price",
            "Status",
            "Payment",
          ]}
          actionOptions={true}
        >
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="transition-colors hover:bg-rose-gold/5"
            >
              {/* Booking id (DashboardTable renders the "#id" column) */}
              <td className="px-5 py-4 font-medium text-foreground">
                {appointment.id}
              </td>

              {/* Service + category */}
              <td className="px-5 py-4">
                <p className="font-medium text-foreground">
                  {appointment.service}
                </p>
                <p className="text-[11px] font-medium tracking-wide text-rose-gold uppercase">
                  {appointment.category}
                </p>
              </td>

              {/* Appointment date + time & location */}
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-foreground">
                  {appointment.date} · {appointment.time}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointment.location}
                </p>
              </td>

              {/* Stylist + duration */}
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-foreground">{appointment.stylist}</p>
                <p className="text-xs text-muted-foreground">
                  {appointment.duration}
                </p>
              </td>

              {/* Price */}
              <td className="px-5 py-4 font-heading text-base font-semibold whitespace-nowrap text-foreground">
                ${appointment.price}
              </td>

              {/* Status */}
              <td className="px-5 py-4">
                <StatusBadge status={appointment.status} />
              </td>

              {/* Payment status */}
              <td className="px-5 py-4">
                <StatusBadge status={appointment.payment} kind="payment" />
              </td>

              {/* Actions (Cancel / Pay Now / Rebook) */}
              <td className="px-5 py-4">
                <AppointmentActions
                  id={appointment.id}
                  status={appointment.status}
                  payment={appointment.payment}
                />
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>
    </div>
  )
}

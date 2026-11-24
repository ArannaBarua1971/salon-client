import { CalendarClock, CreditCard, MapPin, Scissors } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"

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
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
            Appointments
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            My Appointments
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Track, pay for or cancel your booking requests.
          </p>
        </div>

        <CommonButton href="/services" size="lg" variant="outline">
          <Scissors className="size-4" aria-hidden="true" />
          Book new appointment
        </CommonButton>
      </div>

      {/* Filters (design only — wire up to your state/filter logic) */}
      <div
        role="tablist"
        aria-label="Filter appointments"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter, index) => (
          <button
            key={filter.label}
            type="button"
            role="tab"
            aria-selected={index === 0}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              index === 0
                ? "border-rose-gold/50 bg-rose-gold/12 text-rose-gold"
                : "border-border/70 bg-card text-muted-foreground hover:border-rose-gold/40 hover:text-foreground"
            )}
          >
            {filter.label}
            <span className="rounded-full bg-background/70 px-1.5 py-0.5 text-[11px] tabular-nums">
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Appointment list */}
      <ul className="flex flex-col gap-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="rounded-3xl border border-border/70 bg-card p-5 transition-colors hover:border-rose-gold/40"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Info */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {appointment.service}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    #{appointment.id}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium tracking-wide text-rose-gold uppercase">
                  {appointment.category}
                </p>

                <dl className="mt-3 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <CalendarClock
                      className="size-3.5 shrink-0 text-rose-gold"
                      aria-hidden="true"
                    />
                    <span>
                      {appointment.date} · {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors
                      className="size-3.5 shrink-0 text-rose-gold"
                      aria-hidden="true"
                    />
                    <span>
                      {appointment.stylist} · {appointment.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="size-3.5 shrink-0 text-rose-gold"
                      aria-hidden="true"
                    />
                    <span>{appointment.location}</span>
                  </div>
                </dl>
              </div>

              {/* Status + price */}
              <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={appointment.status} />
                  <StatusBadge status={appointment.payment} kind="payment" />
                </div>
                <p className="font-heading text-2xl font-semibold text-foreground">
                  ${appointment.price}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border/60 pt-4">
              <CommonButton
                href={`/dashboard/customer/appointments/${appointment.id}`}
                variant="soft"
                size="sm"
              >
                View details
              </CommonButton>

              {appointment.status === "pending" && (
                <CommonButton
                  variant="outline"
                  size="sm"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Cancel appointment
                </CommonButton>
              )}

              {appointment.status === "confirmed" &&
                appointment.payment === "unpaid" && (
                  <CommonButton size="sm">
                    <CreditCard className="size-3.5" aria-hidden="true" />
                    Pay Now
                  </CommonButton>
                )}

              {appointment.status === "cancelled" && (
                <CommonButton href="/services" variant="ghost" size="sm">
                  Rebook
                </CommonButton>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

import Link from "next/link"
import { BadgeCheck, Clock, Inbox, ArrowRight, XCircle } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"

const stats = [
  {
    label: "Total appointment requests",
    value: "42",
    note: "+6 this month",
    icon: Inbox,
  },
  {
    label: "Pending appointments",
    value: "6",
    note: "Awaiting confirm",
    icon: Clock,
  },
  {
    label: "Confirmed appointments",
    value: "12",
    note: "Next: 24 Nov",
    icon: BadgeCheck,
  },
  {
    label: "Cancelled appointments",
    value: "5",
    note: "Last 30 days",
    icon: XCircle,
  },
]

// Sample data — replace with your API/DB results
const recentAppointments: Array<{
  id: string
  service: string
  datetime: string
  stylist: string
  status: AppointmentStatus
  payment: PaymentStatus
}> = [
  {
    id: "BK-2041",
    service: "Balayage & Colour",
    datetime: "24 Nov 2026, 10:30 AM",
    stylist: "Mia Carter",
    status: "confirmed",
    payment: "unpaid",
  },
  {
    id: "BK-2038",
    service: "Haircut & Styling",
    datetime: "21 Nov 2026, 2:00 PM",
    stylist: "Leo Grant",
    status: "pending",
    payment: "unpaid",
  },
  {
    id: "BK-2033",
    service: "Keratin Smoothing",
    datetime: "19 Nov 2026, 9:15 AM",
    stylist: "Mia Carter",
    status: "pending",
    payment: "unpaid",
  },
  {
    id: "BK-2022",
    service: "Keratin Smoothing",
    datetime: "12 Nov 2026, 9:15 AM",
    stylist: "Mia Carter",
    status: "cancelled",
    payment: "refunded",
  },
]

export default function CustomerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
            Dashboard
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Welcome back, Alex
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Here&apos;s what is happening with your appointments today.
          </p>
        </div>

        <CommonButton href="/services" size="lg">
          Book new appointment
          <ArrowRight className="size-4" aria-hidden="true" />
        </CommonButton>
      </div>

      {/* Stat cards */}
      <section
        aria-label="Appointment overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map(({ label, value, note, icon: Icon }) => (
          <article
            key={label}
            className="rounded-3xl border border-border/70 bg-card p-5 transition-colors hover:border-rose-gold/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-2xl bg-rose-gold/12 text-rose-gold"
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">
                {note}
              </span>
            </div>
            <p className="mt-4 font-heading text-3xl font-semibold text-foreground">
              {value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </article>
        ))}
      </section>

      {/* Recent appointments */}
      <section
        aria-label="Recent appointments"
        className="overflow-hidden rounded-3xl border border-border/70 bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Recent appointments
            </h2>
            <p className="text-xs text-muted-foreground">
              Your latest booking requests and their status
            </p>
          </div>
          <Link
            href="/dashboard/customer/appointments"
            className="flex items-center gap-1 text-sm font-medium text-rose-gold outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            View all
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Booking
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Service
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Date &amp; time
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Stylist
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 font-medium">
                  Payment
                </th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recentAppointments.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-rose-gold/5"
                >
                  <td className="px-5 py-4 font-medium text-foreground">
                    #{row.id}
                  </td>
                  <td className="px-5 py-4 text-foreground">{row.service}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {row.datetime}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {row.stylist}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={row.payment} kind="payment" />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/dashboard/customer/appointments/${row.id}`}
                      className="font-medium text-rose-gold outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

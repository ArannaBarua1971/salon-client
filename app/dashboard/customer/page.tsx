"use client"
import Link from "next/link"
import { BadgeCheck, Clock, Inbox, ArrowRight, XCircle } from "lucide-react"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import { CommonButton } from "@/app/components/common/Button"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"

import { useSession } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { getBookingAppointments, updateBookingAppointment } from "@/lib/applicatonApi/BookingApi"
import CommonLoader from "@/app/components/common/Loader"
import AppointmentActions from "@/app/components/dashboard/AppointmentActions"




export default function CustomerDashboardPage() {
  const { data, isPending } = useSession()
  const [appointments, setAppointments] = useState<BookingServiceTypes[]>([])
  const [stats, setStates] = useState([
      {
        label: "Total appointment requests",
        value: 0,
        note: "life time",
        icon: Inbox,
      },
      {
        label: "Pending appointments",
        value: 0,
        note: "Awaiting confirm",
        icon: Clock,
      },
      {
        label: "Confirmed appointments",
        value: 0,
        note: "life time",
        icon: BadgeCheck,
      },
      {
        label: "Cancelled appointments",
        value: 0,
        note: "life time",
        icon: XCircle,
      },
    ])

  const getData = async () => {
    const d = await getBookingAppointments(data?.user.id)
    const show=d.slice(0,6)
    setStates([
      {
        label: "Total appointment requests",
        value: d.length,
        note: "life time",
        icon: Inbox,
      },
      {
        label: "Pending appointments",
        value: d.filter((i:BookingServiceTypes)=> i.status==="pending").length,
        note: "Awaiting confirm",
        icon: Clock,
      },
      {
        label: "Confirmed appointments",
        value: d.filter((i:BookingServiceTypes)=> i.status==="confirmed").length,
        note: "life time",
        icon: BadgeCheck,
      },
      {
        label: "Cancelled appointments",
        value: d.filter((i:BookingServiceTypes)=> i.status==="cancelled").length,
        note: "life time",
        icon: XCircle,
      },
    ])
    setAppointments(show)
  }
  useEffect(() => {
    getData()
  }, [])

  if (isPending) {
    return <CommonLoader />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
            Dashboard
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Welcome back, {data?.user.name}
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
        </div>
      </section>
    </div>
  )
}

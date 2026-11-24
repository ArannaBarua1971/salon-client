import Link from "next/link"
import {
  ArrowLeft,
  CalendarClock,
  CreditCard,
  MapPin,
  MessageSquare,
  Scissors,
  User,
} from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type {
  AppointmentStatus,
  PaymentStatus,
} from "@/app/components/dashboard/StatusBadge"

// Sample data — replace with your API/DB results (fetched by `id`)
const appointment: {
  service: string
  category: string
  stylist: string
  date: string
  time: string
  duration: string
  location: string
  price: number
  taxes: number
  status: AppointmentStatus
  payment: PaymentStatus
  notes: string
} = {
  service: "Balayage & Colour",
  category: "Hair Colour",
  stylist: "Mia Carter",
  date: "24 Nov 2026",
  time: "10:30 AM",
  duration: "2 hrs",
  location: "Studio A · Downtown, 48 Rose Avenue",
  price: 120,
  taxes: 12,
  status: "confirmed",
  payment: "unpaid",
  notes:
    "Please keep the tones warm and avoid too much lift on the ends. Sensitive scalp — use ammonia-free products.",
}

const steps = [
  { label: "Requested", at: "12 Nov 2026, 4:12 PM", state: "done" },
  { label: "Confirmed by salon", at: "13 Nov 2026, 9:05 AM", state: "current" },
  { label: "Completed", at: "Awaiting appointment", state: "todo" },
]

export default async function AppointmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/dashboard/customer/appointments"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to my appointments
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-rose-gold/12 text-rose-gold">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                {appointment.service}
              </h1>
              <p className="text-sm text-muted-foreground">
                Booking #{id} · {appointment.category}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={appointment.status} />
            <StatusBadge status={appointment.payment} kind="payment" />
          </div>
          <p className="font-heading text-3xl font-semibold text-foreground">
            ${(appointment.price + appointment.taxes).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Appointment details */}
          <section
            aria-labelledby="details-heading"
            className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
          >
            <h2
              id="details-heading"
              className="font-heading text-lg font-semibold text-foreground"
            >
              Appointment details
            </h2>

            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Scissors
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Service
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {appointment.service}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Stylist
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {appointment.stylist}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarClock
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Date &amp; time
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {appointment.date} · {appointment.time}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarClock
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Duration
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {appointment.duration}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Location
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {appointment.location}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <MessageSquare
                  className="mt-0.5 size-4 shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    Special requests
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {appointment.notes}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          {/* Payment summary */}
          <section
            aria-labelledby="payment-heading"
            className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="payment-heading"
                className="font-heading text-lg font-semibold text-foreground"
              >
                Payment summary
              </h2>
              <StatusBadge status={appointment.payment} kind="payment" />
            </div>

            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Service fee</dt>
                <dd className="font-medium text-foreground">
                  ${appointment.price.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Taxes &amp; fees</dt>
                <dd className="font-medium text-foreground">
                  ${appointment.taxes.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <dt className="font-medium text-foreground">Total</dt>
                <dd className="font-heading text-xl font-semibold text-foreground">
                  ${(appointment.price + appointment.taxes).toFixed(2)}
                </dd>
              </div>
            </dl>

            {appointment.payment === "unpaid" &&
              appointment.status === "confirmed" && (
                <CommonButton fullWidth size="lg" className="mt-5">
                  <CreditCard className="size-4" aria-hidden="true" />
                  Pay Now
                </CommonButton>
              )}
          </section>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Status timeline */}
          <section
            aria-labelledby="status-heading"
            className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2
                id="status-heading"
                className="font-heading text-lg font-semibold text-foreground"
              >
                Appointment status
              </h2>
              <StatusBadge status={appointment.status} />
            </div>

            <ol className="mt-5 flex flex-col gap-6 border-l border-border/70 pl-5">
              {steps.map((step) => (
                <li key={step.label} className="relative">
                  <span
                    aria-hidden="true"
                    className={
                      step.state === "todo"
                        ? "absolute top-1 -left-[1.72rem] size-3 rounded-full border-2 border-border bg-background"
                        : "absolute top-1 -left-[1.72rem] size-3 rounded-full border-2 border-rose-gold bg-rose-gold"
                    }
                  />
                  <p
                    className={
                      step.state === "todo"
                        ? "text-sm font-medium text-muted-foreground"
                        : "text-sm font-medium text-foreground"
                    }
                  >
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.at}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Actions */}
          <section
            aria-labelledby="actions-heading"
            className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
          >
            <h2
              id="actions-heading"
              className="font-heading text-lg font-semibold text-foreground"
            >
              Manage appointment
            </h2>

            <div className="mt-4 flex flex-col gap-2.5">
              {appointment.status === "pending" && (
                <CommonButton
                  variant="outline"
                  fullWidth
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Cancel appointment
                </CommonButton>
              )}

              {appointment.status === "confirmed" &&
                appointment.payment === "unpaid" && (
                  <>
                    <CommonButton fullWidth>
                      <CreditCard className="size-4" aria-hidden="true" />
                      Pay Now
                    </CommonButton>
                    <CommonButton
                      variant="outline"
                      fullWidth
                      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      Cancel appointment
                    </CommonButton>
                  </>
                )}

              {(appointment.status === "completed" ||
                appointment.status === "cancelled") && (
                <p className="rounded-2xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                  {appointment.status === "completed"
                    ? "This appointment is completed. Thank you for visiting!"
                    : "This appointment was cancelled."}
                </p>
              )}

              <CommonButton href="/services" variant="soft" fullWidth>
                <Scissors className="size-4" aria-hidden="true" />
                Book another appointment
              </CommonButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import {
    ArrowLeft,
    CalendarClock,
    MessageSquare,
    Scissors,
} from "lucide-react"

import AdminAppointmentActions from "@/app/components/dashboard/AdminAppointmentActions"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import { getSpecificService } from "@/lib/applicatonApi/serviceApi"
import { getBookingSpecificAppointments, updateBookingAppointment } from "@/lib/applicatonApi/BookingApi"
import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import { revalidatePath } from "next/cache"




export default async function AppointmentDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const appointment:BookingServiceTypes=await getBookingSpecificAppointments(id)
    const service:SalonServiceTypes=await getSpecificService(appointment.serviceId)
    return (
        <div className="flex flex-col gap-6">
            {/* Back link */}
            <Link
                href="/dashboard/admin/appointments"
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
                                {appointment.serviceName}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Booking #{id} · {service.category}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={appointment.status} />
                        <StatusBadge status={appointment.paymentStatus} kind="payment" />
                    </div>
                    <p className="font-heading text-3xl font-semibold text-foreground">
                        ${(appointment.servicePrice).toFixed(2)}
                    </p>

                    
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                {/* Left column */}
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
                                    {appointment.serviceName}
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
                                    {appointment.appointmentDate} · {appointment.timeSlot}
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
                                    {service?.duration}
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
                                    {appointment.message}
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
                        <StatusBadge status={appointment.paymentStatus} kind="payment" />
                    </div>

                    <dl className="mt-4 flex flex-col gap-2.5 text-sm">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Service fee</dt>
                            <dd className="font-medium text-foreground">
                                ${appointment.servicePrice.toFixed(2)}
                            </dd>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/60 pt-3">
                            <dt className="font-medium text-foreground">Total</dt>
                            <dd className="font-heading text-xl font-semibold text-foreground">
                                ${(appointment.servicePrice ).toFixed(2)}
                            </dd>
                        </div>
                    </dl>
                </section>


            </div>
        </div>
    )
}

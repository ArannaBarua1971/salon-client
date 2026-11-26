import { redirect } from 'next/navigation'
import { CalendarCheck, Check, Mail, ShieldCheck } from 'lucide-react'

import { CommonButton } from '@/app/components/common/Button'
import { stripe } from '../../lib/stripe'
import { chekcout } from '@/lib/applicatonApi/BookingApi'

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const { session_id } = await searchParams

  if (!session_id){
    redirect("/")
  }

  const {
    status,
    customer_email,
    payment_status,
  } = await stripe.checkout.sessions.retrieve(session_id as string, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status=="paid") {

    const res=await chekcout({session_id})
    return (
      <section
        id="success"
        className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      >
        {/* Decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-rose-gold/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-40 size-80 rounded-full bg-gold/20 blur-3xl"
        />

        <div className="relative w-full max-w-lg rounded-[2rem] border border-border/70 bg-card/85 p-7 text-center shadow-[0_40px_80px_-45px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-10">
          {/* Success mark */}
          <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground shadow-[0_18px_36px_-18px_var(--rose-gold)]">
            <Check className="size-9" strokeWidth={3} aria-hidden="true" />
          </span>

          <p className="mt-6 text-xs font-medium tracking-[0.22em] text-rose-gold uppercase">
            Payment successful
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Your booking is confirmed
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-medium text-foreground">
              {customer_email}
            </span>
            . If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-rose-gold underline-offset-4 hover:underline"
            >
              orders@example.com
            </a>
            .
          </p>

          {/* What happens next */}
          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <li className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-rose-gold/12 text-rose-gold">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">
                Check your inbox
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your receipt and booking details are on the way.
              </p>
            </li>
            <li className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-rose-gold/12 text-rose-gold">
                <CalendarCheck className="size-4" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">
                Track your booking
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Manage or reschedule it any time from your dashboard.
              </p>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <CommonButton href="/dashboard/customer/appointments" size="lg">
              View my appointments
            </CommonButton>
            <CommonButton href="/" size="lg" variant="outline">
              Back to home
            </CommonButton>
          </div>

          <p className="mt-7 flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            <ShieldCheck
              className="size-3.5 text-rose-gold"
              aria-hidden="true"
            />
            Secure payment processed by Stripe
          </p>
        </div>
      </section>
    )
  }
}
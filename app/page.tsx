import Link from "next/link"
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react"

import { HomeBanner } from "@/app/components/HomePage/HomeBanner"
import Service from "./components/HomePage/Service"
import { CommonButton } from "@/app/components/common/Button"
import Footer from "@/app/components/layout/Footer"

const perks = [
  {
    icon: CalendarCheck,
    title: "Instant booking",
    text: "Pick a slot that fits — no phone calls, no waiting on hold.",
  },
  {
    icon: Sparkles,
    title: "Verified stylists",
    text: "Every professional is vetted, rated and reviewed by real clients.",
  },
]

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1">
        {/* Hero */}
        <HomeBanner />

        {/* Featured services */}
        <section
          aria-labelledby="featured-heading"
          className="relative isolate overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background via-rose-gold/5 to-background"
          />

          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Guest favourites
                </span>

                <h2
                  id="featured-heading"
                  className="mt-5 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl"
                >
                  Services our guests{" "}
                  <span className="text-rose-gold">love</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  From precision cuts to colour transformations and spa rituals
                  — explore the treatments booked most this season.
                </p>
              </div>

              <CommonButton
                href="/services"
                variant="outline"
                size="lg"
                className="shrink-0"
              >
                Browse all services
                <ArrowRight className="size-4" aria-hidden="true" />
              </CommonButton>
            </div>

            {/* Service grid (server component) */}
            <div className="mt-10">
              <Service />
            </div>
          </div>
        </section>

        {/* Why book with us + closing CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Perks */}
            <div className="grid gap-4 sm:grid-cols-2">
              {perks.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-border/70 bg-card p-6 transition-colors hover:border-rose-gold/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-rose-gold/12 text-rose-gold">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA band */}
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#2a1519] p-7 text-[#f7e9e6] shadow-[0_40px_80px_-45px_rgba(0,0,0,0.7)] sm:p-9 lg:self-stretch">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-rose-gold/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 size-60 rounded-full bg-gold/30 blur-3xl"
              />

              <div className="relative">
                <h2 className="font-heading text-3xl leading-[1.1] font-semibold">
                  Ready for your
                  <br />
                  <span className="text-gold">next look?</span>
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#e8d5d3]/85">
                  Create a free account, save your favourite stylists and book
                  in seconds — you&apos;ll only pay when you confirm.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/services"
                    className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-rose-gold to-gold px-6 text-sm font-medium text-[#2a1519] shadow-sm transition-all duration-300 outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"
                  >
                    Book now
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      
    </main>
  )
}

import { ArrowRight, Clock, Sparkles, Star, Users } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"

const highlights = [
    { icon: Users, value: "12k+", label: "Happy clients" },
    { icon: Star, value: "4.9", label: "Average rating" },
    { icon: Sparkles, value: "25+", label: "Expert stylists" },
]

const featuredServices = [
    { name: "Haircut & Styling", duration: "45 min", tag: "Popular" },
    { name: "Balayage & Colour", duration: "2 hrs", tag: "Trending" },
    { name: "Spa Facial & Massage", duration: "60 min", tag: "Relax" },
]

export function HomeBanner() {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-rose-gold/12 via-background to-background"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 -left-28 size-72 rounded-full bg-rose-gold/25 blur-3xl sm:size-96"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/3 -right-24 size-72 rounded-full bg-gold/25 blur-3xl sm:size-[26rem]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-rose-gold/45 to-transparent"
            />

            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
                {/* Copy */}
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase sm:text-xs">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        Premium Hair &amp; Beauty Studio
                    </span>

                    <h1 className="mt-6 font-heading text-4xl leading-[1.06] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Look Beautiful,
                        <br />
                        Feel <span className="text-rose-gold">Confident</span> Every Day
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Book trusted stylists for cuts, colour, spa rituals and more — in
                        just a few taps, from any device.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <CommonButton href="/services" size="lg">
                            Browse Services
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </CommonButton>
                    </div>
                    {/* 
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/70 pt-6">
            {highlights.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon
                    className="size-3.5 text-rose-gold"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{label}</span>
                </dt>
                <dd className="font-heading text-2xl font-semibold text-foreground sm:text-[1.75rem]">
                  {value}
                  <span className="mt-0.5 block font-sans text-[11px] font-normal tracking-wide text-muted-foreground">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </dl> */}
                </div>

                {/* Availability card */}
                <div className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
                    <img src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-hair-salon-clipart-an-illustration-of-a-girl-with-red-hair-png-image_12164236.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default HomeBanner

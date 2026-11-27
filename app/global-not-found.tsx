import "./globals.css"
import type { Metadata } from "next"
import { ArrowRight, House, Scissors, SearchX } from "lucide-react"


export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
}
const primaryButton =
  "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-rose-gold to-gold px-8 text-[0.95rem] font-medium text-primary-foreground shadow-[0_10px_26px_-12px_var(--rose-gold)] transition-all duration-300 outline-none hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"

const outlineButton =
  "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-rose-gold/50 bg-background/60 px-8 text-[0.95rem] font-medium text-rose-gold backdrop-blur-sm transition-all duration-300 outline-none hover:bg-rose-gold/10 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground">
        {/* Theme class, applied before the body paints */}


        {/* Decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-rose-gold/12 via-background to-background"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -left-24 size-72 rounded-full bg-rose-gold/25 blur-3xl sm:size-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-28 size-72 rounded-full bg-gold/25 blur-3xl sm:size-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-gold/45 to-transparent"
        />

        <main className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
          {/* Brand */}
          <a
            href="/"
            className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Scissors className="size-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none text-left">
              <span className="font-heading text-xl font-semibold tracking-wide text-foreground">
                SalonBook
              </span>
              <span className="mt-0.5 text-[9px] font-medium tracking-[0.32em] text-muted-foreground uppercase">
                Hair &amp; Beauty
              </span>
            </span>
          </a>

          {/* Big 404 */}
          <p
            aria-hidden="true"
            className="mt-10 bg-linear-to-r from-rose-gold to-gold bg-clip-text font-heading text-[5.5rem] leading-[0.85] font-semibold tracking-tight text-transparent sm:text-8xl"
          >
            404
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
            <SearchX className="size-3.5" aria-hidden="true" />
            Page not found
          </span>

          <h1 className="mt-6 font-heading text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            This page is no longer <span className="text-rose-gold">on the schedule</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            The link may be broken, or the page has moved. Let&apos;s get you
            back to something beautiful.
          </p>

          {/* Actions */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="/" className={primaryButton}>
              <House className="size-4" aria-hidden="true" />
              Go home
            </a>
            <a href="/services" className={outlineButton}>
              Browse services
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          {/* Help line */}
          <p className="mt-8 text-xs text-muted-foreground sm:text-sm">
            Need a hand?{" "}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-rose-gold underline-offset-4 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </main>
      </body>
    </html>
  )
}


import Link from "next/link"
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { usePathname } from "next/navigation"

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse services" },
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Create account" },
]

const serviceLinks = [
  { href: "/services", label: "Haircut & Styling" },
  { href: "/services", label: "Balayage & Colour" },
  { href: "/services", label: "Keratin Smoothing" },
  { href: "/services", label: "Spa Facial & Massage" },
]

const contactDetails = [
  {
    icon: Mail,
    label: "orders@example.com",
    href: "mailto:orders@example.com",
  },
  { icon: Phone, label: "+1 (555) 014-2280" },
  { icon: MapPin, label: "48 Rose Avenue, Downtown" },
]

/**
 * Site footer — matches the navbar branding (gradient mark + serif wordmark)
 * and the rose-gold / gold theme used across the marketing pages.
 */
export function Footer() {
  const pathname = usePathname()
  const year = new Date().getFullYear()
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null
  }
  return (
    <footer className="relative isolate overflow-hidden border-t border-border/70 bg-background">
      {/* Decorative glows + top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-rose-gold/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 size-64 rounded-full bg-rose-gold/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-36 size-72 rounded-full bg-gold/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="group flex w-fit items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Scissors className="size-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl font-semibold tracking-wide text-foreground">
                  SalonBook
                </span>
                <span className="mt-0.5 text-[9px] font-medium tracking-[0.32em] text-muted-foreground uppercase">
                  Hair &amp; Beauty
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Book trusted stylists for cuts, colour, spa rituals and more — in
              just a few taps, from any device.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.16em] text-rose-gold uppercase">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Premium studio
            </span>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Popular services">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit us */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
              Visit us
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-gold/12 text-rose-gold">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-rose-gold" aria-hidden="true" />
              Open daily · 9:00 AM – 8:00 PM
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} SalonBook. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck
              className="size-3.5 text-rose-gold"
              aria-hidden="true"
            />
            Secure payments powered by Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

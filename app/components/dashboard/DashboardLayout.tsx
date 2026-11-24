"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Home, Menu, Scissors, X, type LucideIcon } from "lucide-react"

import Avatar from "@/app/components/common/Avatar"
import { cn } from "@/lib/utils"

export type DashboardNavItem = {
  href: string
  label: string
  icon: LucideIcon
}

type DashboardLayoutProps = {
  /** Links rendered in the sidebar — pass admin links for /admin, customer links for /customer. */
  navItems: DashboardNavItem[]
  /** Role chip shown in the brand block and the topbar, e.g. "Customer" | "Admin". */
  role: string
  /** Placeholder user — replace with your session data when wiring the logic. */
  user?: { name: string; image?: string | null }
  children: ReactNode
}

/**
 * Reusable dashboard shell: fixed sidebar (drawer on mobile) + sticky topbar.
 * Used by /dashboard/customer today and /admin later — only `navItems`/`role` change.
 */
export function DashboardLayout({
  navItems,
  role,
  user = { name: "Guest", image: null },
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the mobile drawer whenever the route changes
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Longest matching href wins so /dashboard/customer doesn't stay
  // active while on /dashboard/customer/appointments.
  const activeHref = navItems
    .filter(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
    .reduce<string | null>(
      (best, { href }) =>
        best === null || href.length > best.length ? href : best,
      null
    )

  return (
    <div className="min-h-svh bg-background">
      {/* Mobile overlay */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/55 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border/70 bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-border/70 px-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground">
            <Scissors className="size-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold text-foreground">
              SalonBook
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              {role} Panel
            </span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label={`${role} dashboard`}
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <p className="px-3 pb-2 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Menu
          </p>
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = activeHref === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "bg-rose-gold/12 text-rose-gold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 -left-3 w-1 rounded-full bg-linear-to-b from-rose-gold to-gold"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-border/70 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Home className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-svh flex-col lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-background/85 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="dashboard-sidebar"
            className="rounded-full p-2 text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <span className="rounded-full border border-rose-gold/30 bg-rose-gold/10 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-rose-gold uppercase">
            {role}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden max-w-[10rem] truncate text-sm font-medium text-foreground sm:block">
              {user.name}
            </span>
            <Avatar name={user.name} image={user.image} />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout

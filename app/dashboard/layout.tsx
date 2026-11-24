"use client"

import type { ReactNode } from "react"
import { LayoutDashboard, CalendarCheck, User } from "lucide-react"

import { DashboardLayout } from "@/app/components/dashboard/DashboardLayout"

/**
 * Customer dashboard shell. For /admin, create app/admin/layout.tsx and pass
 * admin nav items to the same <DashboardLayout /> — nothing else changes.
 */
const customerNavItems = [
  { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/customer/appointments",
    label: "My Appointments",
    icon: CalendarCheck,
  },
  { href: "/dashboard/customer/profile", label: "My Profile", icon: User },
]

export default function DashboardLayoutRoute({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DashboardLayout
      navItems={customerNavItems}
      role="Customer"
      // Design placeholder — replace with your session user (useSession)
      user={{ name: "Alex Doe", image: null }}
    >
      {children}
    </DashboardLayout>
  )
}

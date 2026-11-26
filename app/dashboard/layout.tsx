"use client"

import type { ReactNode } from "react"
import { LayoutDashboard, CalendarCheck, User ,ShoppingCart,User2Icon} from "lucide-react"

import { DashboardLayout } from "@/app/components/dashboard/DashboardLayout"
import { useSession } from "@/lib/auth-client"
import CommonLoader from "../components/common/Loader"


const NavItems = {
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/customer/appointments",
      label: "My Appointments",
      icon: CalendarCheck,
    },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/admin/Manage_Services",
      label: "Manage Services",
      icon: CalendarCheck,
    },
    { href: "/dashboard/admin/appointments", label: "Manage Appointments", icon: User },
    { href: "/dashboard/admin/ManageUsers", label: "Manage Users", icon: User2Icon },
    { href: "/dashboard/admin/Transactions", label: "Transactions", icon: ShoppingCart },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ]
}

export default function DashboardLayoutRoute({
  children,
}: {
  children: ReactNode
}) {

  type Role = "customer" | "admin"
  const { data, isPending } = useSession()
  // Falls back when signed out or when an existing user has no role in the DB yet
  const role: Role = (data?.user?.role as Role) ?? "customer"

  if(isPending){
    return <CommonLoader/>
  }
  const Nav=NavItems[role]

  return (
    <DashboardLayout
      navItems={Nav}
      role={role}
      // Design placeholder — replace with your session user (useSession)
      user={data?.user}
    >
      {children}
    </DashboardLayout>
  )
}

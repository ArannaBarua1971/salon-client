import {
  BadgeCheck,
  Copy,
  Download,
  RotateCcw,
  Search,
  Wallet,
  WalletCards,
} from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import type { PaymentStatus } from "@/app/components/dashboard/StatusBadge"

const stats = [
  { label: "Total revenue", value: "$4,820", note: "This month", icon: Wallet },
  {
    label: "Successful payments",
    value: "32",
    note: "96% success",
    icon: BadgeCheck,
  },
  { label: "Refunds", value: "$240", note: "3 transactions", icon: RotateCcw },
  {
    label: "Pending payment",
    value: "$165",
    note: "2 appointments",
    icon: WalletCards,
  },
]

const filterChips = [
  { label: "All", count: 8 },
  { label: "Paid", count: 4 },
  { label: "Unpaid", count: 2 },
  { label: "Refunded", count: 1 },
  { label: "Partial", count: 1 },
]

// Sample data — replace with your Stripe/DB results
const transactions: Array<{
  id: string
  customer: { name: string; email: string }
  service: string
  category: string
  appointmentDate: string
  amount: number
  currency: string
  stripeSession: string
  status: PaymentStatus
  transactionDate: string
}> = [
  {
    id: "TXN-8041",
    customer: { name: "John Doe", email: "john@gmail.com" },
    service: "Balayage & Colour",
    category: "Hair Colour",
    appointmentDate: "24 Nov 2026, 10:30 AM",
    amount: 120,
    currency: "USD",
    stripeSession: "cs_test_a1b2c3d4e5f6g7h8",
    status: "paid",
    transactionDate: "18 Nov 2026, 3:42 PM",
  },
  {
    id: "TXN-8038",
    customer: { name: "Sarah Smith", email: "sarah@gmail.com" },
    service: "Haircut & Styling",
    category: "Hair",
    appointmentDate: "21 Nov 2026, 2:00 PM",
    amount: 45,
    currency: "USD",
    stripeSession: "cs_test_i9j0k1l2m3n4o5p6",
    status: "unpaid",
    transactionDate: "17 Nov 2026, 10:05 AM",
  },
  {
    id: "TXN-8035",
    customer: { name: "Michael Brown", email: "michael@gmail.com" },
    service: "Keratin Smoothing",
    category: "Hair Treatment",
    appointmentDate: "19 Nov 2026, 9:15 AM",
    amount: 150,
    currency: "USD",
    stripeSession: "cs_test_q7r8s9t0u1v2w3x4",
    status: "paid",
    transactionDate: "15 Nov 2026, 6:20 PM",
  },
  {
    id: "TXN-8032",
    customer: { name: "Emma Wilson", email: "emma@gmail.com" },
    service: "Spa Facial & Massage",
    category: "Spa",
    appointmentDate: "18 Nov 2026, 11:00 AM",
    amount: 80,
    currency: "EUR",
    stripeSession: "cs_test_y5z6a7b8c9d0e1f2",
    status: "paid",
    transactionDate: "14 Nov 2026, 9:48 AM",
  },
  {
    id: "TXN-8029",
    customer: { name: "David Miller", email: "david@gmail.com" },
    service: "Balayage & Colour",
    category: "Hair Colour",
    appointmentDate: "15 Nov 2026, 1:30 PM",
    amount: 120,
    currency: "USD",
    stripeSession: "cs_test_g3h4i5j6k7l8m9n0",
    status: "refunded",
    transactionDate: "12 Nov 2026, 4:15 PM",
  },
  {
    id: "TXN-8026",
    customer: { name: "Olivia Davis", email: "olivia@gmail.com" },
    service: "Manicure & Gel Paint",
    category: "Nails",
    appointmentDate: "14 Nov 2026, 4:45 PM",
    amount: 35,
    currency: "USD",
    stripeSession: "cs_test_o1p2q3r4s5t6u7v8",
    status: "partial",
    transactionDate: "11 Nov 2026, 12:30 PM",
  },
  {
    id: "TXN-8022",
    customer: { name: "James Wilson", email: "james@gmail.com" },
    service: "Haircut & Styling",
    category: "Hair",
    appointmentDate: "12 Nov 2026, 9:00 AM",
    amount: 45,
    currency: "USD",
    stripeSession: "cs_test_w9x0y1z2a3b4c5d6",
    status: "unpaid",
    transactionDate: "09 Nov 2026, 8:10 AM",
  },
  {
    id: "TXN-8019",
    customer: { name: "Sophia Martinez", email: "sophia@gmail.com" },
    service: "Keratin Smoothing",
    category: "Hair Treatment",
    appointmentDate: "10 Nov 2026, 2:15 PM",
    amount: 150,
    currency: "USD",
    stripeSession: "cs_test_e7f8g9h0i1j2k3l4",
    status: "paid",
    transactionDate: "07 Nov 2026, 5:55 PM",
  },
]

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <DashboardPageHeader
        eyebrow="Admin"
        title="Transactions"
        description="Every payment across the salon — customer, service, Stripe session and status in one place."
      />

      {/* Summary stats */}
      <section
        aria-label="Payment summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map(({ label, value, note, icon: Icon }) => (
          <article
            key={label}
            className="rounded-3xl border border-border/70 bg-card p-5 transition-colors hover:border-rose-gold/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-2xl bg-rose-gold/12 text-rose-gold"
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">
                {note}
              </span>
            </div>
            <p className="mt-4 font-heading text-3xl font-semibold text-foreground">
              {value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </article>
        ))}
      </section>

      {/* Search + filters (design only — wire up to your filter logic) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CommonInput
          aria-label="Search transactions"
          placeholder="Search customer, service or session…"
          icon={<Search className="size-4" />}
          containerClassName="w-full lg:max-w-sm"
        />
        <FilterChips
          chips={filterChips}
          ariaLabel="Filter transactions by payment status"
        />
      </div>

      {/* Transactions table */}
      <section
        aria-label="Payment transactions"
        className="overflow-hidden rounded-3xl border border-border/70 bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Payment transactions
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing 8 of 8 transactions
            </p>
          </div>
        </div>

        <DashboardTable
          tableHeaders={[
            "Customer",
            "Service",
            "Appointment date",
            "Amount",
            "Stripe session",
            "Status & date",
          ]}
          actionOptions={true}
        >
          {transactions.map((row) => (
            <tr key={row.id} className="transition-colors hover:bg-rose-gold/5">
              {/* Transaction id */}
              <td className="px-5 py-4 font-medium text-foreground">
                {row.id}
              </td>

              {/* Customer information */}
              <td className="px-5 py-4">
                <p className="font-medium text-foreground">
                  {row.customer.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {row.customer.email}
                </p>
              </td>

              {/* Related service */}
              <td className="px-5 py-4">
                <p className="text-foreground">{row.service}</p>
                <p className="text-[11px] font-medium tracking-wide text-rose-gold uppercase">
                  {row.category}
                </p>
              </td>

              {/* Appointment date */}
              <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                {row.appointmentDate}
              </td>

              {/* Amount + currency */}
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="font-heading text-base font-semibold text-foreground">
                  {row.currency === "EUR" ? "€" : "$"}
                  {row.amount.toFixed(2)}
                </span>
                <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
                  {row.currency}
                </span>
              </td>

              {/* Stripe session reference */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <code className="max-w-[9.5rem] truncate font-mono text-xs text-muted-foreground">
                    {row.stripeSession}
                  </code>
                  <button
                    type="button"
                    aria-label={`Copy session reference for ${row.id}`}
                    className="rounded-full p-1 text-muted-foreground transition-colors outline-none hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Copy className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              </td>

              {/* Payment status + transaction date */}
              <td className="px-5 py-4">
                <StatusBadge status={row.status} kind="payment" />
                <p className="mt-1.5 text-xs whitespace-nowrap text-muted-foreground">
                  {row.transactionDate}
                </p>
              </td>

              {/* Action */}
              <td className="px-5 py-4">
                <CommonButton variant="outline" size="sm">
                  View
                </CommonButton>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>
    </div>
  )
}

"use client"
import {
  BadgeCheck,
  Copy,
  RotateCcw,
  Search,
  Wallet,
  WalletCards,
} from "lucide-react"

import { CommonInput } from "@/app/components/common/Input"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"

import { getAllTransactions } from "@/lib/applicatonApi/TransacApi"
import { useEffect, useState } from "react"




export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionTypes[]>([])
  const [stats, setStats] = useState([
    { label: "Total revenue", value: 0, note: "Life time", icon: Wallet },

  ])
  const getData = async () => {
    const d: TransactionTypes[] = await getAllTransactions()
    setTransactions(d)
    setStats([
      { label: "Total revenue", value: d.reduce((acc, i) => acc + Number(i.price), 0), note: "Life time", icon: Wallet }])
  }

  useEffect(() => {
    getData()
  }, [])
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
            "Customer email",
            "Service",
            "Appointment date",
            "Amount",
            "Stripe session",
          ]}
          actionOptions={false}
        >
          {transactions.map((row) => (
            <tr key={row._id} className="transition-colors hover:bg-rose-gold/5">
              {/* Transaction id */}
              <td className="px-5 py-4 font-medium text-foreground">
                {row._id}
              </td>

              {/* Customer information */}
              <td className="px-5 py-4">
                <p className="text-xs text-muted-foreground">
                  {row.customer_email}
                </p>
              </td>

              {/* Related service */}
              <td className="px-5 py-4">
                <p className="text-foreground">{row.serviceName}</p>
                <p className="text-[11px] font-medium tracking-wide text-rose-gold uppercase">
                  {row.category}
                </p>
              </td>

              {/* Appointment date */}
              <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                {row.appointmentDate}
                {row.appointmentTime}
              </td>

              {/* Amount + currency */}
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="font-heading text-base font-semibold text-foreground">
                  {"$"}
                  {Number(row.price).toFixed(2)}
                </span>
                <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
                  {"USD"}
                </span>
              </td>

              {/* Stripe session reference */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <code className="max-w-[9.5rem] truncate font-mono text-xs text-muted-foreground">
                    {row.payment_id}
                  </code>
                  <button
                    type="button"
                    aria-label={`Copy session reference for ${row._id}`}
                    className="rounded-full p-1 text-muted-foreground transition-colors outline-none hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Copy className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </DashboardTable>
      </section>
    </div>
  )
}

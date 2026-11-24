"use client"

import { useState } from "react"
import { Image as ImageIcon, Pencil, Plus, Power, Trash2 } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import ServiceFormDialog, {
  type ServiceRow,
} from "@/app/components/dashboard/ServiceFormDialog"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"

const filters = [
  { label: "All", count: 6 },
  { label: "Active", count: 5 },
  { label: "Inactive", count: 1 },
]

// Sample data — replace with your API/DB results
const initialServices: ServiceRow[] = [
  {
    id: "SVC-01",
    name: "Balayage & Colour",
    category: "Hair Colour",
    price: 120,
    duration: 120,
    images: 3,
    active: true,
    updatedAt: "18 Nov 2026",
  },
  {
    id: "SVC-02",
    name: "Haircut & Styling",
    category: "Hair",
    price: 45,
    duration: 45,
    images: 2,
    active: true,
    updatedAt: "15 Nov 2026",
  },
  {
    id: "SVC-03",
    name: "Keratin Smoothing",
    category: "Hair Treatment",
    price: 150,
    duration: 180,
    images: 3,
    active: true,
    updatedAt: "12 Nov 2026",
  },
  {
    id: "SVC-04",
    name: "Spa Facial & Massage",
    category: "Spa",
    price: 80,
    duration: 60,
    images: 2,
    active: true,
    updatedAt: "10 Nov 2026",
  },
  {
    id: "SVC-05",
    name: "Manicure & Gel Paint",
    category: "Nails",
    price: 35,
    duration: 40,
    images: 1,
    active: true,
    updatedAt: "08 Nov 2026",
  },
  {
    id: "SVC-06",
    name: "Bridal Makeup",
    category: "Makeup",
    price: 200,
    duration: 90,
    images: 0,
    active: false,
    updatedAt: "02 Nov 2026",
  },
]

/** 45 → "45 min", 90 → "1 hr 30 min", 120 → "2 hrs". */
function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const hourLabel = hours === 1 ? "hr" : "hrs"
  return rest ? `${hours} ${hourLabel} ${rest} min` : `${hours} ${hourLabel}`
}

export default function ManageServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>(initialServices)
  const [dialog, setDialog] = useState<{
    open: boolean
    service: ServiceRow | null
  }>({ open: false, service: null })

  // Design only — swap for your API mutation
  const toggleActive = (id: string) =>
    setServices((rows) =>
      rows.map((row) => (row.id === id ? { ...row, active: !row.active } : row))
    )

  return (
    <div className="flex flex-col gap-6">
      {/* Page header + Add service */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <DashboardPageHeader
          eyebrow="Admin"
          title="Manage Services"
          description="View, add, update and activate the services your salon offers."
        />
        <CommonButton
          size="lg"
          onClick={() => setDialog({ open: true, service: null })}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add service
        </CommonButton>
      </div>

      {/* Filters (design only — wire up to your filter logic) */}
      <FilterChips chips={filters} ariaLabel="Filter services by status" />

      {/* Services table */}
      <section
        aria-label="All services"
        className="overflow-hidden rounded-3xl border border-border/70 bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              All services
            </h2>
            <p className="text-xs text-muted-foreground">
              Showing {services.length} of {services.length} services
            </p>
          </div>
        </div>

        <DashboardTable
          tableHeaders={[
            "Service",
            "Price",
            "Duration",
            "Images",
            "Status",
            "Updated",
          ]}
          actionOptions={true}
        >
          {services.map((service) => (
            <tr
              key={service.id}
              className="transition-colors hover:bg-rose-gold/5"
            >
              {/* Service id (DashboardTable renders the "#id" column) */}
              <td className="px-5 py-4 font-medium text-foreground">
                {service.id}
              </td>

              {/* Name + category */}
              <td className="px-5 py-4">
                <p className="font-medium text-foreground">{service.name}</p>
                <p className="text-[11px] font-medium tracking-wide text-rose-gold uppercase">
                  {service.category}
                </p>
              </td>

              {/* Price */}
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="font-heading text-base font-semibold text-foreground">
                  ${service.price.toFixed(2)}
                </span>
                <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
                  USD
                </span>
              </td>

              {/* Duration */}
              <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                {formatDuration(service.duration)}
              </td>

              {/* Uploaded images (ImgBB) */}
              <td className="px-5 py-4">
                {service.images > 0 ? (
                  <div className="flex items-center -space-x-2">
                    {Array.from({ length: Math.min(service.images, 3) }).map(
                      (_, index) => (
                        <span
                          key={index}
                          aria-hidden="true"
                          className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-linear-to-br from-rose-gold/30 to-gold/30 text-rose-gold"
                        >
                          <ImageIcon className="size-3.5" />
                        </span>
                      )
                    )}
                    {service.images > 3 && (
                      <span className="pl-3 text-[11px] text-muted-foreground">
                        +{service.images - 3}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No image
                  </span>
                )}
              </td>

              {/* Activate / deactivate status */}
              <td className="px-5 py-4">
                <StatusBadge
                  kind="service"
                  status={service.active ? "active" : "inactive"}
                />
              </td>

              {/* Updated */}
              <td className="px-5 py-4 text-muted-foreground">
                {service.updatedAt}
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <CommonButton
                    variant="outline"
                    size="sm"
                    onClick={() => setDialog({ open: true, service })}
                  >
                    <Pencil className="size-3.5" aria-hidden="true" />
                    Edit
                  </CommonButton>
                  <CommonButton
                    variant="soft"
                    size="sm"
                    onClick={() => toggleActive(service.id)}
                  >
                    <Power className="size-3.5" aria-hidden="true" />
                    {service.active ? "Deactivate" : "Activate"}
                  </CommonButton>
                  <CommonButton
                    variant="outline"
                    size="sm"
                    className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    Delete
                  </CommonButton>
                </div>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>

      {/* Add / Update dialog */}
      {dialog.open && (
        <ServiceFormDialog
          key={dialog.service?.id ?? "new"}
          service={dialog.service}
          onClose={() => setDialog({ open: false, service: null })}
        />
      )}
    </div>
  )
}

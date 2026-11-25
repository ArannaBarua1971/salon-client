"use client"

import { useEffect, useState } from "react"
import { Image as ImageIcon, Pencil, Plus, Power, Trash2 } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import DashboardPageHeader from "@/app/components/dashboard/DashboardPageHeader"
import DashboardTable from "@/app/components/dashboard/DashboardTable"
import FilterChips from "@/app/components/dashboard/FilterChips"
import ServiceFormDialog from "@/app/components/dashboard/ServiceFormDialog"
import { StatusBadge } from "@/app/components/dashboard/StatusBadge"
import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import { deleteService, getAllServices, updateService } from "@/lib/applicatonApi/serviceApi"
import ConfirmDialog from "@/app/components/dashboard/ConfirmDialog"


// Sample data — replace with your API/DB results


/** 45 → "45 min", 90 → "1 hr 30 min", 120 → "2 hrs". */
function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const hourLabel = hours === 1 ? "hr" : "hrs"
  return rest ? `${hours} ${hourLabel} ${rest} min` : `${hours} ${hourLabel}`
}



export default function ManageServicesPage() {
  const [services, setServices] = useState<SalonServiceTypes[]>([])
  const [activeService, setActiveService] = useState<SalonServiceTypes[]>([])
  const [inActiveService, setInActiveService] = useState<SalonServiceTypes[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [filters,setFilters]=useState([
  { label: "All", count: 0 },
  { label: "Active", count: 0 },
  { label: "Inactive", count: 0 },
])
  const [dialog, setDialog] = useState<{
    open: boolean
    service: SalonServiceTypes | null
  }>({ open: false, service: null })


  const getServices = async () => {
    const data = await getAllServices()
    setServices(data)
    setActiveService(data.filter((d: SalonServiceTypes) => d.active))
    setInActiveService(data.filter((d: SalonServiceTypes) => !d.active))
    filters[0].count = data.length;
    filters[1].count = data.filter((d: SalonServiceTypes) => d.active).length;
    filters[2].count = data.filter((d: SalonServiceTypes) => !d.active).length;
    setFilters(filters)
  }
  useEffect(() => {
    getServices()
  }, [])

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
          href="/dashboard/admin/Manage_Services/addService"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add service
        </CommonButton>
      </div>

      {/* Filters (design only — wire up to your filter logic) */}
      <FilterChips activeIndex={activeIndex}  onSelect={(e)=> {e==0?setServices([...activeService,...inActiveService]):e==1?setServices(activeService):setServices(inActiveService) ; setActiveIndex(e)}} chips={filters} ariaLabel="Filter services by status" />

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
            "Image",
            "Status",
            "Updated",
          ]}
          actionOptions={true}
        >
          {services.map((service) => (
            <tr
              key={service._id}
              className="transition-colors hover:bg-rose-gold/5"
            >
              {/* Service id (DashboardTable renders the "#id" column) */}
              <td className="px-5 py-4 font-medium text-foreground">
                {service._id}
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
                  ${Number(service.price).toFixed(2)}
                </span>
                <span className="ml-1.5 text-[11px] font-medium text-muted-foreground">
                  USD
                </span>
              </td>

              {/* Duration */}
              <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                {formatDuration(Number(service.duration))}
              </td>

              {/* Uploaded images (ImgBB) */}
              <td className="px-5 py-4">
                {service.image ? (
                  <div className="flex items-center -space-x-2">
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-linear-to-br from-rose-gold/30 to-gold/30 text-rose-gold"
                    >
                      <ImageIcon className="size-3.5" />
                    </span>
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
                    onClick={() => {setDialog({ open: true, service });}}
                  >
                    <Pencil className="size-3.5" aria-hidden="true" />
                    Edit
                  </CommonButton>
                  <CommonButton
                    variant="soft"
                    size="sm"
                    onClick={() => { updateService({ active: !service.active }, service._id); getServices() }}
                  >
                    <Power className="size-3.5" aria-hidden="true" />
                    {service.active ? "Deactivate" : "Activate"}
                  </CommonButton>

                  <ConfirmDialog
                    question="Are you sure to delete the service?"
                    description="Service can be deleted from database"
                    buttonName="Delete"
                    toastMessage="Salon service deleted successfully"
                    func={deleteService}
                    id={service._id}
                    onSuccess={getServices}
                  />
                </div>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </section>

      {/* Add / Update dialog */}
      {dialog.open && (
        <ServiceFormDialog
          key={dialog.service?._id ?? "new"}
          service={dialog.service}
          onClose={() => {setDialog({ open: false, service: null }),getServices()}}
        />
      )}
    </div>
  )
}

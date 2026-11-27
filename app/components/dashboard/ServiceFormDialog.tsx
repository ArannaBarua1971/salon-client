"use client"

import { useState } from "react"
import {
  Clock,
  DollarSign,
  Image as ImageIcon,
  Scissors,
  X,
} from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import { CommonTextarea } from "@/app/components/common/Textarea"
import { cn } from "@/lib/utils"
import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import { serviceCategories } from "@/lib/helper/category"
import { PostService, updateService } from "@/lib/applicatonApi/serviceApi"

import { useRouter } from "next/navigation"
import { showToast } from "@/lib/helper/toast"

type ServiceFormDialogProps = {
  /** Existing service — omit (or null) to design the Add flow. */
  service?: SalonServiceTypes | null
  onClose?: () => void
}

export function ServiceFormDialog({
  service,
  onClose,
}: ServiceFormDialogProps) {
  const router = useRouter()
  const [name, setName] = useState(service?.name ?? "")
  const [category, setCategory] = useState(service?.category ?? "Hair")
  const [image, setImage] = useState(service?.image ?? "")
  const [price, setPrice] = useState(service ? String(service.price) : "")
  const [duration, setDuration] = useState(
    service ? String(service.duration) : ""
  )
  const [description, setDescription] = useState(
    service ? String(service.description) : ""
  )
  const [active, setActive] = useState(service?.active ?? true)
  const updatedAt = new Date().toISOString().split("T")[0]

  return (
    <div className={`${service?"fixed inset-0 z-50":""} flex items-center justify-center p-4`}>
      {/* Overlay */}
      {onClose ? (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        />
      ) : (
        <></>
      )}

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service ? "Update service" : "Add service"}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border/70 bg-card p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
              {service ? `Update · ${service._id}` : "New service"}
            </p>
            <h2 className="mt-1.5 font-heading text-2xl font-semibold text-foreground">
              {service ? "Edit service" : "Add service"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set the details customers see when booking.
            </p>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-full p-2 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X className="size-5" />
            </button>
          ) : (
            <></>
          )}
        </div>

        {/* Form */}
        <form
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault()
            try {
              if (!service) {
                const res = await PostService({
                  name,
                  category,
                  price,
                  duration,
                  description,
                  image,
                  active,
                  updatedAt,
                })
                if (res) {
                  showToast("Salon service is uploaded successfully.")
                } else {
                  showToast("Something is wrong,try again!", "w")
                }
              } else {
                const res = await updateService(
                  {
                    name,
                    category,
                    price,
                    duration,
                    description,
                    image,
                    active,
                    updatedAt,
                  },
                  service._id
                )
                if (res) {
                  showToast("Salon service is updated successfully.")
                } else {
                  showToast("Something is wrong,try again!", "w")
                }
              }
            } catch {
              showToast("Something is wrong,try again!", "w")
            }
          }}
        >
          <CommonInput
            label="Service name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Balayage & Colour"
            autoComplete="off"
            icon={<Scissors className="size-4" />}
          />

          {/* Category select */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="service-category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </label>
            <select
              id="service-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground transition-colors outline-none focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50"
            >
              {serviceCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Price — validated */}
          <CommonInput
            label="Price (USD)"
            name="price"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="e.g. 45"
            icon={<DollarSign className="size-4" />}
          />

          {/* Duration — validated */}
          <CommonInput
            label="Duration (minutes)"
            name="duration"
            type="number"
            min={15}
            max={480}
            inputMode="numeric"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="e.g. 45"
            icon={<Clock className="size-4" />}
          />

          {/* Description */}
          <CommonTextarea
            label="Description"
            name="description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What's included in this service…"
            containerClassName="sm:col-span-2"
          />

          {/* Image upload — ImgBB */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium text-foreground">
              Service image
            </span>
            <CommonInput
              name="service image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https:://"
              icon={<ImageIcon className="size-4" />}
            />
          </div>

          {/* Activate / deactivate */}
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-border/70 bg-background/50 px-4 py-3 sm:col-span-2">
            <div>
              <p className="text-sm font-medium text-foreground">
                Service active
              </p>
              <p className="text-xs text-muted-foreground">
                Active services are visible to customers.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={active}
              aria-label="Service active"
              onClick={() => setActive((value) => !value)}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                active ? "bg-rose-gold" : "bg-border"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 size-5 rounded-full bg-background shadow-md transition-all",
                  active ? "left-6" : "left-1"
                )}
              />
            </button>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2.5 border-t border-border/60 pt-4 sm:col-span-2 sm:flex-row sm:justify-end">
            <CommonButton
              variant="outline"
              size="lg"
              onClick={
                onClose
                  ? onClose
                  : () => router.push("/dashboard/admin/Manage_Services")
              }
            >
              Cancel
            </CommonButton>
            {/* Wire to your add/update mutation (ImgBB upload happens first) */}
            <CommonButton size="lg" type="submit">
              {service ? "Save changes" : "Add service"}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceFormDialog

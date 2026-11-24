"use client"

import { useState } from "react"
import {
  Clock,
  DollarSign,
  Image as ImageIcon,
  Plus,
  Scissors,
  UploadCloud,
  X,
} from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import { cn } from "@/lib/utils"

/** Row shape shared by the Manage Services table and this form. */
export type ServiceRow = {
  id: string
  name: string
  category: string
  price: number
  /** Duration in minutes. */
  duration: number
  /** Number of images uploaded to ImgBB (replace with your URLs). */
  images: number
  active: boolean
  updatedAt: string
}

const categories = [
  "Hair",
  "Hair Colour",
  "Hair Treatment",
  "Spa",
  "Nails",
  "Makeup",
]

type ServiceFormDialogProps = {
  /** Existing service — omit (or null) to design the Add flow. */
  service?: ServiceRow | null
  onClose: () => void
}

/**
 * Add / Update service dialog (design only).
 * Price and duration rules are validated inline — attach your mutation
 * (ImgBB upload + API call) to the Save button where you use it.
 */
export function ServiceFormDialog({
  service,
  onClose,
}: ServiceFormDialogProps) {
  const [name, setName] = useState(service?.name ?? "")
  const [category, setCategory] = useState(service?.category ?? "Hair")
  const [price, setPrice] = useState(service ? String(service.price) : "")
  const [duration, setDuration] = useState(
    service ? String(service.duration) : ""
  )
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(service?.active ?? true)

  // Inline validation — price > 0, duration between 15 and 480 minutes
  const priceNum = price === "" ? NaN : Number(price)
  const priceError =
    price !== "" && (!Number.isFinite(priceNum) || priceNum <= 0)
      ? "Price must be greater than $0."
      : undefined

  const durationNum = duration === "" ? NaN : Number(duration)
  const durationError =
    duration !== "" &&
    (!Number.isFinite(durationNum) || durationNum < 15 || durationNum > 480)
      ? "Duration must be between 15 and 480 minutes."
      : undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

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
              {service ? `Update · ${service.id}` : "New service"}
            </p>
            <h2 className="mt-1.5 font-heading text-2xl font-semibold text-foreground">
              {service ? "Edit service" : "Add service"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set the details customers see when booking.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(event) => event.preventDefault()}
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
              {categories.map((option) => (
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
            error={priceError}
            hint={priceError ? undefined : "Must be greater than $0."}
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
            error={durationError}
            hint={durationError ? undefined : "Allowed range: 15 – 480 min."}
            icon={<Clock className="size-4" />}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="service-description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="service-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What's included in this service…"
              className="w-full rounded-3xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50"
            />
          </div>

          {/* Image upload — ImgBB */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium text-foreground">
              Service images
            </span>
            <div className="rounded-3xl border border-dashed border-input bg-background/50 px-5 py-6 text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-rose-gold/12 text-rose-gold"
              >
                <UploadCloud className="size-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">
                Drag &amp; drop images here
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Uploaded to ImgBB · JPG or PNG · max 5 MB each
              </p>
              <div className="mt-4 flex justify-center">
                <CommonButton variant="outline" size="sm">
                  <UploadCloud className="size-3.5" aria-hidden="true" />
                  Browse files
                </CommonButton>
              </div>
            </div>

            {/* Existing previews (edit mode) */}
            {service && service.images > 0 && (
              <div className="mt-1 flex flex-wrap gap-3">
                {Array.from({ length: service.images }).map((_, index) => (
                  <div
                    key={index}
                    className="relative flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-rose-gold/25 to-gold/25 text-rose-gold"
                  >
                    <ImageIcon className="size-5" aria-hidden="true" />
                    <button
                      type="button"
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute top-1 right-1 rounded-full bg-background/85 p-1 text-muted-foreground transition-colors outline-none hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  aria-label="Add another image"
                  className="flex size-16 items-center justify-center rounded-2xl border border-dashed border-input text-muted-foreground transition-colors outline-none hover:border-rose-gold/50 hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              The first image is used as the cover.
            </p>
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
            <CommonButton variant="outline" size="lg" onClick={onClose}>
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

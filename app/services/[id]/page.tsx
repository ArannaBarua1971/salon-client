import Link from "next/link"
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  Clock,
  Scissors,
  Sparkles,
} from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { getSpecificService } from "@/lib/applicatonApi/serviceApi"
import ServiceBooking from "@/app/components/salonService/ServiceBooking"


const included = [
  { title: "Free consultation", note: "Shade & style matching before we start" },
  { title: "Premium products", note: "Ammonia-free colour & bond protectors" },
  { title: "Wash & finish", note: "Wash, blow-dry and styling included" },
  { title: "Aftercare plan", note: "Personalised home-care routine" },
]

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service=await getSpecificService(id)

  return (
    <div
      data-service-id={id}
      className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Back link */}
      <Link
        href="/services"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-rose-gold focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to services
      </Link>

      {/* Hero: gallery + info */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        {/* Image gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 bg-linear-to-br from-rose-gold/20 to-gold/25">
            {/* Fallback shown if the image fails to load */}
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Scissors className="size-14 text-rose-gold/70" />
            </span>
            <img
              src={service?.image}
              alt={service?.name}
              className="relative h-full w-full object-cover"
            />

            <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-rose-gold uppercase backdrop-blur-sm">
              {service?.category}
            </span>
          </div>
        </div>

        {/* Service info */}
        <div className="flex h-fit flex-col gap-5 rounded-3xl border border-border/70 bg-card p-6 lg:sticky lg:top-24">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
              {service?.category}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {service?.name}
            </h1>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {service?.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-rose-gold" aria-hidden="true" />
              {service?.duration} min
            </span>

          </div>

          {/* Price */}
          <div className="flex items-end gap-2 border-t border-border/60 pt-4">
            <span className="font-heading text-4xl font-semibold text-foreground">
              {service?.price}
            </span>
            <span className="pb-1.5 text-sm text-muted-foreground">
              / session
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <CommonButton href="#booking" size="lg" className="sm:flex-1">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Set appointment
            </CommonButton>
            <CommonButton variant="outline" size="lg" className="sm:flex-1">
              Contact salon
            </CommonButton>
          </div>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
            Free cancellation up to 24 hours before your visit.
          </p>
        </div>
      </div>

      {/* Booking */}
      <ServiceBooking
        serviceId={service._id}
        serviceName={service?.name}
        price={service?.price}
        duration={service?.duration}
      />

    </div>
  )
}

import { ArrowRight, Clock, Scissors } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import type { SalonServiceCardProps } from "@/types/SalonServiceTypes"
import { cn } from "@/lib/utils"


export function SalonServiceCard({
  service,
  className,
}: SalonServiceCardProps) {
  const {
    _id,
    image,
    serviceName,
    category,
    price,
    duration,
        description,
  } = service

  const href = `/services/${_id}`

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-rose-gold/40 hover:shadow-[0_26px_50px_-30px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {/* Service image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-linear-to-br from-rose-gold/20 to-gold/25">
        {image ? (
          <img
            src={image}
            alt={serviceName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            aria-hidden="true"
          >
            <Scissors className="size-9 text-rose-gold" />
          </div>
        )}

        <span className="absolute top-3 left-3 rounded-full bg-background/85 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-rose-gold uppercase backdrop-blur-sm">
          {category}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
          {price}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {serviceName}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5 text-rose-gold" aria-hidden="true" />
            {duration} min
          </span>

          <CommonButton href={href} variant="soft" size="sm">
            View Details
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </CommonButton>
        </div>
      </div>
    </article>
  )
}

export default SalonServiceCard

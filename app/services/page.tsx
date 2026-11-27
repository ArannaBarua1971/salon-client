"use client"
import { getAllServices } from "@/lib/applicatonApi/serviceApi"
import SalonServiceCard from "../components/salonService/SalonServiceCard"
import { useEffect, useState } from "react"
import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader"
import CommonInput from "../components/common/Input"
import { serviceCategories } from "@/lib/helper/category"
import { ArrowRight, ChevronDown, House, Search, SearchX, SlidersHorizontal } from "lucide-react"
import CommonButton from "../components/common/Button"

function page() {
  const [data, setData] = useState<SalonServiceTypes[]>([])
  const [search, setSearch] = useState<string|undefined>(undefined)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const getActiveService = async (query: any = {}) => {
    const res = await getAllServices({ active: true, ...query })
    setData(res)
  }
  useEffect(() => {
    getActiveService({ search, category })
  }, [search, category])
  return (
    <div className="px-20">
      <DashboardPageHeader
        eyebrow="Beauty & Wellness"
        title="Our Signature Services"
        description="From refreshing hair treatments to rejuvenating beauty rituals, explore the services that make every visit special."
        className="my-5"
      />

      {/* Search + category toolbar (design only — filtering not wired up) */}
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <CommonInput
          aria-label="Search services"
          name="search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by service name or category"
          icon={<Search className="size-4" aria-hidden="true" />}
          containerClassName="w-full sm:max-w-sm"
        />

        <div className="flex items-end gap-2.5">
          <span
            aria-hidden="true"
            className="hidden h-11 w-9 shrink-0 items-center justify-center rounded-full bg-rose-gold/12 text-rose-gold sm:flex"
          >
            <SlidersHorizontal className="size-4" />
          </span>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="service-category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="service-category"
                name="category"
                defaultValue="all"
                className="h-11 w-full appearance-none rounded-full border border-input bg-background/70 pr-10 pl-4 text-sm text-foreground transition-colors outline-none focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50 sm:w-60"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value={undefined}>All categories</option>
                {serviceCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute inset-y-0 right-3.5 my-auto size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>


      {data.length ?
        <div className="service cards ">
          <div className="grid grid-cols-3 gap-10">
            {data.map((d) => (
              <SalonServiceCard key={d._id} service={d} />
            ))}
          </div>
        </div>
        :  <div className="flex flex-col items-center justify-center rounded-3xl border border-border/70 bg-card px-6 py-14 text-center">
          {/* Icon bubble */}
          <span className="flex size-16 items-center justify-center rounded-full bg-rose-gold/12 text-rose-gold">
            <SearchX className="size-7" aria-hidden="true" />
          </span>

          <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">
            No service available
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            We couldn&apos;t find anything matching your search or category. Try
            clearing your filters, or browse everything we offer.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CommonButton href="/" size="lg">
              <House className="size-4" aria-hidden="true" />
              Go home
            </CommonButton>
            <CommonButton onClick={()=>{
              setSearch(""),
              setCategory(undefined)
            }} size="lg" variant="outline">
              Go to services
              <ArrowRight className="size-4" aria-hidden="true" />
            </CommonButton>
          </div>
        </div>
      }
    </div>
  )
}

export default page
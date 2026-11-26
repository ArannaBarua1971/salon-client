"use client"
import { getAllServices } from "@/lib/applicatonApi/serviceApi"
import SalonServiceCard from "../components/salonService/SalonServiceCard"
import { useEffect, useState } from "react"
import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader"

function page() {
  const [data, setData] = useState<SalonServiceTypes[]>([])
  const getActiveService = async () => {
    const res = await getAllServices({ active: true })
    setData(res)
  }
  useEffect(() => {
    getActiveService()
  }, [])
  return (
    <div className="px-20">
      <DashboardPageHeader
        eyebrow="Beauty & Wellness"
        title="Our Signature Services"
        description="From refreshing hair treatments to rejuvenating beauty rituals, explore the services that make every visit special."
        className="my-5"
      />
      <div className="service cards ">
        <div className="grid grid-cols-3 gap-10">
          {data.map((d) => (
            <SalonServiceCard key={d._id} service={d} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
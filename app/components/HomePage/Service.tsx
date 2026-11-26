import React from 'react'
import SalonServiceCard from '../salonService/SalonServiceCard'
import { getAllServices } from '@/lib/applicatonApi/serviceApi'
import { SalonServiceTypes } from '@/types/SalonServiceTypes'


async function Service() {
  const res=await getAllServices()
  const data=res.slice(0,6)
  return (
    <div> <div className="service cards px-20">
      <div className="grid grid-cols-3 gap-10">
        {data.map((d:SalonServiceTypes) => (
          <SalonServiceCard key={d._id} service={d} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Service
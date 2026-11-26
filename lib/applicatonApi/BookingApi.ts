"use server"

import { BookingServiceTypes } from "@/types/BookingServiceTypes"
const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL


const bookingAppointment = async (data: BookingServiceTypes) => {
  const res = await fetch(`${url}/bookingAppointment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
const getSpecificBookingTimeSlot = async (data:{}) => {
    const query=new URLSearchParams(data)
  const res = await fetch(`${url}/bookingAppointment/timeslot?${query.toString()}`)

  return res.json()
}

export{bookingAppointment,getSpecificBookingTimeSlot}
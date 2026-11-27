"use server"

import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { notFound } from "next/navigation"
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
const updateBookingAppointment = async (
  id: string | undefined,
  data: any
): Promise<{ key: string }> => {
  const res = await fetch(`${url}/bookingAppointment/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getBookingAppointments = async (id?: string | undefined) => {
  const query = new URLSearchParams(id)
  if (id) {
    query.append("id", id)
  }
  const res = await fetch(`${url}/bookingAppointment?${query.toString()}`)
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getBookingSpecificAppointments = async (id: string | undefined) => {
  const res = await fetch(`${url}/bookingAppointment/single/${id}`)
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getSpecificBookingTimeSlot = async (data: {}) => {
  const query = new URLSearchParams(data)
  const res = await fetch(
    `${url}/bookingAppointment/timeslot?${query.toString()}`
  )

  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const chekcout = async (data: any) => {
  const res = await fetch(`${url}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

export {
  bookingAppointment,
  getSpecificBookingTimeSlot,
  getBookingAppointments,
  updateBookingAppointment,
  getBookingSpecificAppointments,
  chekcout,
}

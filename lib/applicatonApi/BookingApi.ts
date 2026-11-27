"use server"

import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { notFound } from "next/navigation"
import getTokenFromServer from "../get-token-server"

const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

const bookingAppointment = async (data: BookingServiceTypes) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/bookingAppointment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}
const updateBookingAppointment = async (
  id: string | undefined,
  data: any
): Promise<{ key: string }> => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/bookingAppointment/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getBookingAppointments = async (id?: string | undefined) => {
  const token = await getTokenFromServer()
  const query = new URLSearchParams(id)
  if (id) {
    query.append("id", id)
  }
  const res = await fetch(`${url}/bookingAppointment?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getBookingSpecificAppointments = async (id: string | undefined) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/bookingAppointment/single/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getSpecificBookingTimeSlot = async (data: {}) => {
  const token = await getTokenFromServer()
  const query = new URLSearchParams(data)
  const res = await fetch(
    `${url}/bookingAppointment/timeslot?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const chekcout = async (data: any) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

export {
  bookingAppointment,
  getSpecificBookingTimeSlot,
  getBookingAppointments,
  updateBookingAppointment,
  getBookingSpecificAppointments,
  chekcout,
}

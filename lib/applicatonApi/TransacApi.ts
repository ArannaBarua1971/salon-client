"use server"

import { BookingServiceTypes } from "@/types/BookingServiceTypes"
import { notFound } from "next/navigation"
const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

export const getAllTransactions = async () => {
  const res = await fetch(`${url}/transactions`, {
    cache: "no-store",
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

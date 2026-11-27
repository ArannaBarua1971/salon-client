"use server"

import { notFound } from "next/navigation"
import getTokenFromServer from "../get-token-server"
const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

export const getAllTransactions = async () => {
  const token=await getTokenFromServer()
  const res = await fetch(`${url}/transactions`, {
    cache: "no-store",
    method:"GET",
    headers:{
       Authorization: `Bearer ${token}`,
    }
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

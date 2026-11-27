"use server"

import { UserTypes } from "@/types/UserTypes"
import { notFound } from "next/navigation"

const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

const getAllUsers = async () => {
  const res = await fetch(`${url}/users`)
  
  if(res.ok)return res.json()
  else{
    notFound()
  }
}
const updateUser = async ( id: string | undefined,data: {}) => {
  const res = await fetch(`${url}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export { getAllUsers ,updateUser}

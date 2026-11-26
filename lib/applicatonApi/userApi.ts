"use server"

import { UserTypes } from "@/types/UserTypes"

const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

const getAllUsers = async () => {
  const res = await fetch(`${url}/users`)
  return res.json()
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

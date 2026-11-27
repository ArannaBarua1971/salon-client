"use server"

import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import { notFound } from "next/navigation"
import getTokenFromServer from "../get-token-server"
import { methods } from "better-auth/react"
const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL

const PostService = async (data: SalonServiceTypes) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

const updateService = async (
  data: SalonServiceTypes,
  id: string | undefined
) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    return res.json()
  }
}

const deleteService = async (
  id: string | undefined
): Promise<{ key: string }> => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

const getAllServices = async (data?: {}) => {
  const query = new URLSearchParams(data)
  const res = await fetch(`${url}/services?${query.toString()}`, {
    cache: "no-store",
  })
  if (res.ok) {
    return res.json()
  } else {
    notFound()
  }
}

const getSpecificService = async (id: string | undefined) => {
  const token = await getTokenFromServer()
  const res = await fetch(`${url}/services/${id}`, {
    cache: "no-store",
    method: "GET",
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

export {
  PostService,
  updateService,
  getAllServices,
  deleteService,
  getSpecificService,
}

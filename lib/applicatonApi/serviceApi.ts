"use server"

import { SalonServiceTypes } from "@/types/SalonServiceTypes"
import { notFound } from "next/navigation"
const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL



const PostService = async (data: SalonServiceTypes) => {
  const res = await fetch(`${url}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

const updateService = async (data:SalonServiceTypes,id:string|undefined) => {
  const res = await fetch(`${url}/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if(res.ok){
    return res.json()
  }
}


const deleteService = async (id:string|undefined):Promise<{key:string}> => {
  const res = await fetch(`${url}/services/${id}`,{
    method:"DELETE"
  })
  return res.json()
}


const getAllServices = async (data?:{}) => {
  const query=new URLSearchParams(data)
  const res = await fetch(`${url}/services?${query.toString()}`,{cache:"no-store"})
  if(res.ok){
    return res.json()
  }else{
    notFound()
  }
}

const getSpecificService= async (id:string|undefined) => {
  const res = await fetch(`${url}/services/${id}`,{cache:"no-store"})
  if(res.ok){
    return res.json()
  }else{
    notFound()
  }
}


export { PostService, updateService,getAllServices,deleteService ,getSpecificService}

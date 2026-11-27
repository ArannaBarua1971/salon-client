"use server"

import { notFound } from "next/navigation"
import getTokenFromServer from "../get-token-server"

const url = process.env.NEXT_PUBLIC_LOCAL_DB_URL


const getAllUsers = async () => {
  const token=await getTokenFromServer()
  const res = await fetch(`${url}/users`,{
    method:"GET",
    headers:{
       Authorization: `Bearer ${token}`,
    }
  })
  
  if(res.ok)return res.json()
  else{
    notFound()
  }
}
const updateUser = async ( id: string | undefined,data: {}) => {
  const token=await getTokenFromServer()
  const res = await fetch(`${url}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if(res.ok){
    return res.json()
  }else{
    notFound()
  }
}

export { getAllUsers ,updateUser}

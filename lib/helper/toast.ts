"use client"
import { Bounce, toast, ToastOptions } from "react-toastify"

type ToastKind = "s" | "w" | "i"

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  transition: Bounce,
}

export function showToast(message: string, type: ToastKind = "s") {
  console.log(message)
  if(type=='w'){
    toast.warn(message,defaultOptions)
  }else if(type=='i'){
    toast.info(message,defaultOptions)
  }else{
    toast.success(message,defaultOptions)
  }
}

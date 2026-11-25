"use client"
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import CommonButton from "../common/Button"
import { showToast } from "@/lib/helper/toast"

interface ConfirmDialogProps {
  question: string;
  description: string;
  className?: string;
  icon?: ReactNode;
  buttonName: string;
  toastMessage: string;
  token?: string;
  decisionBtnName?:string,
  id:string|undefined,
  func:(id:string|undefined,data?:any)=>Promise<{key:string}>
  onSuccess:()=>Promise<void>,
  data?:any
}
export default function ConfirmDialog({ data="",buttonName, icon, question, description, className,  toastMessage,id, decisionBtnName = "Delete",token,func,onSuccess }: ConfirmDialogProps) {
    const router = useRouter()
    const [isSubmitting,setIsSubmitting]=useState(false)
    const deleteStudio = async () => {
        setIsSubmitting(true)
        showToast(`processing:${toastMessage}` ,"i")
        const res =data?await func(id,data) :await func(id)
        if (res) {
            showToast( toastMessage)
            await onSuccess?.()
        }
        setIsSubmitting(false)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<CommonButton variant="soft" className={className}>{icon}{buttonName}</CommonButton>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{question}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogCancel variant="destructive" onClick={deleteStudio} >
                        {isSubmitting? "checking....": decisionBtnName}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

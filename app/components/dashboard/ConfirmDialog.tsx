"use client"
import { CheckCircle2Icon, Trash2Icon } from "lucide-react"

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

type ConfirmTone = "danger" | "success"
type TriggerVariant = "primary" | "outline" | "soft" | "ghost" | "link"
type TriggerSize = "sm" | "md" | "lg" | "icon"

/** Per-tone styling for the dialog media bubble + the confirming button. */
const toneStyles: Record<
    ConfirmTone,
    { media: string; icon: ReactNode; decisionVariant: "destructive" | "default" }
> = {
    danger: {
        media: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
        icon: <Trash2Icon />,
        decisionVariant: "destructive",
    },
    success: {
        media:
            "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
        icon: <CheckCircle2Icon />,
        decisionVariant: "default",
    },
}

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
  // `any` is required here so any API/server action payload stays assignable.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func:(id:string|undefined,data?:any)=>Promise<{key:string}>
  onSuccess?:()=>Promise<void> | void,
  data?:unknown
  /** Visual tone — "danger" (default) for destructive actions, "success" for approvals. */
  tone?: ConfirmTone
  /** Override the default tone icon inside the dialog bubble. */
  mediaIcon?: ReactNode
  /** Variant of the trigger button (default "soft"). */
  buttonVariant?: TriggerVariant
  /** Size of the trigger button (default "md"). */
  buttonSize?: TriggerSize
}
export default function ConfirmDialog({ data="",buttonName, icon, question, description, className,  toastMessage,id, decisionBtnName = "Delete",token,func,onSuccess, tone = "danger", mediaIcon, buttonVariant = "soft", buttonSize = "md" }: ConfirmDialogProps) {
    const toneStyle = toneStyles[tone]
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
                render={<CommonButton variant={buttonVariant} size={buttonSize} className={className}>{icon}{buttonName}</CommonButton>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className={toneStyle.media}>
                        {mediaIcon ?? toneStyle.icon}
                    </AlertDialogMedia>
                    <AlertDialogTitle>{question}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogCancel variant={toneStyle.decisionVariant} onClick={deleteStudio} >
                        {isSubmitting? "checking....": decisionBtnName}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

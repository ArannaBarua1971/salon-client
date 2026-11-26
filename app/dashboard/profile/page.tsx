"use client"
import { Camera, Key, Mail, MapPin, Phone, User } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import { updateUser, useSession } from "@/lib/auth-client"
import CommonLoader from "@/app/components/common/Loader"
import { use, useState } from "react"
import { showToast } from "@/lib/helper/toast"

// Sample user — replace with your session/profile data
const profile = {
  name: "Alex Doe",
  email: "alex@example.com",
  phone: "+1 (555) 018-2043",
  location: "Brooklyn, New York",
  memberSince: "March 2025",
}

export default function ProfilePage() {
  const { data, isPending } = useSession()
  const [name, setName] = useState<string | undefined>(data?.user.name)
  const [image, setImage] = useState<string | undefined | null>(data?.user.image)
  if (isPending) {
    return <CommonLoader />
  }

  const handleSubmit = async () => {
    if(!name?.trim() && !image?.trim()){
      showToast("some field to fill","i")
      return
    }
    const { data, error } = await updateUser({
      name,
      image,
    })

    if(error){
      showToast("some thing went wrong")
    }else{
      showToast("updated successfully")
    }
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
          Account
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          My Profile
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Manage your profile image and basic information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr]">
        {/* Profile image card */}
        <section
          aria-labelledby="image-heading"
          className="h-fit rounded-3xl border border-border/70 bg-card p-5 text-center sm:p-6"
        >
          <h2
            id="image-heading"
            className="text-left font-heading text-lg font-semibold text-foreground"
          >
            Profile image
          </h2>

          <div className="mt-5 flex flex-col items-center">
            <div className="relative">
              <span className="overflow-hidden  flex  items-center justify-center rounded-full w-20 h-20">
                {image ? <img className="object-cover w-full h-fit" src={image} alt="" /> : <></>}
              </span>

            </div>

            <p className="mt-4 font-heading text-xl font-semibold text-foreground">
              {name}
            </p>
            <p className="text-sm text-muted-foreground">{data?.user.email}</p>
            <span className="mt-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-3 py-1 text-[11px] font-medium tracking-wide text-rose-gold uppercase">
              {data?.user.role}
            </span>
            <p className="mt-3 text-xs text-muted-foreground">
              JPG or PNG · max 2 MB
            </p>
          </div>
        </section>

        {/* Basic information card */}
        <section
          aria-labelledby="info-heading"
          className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2
              id="info-heading"
              className="font-heading text-lg font-semibold text-foreground"
            >
              Basic information
            </h2>
            <span className="text-xs text-muted-foreground">
              Member since {profile.memberSince}
            </span>
          </div>

          {/* Design only — wire up to your update-profile action */}
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={async (e) => {
            e.preventDefault()
            handleSubmit()
          }}>
            <CommonInput
              label="Full name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              icon={<User className="size-4" />}
            />

            {
              image ?
                <CommonInput
                  label="Image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  autoComplete="name"
                  icon={<User className="size-4" />}
                /> : <></>
            }



            <div className="flex flex-col gap-2.5 sm:col-span-2 sm:flex-row sm:justify-end">
              <CommonButton size="lg" type="submit">Save changes</CommonButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

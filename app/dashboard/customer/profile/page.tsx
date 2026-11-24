"use client"
import { Camera, Mail, MapPin, Phone, User } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import { useSession } from "@/lib/auth-client"
import CommonLoader from "@/app/components/common/Loader"

// Sample user — replace with your session/profile data
const profile = {
  name: "Alex Doe",
  email: "alex@example.com",
  phone: "+1 (555) 018-2043",
  location: "Brooklyn, New York",
  memberSince: "March 2025",
}

export default function ProfilePage() {
  const {data,isPending}=useSession()
  if(isPending){
    return <CommonLoader/>
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
              <span className="flex size-24 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-2xl font-semibold text-primary-foreground ring-4 ring-rose-gold/20">
                AD
              </span>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-card bg-rose-gold text-primary-foreground"
              >
                <Camera className="size-3.5" />
              </span>
            </div>

            <p className="mt-4 font-heading text-xl font-semibold text-foreground">
              {profile.name}
            </p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <span className="mt-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-3 py-1 text-[11px] font-medium tracking-wide text-rose-gold uppercase">
              Customer
            </span>

            <div className="mt-5 flex w-full flex-col gap-2.5">
              {/* Design only — hook up to your upload/preview logic */}
              <CommonButton variant="outline" fullWidth>
                <Camera className="size-4" aria-hidden="true" />
                Change image
              </CommonButton>
              <CommonButton variant="ghost" fullWidth>
                Remove image
              </CommonButton>
            </div>

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
          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CommonInput
              label="Full name"
              name="name"
              type="text"
              defaultValue={profile.name}
              autoComplete="name"
              icon={<User className="size-4" />}
            />

            <CommonInput
              label="Email"
              name="email"
              type="email"
              defaultValue={profile.email}
              autoComplete="email"
              disabled
              hint="Contact support to change your email."
              icon={<Mail className="size-4" />}
            />

            <CommonInput
              label="Phone number"
              name="phone"
              type="tel"
              defaultValue={profile.phone}
              autoComplete="tel"
              icon={<Phone className="size-4" />}
            />

            <CommonInput
              label="Location"
              name="location"
              type="text"
              defaultValue={profile.location}
              autoComplete="address-level2"
              icon={<MapPin className="size-4" />}
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="text-sm font-medium text-foreground"
              >
                About you
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Tell your stylist about your preferences…"
                className="mt-1.5 w-full rounded-3xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-rose-gold/60 focus:ring-3 focus:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-2.5 sm:col-span-2 sm:flex-row sm:justify-end">
              <CommonButton variant="outline" size="lg">
                Cancel
              </CommonButton>
              <CommonButton size="lg">Save changes</CommonButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

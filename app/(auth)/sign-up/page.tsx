"use client"

import Link from "next/link"
import { Check, Lock, Mail, Scissors, Sparkles, Star, User } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonInput } from "@/app/components/common/Input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/auth-client"

const perks = [
  "Verified stylists and top-rated salons",
  "Instant booking — no phone calls needed",
  "Members-only offers and birthday treats",
]

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.6-5.15 3.6-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.72-4.95H1.3v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.39-2.29v-3.1H1.3A12 12 0 0 0 0 12c0 1.94.46 3.77 1.3 5.39l3.98-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.3 6.61l3.98 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  )
}

export default function SignUpPage() {
  const router = useRouter()

  const [error, setError] = useState("")
  const SignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const { name, email, password, imageUrl } = Object.fromEntries(
      formData
    )

    try {
      const { data, error } = await signUp.email({
        name: name as string,
        email: email as string,
        password: password as string,
        image: imageUrl as string,
      })
      if (error) {
        setError(error?.message as string)
      } else {
        router.push("/sign-in")
      }
    } catch (error) {
      router.push("/sign-up")
    }
  }

  const SignUpWithGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  }
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:flex-row lg:gap-14 lg:px-8 lg:py-14">
      {/* Brand panel — decorative, hidden on small screens */}
      <aside className="relative hidden flex-1 overflow-hidden rounded-[2rem] bg-[#2a1519] p-10 text-[#f7e9e6] shadow-[0_40px_80px_-45px_rgba(0,0,0,0.7)] lg:flex lg:min-h-[34rem] lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-rose-gold/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-gold/30 blur-3xl"
        />

        <div className="relative flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-[#2a1519]">
            <Scissors className="size-4" />
          </span>
          <span className="font-heading text-xl font-semibold">SalonBook</span>
        </div>

        <div className="relative">
          <h2 className="font-heading text-4xl leading-[1.1] font-semibold xl:text-5xl">
            Your next look is
            <br />
            <span className="text-gold">one tap away.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#e8d5d3]/85">
            Join thousands of clients who book hair, beauty and spa services
            with trusted professionals — right from their phone.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold">
                  <Check className="size-3" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-3 text-sm text-[#e8d5d3]/85">
          <span className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-3.5 fill-current" />
            ))}
          </span>
          4.9 average from 12k+ bookings
        </div>
      </aside>

      {/* Sign-up form */}
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-2.5 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground">
              <Scissors className="size-4" />
            </span>
            <span className="font-heading text-xl font-semibold text-foreground">
              SalonBook
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground lg:mt-0">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Book your next appointment in seconds — it&apos;s free.
          </p>

          <CommonButton
            type="button"
            variant="outline"
            fullWidth
            size="lg"
            className="mt-6"
            onClick={SignUpWithGoogle}
          >
            <GoogleIcon />
            Continue with Google
          </CommonButton>

          <div className="my-5 flex items-center gap-3 text-xs tracking-wide text-muted-foreground uppercase">
            <span className="h-px flex-1 bg-border" />
            or sign up with email
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Design only — wire up to better-auth when ready */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => SignUpSubmit(event)}
          >
            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}
            <CommonInput
              label="Image url"
              name="imageUrl"
              type="url"
              placeholder="image url"
              autoComplete="https:://"
              required
              icon={<User className="size-4" />}
            />
            <CommonInput
              label="Full name"
              name="name"
              type="text"
              placeholder="Alex Doe"
              autoComplete="name"
              required
              icon={<User className="size-4" />}
            />

            <CommonInput
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              icon={<Mail className="size-4" />}
            />

            <CommonInput
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              minLength={8}
              hint="Must be at least 6 characters."
              icon={<Lock className="size-4" />}
            />

            <CommonButton type="submit" size="lg" fullWidth className="mt-1">
              Create Account
              <Sparkles className="size-4" />
            </CommonButton>
          </form>


        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-rose-gold underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

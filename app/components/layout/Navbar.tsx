"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogOut, Menu, Scissors, Sparkles, X } from "lucide-react"
import CommonButton from "../common/Button"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"
import Avatar from "../common/Avatar"
import { useRouter } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { data, isPending } = useSession()


  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Dashboard routes render their own shell (sidebar + topbar)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Scissors className="size-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-semibold tracking-wide text-foreground sm:text-[1.35rem]">
              SalonBook
            </span>
            <span className="mt-0.5 text-[9px] font-medium tracking-[0.32em] text-muted-foreground uppercase sm:text-[10px]">
              Hair &amp; Beauty
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive(link.href)
                  ? "text-rose-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-rose-gold to-gold transition-transform duration-300",
                  isActive(link.href) ? "scale-x-100" : "scale-x-0"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="md:block hidden">
          {isPending ? (<div className="size-9 animate-pulse rounded-full bg-muted" />)
            :
            !data?.session ?
              (<div className=" items-center gap-2 md:flex">
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 px-4 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-9 rounded-full bg-linear-to-r from-rose-gold to-gold px-5 text-primary-foreground shadow-sm hover:opacity-90"
                  )}
                >
                  <Sparkles className="mr-1.5 size-3.5" />
                  Sign up
                </Link>
              </div>) :
              (<div className="flex space-x-2">
                <CommonButton variant={"soft"} href={`/dashboard/${data?.user.role}`}>
                  <Avatar name={data.user.name} image={data.user.image} />{"->"}
                  <span className="hidden max-w-[8rem] truncate text-sm font-medium text-foreground sm:block">
                    Dashboard
                  </span>
                </CommonButton>

                <CommonButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/sign-in"); // redirect to login page
                        },
                      },
                    })
                  }}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </CommonButton>
              </div>)
          }</div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {
        open && (
          <div
            id="mobile-menu"
            className="animate-in border-t border-border/70 bg-background duration-200 fade-in slide-in-from-top-2 md:hidden"
          >
            <nav
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    isActive(link.href)
                      ? "bg-rose-gold/10 text-rose-gold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {isPending ? (<div className="size-9 animate-pulse rounded-full bg-muted" />)
                :
                !data?.session ?
                  (<div className="mt-3 flex flex-col gap-2 border-t border-border/70 pt-4">
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-10 w-full rounded-full text-base"
                      )}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "h-10 w-full rounded-full bg-linear-to-r from-rose-gold to-gold text-base text-primary-foreground shadow-sm hover:opacity-90"
                      )}
                    >
                      <Sparkles className="mr-1.5 size-4" />
                      Sign up
                    </Link>
                  </div>) :
                  (<div className="flex">
                    <div className="flex items-center gap-2.5 rounded-full border border-border/70 bg-card/85 py-1 pr-4 pl-1">
                      <Avatar name={data.user.name} image={data.user.image} />
                      <span className="hidden max-w-[8rem] truncate text-sm font-medium text-foreground sm:block">
                        {data.user.name}
                      </span>
                    </div>

                    <CommonButton
                      type="button"
                      variant="outline"
                      onClick={() => {
                        signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              router.push("/sign-in"); // redirect to login page
                            },
                          },
                        })
                      }}
                    >
                      <LogOut className="size-4" />
                      <span className="hidden sm:inline">Sign out</span>
                    </CommonButton>
                  </div>)
              }

            </nav>
          </div>
        )
      }
    </header >
  )
}

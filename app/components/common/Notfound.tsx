import { ArrowRight, House, Scissors, SearchX } from 'lucide-react'
import CommonButton from './Button'

function Notfound() {
  return (
    <div>
      <main className="relative z-10 flex w-full max-w-xl flex-col items-center text-center mx-auto">

          {/* Big 404 */}
          <p
            aria-hidden="true"
            className="mt-10 bg-linear-to-r from-rose-gold to-gold bg-clip-text font-heading text-[5.5rem] leading-[0.85] font-semibold tracking-tight text-transparent sm:text-8xl"
          >
            404
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-rose-gold uppercase">
            <SearchX className="size-3.5" aria-hidden="true" />
            Page not found
          </span>

          <h1 className="mt-6 font-heading text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            This page is no longer <span className="text-rose-gold">on the schedule</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            The link may be broken, or the page has moved. Let&apos;s get you
            back to something beautiful.
          </p>

          {/* Actions */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <CommonButton href="/" >
              <House className="size-4" aria-hidden="true" />
              Go home
            </CommonButton>
            <CommonButton href="/services">
              Browse services
              <ArrowRight className="size-4" aria-hidden="true" />
            </CommonButton>
          </div>

          {/* Help line */}
          <p className="mt-8 text-xs text-muted-foreground sm:text-sm">
            Need a hand?{" "}
            <a
              href="mailto:orders@example.com"
              className="font-medium text-rose-gold underline-offset-4 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </main>
    </div>
  )
}

export default Notfound

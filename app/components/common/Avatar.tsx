function Avatar({ name, image }: { name: string; image?: string | null }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return image ? (
    // plain <img> so any user-provided URL works without next.config domains
    <img
      src={image}
      alt={name}
      referrerPolicy="no-referrer"
      className="size-9 rounded-full object-cover ring-2 ring-rose-gold/50"
    />
  ) : (
    <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-rose-gold to-gold text-sm font-semibold text-primary-foreground ring-2 ring-rose-gold/50">
      {initials || "U"}
    </span>
  )
}

export default Avatar
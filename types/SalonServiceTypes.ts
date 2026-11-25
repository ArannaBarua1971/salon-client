/** A single salon service as shown on the services grid / cards. */
export interface SalonServiceTypes {
  _id?: string
  name?: string
  category?: string
  price?: string
  duration?: string
  description?:string
  image?: string
  active?: boolean
  updatedAt?: string
}

export type SalonServiceCardProps = {
  service: SalonServiceTypes
  /** Optional extra classes merged onto the card root. */
  className?: string
  /** Overrides the default `/services/{id}` details link. */
  detailsHref?: string
}

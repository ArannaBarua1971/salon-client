/** A single salon service as shown on the services grid / cards. */
export interface SalonServiceTypes {
  _id?: string
  serviceName: string
  category: string
  description: string
  price: number
  duration: number
  image: string
  status: boolean
  createdAt?: string
}

export type SalonServiceCardProps = {
  service: SalonServiceTypes
  /** Optional extra classes merged onto the card root. */
  className?: string
  /** Overrides the default `/services/{id}` details link. */
  detailsHref?: string
}

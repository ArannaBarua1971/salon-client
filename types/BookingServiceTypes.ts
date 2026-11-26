export interface BookingServiceTypes {
  _id?: string,
  serviceId: string,
  customerId: string |undefined,
  serviceName: string,
  servicePrice: number,
  message?: string,
  status: "pending" | "confirmed" | "cancelled",
  paymentStatus: "unpaid" | "paid",
  appointmentDate: string,
  timeSlot: string,
  createdAt?: string,
  phoneNumber?:string
}

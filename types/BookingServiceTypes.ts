export interface BookingServiceTypes {
  _id?: string,
  serviceId: string,
  customerId: string |undefined,
  serviceName: string,
  servicePrice: number,
  message?: string,
  status: "Pending" | "Confirmed" | "Cancelled",
  paymentStatus: "Unpaid" | "Paid",
  appointmentDate: string,
  timeSlot: string,
  createdAt?: string,
  phoneNumber?:string
}

"use client"

import { useEffect, useState } from "react"
import { CalendarCheck, Clock, Phone, User } from "lucide-react"

import { CommonButton } from "@/app/components/common/Button"
import { CommonChip } from "@/app/components/common/Chip"
import { CommonInput } from "@/app/components/common/Input"
import { CommonTextarea } from "@/app/components/common/Textarea"
import { bookingAppointment, getSpecificBookingTimeSlot } from "@/lib/applicatonApi/BookingApi"
import { useSession } from "@/lib/auth-client"
import { showToast } from "@/lib/helper/toast"




type ServiceBookingProps = {
  serviceId: string
  serviceName: string
  price: string
  duration: string
}

const getToday = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().split("T")[0];
};
export function ServiceBooking({
  serviceId,
  serviceName,
  price,
  duration,
}: ServiceBookingProps) {
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [message, setMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const { data, isPending } = useSession()
  const [timeSlots, setTimeSlots] = useState([
    { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: false },
    { time: "06:00 PM", booked: false },
  ])


  const getTimeSlot=async()=>{
    const data=await getSpecificBookingTimeSlot({serviceId,appointmentDate:selectedDate})
    const bookedSlot= new Set(data);
     setTimeSlots(
      timeSlots.map((slot) => ({
        ...slot,
        booked: bookedSlot.has(slot.time),
      }))
    );
  }
  const handleSubmit =async () => {
    if(isPending || !selectedTime){
      showToast("some went wrong","i")
      return;
    }
    const res = await bookingAppointment({
      serviceId: serviceId,
      customerId: data?.user.id,
      serviceName: serviceName,
      servicePrice: Number(price),
      message: message,
      status: "pending",
      paymentStatus: "unpaid",
      appointmentDate: selectedDate,
      timeSlot: selectedTime,
      phoneNumber:phoneNumber
    })
    if(res.ok){
      showToast("appointment book successfully completed")
      getTimeSlot()
    }else{
      showToast(res.message,"w")
    }
  }
  
  useEffect(()=>{
    getTimeSlot()
  },[])

  return (
    <section
    id="booking"
      aria-label="Set an appointment"
      className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-5 sm:p-6"
    >
      {/* Header */}
      <div>

        <p className="text-xs font-medium tracking-[0.18em] text-rose-gold uppercase">
          Appointment
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
          Set an appointment
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a date and time that works for you — we&apos;ll confirm by phone.
        </p>
      </div>

      <form
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        {/* date details */}
        <CommonInput
          label="Choose time"
          name="date"
          type="date"
          value={getToday()}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getToday()}
          placeholder="date for visit"
          autoComplete="name"
          icon={<Clock className="size-4" />}
          hint="We'll use this to confirm your visit."
        />

        {/* Time slots */}
        <div className="sm:col-span-2">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="size-4 text-rose-gold" aria-hidden="true" />
            Choose a time
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
            {timeSlots.map((slot,index) => (
              <CommonChip
                key={index}
                selected={slot.time === selectedTime}
                disabled={slot.booked}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.time}
              </CommonChip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Struck-through slots are already booked.
          </p>
        </div>
        <CommonInput
          label="Full name"
          name="name"
          type="text"
          value={data?.user.name}
          disabled
          placeholder="Your name"
          autoComplete="name"
          icon={<User className="size-4" />}
          hint="We'll use this to confirm your visit."
          className="text-white"
        />
        <CommonInput
          label="Phone number"
          name="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          icon={<Phone className="size-4" />}
        />

        {/* Notes */}
        <CommonTextarea
          label="Notes for your stylist"
          name="notes"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          rows={3}
          placeholder="Allergies, preferences, reference looks…"
          containerClassName="sm:col-span-2"
        />

        {/* Summary + submit */}
        <div className="flex flex-col gap-4 rounded-3xl border border-rose-gold/30 bg-rose-gold/8 p-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-rose-gold uppercase">
              Booking summary
            </p>
            <p className="mt-1 font-heading text-lg font-semibold text-foreground">
              {serviceName}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {selectedDate} {" "}
              {selectedTime ?? "no time selected"} · {duration} min
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-heading text-2xl font-semibold text-foreground">
              {price}
            </p>
            <CommonButton size="lg" type="submit" disabled={!selectedTime}>
              <CalendarCheck className="size-4" aria-hidden="true" />
              Confirm booking
            </CommonButton>
          </div>
        </div>
        {!selectedTime && (
          <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">
            Pick a time slot to continue.
          </p>
        )}
      </form>
    </section>
  )
}

export default ServiceBooking

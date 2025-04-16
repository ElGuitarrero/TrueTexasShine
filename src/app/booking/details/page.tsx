'use client'
import BookingForm from "@/components/BookingForm"
import { useBookingStore } from "@/stores/useBookingStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const BookingDetails = () => {
    const start = useBookingStore((state) => state.start)
    const end = useBookingStore((state) => state.end)
    const router = useRouter()

    if (!start && !end) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white sm:bg-[url(/images/limpiando.jpg)]  backdrop-blur-xl bg-cover bg-no-repeat gap-2">

            <div className="w-full h-full backdrop-blur-sm flex justify-center items-center">
                <div className="sm:w-[80%] inset-shadow-sm">
                <BookingForm fechas={{ start: start ?? new Date(), end: end ?? new Date() }} onSubmit={() => console.log('hola')} />
                </div>
            </div>


        </div>
    )
}

export default BookingDetails;
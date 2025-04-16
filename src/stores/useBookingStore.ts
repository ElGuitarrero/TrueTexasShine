import { create } from "zustand";

interface Booking {
    start: Date | null
    end: Date | null
    setBooking: (booking: { start: Date; end: Date }) => void
}

export const useBookingStore = create<Booking>((set) => ({
    start: null,
    end: null,
    setBooking: ({ start, end }) => set({ start, end })
})) 
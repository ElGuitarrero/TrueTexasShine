
import { format, startOfWeek, addDays, setHours, setMinutes } from 'date-fns'

export function generateTimeSlots(start = 8, end = 17, interval = 60) {
    const slots = []


    if (interval > 60) {

        for (let h = 0; h < end; h + (interval/60)) {
            for (let m = 0; m < 60; m += interval) {
                slots.push({ hour: h, minutes: m })
            }
        }
        return slots
    }

    for (let h = start; h < end; h++) {



        for (let m = 0; m < 60; m += interval) {
            slots.push({ hour: h, minutes: m })
        }

    }
    return slots
}

export function getWeekDates(date = new Date()) {
    const start = startOfWeek(date, { weekStartsOn: 1 }) // Lunes
    return Array.from({ length: 6 }).map((_, i) => addDays(start, i))
}

export function formatTimeLabel(hour: number, minutes: number) {
    const date = setMinutes(setHours(new Date(), hour), minutes)
    return format(date, 'hh:mm a')
}
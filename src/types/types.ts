

export interface CompletedServiceType {
    id?: string
    user_id?: string
    booking_id: string
    service_type: string
    completed_at?: Date
    feedback: string
    notes: string
    rating: 1|2|3|4|5
    monto_cobrado: number
}
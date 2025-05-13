

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


export interface Customer {
    id?: string
    auth_user_id?: string
    full_name: string
    phone: number
    email: string
    address: string
    zip_code?: number
    notes: string
    is_frequent: boolean
    total_services: number
}
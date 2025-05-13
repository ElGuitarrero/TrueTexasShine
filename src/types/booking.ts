export type ServiceType = "general cleaning" | "deep cleaning" | "office" | "consultation";
export type PropertyType = "house" | "apartment" | "office";
export type BookingStatus = "pending" | "confirmed" | "completed";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;

  service: ServiceType;
  start: Date;
  end_time: Date;

  zipcode?: string,
  colonia?: string

  notes?: string;
  has_pets?: boolean;
  property_type?: PropertyType;
  num_bedrooms?: number;
  num_bathrooms?: number;
  preferred_language?: "en" | "es";
  entry_instructions?: string;
  allow_photos?: boolean;

  status: BookingStatus;
  createdAt: Date;
  precio_estimado: number
}
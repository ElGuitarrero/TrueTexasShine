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
  end: Date;

  notes?: string;
  hasPets?: boolean;
  propertyType?: PropertyType;
  numBedrooms?: number;
  numBathrooms?: number;
  preferredLanguage?: "en" | "es";
  entryInstructions?: string;
  allowPhotos?: boolean;

  status: BookingStatus;
  createdAt: Date;
}
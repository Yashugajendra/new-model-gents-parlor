export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface Service {
  id: string;
  name: string;
  name_kn?: string;
  slug: string;
  description: string;
  description_kn?: string;
  duration_minutes: number;
  price: number; // e.g. 250 for base price
  price_display?: string; // e.g. "₹250 – ₹300"
  price_display_kn?: string;
  is_active: boolean;
  display_order: number;
  badge?: string; // e.g. "Signature", "Popular", "Special"
  badge_kn?: string;
}

export interface Appointment {
  id: string;
  booking_reference: string; // e.g. "RC-8K4P9"
  service_id: string;
  service_name_snapshot: string;
  service_price_snapshot: number;
  service_duration_snapshot: number;
  customer_name: string;
  customer_phone: string;
  customer_notes?: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
  status: AppointmentStatus;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface ShopSettings {
  id: string;
  shop_name: string;
  shop_name_kn?: string;
  tagline: string;
  tagline_kn?: string;
  owner_name?: string;
  owner_name_kn?: string;
  since_year?: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
  address_kn?: string;
  google_maps_url: string;
  currency_code: string;
  currency_symbol: string;
  slot_interval_minutes: number;
  buffer_minutes: number;
  opening_time: string; // "06:30"
  closing_time: string; // "23:00"
  operating_days: number[]; // [1,2,3,4,5,6,7] (1 = Monday, 7 = Sunday)
  is_closed?: boolean;
  closure_reason?: string;
  closure_date?: string;
  closure_reopen_date?: string;
}

export interface BlockedTime {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface SlotAvailability {
  startTime: string; // "14:00"
  endTime: string; // "14:45"
  startISO: string;
  endISO: string;
  isAvailable: boolean;
  conflictReason?: string;
}

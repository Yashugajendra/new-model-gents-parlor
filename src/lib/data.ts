import {
  Service,
  Appointment,
  AppointmentStatus,
  ShopSettings,
  BlockedTime,
  SlotAvailability,
} from "@/types/database.types";
import { generateBookingReference } from "./utils";

export const INITIAL_SHOP_SETTINGS: ShopSettings = {
  id: "shop-default-01",
  shop_name: "New Model Gents Beauty Parlor",
  tagline: "Your Style. Your Time. Your Signature Look.",
  phone_number: "+91 733 807 6977",
  whatsapp_number: "917338076977",
  address: "Kate Complex, Thirthahalli, Shivamogga",
  google_maps_url: "https://www.google.com/maps/search/?api=1&query=Kate+Complex%2C+Thirthahalli%2C+Shivamogga",
  currency_code: "INR",
  currency_symbol: "₹",
  slot_interval_minutes: 30,
  buffer_minutes: 5,
  opening_time: "06:30",
  closing_time: "11:00",
  operating_days: [1, 2, 3, 4, 5, 6, 7], // 7 days a week
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "srv-01",
    name: "The Master Ritual",
    slug: "the-master-ritual",
    description:
      "Our definitive grooming experience: bespoke tailored haircut, charcoal detox wash, hot towel facial massage, straight razor neck clean, and styling consultation.",
    duration_minutes: 60,
    price: 1200,
    is_active: true,
    display_order: 1,
    badge: "Signature",
  },
  {
    id: "srv-02",
    name: "Classic Scissor & Fade",
    slug: "classic-scissor-fade",
    description:
      "Precision taper or skin fade executed with Japanese shears and fine clippers, followed by styling and organic matte clay finish.",
    duration_minutes: 45,
    price: 750,
    is_active: true,
    display_order: 2,
    badge: "Popular",
  },
  {
    id: "srv-03",
    name: "Royal Hot Towel Shave",
    slug: "royal-hot-towel-shave",
    description:
      "Old-school straight razor traditional shave with eucalyptus pre-shave oil, two steamed herbal towels, badger brush lather, and cold compress astringent.",
    duration_minutes: 40,
    price: 650,
    is_active: true,
    display_order: 3,
  },
  {
    id: "srv-04",
    name: "Beard Sculpt & Ozone Hydration",
    slug: "beard-sculpt-hydration",
    description:
      "Meticulous beard reshaping, sharp razor cheek lines, high-frequency ozone steam, and conditioning botanical argan oil infusion.",
    duration_minutes: 35,
    price: 550,
    is_active: true,
    display_order: 4,
  },
  {
    id: "srv-05",
    name: "The Executive Quick Touchup",
    slug: "executive-touchup",
    description:
      "Neckline cleanup, sideburn tapering, eyebrow shaping, and scalp refresh for gentlemen between major appointments.",
    duration_minutes: 25,
    price: 450,
    is_active: true,
    display_order: 5,
  },
];

// In-memory / LocalStorage persistent store for demo/development mode
const STORAGE_KEY_APPOINTMENTS = "newmodel_appointments_v1";
const STORAGE_KEY_SERVICES = "newmodel_services_v1";
const STORAGE_KEY_SETTINGS = "newmodel_settings_v1";
const STORAGE_KEY_BLOCKED = "newmodel_blocked_v1";

// Helper to determine if we are in browser
const isClient = typeof window !== "undefined";

function getStored<T>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("newmodel-data-updated", { detail: { key } }));
    window.dispatchEvent(new CustomEvent("ritualcut-data-updated", { detail: { key } }));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Initial demo appointments showcasing pending vs confirmed states
const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-demo-01",
    booking_reference: "NM-84920",
    service_id: "srv-01",
    service_name_snapshot: "The Master Ritual",
    service_price_snapshot: 1200,
    service_duration_snapshot: 60,
    customer_name: "Vikram Malhotra",
    customer_phone: "+91 98765 11223",
    customer_notes: "Groom's party next weekend, need sharp styling.",
    start_time: "2026-10-20T10:00:00.000Z",
    end_time: "2026-10-20T11:00:00.000Z",
    status: "CONFIRMED",
    created_at: "2026-10-19T08:00:00.000Z",
    updated_at: "2026-10-19T09:00:00.000Z",
  },
  {
    id: "apt-demo-02",
    booking_reference: "NM-3K9M2",
    service_id: "srv-02",
    service_name_snapshot: "Classic Scissor & Fade",
    service_price_snapshot: 750,
    service_duration_snapshot: 45,
    customer_name: "Rahul Verma",
    customer_phone: "+91 98111 22334",
    customer_notes: "Low fade, scissor trim on top.",
    start_time: "2026-10-20T11:30:00.000Z",
    end_time: "2026-10-20T12:15:00.000Z",
    status: "PENDING",
    created_at: "2026-10-19T09:00:00.000Z",
    updated_at: "2026-10-19T09:00:00.000Z",
  },
  {
    id: "apt-demo-03",
    booking_reference: "NM-9A711",
    service_id: "srv-03",
    service_name_snapshot: "Royal Hot Towel Shave",
    service_price_snapshot: 650,
    service_duration_snapshot: 40,
    customer_name: "Arjun Nair",
    customer_phone: "+91 99000 88776",
    customer_notes: "Sensitive skin.",
    start_time: "2026-10-20T11:30:00.000Z",
    end_time: "2026-10-20T12:10:00.000Z",
    status: "PENDING",
    created_at: "2026-10-19T09:30:00.000Z",
    updated_at: "2026-10-19T09:30:00.000Z",
  },
];

export const NewModelData = {
  getSettings(): ShopSettings {
    const stored = getStored<ShopSettings>(STORAGE_KEY_SETTINGS, INITIAL_SHOP_SETTINGS);

    // Migrate the previous demo address in localStorage to the real shop address.
    // This preserves other saved settings such as phone number and opening hours.
    const previousAddress = "42 Artisan Lane, Jubilee Enclave, Hyderabad";
    const shouldUpdateAddress =
      !stored.address?.trim() ||
      stored.address.trim().toLowerCase() === previousAddress.toLowerCase();

    const updated: ShopSettings = {
      ...stored,
      address: shouldUpdateAddress ? "Kate Complex, Thirthahalli, Shivamogga" : stored.address,
      google_maps_url:
        shouldUpdateAddress ||
        !stored.google_maps_url ||
        stored.google_maps_url.includes("Artisan+Barbershop")
          ? "https://www.google.com/maps/search/?api=1&query=Kate+Complex%2C+Thirthahalli%2C+Shivamogga"
          : stored.google_maps_url,
    };

    if (
      updated.address !== stored.address ||
      updated.google_maps_url !== stored.google_maps_url
    ) {
      setStored(STORAGE_KEY_SETTINGS, updated);
    }

    return updated;
  },

  updateSettings(settings: Partial<ShopSettings>): ShopSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    setStored(STORAGE_KEY_SETTINGS, updated);
    return updated;
  },

  getServices(): Service[] {
    return getStored<Service[]>(STORAGE_KEY_SERVICES, INITIAL_SERVICES);
  },

  saveService(service: Service): Service[] {
    const list = this.getServices();
    const index = list.findIndex((s) => s.id === service.id);
    let updated: Service[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = service;
    } else {
      updated = [...list, service];
    }
    setStored(STORAGE_KEY_SERVICES, updated);
    return updated;
  },

  deleteService(serviceId: string): Service[] {
    const list = this.getServices();
    const updated = list.filter((s) => s.id !== serviceId);
    setStored(STORAGE_KEY_SERVICES, updated);
    return updated;
  },

  getAppointments(): Appointment[] {
    return getStored<Appointment[]>(STORAGE_KEY_APPOINTMENTS, DEMO_APPOINTMENTS);
  },

  createAppointmentRequest(params: {
    service: Service;
    customer_name: string;
    customer_phone: string;
    customer_notes?: string;
    start_time: string; // ISO
    end_time: string; // ISO
  }): Appointment {
    const reference = generateBookingReference();
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      booking_reference: reference,
      service_id: params.service.id,
      service_name_snapshot: params.service.name,
      service_price_snapshot: params.service.price,
      service_duration_snapshot: params.service.duration_minutes,
      customer_name: params.customer_name.trim(),
      customer_phone: params.customer_phone.trim(),
      customer_notes: params.customer_notes?.trim(),
      start_time: params.start_time,
      end_time: params.end_time,
      status: "PENDING",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const currentList = this.getAppointments();
    const updatedList = [newAppointment, ...currentList];
    setStored(STORAGE_KEY_APPOINTMENTS, updatedList);
    return newAppointment;
  },

  /**
   * Concurrency-safe atomic approval implementation
   * Matches Postgres `rpc_approve_appointment`:
   * Checks for overlapping CONFIRMED appointments across the same interval.
   */
  approveAppointment(appointmentId: string): {
    success: boolean;
    code: string;
    message: string;
    appointment?: Appointment;
    conflictingAppointment?: Appointment;
  } {
    const list = this.getAppointments();
    const targetIndex = list.findIndex((a) => a.id === appointmentId);

    if (targetIndex === -1) {
      return { success: false, code: "NOT_FOUND", message: "Appointment not found." };
    }

    const target = list[targetIndex];

    if (target.status === "CONFIRMED") {
      return { success: true, code: "ALREADY_CONFIRMED", message: "Appointment is already confirmed.", appointment: target };
    }

    if (target.status !== "PENDING") {
      return {
        success: false,
        code: "INVALID_STATUS",
        message: `Cannot approve appointment with status '${target.status}'. Only PENDING requests can be confirmed.`,
      };
    }

    const targetStart = new Date(target.start_time).getTime();
    const targetEnd = new Date(target.end_time).getTime();

    // Check for conflicting CONFIRMED appointments
    const conflict = list.find((a) => {
      if (a.id === appointmentId || a.status !== "CONFIRMED") return false;
      const confStart = new Date(a.start_time).getTime();
      const confEnd = new Date(a.end_time).getTime();
      // Overlap condition: start < other_end && end > other_start
      return targetStart < confEnd && targetEnd > confStart;
    });

    if (conflict) {
      return {
        success: false,
        code: "CONFLICT_OVERLAPPING_CONFIRMED",
        message: `Conflict detected: Time interval overlaps with confirmed appointment for "${conflict.customer_name}" (Ref: ${conflict.booking_reference}).`,
        conflictingAppointment: conflict,
      };
    }

    // Confirmation approved
    const updatedTarget: Appointment = {
      ...target,
      status: "CONFIRMED",
      updated_at: new Date().toISOString(),
    };

    const updatedList = [...list];
    updatedList[targetIndex] = updatedTarget;
    setStored(STORAGE_KEY_APPOINTMENTS, updatedList);

    return {
      success: true,
      code: "OK",
      message: "Appointment confirmed successfully.",
      appointment: updatedTarget,
    };
  },

  rejectAppointment(appointmentId: string, reason?: string): {
    success: boolean;
    appointment?: Appointment;
  } {
    const list = this.getAppointments();
    const targetIndex = list.findIndex((a) => a.id === appointmentId);
    if (targetIndex === -1) return { success: false };

    const updatedTarget: Appointment = {
      ...list[targetIndex],
      status: "REJECTED",
      rejection_reason: reason || "Declined by shop manager due to scheduling conflict.",
      updated_at: new Date().toISOString(),
    };

    const updatedList = [...list];
    updatedList[targetIndex] = updatedTarget;
    setStored(STORAGE_KEY_APPOINTMENTS, updatedList);

    return { success: true, appointment: updatedTarget };
  },

  updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus
  ): { success: boolean; appointment?: Appointment } {
    const list = this.getAppointments();
    const targetIndex = list.findIndex((a) => a.id === appointmentId);
    if (targetIndex === -1) return { success: false };

    const updatedTarget: Appointment = {
      ...list[targetIndex],
      status,
      updated_at: new Date().toISOString(),
    };

    const updatedList = [...list];
    updatedList[targetIndex] = updatedTarget;
    setStored(STORAGE_KEY_APPOINTMENTS, updatedList);
    return { success: true, appointment: updatedTarget };
  },

  lookupAppointment(reference: string, phone: string): Appointment | null {
    const list = this.getAppointments();
    const cleanRef = reference.trim().toUpperCase();
    const cleanPhone = phone.replace(/\D/g, "");

    return (
      list.find((a) => {
        const refMatch = a.booking_reference.toUpperCase() === cleanRef;
        const phoneMatch = a.customer_phone.replace(/\D/g, "").endsWith(cleanPhone) ||
          cleanPhone.endsWith(a.customer_phone.replace(/\D/g, ""));
        return refMatch && phoneMatch;
      }) || null
    );
  },

  getAvailableSlots(date: Date, durationMinutes: number): SlotAvailability[] {
    const settings = this.getSettings();
    const appointments = this.getAppointments();

    const [openHour, openMin] = settings.opening_time.split(":").map(Number);
    const [closeHour, closeMin] = settings.closing_time.split(":").map(Number);

    const slotInterval = settings.slot_interval_minutes || 30;
    const slots: SlotAvailability[] = [];

    const dayStart = new Date(date);
    dayStart.setHours(openHour, openMin, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(closeHour, closeMin, 0, 0);

    const now = new Date();

    let currentPointer = new Date(dayStart);

    while (currentPointer.getTime() + durationMinutes * 60 * 1000 <= dayEnd.getTime()) {
      const slotStart = new Date(currentPointer);
      const slotEnd = new Date(currentPointer.getTime() + durationMinutes * 60 * 1000);

      const isPast = slotStart < now;

      // Check if slot overlaps with any CONFIRMED appointment
      const conflict = appointments.find((a) => {
        if (a.status !== "CONFIRMED") return false;
        const aptStart = new Date(a.start_time).getTime();
        const aptEnd = new Date(a.end_time).getTime();
        return slotStart.getTime() < aptEnd && slotEnd.getTime() > aptStart;
      });

      const startTimeStr = slotStart.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const endTimeStr = slotEnd.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      slots.push({
        startTime: startTimeStr,
        endTime: endTimeStr,
        startISO: slotStart.toISOString(),
        endISO: slotEnd.toISOString(),
        isAvailable: !isPast && !conflict,
        conflictReason: isPast ? "Slot passed" : conflict ? "Reserved" : undefined,
      });

      // Increment by slot interval
      currentPointer = new Date(currentPointer.getTime() + slotInterval * 60 * 1000);
    }

    return slots;
  },
};

export const RitualCutData = NewModelData;

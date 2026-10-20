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
  shop_name: "New Model Gents Parlor",
  shop_name_kn: "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್",
  tagline: "Look sharp. Feel confident.",
  tagline_kn: "ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.",
  owner_name: "Hanumanthu (Chinanna)",
  owner_name_kn: "ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)",
  since_year: "2010",
  phone_number: "+91 73380 76977",
  whatsapp_number: "917338076977",
  address: "Katte Complex, Thirthahalli, Shivamogga – 577432",
  address_kn: "ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432",
  google_maps_url: "https://www.google.com/maps/search/?api=1&query=Katte+Complex%2C+Thirthahalli%2C+Shivamogga",
  currency_code: "INR",
  currency_symbol: "₹",
  slot_interval_minutes: 30,
  buffer_minutes: 5,
  opening_time: "06:30",
  closing_time: "23:00",
  operating_days: [1, 2, 3, 4, 5, 6, 7], // 7 days a week
  is_closed: false,
  closure_reason: "",
  closure_date: "",
  closure_reopen_date: "",
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "srv-01",
    name: "Haircut",
    name_kn: "ಹೇರ್ ಕಟಿಂಗ್",
    slug: "haircut",
    description: "Classic or modern cut with styling",
    description_kn: "ಕ್ಲಾಸಿಕ್ ಅಥವಾ ಮಾಡರ್ನ್ ಕಟ್, ಸ್ಟೈಲಿಂಗ್ ಸಹಿತ",
    duration_minutes: 30,
    price: 250,
    price_display: "₹250 – ₹300",
    price_display_kn: "₹250 – ₹300",
    is_active: true,
    display_order: 1,
    badge: "Essential",
    badge_kn: "ಪ್ರಮುಖ",
  },
  {
    id: "srv-02",
    name: "Shaving",
    name_kn: "ಶೇವಿಂಗ್",
    slug: "shaving",
    description: "Clean, smooth shave with a hot towel",
    description_kn: "ಬಿಸಿ ಟವೆಲ್ನೊಂದಿಗೆ ನುಣುಪಾದ ಶೇವ್",
    duration_minutes: 25,
    price: 150,
    price_display: "₹150 – ₹200",
    price_display_kn: "₹150 – ₹200",
    is_active: true,
    display_order: 2,
  },
  {
    id: "srv-03",
    name: "Beard Trim & Styling",
    name_kn: "ಗಡ್ಡ ಟ್ರಿಮ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್",
    slug: "beard-trim-styling",
    description: "Shaping, trimming and line-up",
    description_kn: "ಆಕಾರ, ಟ್ರಿಮ್ ಮತ್ತು ಲೈನ್-ಅಪ್",
    duration_minutes: 20,
    price: 150,
    price_display: "₹150",
    price_display_kn: "₹150",
    is_active: true,
    display_order: 3,
  },
  {
    id: "srv-04",
    name: "Haircut + Beard",
    name_kn: "ಕಟಿಂಗ್ + ಗಡ್ಡ",
    slug: "haircut-beard-package",
    description: "Combined package",
    description_kn: "ಒಟ್ಟಿಗೆ ಪ್ಯಾಕೇಜ್",
    duration_minutes: 45,
    price: 399,
    price_display: "₹399",
    price_display_kn: "₹399",
    is_active: true,
    display_order: 4,
    badge: "Popular",
    badge_kn: "ಜನಪ್ರಿಯ",
  },
  {
    id: "srv-05",
    name: "Head Massage",
    name_kn: "ಹೆಡ್ ಮಸಾಜ್",
    slug: "head-massage",
    description: "Relaxing oil massage",
    description_kn: "ಆರಾಮದಾಯಕ ಎಣ್ಣೆ ಮಸಾಜ್",
    duration_minutes: 25,
    price: 200,
    price_display: "₹200",
    price_display_kn: "₹200",
    is_active: true,
    display_order: 5,
  },
  {
    id: "srv-06",
    name: "Facial / Cleanup",
    name_kn: "ಫೇಶಿಯಲ್ / ಕ್ಲೀನಪ್",
    slug: "facial-cleanup",
    description: "Skin cleansing and refresh",
    description_kn: "ಚರ್ಮದ ಶುದ್ಧೀಕರಣ ಮತ್ತು ಹೊಳಪು",
    duration_minutes: 35,
    price: 250,
    price_display: "₹250",
    price_display_kn: "₹250",
    is_active: true,
    display_order: 6,
  },
  {
    id: "srv-07",
    name: "Hair Colour / Mehendi",
    name_kn: "ಹೇರ್ ಕಲರ್ / ಮೆಹೆಂದಿ",
    slug: "hair-colour-mehendi",
    description: "Black, brown or natural colour",
    description_kn: "ಕಪ್ಪು, ಕಂದು ಅಥವಾ ನೈಸರ್ಗಿಕ ಬಣ್ಣ",
    duration_minutes: 40,
    price: 200,
    price_display: "₹200",
    price_display_kn: "₹200",
    is_active: true,
    display_order: 7,
  },
  {
    id: "srv-08",
    name: "Kids’ Haircut",
    name_kn: "ಮಕ್ಕಳ ಕಟಿಂಗ್",
    slug: "kids-haircut",
    description: "Gentle, patient service for children",
    description_kn: "ಮಕ್ಕಳಿಗೆ ತಾಳ್ಮೆಯ, ಮೃದುವಾದ ಸೇವೆ",
    duration_minutes: 25,
    price: 150,
    price_display: "₹150",
    price_display_kn: "₹150",
    is_active: true,
    display_order: 8,
  },
  {
    id: "srv-09",
    name: "Groom Package",
    name_kn: "ಗ್ರೂಮ್ ಪ್ಯಾಕೇಜ್",
    slug: "groom-package",
    description: "Haircut, shave, facial and styling for weddings and functions",
    description_kn: "ಮದುವೆ ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಕಟಿಂಗ್, ಶೇವ್, ಫೇಶಿಯಲ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್",
    duration_minutes: 90,
    price: 2999,
    price_display: "₹2,999",
    price_display_kn: "₹2,999",
    is_active: true,
    display_order: 9,
    badge: "Special",
    badge_kn: "ವಿಶೇಷ",
  },
];

// In-memory / LocalStorage persistent store for demo/development mode
const STORAGE_KEY_APPOINTMENTS = "newmodel_appointments_v2";
const STORAGE_KEY_SERVICES = "newmodel_services_v2";
const STORAGE_KEY_SETTINGS = "newmodel_settings_v2";
const STORAGE_KEY_BLOCKED = "newmodel_blocked_v2";

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
    service_id: "srv-04",
    service_name_snapshot: "Haircut + Beard",
    service_price_snapshot: 399,
    service_duration_snapshot: 45,
    customer_name: "Prajwal Hegde",
    customer_phone: "+91 98451 22334",
    customer_notes: "Low fade, trimmed beard line.",
    start_time: "2026-10-21T10:00:00.000Z",
    end_time: "2026-10-21T10:45:00.000Z",
    status: "CONFIRMED",
    created_at: "2026-10-20T08:00:00.000Z",
    updated_at: "2026-10-20T09:00:00.000Z",
  },
  {
    id: "apt-demo-02",
    booking_reference: "NM-3K9M2",
    service_id: "srv-01",
    service_name_snapshot: "Haircut",
    service_price_snapshot: 250,
    service_duration_snapshot: 30,
    customer_name: "Santhosh Kumar",
    customer_phone: "+91 98860 33445",
    customer_notes: "Classic cut with scissors.",
    start_time: "2026-10-21T11:30:00.000Z",
    end_time: "2026-10-21T12:00:00.000Z",
    status: "PENDING",
    created_at: "2026-10-20T09:00:00.000Z",
    updated_at: "2026-10-20T09:00:00.000Z",
  },
  {
    id: "apt-demo-03",
    booking_reference: "NM-9A711",
    service_id: "srv-02",
    service_name_snapshot: "Shaving",
    service_price_snapshot: 150,
    service_duration_snapshot: 25,
    customer_name: "Girish Rao",
    customer_phone: "+91 99000 77889",
    customer_notes: "Hot towel smooth shave.",
    start_time: "2026-10-21T14:30:00.000Z",
    end_time: "2026-10-21T14:55:00.000Z",
    status: "PENDING",
    created_at: "2026-10-20T09:30:00.000Z",
    updated_at: "2026-10-20T09:30:00.000Z",
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

    // Check if shop is marked closed on this date
    if (settings.is_closed) {
      if (settings.closure_date) {
        const checkDateStr = date.toISOString().split("T")[0];
        if (checkDateStr === settings.closure_date) {
          return [];
        }
      } else {
        return [];
      }
    }

    // Tuesday has specific operating hours: 7:30 AM – 9:00 PM
    const isTuesday = date.getDay() === 2;
    const effectiveOpen = isTuesday ? "07:30" : (settings.opening_time || "06:30");
    const effectiveClose = isTuesday ? "21:00" : (settings.closing_time || "23:00");

    const [openHour, openMin] = effectiveOpen.split(":").map(Number);
    const [closeHour, closeMin] = effectiveClose.split(":").map(Number);

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

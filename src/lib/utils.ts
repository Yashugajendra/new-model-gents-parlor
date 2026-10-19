import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currencySymbol: string = "₹"): string {
  return `${currencySymbol}${amount.toLocaleString("en-IN")}`;
}

export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTime(dateString: string | Date): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatDateTime(dateString: string | Date): string {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

/**
 * Generates an unguessable, human-readable booking reference
 * e.g., "RC-8K4P9" (excludes ambiguous chars like 0, O, 1, I, L)
 */
export function generateBookingReference(): string {
  const chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NM-${code}`;
}

/**
 * Generates a WhatsApp Click-to-Chat URL with encoded prefilled message
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  // Strip non-digit characters
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { ShopSettings } from "@/types/database.types";

interface WhatsAppFloatingButtonProps {
  settings?: ShopSettings;
}

export function WhatsAppFloatingButton({ settings }: WhatsAppFloatingButtonProps) {
  const cleanPhone = (settings?.whatsapp_number || "919876543210").replace(/\D/g, "");
  const shopName = settings?.shop_name || "RITUALCUT";

  return (
    <aside aria-label="Support and Enquiries" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
          shopName
        )}%2C%20I%20have%20an%20enquiry%20regarding%20an%20appointment.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm shadow-xl shadow-[#25D366]/20 hover:scale-105 active:scale-95 transition-all group"
        title={`Chat with ${shopName} on WhatsApp`}
      >
        <MessageCircle className="w-5 h-5 fill-white stroke-none" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </a>
    </aside>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { ShopSettings } from "@/types/database.types";

interface LocationHoursSectionProps {
  settings: ShopSettings;
}

function formatTimeString(timeStr?: string): string {
  if (!timeStr) return "09:00 AM";
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr || "0", 10);
  if (isNaN(h)) return timeStr;
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  const displayM = m.toString().padStart(2, "0");
  return `${displayH.toString().padStart(2, "0")}:${displayM} ${period}`;
}

export function LocationHoursSection({ settings }: LocationHoursSectionProps) {
  const [todayName, setTodayName] = useState("");

  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    const names = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setTodayName(names[currentDayIndex]);
  }, []);

  const formattedHours = `${formatTimeString(settings.opening_time)} – ${formatTimeString(
    settings.closing_time
  )}`;

  const daysOfWeek = [
    { day: "Monday", time: formattedHours },
    { day: "Tuesday", time: formattedHours },
    { day: "Wednesday", time: formattedHours },
    { day: "Thursday", time: formattedHours },
    { day: "Friday", time: formattedHours },
    { day: "Saturday", time: formattedHours },
    { day: "Sunday", time: formattedHours },
  ];

  const cleanWhatsapp = (settings.whatsapp_number || "919876543210").replace(/\D/g, "");

  return (
    <section id="hours" className="py-24 bg-[#09090b] relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Location & Contact Information */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              Visit Our Shop
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white">
              Location & Enquiries
            </h2>
            <p
              className="text-[#94a3b8] text-sm sm:text-base leading-relaxed"
              suppressHydrationWarning
            >
              Visit us at {settings.address || "our studio"}, for your next tailored grooming experience.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
                <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Address</h4>
                  <p
                    className="text-xs sm:text-sm text-[#94a3b8] mt-0.5"
                    suppressHydrationWarning
                  >
                    {settings.address}
                  </p>
                  <a
                    href={
                      settings.google_maps_url ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        settings.address || "Barbershop"
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#c5a880] hover:underline mt-2"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
                <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Telephone Consultation</h4>
                  <p
                    className="text-xs sm:text-sm text-[#94a3b8] mt-0.5"
                    suppressHydrationWarning
                  >
                    {settings.phone_number}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
                <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold">WhatsApp Shop Concierge</h4>
                  <p className="text-xs sm:text-sm text-[#94a3b8] mt-0.5">
                    Fast responses for special requests, rescheduling, and private events.
                  </p>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(
                      settings.shop_name || "RITUALCUT"
                    )}%2C%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline mt-2 font-medium"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="p-8 rounded-2xl bg-[#121215] border border-white/[0.08] shadow-xl">
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08] mb-6">
              <Clock className="w-6 h-6 text-[#c5a880]" />
              <div>
                <h3 className="font-serif text-2xl text-white">Opening Hours</h3>
                <p className="text-xs text-[#94a3b8]">By appointment only to maintain exclusivity</p>
              </div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {daysOfWeek.map(({ day, time }) => {
                const isToday = day === todayName;
                return (
                  <div
                    key={day}
                    className={`py-3.5 flex items-center justify-between text-sm ${
                      isToday
                        ? "text-[#c5a880] font-semibold bg-[#c5a880]/5 px-3 rounded-lg"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{day}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c5a880]/20 text-[#c5a880] font-bold">
                          Today
                        </span>
                      )}
                    </div>
                    <span
                      className={isToday ? "text-white" : "text-gray-300"}
                      suppressHydrationWarning
                    >
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

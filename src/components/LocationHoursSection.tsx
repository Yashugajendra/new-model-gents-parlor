"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, Phone, MessageSquare, ExternalLink, AlertTriangle, Navigation } from "lucide-react";
import { ShopSettings } from "@/types/database.types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface LocationHoursSectionProps {
  settings: ShopSettings;
}

export function LocationHoursSection({ settings }: LocationHoursSectionProps) {
  const { language, theme, t } = useLanguageTheme();
  const [todayIndex, setTodayIndex] = useState<number>(0);

  useEffect(() => {
    setTodayIndex(new Date().getDay()); // 0 = Sunday, 1 = Monday, etc.
  }, []);

  const cleanWhatsapp = (settings.whatsapp_number || "917338076977").replace(/\D/g, "");

  // Weekly hours matching user's specific table
  const weeklyHours = [
    { dayEn: "Sunday", dayKn: "ಭಾನುವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 0 },
    { dayEn: "Monday", dayKn: "ಸೋಮವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 1 },
    { dayEn: "Tuesday", dayKn: "ಮಂಗಳವಾರ", time: "7:30 AM – 9:00 PM", dayIdx: 2 },
    { dayEn: "Wednesday", dayKn: "ಬುಧವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 3 },
    { dayEn: "Thursday", dayKn: "ಗುರುವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 4 },
    { dayEn: "Friday", dayKn: "ಶುಕ್ರವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 5 },
    { dayEn: "Saturday", dayKn: "ಶನಿವಾರ", time: "6:30 AM – 11:00 PM", dayIdx: 6 },
  ];

  const addressText =
    language === "kn" && settings.address_kn
      ? settings.address_kn
      : settings.address || "New Model Gents Parlor, Katte Complex, Thirthahalli, Shivamogga – 577432";

  const googleMapsUrl =
    settings.google_maps_url ||
    "https://www.google.com/maps/search/?api=1&query=Katte+Complex%2C+Thirthahalli%2C+Shivamogga";

  return (
    <section
      id="hours"
      className={`py-24 relative scroll-mt-12 border-t transition-colors duration-300 ${
        theme === "light" ? "bg-[#fbfaf8] border-black/[0.08]" : "bg-[#09090b] border-white/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Closure Notice (Auto-shown when owner marks shop closed) */}
        {settings.is_closed && (
          <div className="mb-12 p-5 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-white flex items-start gap-3.5 shadow-lg animate-pulse">
            <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#ef4444]">
                {t.hours.closureNoticeTitle}
              </h4>
              <p className="text-sm text-gray-200 mt-1 leading-relaxed">
                {language === "kn"
                  ? `${settings.closure_date || "ನಿಗದಿತ ದಿನಾಂಕ"}ದಂದು ${
                      settings.closure_reason || "ವಿಶೇಷ ಕಾರ್ಯ"
                    }ದಿಂದ ಅಂಗಡಿ ಮುಚ್ಚಿರುತ್ತದೆ. ${
                      settings.closure_reopen_date || "ಶೀಘ್ರದಲ್ಲೇ"
                    }ದಂದು ಮತ್ತೆ ತೆರೆಯುತ್ತದೆ. ಅನಾನುಕೂಲಕ್ಕಾಗಿ ಕ್ಷಮಿಸಿ.`
                  : `We are closed on ${settings.closure_date || "the specified date"} due to ${
                      settings.closure_reason || "special reasons"
                    }. We reopen on ${settings.closure_reopen_date || "soon"}. Sorry for the inconvenience.`}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Location & Contact Information */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              {t.hours.badge}
            </p>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-medium ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.hours.title}
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {t.hours.subtitle}
            </p>

            <div className="space-y-4 pt-2">
              {/* Full Address */}
              <div
                className={`flex items-start gap-3.5 p-4 rounded-xl border transition-colors ${
                  theme === "light"
                    ? "bg-white border-black/[0.08] shadow-xs"
                    : "bg-[#121215] border-white/[0.06]"
                }`}
              >
                <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4
                    className={`text-sm font-semibold ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {t.hours.addressTitle}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                    suppressHydrationWarning
                  >
                    {addressText}
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c5a880] hover:underline mt-2.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.hours.directionsBtn}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div
                className={`flex items-start gap-3.5 p-4 rounded-xl border transition-colors ${
                  theme === "light"
                    ? "bg-white border-black/[0.08] shadow-xs"
                    : "bg-[#121215] border-white/[0.06]"
                }`}
              >
                <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <h4
                    className={`text-sm font-semibold ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {t.hours.phoneTitle}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm mt-0.5 ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    {settings.phone_number || "+91 73380 76977"}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={`https://wa.me/${cleanWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <span className={theme === "light" ? "text-black/20 text-xs" : "text-white/20 text-xs"}>•</span>
                    <a
                      href={`tel:${settings.phone_number || "+917338076977"}`}
                      className="text-xs text-[#c5a880] hover:underline font-medium"
                    >
                      Direct Call
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps Box */}
              <div
                className={`rounded-xl overflow-hidden border h-52 relative shadow-lg ${
                  theme === "light"
                    ? "bg-white border-black/[0.08]"
                    : "bg-[#121215] border-white/[0.08]"
                }`}
              >
                <iframe
                  title="New Model Gents Parlor Location Map"
                  src="https://maps.google.com/maps?q=Katte+Complex,+Thirthahalli,+Karnataka+577432&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className={`w-full h-full border-0 transition-opacity ${
                    theme === "dark"
                      ? "filter invert-[90%] hue-rotate-180 opacity-80 hover:opacity-100"
                      : "opacity-95 hover:opacity-100"
                  }`}
                  loading="lazy"
                  allowFullScreen
                />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-lg border text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5 hover:scale-105 transition-transform ${
                    theme === "light"
                      ? "bg-white/95 border-black/15 text-[#9e7946] shadow-sm"
                      : "bg-[#09090b]/90 border-white/20 text-[#c5a880]"
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{t.hours.getDirectionsMap}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div
            className={`p-8 rounded-2xl border shadow-xl transition-colors ${
              theme === "light"
                ? "bg-white border-black/[0.08]"
                : "bg-[#121215] border-white/[0.08]"
            }`}
          >
            <div
              className={`flex items-center gap-3 pb-6 border-b mb-6 ${
                theme === "light" ? "border-black/[0.08]" : "border-white/[0.08]"
              }`}
            >
              <Clock className="w-6 h-6 text-[#c5a880]" />
              <div>
                <h3
                  className={`font-serif text-2xl ${
                    theme === "light" ? "text-[#18181b]" : "text-white"
                  }`}
                >
                  {t.hours.openingHoursTitle}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  {t.hours.exclusivityNote}
                </p>
              </div>
            </div>

            <div
              className={`divide-y ${
                theme === "light" ? "divide-black/[0.05]" : "divide-white/[0.04]"
              }`}
            >
              {weeklyHours.map((item) => {
                const isToday = item.dayIdx === todayIndex;
                const dayLabel = language === "kn" ? item.dayKn : item.dayEn;

                return (
                  <div
                    key={item.dayEn}
                    className={`py-3.5 flex items-center justify-between text-sm transition-colors ${
                      isToday
                        ? theme === "light"
                          ? "text-[#9e7946] font-semibold bg-[#f4efe6] px-3.5 rounded-xl border border-[#c5a880]/30"
                          : "text-[#c5a880] font-semibold bg-[#c5a880]/10 px-3.5 rounded-xl border border-[#c5a880]/20"
                        : theme === "light"
                        ? "text-[#52525b] hover:text-[#18181b]"
                        : "text-[#94a3b8] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{dayLabel}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c5a880] text-[#09090b] font-bold">
                          {t.hours.todayBadge}
                        </span>
                      )}
                    </div>
                    <span
                      className={
                        isToday
                          ? theme === "light"
                            ? "text-[#18181b] font-semibold"
                            : "text-white font-semibold"
                          : theme === "light"
                          ? "text-[#27272a]"
                          : "text-gray-300"
                      }
                    >
                      {item.time}
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

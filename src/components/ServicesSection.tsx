"use client";

import React from "react";
import { Clock, Check, Sparkles, AlertCircle } from "lucide-react";
import { Service } from "@/types/database.types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  const { language, t } = useLanguageTheme();
  const activeServices = services.filter((s) => s.is_active);

  return (
    <section id="services" className="py-24 bg-[#09090b] relative scroll-mt-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-3">
            {t.services.badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white mb-4 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-[#94a3b8] text-xs sm:text-sm">
            {t.services.subtitle}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-4 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[11px] text-[#c5a880]">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{t.services.disclaimer}</span>
          </div>
        </div>

        {/* Services Grid (All 9 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => {
            const serviceName =
              language === "kn" && service.name_kn ? service.name_kn : service.name;
            const serviceDesc =
              language === "kn" && service.description_kn
                ? service.description_kn
                : service.description;
            const priceText =
              language === "kn" && service.price_display_kn
                ? service.price_display_kn
                : service.price_display || `₹${service.price}`;
            const badgeText =
              language === "kn" && service.badge_kn ? service.badge_kn : service.badge;

            return (
              <div
                key={service.id}
                className="luxury-card p-6 flex flex-col justify-between group relative overflow-hidden border border-white/[0.07] hover:border-[#c5a880]/50 transition-all"
              >
                {/* Gold accent line at top on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#c5a880] transition-colors">
                      {serviceName}
                    </h3>
                    {badgeText && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {badgeText}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#94a3b8] line-clamp-3 mb-6 leading-relaxed">
                    {serviceDesc}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline justify-between pt-4 border-t border-white/[0.06] mb-5">
                    <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <Clock className="w-4 h-4 text-[#c5a880]" />
                      <span>{service.duration_minutes} {t.services.minutes}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                      {priceText}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1a1a1f] hover:bg-[#c5a880] text-[#e2e8f0] hover:text-[#09090b] font-medium text-xs sm:text-sm tracking-wide border border-white/[0.08] hover:border-[#c5a880] transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.services.selectBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

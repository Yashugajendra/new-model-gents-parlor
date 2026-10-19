"use client";

import React from "react";
import { Clock, Check, Sparkles } from "lucide-react";
import { Service } from "@/types/database.types";
import { formatCurrency } from "@/lib/utils";

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  const activeServices = services.filter((s) => s.is_active);

  return (
    <section id="services" className="py-24 bg-[#09090b] relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3">
            Menu of Styling & Grooming
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white mb-4 tracking-tight">
            Curated Gents Services
          </h2>
          <p className="text-[#94a3b8] text-sm sm:text-base">
            Every service at New Model Gents Beauty Parlor includes personal consultation,
            precision scissor tailoring, and premium artisan finishing products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="luxury-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Gold accent line at top on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#c5a880] transition-colors">
                    {service.name}
                  </h3>
                  {service.badge && (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      {service.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#94a3b8] line-clamp-3 mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between pt-4 border-t border-white/[0.06] mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <Clock className="w-4 h-4 text-[#c5a880]" />
                    <span>{service.duration_minutes} Minutes</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {formatCurrency(service.price)}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1a1a1f] hover:bg-[#c5a880] text-[#e2e8f0] hover:text-[#09090b] font-medium text-xs sm:text-sm tracking-wide border border-white/[0.08] hover:border-[#c5a880] transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Select & Pick Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

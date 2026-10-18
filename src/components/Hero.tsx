"use client";

import React from "react";
import { Scissors, Clock, Sparkles, Shield, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-[#0d0d10] via-[#09090b] to-[#09090b]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#141417]/90 text-xs font-medium text-[#c5a880] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span className="tracking-widest uppercase">The Sovereign Barbering Experience</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          Your Style. Your Time. <br className="hidden sm:inline" />
          <span className="gold-gradient-text italic font-normal">Your Ritual.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto font-light leading-relaxed mb-10">
          No waiting in overcrowded lounges. Every session is an uninterrupted,
          craft-driven grooming appointment with handcrafted shears, heated botanicals, and bespoke tailoring.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-base shadow-lg shadow-[#c5a880]/15 hover:shadow-[#c5a880]/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Request an Appointment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-[#c5a880]/40 bg-[#141417]/60 text-white hover:text-[#c5a880] font-medium text-base transition-all flex items-center justify-center"
          >
            Explore Services
          </a>
        </div>

        {/* Pillar Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.06]">
          <div className="p-4 rounded-lg bg-[#121215]/60 border border-white/[0.04] text-left">
            <Clock className="w-5 h-5 text-[#c5a880] mb-2" />
            <h4 className="text-white text-sm font-semibold">Strict Punctuality</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Dedicated slots with zero overlap delay</p>
          </div>
          <div className="p-4 rounded-lg bg-[#121215]/60 border border-white/[0.04] text-left">
            <Scissors className="w-5 h-5 text-[#c5a880] mb-2" />
            <h4 className="text-white text-sm font-semibold">Master Artistry</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Precision Japanese shears & taper blades</p>
          </div>
          <div className="p-4 rounded-lg bg-[#121215]/60 border border-white/[0.04] text-left">
            <Sparkles className="w-5 h-5 text-[#c5a880] mb-2" />
            <h4 className="text-white text-sm font-semibold">Herbal Steam</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Hot towels infused with eucalyptus</p>
          </div>
          <div className="p-4 rounded-lg bg-[#121215]/60 border border-white/[0.04] text-left">
            <Shield className="w-5 h-5 text-[#c5a880] mb-2" />
            <h4 className="text-white text-sm font-semibold">Owner Verified</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Personal confirmation by master barber</p>
          </div>
        </div>
      </div>
    </section>
  );
}

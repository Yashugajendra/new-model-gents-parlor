"use client";

import React from "react";
import { motion } from "motion/react";
import { Scissors, Clock, Sparkles, MapPin, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  shopName?: string;
  tagline?: string;
}

export function Hero({ onOpenBooking, shopName = "New Model Gents Beauty Parlor", tagline }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-24 md:pb-36 bg-gradient-to-b from-[#0d0d10] via-[#09090b] to-[#09090b]">
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c5a880]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/35 bg-[#141417]/90 text-xs font-medium text-[#c5a880] mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
          <span className="tracking-[0.25em] uppercase font-sans text-[11px] font-semibold">
            Premier Men&apos;s Styling Sanctuary • Thirthahalli
          </span>
        </motion.div>

        {/* Brand Display Typography with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="block text-xs sm:text-sm uppercase tracking-[0.35em] text-[#94a3b8] font-sans font-medium mb-3">
            Welcome to
          </span>
          <h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-5xl mx-auto leading-[1.06]"
            suppressHydrationWarning
          >
            {shopName}
          </h1>
        </motion.div>

        {/* Headline Tagline with Shimmering Gold Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-light tracking-wide">
            Your Style. Your Time.{" "}
            <span className="gold-shimmer-text italic font-normal inline-block">
              Your Signature Look.
            </span>
          </h2>
        </motion.div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          Experience precision scissor tailoring, skin tapers, and royal herbal grooming
          designed exclusively for modern gentlemen. No chaotic queues — every seat is personal.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-base shadow-lg shadow-[#c5a880]/20 hover:shadow-[#c5a880]/40 hover:scale-[1.03] active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Book Your Appointment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-[#c5a880]/50 bg-[#141417]/80 text-white hover:text-[#c5a880] font-medium text-base transition-all flex items-center justify-center hover-gold-line"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Pillar Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.07]"
        >
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <Clock className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">Strict Punctuality</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Dedicated slots with zero overlap delay</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <Scissors className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">Master Artistry</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Precision Japanese shears & taper blades</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <Sparkles className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">Herbal Steam</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Hot towels infused with eucalyptus</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <MapPin className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">Kate Complex</h4>
            <p className="text-xs text-[#94a3b8] mt-1">Thirthahalli, Shivamogga</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

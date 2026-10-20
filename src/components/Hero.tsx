"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Scissors, Clock, Sparkles, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface HeroProps {
  onOpenBooking: () => void;
  shopName?: string;
  tagline?: string;
  whatsappNumber?: string;
}

export function Hero({
  onOpenBooking,
  shopName = "New Model Gents Parlor",
  tagline,
  whatsappNumber = "917338076977",
}: HeroProps) {
  const { language, t } = useLanguageTheme();

  const activeShopName =
    language === "kn"
      ? "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್"
      : shopName || "New Model Gents Parlor";

  const cleanWhatsapp = (whatsappNumber || "917338076977").replace(/\D/g, "");

  return (
    <section id="home" className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-32 bg-[#09090b]">
      {/* Background Image: Master Barber Preparing Straight Razor */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/images/hero-razor-bg.jpg"
          alt="Master barber preparing straight razor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 md:opacity-30 scale-105"
        />
        {/* Layered luxury dark overlays ensuring perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/85 via-[#09090b]/75 to-[#09090b]" />
        <div className="absolute inset-0 bg-[#09090b]/30" />
      </div>

      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c5a880]/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Animated Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/35 bg-[#141417]/90 text-xs font-medium text-[#c5a880] mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
          <span className="tracking-[0.2em] uppercase font-sans text-[11px] font-semibold">
            {t.hero.badge}
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
            {t.hero.welcome}
          </span>
          <h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
            suppressHydrationWarning
          >
            {activeShopName}
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
            <span className="gold-shimmer-text italic font-medium inline-block">
              {t.hero.tagline}
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
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons: [Book Appointment] [Chat on WhatsApp] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-16"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-base shadow-lg shadow-[#c5a880]/20 hover:shadow-[#c5a880]/40 hover:scale-[1.03] active:scale-98 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{t.hero.bookBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(
              activeShopName
            )}%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-[#25D366]/50 bg-[#141417]/80 text-white hover:text-[#25D366] font-medium text-base transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{t.hero.chatWhatsappBtn}</span>
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
            <h4 className="text-white text-sm font-semibold">{t.hero.highlights.experience.title}</h4>
            <p className="text-xs text-[#94a3b8] mt-1">{t.hero.highlights.experience.desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <Scissors className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">{t.hero.highlights.punctuality.title}</h4>
            <p className="text-xs text-[#94a3b8] mt-1">{t.hero.highlights.punctuality.desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <Sparkles className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">{t.hero.highlights.hygiene.title}</h4>
            <p className="text-xs text-[#94a3b8] mt-1">{t.hero.highlights.hygiene.desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121215]/80 border border-white/[0.05] text-left hover:border-[#c5a880]/30 transition-all group">
            <MapPin className="w-5 h-5 text-[#c5a880] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-white text-sm font-semibold">{t.hero.highlights.location.title}</h4>
            <p className="text-xs text-[#94a3b8] mt-1">{t.hero.highlights.location.desc}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
  const { language, theme, t } = useLanguageTheme();

  const activeShopName =
    language === "kn"
      ? "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್"
      : shopName || "New Model Gents Parlor";

  const cleanWhatsapp = (whatsappNumber || "917338076977").replace(/\D/g, "");

  return (
    <section
      id="home"
      className={`relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-32 transition-colors duration-300 ${
        theme === "light" ? "bg-[#fbfaf8]" : "bg-[#09090b]"
      }`}
    >
      {/* Background Image: Master Barber Preparing Straight Razor */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src="/images/hero-razor-bg.jpg"
          alt="Master barber preparing straight razor"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center scale-105 transition-opacity duration-300 ${
            theme === "light" ? "opacity-15" : "opacity-25 md:opacity-30"
          }`}
        />
        {/* Layered luxury overlays ensuring perfect text contrast in both light and dark modes */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            theme === "light"
              ? "bg-gradient-to-b from-[#fbfaf8]/90 via-[#fbfaf8]/80 to-[#fbfaf8]"
              : "bg-gradient-to-b from-[#09090b]/85 via-[#09090b]/75 to-[#09090b]"
          }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            theme === "light" ? "bg-[#fbfaf8]/20" : "bg-[#09090b]/30"
          }`}
        />
      </div>

      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#c5a880]/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Animated Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-8 shadow-sm backdrop-blur-sm ${
            theme === "light"
              ? "border-[#c5a880]/50 bg-white/95 text-[#9e7946]"
              : "border-[#c5a880]/35 bg-[#141417]/90 text-[#c5a880]"
          }`}
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
          <span
            className={`block text-xs sm:text-sm uppercase tracking-[0.35em] font-sans font-medium mb-3 ${
              theme === "light" ? "text-[#71717a]" : "text-[#94a3b8]"
            }`}
          >
            {t.hero.welcome}
          </span>
          <h1
            className={`font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08] ${
              theme === "light" ? "text-[#18181b]" : "text-white"
            }`}
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
          className="mb-4 sm:mb-6"
        >
          <h2 className="font-serif text-xl sm:text-3xl md:text-5xl font-light tracking-wide">
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
          className={`font-sans text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-12 ${
            theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
          }`}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action Buttons: [Book Appointment] [Chat on WhatsApp] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto mb-12 sm:mb-16"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm sm:text-base shadow-lg shadow-[#c5a880]/20 hover:shadow-[#c5a880]/40 hover:scale-[1.03] active:scale-98 transition-all flex items-center justify-center gap-2 group"
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
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-sm ${
              theme === "light"
                ? "border-black/10 hover:border-[#25D366]/50 bg-white text-[#18181b] hover:text-[#25D366]"
                : "border-white/10 hover:border-[#25D366]/50 bg-[#141417]/80 text-white hover:text-[#25D366]"
            }`}
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
          className={`grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-6 sm:pt-8 border-t ${
            theme === "light" ? "border-black/[0.08]" : "border-white/[0.07]"
          }`}
        >
          <div
            className={`p-3 sm:p-4 rounded-xl text-left transition-all group ${
              theme === "light"
                ? "bg-white border border-black/[0.08] shadow-sm hover:border-[#c5a880]"
                : "bg-[#121215]/80 border border-white/[0.05] hover:border-[#c5a880]/30"
            }`}
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a880] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <h4
              className={`text-xs sm:text-sm font-semibold leading-snug ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.hero.highlights.experience.title}
            </h4>
            <p
              className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {t.hero.highlights.experience.desc}
            </p>
          </div>
          <div
            className={`p-3 sm:p-4 rounded-xl text-left transition-all group ${
              theme === "light"
                ? "bg-white border border-black/[0.08] shadow-sm hover:border-[#c5a880]"
                : "bg-[#121215]/80 border border-white/[0.05] hover:border-[#c5a880]/30"
            }`}
          >
            <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a880] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <h4
              className={`text-xs sm:text-sm font-semibold leading-snug ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.hero.highlights.punctuality.title}
            </h4>
            <p
              className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {t.hero.highlights.punctuality.desc}
            </p>
          </div>
          <div
            className={`p-3 sm:p-4 rounded-xl text-left transition-all group ${
              theme === "light"
                ? "bg-white border border-black/[0.08] shadow-sm hover:border-[#c5a880]"
                : "bg-[#121215]/80 border border-white/[0.05] hover:border-[#c5a880]/30"
            }`}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a880] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <h4
              className={`text-xs sm:text-sm font-semibold leading-snug ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.hero.highlights.hygiene.title}
            </h4>
            <p
              className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {t.hero.highlights.hygiene.desc}
            </p>
          </div>
          <div
            className={`p-3 sm:p-4 rounded-xl text-left transition-all group ${
              theme === "light"
                ? "bg-white border border-black/[0.08] shadow-sm hover:border-[#c5a880]"
                : "bg-[#121215]/80 border border-white/[0.05] hover:border-[#c5a880]/30"
            }`}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a880] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <h4
              className={`text-xs sm:text-sm font-semibold leading-snug ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.hero.highlights.location.title}
            </h4>
            <p
              className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {t.hero.highlights.location.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

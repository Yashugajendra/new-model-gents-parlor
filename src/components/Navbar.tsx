"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Calendar,
  ShieldCheck,
  MessageCircle,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { ShopSettings } from "@/types/database.types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface NavbarProps {
  onOpenBooking: () => void;
  settings?: ShopSettings;
}

export function Navbar({ onOpenBooking, settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, setTheme, t } = useLanguageTheme();

  const shopName =
    language === "kn" && settings?.shop_name_kn
      ? settings.shop_name_kn
      : settings?.shop_name || "New Model Gents Parlor";

  const cleanWhatsapp = (settings?.whatsapp_number || "917338076977").replace(/\D/g, "");

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/90 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with NM Monogram */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a20] to-[#121215] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880] group-hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] group-hover:scale-105 transition-all shrink-0">
            <span className="font-serif font-bold text-sm tracking-wider text-[#c5a880]">NM</span>
          </div>
          <div>
            <span
              className="font-serif text-base sm:text-lg lg:text-xl tracking-wider uppercase font-semibold text-white group-hover:text-[#c5a880] transition-colors block leading-tight"
              suppressHydrationWarning
            >
              {shopName}
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase font-sans">
              {t.nav.taglineSub}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links: Home · About Us · Services · Hairstyles · Hours & Location */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#94a3b8]">
          <a href="#home" className="hover:text-white transition-colors py-1 hover-gold-line">
            {t.nav.home}
          </a>
          <a href="#about" className="hover:text-white transition-colors py-1 hover-gold-line">
            {t.nav.about}
          </a>
          <a href="#services" className="hover:text-white transition-colors py-1 hover-gold-line">
            {t.nav.services}
          </a>
          <a href="#gallery" className="hover:text-white transition-colors py-1 hover-gold-line">
            {t.nav.hairstyles}
          </a>
          <a href="#hours" className="hover:text-white transition-colors py-1 hover-gold-line">
            {t.nav.hours}
          </a>
          <Link
            href="/status"
            className="hover:text-white transition-colors py-1 hover-gold-line flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{t.nav.status}</span>
          </Link>
        </nav>

        {/* Desktop Controls & CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Top Bar Control 1: Language toggle (EN | ಕನ್ನಡ) */}
          <div
            className="flex items-center p-0.5 rounded-lg border border-white/10 bg-[#141418] text-xs font-semibold shadow-inner"
            title={language === "en" ? "Switch to Kannada" : "Switch to English"}
          >
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === "en"
                  ? "bg-[#c5a880] text-[#09090b] shadow-sm font-bold"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-white/20 text-[10px] select-none px-0.5">|</span>
            <button
              onClick={() => setLanguage("kn")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                language === "kn"
                  ? "bg-[#c5a880] text-[#09090b] shadow-sm font-bold"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Top Bar Control 2: Theme toggle (☀️ Light / 🌙 Dark) */}
          <div
            className="flex items-center p-0.5 rounded-lg border border-white/10 bg-[#141418] text-xs font-semibold shadow-inner"
            title="Toggle Light / Dark mode"
          >
            <button
              onClick={() => setTheme("light")}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                theme === "light"
                  ? "bg-[#c5a880] text-[#09090b] shadow-sm font-bold"
                  : "text-[#94a3b8] hover:text-white"
              }`}
              title={language === "kn" ? "ಲೈಟ್ ಮೋಡ್" : "Light Mode"}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">
                {language === "kn" ? "ಲೈಟ್" : "Light"}
              </span>
            </button>
            <span className="text-white/20 text-[10px] select-none px-0.5">|</span>
            <button
              onClick={() => setTheme("dark")}
              className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                theme === "dark"
                  ? "bg-[#c5a880] text-[#09090b] shadow-sm font-bold"
                  : "text-[#94a3b8] hover:text-white"
              }`}
              title={language === "kn" ? "ಡಾರ್ಕ್ ಮೋಡ್" : "Dark Mode"}
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden xl:inline">
                {language === "kn" ? "ಡಾರ್ಕ್" : "Dark"}
              </span>
            </button>
          </div>

          {/* Owner Dashboard link */}
          <Link
            href="/admin"
            title={t.nav.ownerDashboard}
            className="p-2 text-[#94a3b8] hover:text-[#c5a880] transition-colors rounded-lg hover:bg-white/[0.04]"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(
              shopName
            )}%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#94a3b8] hover:text-[#25D366] transition-colors rounded-lg hover:bg-white/[0.04]"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            {t.nav.bookNow}
          </button>
        </div>

        {/* Mobile Controls & Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Language Toggle on Mobile */}
          <button
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="px-2 py-1 rounded-md border border-[#c5a880]/30 bg-[#141418] text-[#c5a880] font-bold text-xs"
          >
            {language === "en" ? "ಕನ್ನಡ" : "EN"}
          </button>

          {/* Quick Theme Toggle on Mobile */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md border border-white/10 bg-[#141418] text-[#94a3b8]"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-[#c5a880]" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-2.5 py-1 rounded-lg bg-[#c5a880] text-[#09090b] font-semibold text-xs"
          >
            {t.nav.bookNow}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-[#c5a880] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0d0d10] px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            {/* Mobile Language switch */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#94a3b8]">Lang:</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded ${language === "en" ? "bg-[#c5a880] text-black font-bold" : "text-gray-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("kn")}
                className={`px-2 py-0.5 rounded ${language === "kn" ? "bg-[#c5a880] text-black font-bold" : "text-gray-400"}`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Mobile Theme switch */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#94a3b8]">Theme:</span>
              <button
                onClick={() => setTheme("light")}
                className={`px-2 py-0.5 rounded ${theme === "light" ? "bg-[#c5a880] text-black font-bold" : "text-gray-400"}`}
              >
                ☀️ {t.nav.lightText}
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-2 py-0.5 rounded ${theme === "dark" ? "bg-[#c5a880] text-black font-bold" : "text-gray-400"}`}
              >
                🌙 {t.nav.darkText}
              </button>
            </div>
          </div>

          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            {t.nav.about}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            {t.nav.services}
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            {t.nav.hairstyles}
          </a>
          <a
            href="#hours"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            {t.nav.hours}
          </a>
          <Link
            href="/status"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#c5a880]"
          >
            {t.nav.status}
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-400 hover:text-white"
          >
            {t.nav.ownerDashboard}
          </Link>
        </div>
      )}
    </header>
  );
}

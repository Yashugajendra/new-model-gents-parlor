"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scissors, Calendar, ShieldCheck, MessageCircle, Menu, X } from "lucide-react";
import { ShopSettings } from "@/types/database.types";

interface NavbarProps {
  onOpenBooking: () => void;
  settings?: ShopSettings;
}

export function Navbar({ onOpenBooking, settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shopName = settings?.shop_name || "New Model Gents Beauty Parlor";
  const cleanWhatsapp = (settings?.whatsapp_number || "917338076977").replace(/\D/g, "");

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/90 border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with NM Monogram */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a20] to-[#121215] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880] group-hover:shadow-[0_0_15px_rgba(197,168,128,0.25)] group-hover:scale-105 transition-all shrink-0">
            <span className="font-serif font-bold text-sm tracking-wider text-[#c5a880]">NM</span>
          </div>
          <div>
            <span
              className="font-serif text-lg sm:text-xl tracking-wider uppercase font-semibold text-white group-hover:text-[#c5a880] transition-colors block leading-tight"
              suppressHydrationWarning
            >
              {shopName}
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] text-[#94a3b8] uppercase font-sans">
               Thirthahalli • Shivamogga
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94a3b8]">
          <a
            href="#about"
            className="hover:text-white transition-colors py-1 hover-gold-line"
          >
            About
          </a>
          <a
            href="#gallery"
            className="hover:text-white transition-colors py-1 hover-gold-line"
          >
            Lookbook
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors py-1 hover-gold-line"
          >
            Services & Rates
          </a>
          <a
            href="#hours"
            className="hover:text-white transition-colors py-1 hover-gold-line"
          >
            Hours & Location
          </a>
          <Link
            href="/status"
            className="hover:text-white transition-colors py-1 hover-gold-line flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-[#c5a880]" />
            Status
          </Link>
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            title="Owner Dashboard"
            className="p-2 text-[#94a3b8] hover:text-[#c5a880] transition-colors rounded-lg hover:bg-white/[0.04]"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(
              shopName
            )}%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#94a3b8] hover:text-[#25D366] transition-colors rounded-lg hover:bg-white/[0.04]"
            title="WhatsApp Shop"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-[#09090b] font-semibold text-xs"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#c5a880] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0d0d10] px-4 pt-3 pb-6 space-y-4">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            About Us
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            Lookbook & Gallery
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            Services & Rates
          </a>
          <a
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            The Craft & Technique
          </a>
          <a
            href="#hours"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            Hours & Location
          </a>
          <Link
            href="/status"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#c5a880]"
          >
            Look up My Booking Status
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-400 hover:text-white"
          >
            Owner Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}

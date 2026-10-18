"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Scissors, Calendar, ShieldCheck, MessageCircle, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/85 border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#141417] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880] group-hover:scale-105 transition-all">
            <Scissors className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <span className="font-serif text-2xl tracking-wider uppercase font-semibold text-white group-hover:text-[#c5a880] transition-colors">
              RITUAL<span className="text-[#c5a880]">CUT</span>
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#94a3b8] uppercase font-sans -mt-1">
              Bespoke Barbering
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a
            href="#services"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-[#c5a880]"
          >
            Services & Pricing
          </a>
          <a
            href="#ritual"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-[#c5a880]"
          >
            The Ritual
          </a>
          <a
            href="#hours"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-[#c5a880]"
          >
            Hours & Location
          </a>
          <Link
            href="/status"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-[#c5a880] flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-[#c5a880]" />
            Check Status
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
            href="https://wa.me/919876543210?text=Hello%20RITUALCUT%2C%20I%20would%20like%20to%20enquire%20about%20booking%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#94a3b8] hover:text-[#25D366] transition-colors rounded-lg hover:bg-white/[0.04]"
            title="WhatsApp Shop"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-md bg-[#c5a880] text-[#09090b] font-semibold text-xs"
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
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            Services & Pricing
          </a>
          <a
            href="#ritual"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-300 hover:text-[#c5a880]"
          >
            The Ritual Philosophy
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

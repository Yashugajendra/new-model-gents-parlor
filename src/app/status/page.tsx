"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Appointment } from "@/types/database.types";
import { RitualCutData } from "@/lib/data";
import { formatDate, formatTime, formatCurrency, generateWhatsAppLink } from "@/lib/utils";

export default function StatusLookupPage() {
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!reference.trim() || !phone.trim()) {
      setError("Please provide both your booking reference and phone number.");
      return;
    }

    const found = RitualCutData.lookupAppointment(reference, phone);
    setAppointment(found);
    setHasSearched(true);
  };

  const shopSettings = RitualCutData.getSettings();

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Pending Owner Approval
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Declined
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Scissors className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/15 text-gray-400 border border-gray-500/30">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.08] bg-[#0d0d10] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#141417] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <Scissors className="w-4 h-4 -rotate-45" />
            </div>
            <span className="font-serif text-lg font-bold tracking-wider text-white">
              RITUAL<span className="text-[#c5a880]">CUT</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-[#94a3b8] hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] mb-2">
            Self-Service Status
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">
            Check Booking Status
          </h1>
          <p className="text-xs sm:text-sm text-[#94a3b8] mt-2">
            Enter your booking reference code (e.g. <span className="font-mono text-gray-300">RC-84920</span>)
            and phone number to view live appointment status.
          </p>
        </div>

        {/* Lookup Form */}
        <form
          onSubmit={handleLookup}
          className="p-6 rounded-2xl bg-[#121215] border border-white/[0.08] shadow-xl space-y-4 mb-8"
        >
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Booking Reference Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. RC-84920"
              value={reference}
              onChange={(e) => setReference(e.target.value.toUpperCase())}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#c5a880] uppercase tracking-wider font-mono placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Customer Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="Phone number used during booking"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#c5a880] placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Search Appointment</span>
          </button>
        </form>

        {/* Results Card */}
        {hasSearched && appointment && (
          <div className="p-6 rounded-2xl bg-[#121215] border border-white/[0.08] shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/[0.07] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] block">
                  Reference
                </span>
                <span className="font-mono text-xl font-bold text-white">
                  {appointment.booking_reference}
                </span>
              </div>
              <div>{getStatusBadge(appointment.status)}</div>
            </div>

            {/* Status Narrative Banner */}
            {appointment.status === "CONFIRMED" && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs leading-relaxed">
                🎉 <strong>Your appointment is locked in!</strong> Our master barber has reserved this slot
                exclusively for you. Please arrive 5 minutes before your scheduled start time.
              </div>
            )}

            {appointment.status === "PENDING" && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs leading-relaxed">
                ⏳ <strong>Request Pending:</strong> Your request has been recorded and is currently in the
                owner review queue. We will confirm your slot shortly.
              </div>
            )}

            {appointment.status === "REJECTED" && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs leading-relaxed">
                ❌ <strong>Slot Unavailable:</strong> {appointment.rejection_reason || "This slot could not be accommodated due to a scheduling conflict."} Please select an alternative time or message our shop on WhatsApp.
              </div>
            )}

            {/* Appointment Details */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#94a3b8] flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-[#c5a880]" /> Service
                </span>
                <span className="text-white font-medium">
                  {appointment.service_name_snapshot} ({appointment.service_duration_snapshot} mins)
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#94a3b8] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" /> Date
                </span>
                <span className="text-white font-medium">{formatDate(appointment.start_time)}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#94a3b8] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a880]" /> Time
                </span>
                <span className="text-white font-medium">
                  {formatTime(appointment.start_time)} – {formatTime(appointment.end_time)}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#94a3b8] flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#c5a880]" /> Customer
                </span>
                <span className="text-white font-medium">{appointment.customer_name}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#94a3b8] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" /> Phone
                </span>
                <span className="text-white font-medium">{appointment.customer_phone}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[#94a3b8]">Estimated Price:</span>
                <span className="text-base font-bold text-[#c5a880]">
                  {formatCurrency(appointment.service_price_snapshot)}
                </span>
              </div>
            </div>

            {/* WhatsApp Enquire / Share Button */}
            <a
              href={generateWhatsAppLink(
                shopSettings.whatsapp_number,
                `Hello RITUALCUT, I am checking on my booking Ref: ${appointment.booking_reference} for ${appointment.service_name_snapshot} on ${formatDate(appointment.start_time)}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Contact Shop via WhatsApp</span>
            </a>
          </div>
        )}

        {hasSearched && !appointment && (
          <div className="p-8 rounded-2xl bg-[#121215] border border-white/[0.08] text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-serif text-lg text-white">No Appointment Found</h3>
            <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
              We couldn&apos;t find an appointment matching reference &ldquo;{reference}&rdquo; and phone &ldquo;{phone}&rdquo;.
              Please verify the details or contact the barbershop directly.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

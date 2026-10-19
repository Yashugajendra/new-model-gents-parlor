"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scissors,
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
import { NewModelData } from "@/lib/data";
import { formatDate, formatTime, formatCurrency, generateWhatsAppLink } from "@/lib/utils";

interface StatusClientViewProps {
  reference: string;
}

export default function StatusClientView({ reference }: StatusClientViewProps) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const list = NewModelData.getAppointments();
    const found = list.find(
      (a) => a.booking_reference.toUpperCase() === reference.toUpperCase()
    );
    setAppointment(found || null);
    setIsLoaded(true);
  }, [reference]);

  const shopSettings = NewModelData.getSettings();

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" /> Pending Owner Approval
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3.5 h-3.5" /> Declined
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Scissors className="w-3.5 h-3.5" /> Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/15 text-gray-400 border border-gray-500/30">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc] flex flex-col">
      <header className="border-b border-white/[0.08] bg-[#0d0d10] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a1a20] to-[#121215] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <span className="font-serif font-bold text-xs text-[#c5a880]">NM</span>
            </div>
            <span className="font-serif text-lg font-bold tracking-wider text-white">
              NEW MODEL <span className="text-[#c5a880]">GENTS PARLOR</span>
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

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12">
        {!isLoaded ? (
          <div className="text-center py-12 text-[#94a3b8] text-sm">
            Retrieving appointment details...
          </div>
        ) : appointment ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/[0.08] shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/[0.07] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] block">
                  Reference Code
                </span>
                <span className="font-mono text-2xl font-bold text-[#c5a880]">
                  {appointment.booking_reference}
                </span>
              </div>
              <div>{getStatusBadge(appointment.status)}</div>
            </div>

            {appointment.status === "CONFIRMED" && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs leading-relaxed">
                🎉 <strong>Your appointment is confirmed!</strong> Master barber will be ready at the chair.
                Please arrive 5 minutes early.
              </div>
            )}

            {appointment.status === "PENDING" && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs leading-relaxed">
                ⏳ <strong>Pending Review:</strong> The shop owner is reviewing your request. You can also send
                a quick WhatsApp notification to expedite confirmation.
              </div>
            )}

            {appointment.status === "REJECTED" && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs leading-relaxed">
                ❌ <strong>Slot Declined:</strong> {appointment.rejection_reason || "Conflict with another client booking."} Please book another slot or message us on WhatsApp.
              </div>
            )}

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
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" /> Contact
                </span>
                <span className="text-white font-medium">{appointment.customer_phone}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[#94a3b8]">Estimated Price:</span>
                <span className="text-lg font-bold text-[#c5a880]">
                  {formatCurrency(appointment.service_price_snapshot)}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={generateWhatsAppLink(
                  shopSettings.whatsapp_number,
                  `Hello ${shopSettings.shop_name || "New Model Gents Beauty Parlor"}, checking on my booking Ref: ${appointment.booking_reference} for ${appointment.service_name_snapshot} on ${formatDate(appointment.start_time)}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>Message Barbershop on WhatsApp</span>
              </a>

              <Link
                href="/status"
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] text-white text-xs font-medium flex items-center justify-center transition-all"
              >
                Search Another Booking
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#121215] border border-white/[0.08] text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-serif text-lg text-white">Booking Not Found</h3>
            <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
              No appointment exists with booking reference &ldquo;{reference}&rdquo;.
            </p>
            <Link
              href="/status"
              className="inline-block py-2 px-5 rounded-lg bg-[#c5a880] text-[#09090b] font-medium text-xs"
            >
              Back to Lookup Form
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

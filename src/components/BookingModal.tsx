"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Service, Appointment, SlotAvailability } from "@/types/database.types";
import { RitualCutData } from "@/lib/data";
import { formatCurrency, formatDate, generateWhatsAppLink } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: Service | null;
  onBookingCreated?: (appointment: Appointment) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedService,
  onBookingCreated,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Service, 2: Slot, 3: Details, 4: Confirmed
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Date selection (next 7 days)
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotAvailability | null>(null);

  // Customer form inputs
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize services and dates
  useEffect(() => {
    if (isOpen) {
      const activeServices = RitualCutData.getServices().filter((s) => s.is_active);
      setServices(activeServices);

      // Generate next 7 days
      const days: Date[] = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
      }
      setAvailableDays(days);
      setSelectedDate(days[0]);

      if (preselectedService) {
        setSelectedService(preselectedService);
        setStep(2);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, preselectedService]);

  // Recalculate slots whenever date or selected service changes
  useEffect(() => {
    if (selectedService && selectedDate) {
      const computedSlots = RitualCutData.getAvailableSlots(
        selectedDate,
        selectedService.duration_minutes
      );
      setSlots(computedSlots);
      setSelectedSlot(null);
    }
  }, [selectedService, selectedDate]);

  if (!isOpen) return null;

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSlotSelect = (slot: SlotAvailability) => {
    if (!slot.isAvailable) return;
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Please enter both your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const newApt = RitualCutData.createAppointmentRequest({
        service: selectedService,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_notes: customerNotes,
        start_time: selectedSlot.startISO,
        end_time: selectedSlot.endISO,
      });

      setCreatedAppointment(newApt);
      setStep(4);
      if (onBookingCreated) onBookingCreated(newApt);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#c5a880", "#ffffff", "#b38f5c"],
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to record request. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setStep(1);
    setSelectedService(null);
    setSelectedSlot(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerNotes("");
    setCreatedAppointment(null);
    onClose();
  };

  // WhatsApp share message for customer
  const shopSettings = RitualCutData.getSettings();
  const whatsAppShareUrl = createdAppointment
    ? generateWhatsAppLink(
        shopSettings.whatsapp_number,
        `💈 *RITUALCUT Booking Request*\n` +
          `Ref: ${createdAppointment.booking_reference}\n` +
          `Name: ${createdAppointment.customer_name}\n` +
          `Service: ${createdAppointment.service_name_snapshot}\n` +
          `Requested Time: ${formatDate(createdAppointment.start_time)} at ${new Date(
            createdAppointment.start_time
          ).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}\n` +
          `Status: ⏳ Pending Owner Approval\n\n` +
          `Hi! I have submitted an appointment request on your website. Looking forward to your confirmation.`
      )
    : "#";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-white/[0.09] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-[#16161b]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c5a880]">
              Step {step} of 4
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
              {step === 1 && "Choose Your Grooming Ritual"}
              {step === 2 && "Select Date & Available Time"}
              {step === 3 && "Your Contact Details"}
              {step === 4 && "Request Received"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-[#94a3b8] mb-4">
                Select a service from our menu to view live barber availability.
              </p>
              <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="w-full p-4 rounded-xl text-left bg-[#18181d] border border-white/[0.06] hover:border-[#c5a880]/50 hover:bg-[#1d1d24] transition-all flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white group-hover:text-[#c5a880] transition-colors">
                          {service.name}
                        </span>
                        {service.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#c5a880]/15 text-[#c5a880]">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                        <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                        <span>{service.duration_minutes} Mins</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-lg font-bold text-white">
                        {formatCurrency(service.price)}
                      </div>
                      <span className="text-[11px] text-[#c5a880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Available Slot */}
          {step === 2 && selectedService && (
            <div className="space-y-6">
              {/* Selected Service Bar */}
              <div className="p-3.5 rounded-xl bg-[#18181d] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Service</span>
                  <div className="text-sm font-semibold text-white">{selectedService.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#c5a880]">
                    {formatCurrency(selectedService.price)}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[11px] text-[#94a3b8] hover:text-white underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Date Selector Tabs */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2.5">
                  Select Appointment Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {availableDays.map((day, idx) => {
                    const isSelected = selectedDate
                      ? day.toDateString() === selectedDate.toDateString()
                      : false;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(day)}
                        className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "bg-[#c5a880] text-[#09090b] border-[#c5a880] font-bold shadow-md"
                            : "bg-[#18181d] text-gray-300 border-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider">
                          {day.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className="text-base font-semibold">
                          {day.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Availability Grid */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-medium text-gray-300">
                    Available Time Slots ({selectedService.duration_minutes} mins)
                  </label>
                  <span className="text-[11px] text-[#94a3b8]">
                    {slots.filter((s) => s.isAvailable).length} slots available
                  </span>
                </div>

                {slots.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-400 bg-[#16161a] rounded-xl border border-white/[0.04]">
                    No available slots for this date. Please choose another date.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {slots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.isAvailable}
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-2 px-1 rounded-lg text-xs font-medium border text-center transition-all ${
                          !slot.isAvailable
                            ? "opacity-35 bg-black/40 border-white/[0.04] text-gray-500 cursor-not-allowed line-through"
                            : "bg-[#18181d] border-white/[0.08] text-white hover:border-[#c5a880] hover:bg-[#c5a880]/10 active:scale-95"
                        }`}
                        title={slot.isAvailable ? "Available" : slot.conflictReason}
                      >
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Customer Details Form */}
          {step === 3 && selectedService && selectedSlot && (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-[#18181d] border border-white/[0.06] space-y-2">
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Requested Service:</span>
                  <span className="text-white font-medium">{selectedService.name}</span>
                </div>
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Date & Time:</span>
                  <span className="text-white font-medium">
                    {selectedDate ? formatDate(selectedDate) : ""} at {selectedSlot.startTime}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Price (Pay at shop):</span>
                  <span className="text-[#c5a880] font-bold">
                    {formatCurrency(selectedService.price)}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a880]" />
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#c5a880] placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  Phone Number (For Booking Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#c5a880] placeholder-gray-500"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  You can look up your appointment status anytime using this phone number.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#c5a880]" />
                  Special Requests or Hair Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Skin fade with razor clean neckline, or scalp sensitivity notes..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#c5a880] placeholder-gray-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:text-white text-xs font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting Request..." : "Submit Booking Request"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation View */}
          {step === 4 && createdAppointment && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
                  Status: ⏳ Pending Owner Approval
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  Request Successfully Submitted
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md mx-auto mt-2">
                  Our shop owner has received your request. You will receive confirmation shortly.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="p-4 rounded-xl bg-[#16161b] border border-[#c5a880]/30 max-w-sm mx-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] block mb-1">
                  Your Booking Reference
                </span>
                <span className="font-mono text-2xl font-bold tracking-wider text-[#c5a880]">
                  {createdAppointment.booking_reference}
                </span>
                <p className="text-[11px] text-gray-400 mt-1">
                  Keep this code to look up your status or notify the shop.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm mx-auto">
                <a
                  href={whatsAppShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Notify Shop on WhatsApp</span>
                </a>

                <a
                  href={`/status/${createdAppointment.booking_reference}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Track Status Live</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2 text-xs text-gray-400 hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
import { NewModelData } from "@/lib/data";
import { formatCurrency, formatDate, generateWhatsAppLink } from "@/lib/utils";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

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
  const { language, theme, t } = useLanguageTheme();
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
  const [messageLang, setMessageLang] = useState<"en" | "kn">(language);

  useEffect(() => {
    setMessageLang(language);
  }, [language]);

  // Initialize services and dates
  useEffect(() => {
    if (isOpen) {
      const activeServices = NewModelData.getServices().filter((s) => s.is_active);
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
      const computedSlots = NewModelData.getAvailableSlots(
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
    if (!selectedService || !selectedSlot || !selectedDate) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ."
          : "Please provide your name and phone number."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const localizedServiceName =
        language === "kn" && selectedService.name_kn
          ? selectedService.name_kn
          : selectedService.name;

      const newAppointment = NewModelData.createAppointmentRequest({
        service: {
          ...selectedService,
          name: localizedServiceName,
        },
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_notes: customerNotes,
        start_time: selectedSlot.startISO,
        end_time: selectedSlot.endISO,
      });

      setCreatedAppointment(newAppointment);
      if (onBookingCreated) {
        onBookingCreated(newAppointment);
      }
      setStep(4);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#c5a880", "#ffffff", "#b38f5c"],
      });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : language === "kn"
          ? "ವಿನಂತಿ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ."
          : "Failed to record request. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSlot(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerNotes("");
    setCreatedAppointment(null);
    onClose();
  };

  // Construct exact user-specified WhatsApp pre-filled message
  const shopSettings = NewModelData.getSettings();
  const dateFormatted = createdAppointment ? formatDate(createdAppointment.start_time) : "";
  const timeFormatted = selectedSlot?.startTime || "";

  const whatsAppText =
    messageLang === "kn"
      ? `ನಮಸ್ಕಾರ ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್, ನಾನು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ.\n` +
        `ಹೆಸರು: ${createdAppointment?.customer_name || customerName} | ` +
        `ಸೇವೆ: ${createdAppointment?.service_name_snapshot || selectedService?.name || ""} | ` +
        `ದಿನಾಂಕ: ${dateFormatted} | ` +
        `ಸಮಯ: ${timeFormatted}\n` +
        `ದಯವಿಟ್ಟು ಖಚಿತಪಡಿಸಿ. ಧನ್ಯವಾದಗಳು.`
      : `Hello New Model Gents Parlor, I would like to book an appointment.\n` +
        `Name: ${createdAppointment?.customer_name || customerName} | ` +
        `Service: ${createdAppointment?.service_name_snapshot || selectedService?.name || ""} | ` +
        `Date: ${dateFormatted} | ` +
        `Time: ${timeFormatted}\n` +
        `Please confirm. Thank you.`;

  const whatsAppShareUrl = createdAppointment
    ? generateWhatsAppLink(shopSettings.whatsapp_number || "917338076977", whatsAppText)
    : "#";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors ${
          theme === "light"
            ? "bg-white border-black/10"
            : "bg-[#121215] border-white/[0.09]"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between transition-colors ${
            theme === "light"
              ? "bg-[#f4efe6] border-black/[0.08]"
              : "bg-[#16161b] border-white/[0.07]"
          }`}
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c5a880]">
              {t.bookingModal.step} {step} {t.bookingModal.of} 4
            </span>
            <h3
              className={`font-serif text-xl sm:text-2xl font-medium ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {step === 1 && t.bookingModal.step1Title}
              {step === 2 && t.bookingModal.step2Title}
              {step === 3 && t.bookingModal.step3Title}
              {step === 4 && t.bookingModal.step4Title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === "light"
                ? "text-gray-500 hover:text-black hover:bg-black/[0.05]"
                : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-3">
              <p
                className={`text-xs mb-4 ${
                  theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                }`}
              >
                {t.bookingModal.step1Desc}
              </p>
              <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {services.map((service) => {
                  const sName =
                    language === "kn" && service.name_kn ? service.name_kn : service.name;
                  const sPrice =
                    language === "kn" && service.price_display_kn
                      ? service.price_display_kn
                      : service.price_display || `₹${service.price}`;
                  const sBadge =
                    language === "kn" && service.badge_kn ? service.badge_kn : service.badge;

                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between group ${
                        theme === "light"
                          ? "bg-white border-black/[0.08] hover:border-[#c5a880] hover:bg-[#fbfaf8] shadow-xs"
                          : "bg-[#18181d] border-white/[0.06] hover:border-[#c5a880]/50 hover:bg-[#1d1d24]"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium transition-colors ${
                              theme === "light"
                                ? "text-[#18181b] group-hover:text-[#9e7946]"
                                : "text-white group-hover:text-[#c5a880]"
                            }`}
                          >
                            {sName}
                          </span>
                          {sBadge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#c5a880]/15 text-[#c5a880]">
                              {sBadge}
                            </span>
                          )}
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${
                            theme === "light" ? "text-[#71717a]" : "text-[#94a3b8]"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                          <span>{service.duration_minutes} {t.services.minutes}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-serif text-lg font-bold ${
                            theme === "light" ? "text-[#18181b]" : "text-white"
                          }`}
                        >
                          {sPrice}
                        </div>
                        <span className="text-[11px] text-[#c5a880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {t.services.selectBtn} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Available Slot */}
          {step === 2 && selectedService && (
            <div className="space-y-6">
              {/* Selected Service Bar */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  theme === "light"
                    ? "bg-[#f4efe6] border-black/[0.08]"
                    : "bg-[#18181d] border-white/[0.06]"
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      theme === "light" ? "text-[#71717a]" : "text-[#94a3b8]"
                    }`}
                  >
                    {language === "kn" ? "ಆಯ್ದ ಸೇವೆ" : "Selected Service"}
                  </span>
                  <div
                    className={`text-sm font-semibold ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {language === "kn" && selectedService.name_kn
                      ? selectedService.name_kn
                      : selectedService.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-serif font-bold text-[#c5a880]">
                    {selectedService.price_display || `₹${selectedService.price}`}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[11px] text-[#c5a880] hover:underline mt-0.5"
                  >
                    {language === "kn" ? "ಬದಲಾಯಿಸಿ" : "Change"}
                  </button>
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <label
                  className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  {t.bookingModal.dateLabel}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDays.map((d, i) => {
                    const isSelected =
                      selectedDate?.toDateString() === d.toDateString();
                    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
                    const dateNum = d.getDate();

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "bg-[#c5a880] border-[#c5a880] text-[#09090b] font-bold shadow-md"
                            : theme === "light"
                            ? "bg-white border-black/10 text-[#27272a] hover:border-[#c5a880] shadow-xs"
                            : "bg-[#18181d] border-white/[0.06] text-gray-300 hover:border-[#c5a880]/40"
                        }`}
                      >
                        <span className="block text-[11px] uppercase">{dayName}</span>
                        <span className="block text-lg font-serif mt-0.5">{dateNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Selector */}
              <div>
                <label
                  className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  {t.bookingModal.timeLabel}
                </label>
                {slots.length === 0 ? (
                  <div
                    className={`p-6 text-center text-xs rounded-xl border ${
                      theme === "light"
                        ? "bg-[#fbfaf8] border-black/10 text-gray-500"
                        : "bg-[#18181d] border-white/[0.06] text-gray-400"
                    }`}
                  >
                    {t.bookingModal.noSlots}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-52 overflow-y-auto pr-1">
                    {slots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.isAvailable}
                        onClick={() => handleSlotSelect(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          !slot.isAvailable
                            ? "opacity-35 border-transparent text-gray-400 cursor-not-allowed line-through"
                            : selectedSlot?.startISO === slot.startISO
                            ? "bg-[#c5a880] border-[#c5a880] text-[#09090b] font-bold shadow-md"
                            : theme === "light"
                            ? "bg-white border-black/10 text-[#18181b] hover:border-[#c5a880] shadow-xs"
                            : "bg-[#18181d] border-white/[0.06] text-white hover:border-[#c5a880]/50"
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-4 py-2 rounded-lg border text-xs font-medium ${
                    theme === "light"
                      ? "border-black/15 text-[#52525b] hover:text-[#18181b]"
                      : "border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {t.bookingModal.backBtn}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Details Form */}
          {step === 3 && selectedService && selectedSlot && (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              {/* Summary Card */}
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  theme === "light"
                    ? "bg-[#f4efe6] border-black/[0.08]"
                    : "bg-[#18181d] border-white/[0.06]"
                }`}
              >
                <div
                  className={`flex justify-between text-xs ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  <span>{language === "kn" ? "ಆಯ್ದ ಸೇವೆ:" : "Requested Service:"}</span>
                  <span
                    className={`font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {language === "kn" && selectedService.name_kn
                      ? selectedService.name_kn
                      : selectedService.name}
                  </span>
                </div>
                <div
                  className={`flex justify-between text-xs ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  <span>{language === "kn" ? "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ:" : "Date & Time:"}</span>
                  <span
                    className={`font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {selectedDate ? formatDate(selectedDate) : ""} at {selectedSlot.startTime}
                  </span>
                </div>
                <div
                  className={`flex justify-between text-xs ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  <span>{language === "kn" ? "ದರ (ಅಂಗಡಿಯಲ್ಲಿ ಪಾವತಿಸಿ):" : "Price (Pay at shop):"}</span>
                  <span className="text-[#c5a880] font-bold">
                    {selectedService.price_display || `₹${selectedService.price}`}
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
                <label
                  className={`block text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                    theme === "light" ? "text-[#27272a]" : "text-gray-300"
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{t.bookingModal.nameLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.bookingModal.namePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c5a880] transition-colors ${
                    theme === "light"
                      ? "bg-white border-black/15 text-[#18181b] placeholder-gray-400"
                      : "bg-[#18181d] border-white/[0.1] text-white placeholder-gray-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                    theme === "light" ? "text-[#27272a]" : "text-gray-300"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{t.bookingModal.phoneLabel} *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t.bookingModal.phonePlaceholder}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[#c5a880] transition-colors ${
                    theme === "light"
                      ? "bg-white border-black/15 text-[#18181b] placeholder-gray-400"
                      : "bg-[#18181d] border-white/[0.1] text-white placeholder-gray-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                    theme === "light" ? "text-[#27272a]" : "text-gray-300"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{t.bookingModal.notesLabel}</span>
                </label>
                <textarea
                  rows={2}
                  placeholder={t.bookingModal.notesPlaceholder}
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:border-[#c5a880] transition-colors ${
                    theme === "light"
                      ? "bg-white border-black/15 text-[#18181b] placeholder-gray-400"
                      : "bg-[#18181d] border-white/[0.1] text-white placeholder-gray-500"
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-4 py-2.5 rounded-lg border text-xs font-medium ${
                    theme === "light"
                      ? "border-black/15 text-[#52525b] hover:text-[#18181b]"
                      : "border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {t.bookingModal.backBtn}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? t.bookingModal.submitting : t.bookingModal.submitRequestBtn}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & WhatsApp Send View */}
          {step === 4 && createdAppointment && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 mb-2">
                  {t.bookingModal.statusPending}
                </span>
                <h3
                  className={`font-serif text-2xl sm:text-3xl font-medium ${
                    theme === "light" ? "text-[#18181b]" : "text-white"
                  }`}
                >
                  {t.bookingModal.step4Title}
                </h3>
                <p
                  className={`text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  {t.bookingModal.whatsappShareDesc}
                </p>
              </div>

              {/* Message Language Switcher */}
              <div
                className={`inline-flex items-center gap-2 p-1 rounded-lg border text-xs ${
                  theme === "light"
                    ? "bg-[#f4efe6] border-black/10"
                    : "bg-[#18181d] border-white/10"
                }`}
              >
                <span
                  className={`text-[11px] px-1 ${
                    theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
                >
                  Message Language:
                </span>
                <button
                  type="button"
                  onClick={() => setMessageLang("en")}
                  className={`px-2.5 py-1 rounded ${
                    messageLang === "en"
                      ? "bg-[#c5a880] text-black font-bold"
                      : theme === "light"
                      ? "text-[#52525b]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setMessageLang("kn")}
                  className={`px-2.5 py-1 rounded ${
                    messageLang === "kn"
                      ? "bg-[#c5a880] text-black font-bold"
                      : theme === "light"
                      ? "text-[#52525b]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
              </div>

              {/* WhatsApp Message Preview Box */}
              <div
                className={`p-4 rounded-xl border max-w-md mx-auto text-left ${
                  theme === "light"
                    ? "bg-white border-[#25D366]/40 shadow-xs"
                    : "bg-[#16161b] border-[#25D366]/30"
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#25D366] block mb-2">
                  WhatsApp Message Preview
                </span>
                <p
                  className={`font-mono text-xs whitespace-pre-line leading-relaxed p-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-[#fbfaf8] text-[#27272a] border-black/[0.06]"
                      : "bg-[#09090b] text-gray-300 border-white/[0.04]"
                  }`}
                >
                  {whatsAppText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm mx-auto">
                <a
                  href={whatsAppShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.bookingModal.sendWhatsappBtn}</span>
                </a>

                <a
                  href={`/status/${createdAppointment.booking_reference}`}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                    theme === "light"
                      ? "border-black/15 bg-black/[0.03] text-[#18181b] hover:bg-black/[0.06]"
                      : "border-white/10 hover:border-white/20 bg-white/[0.04] text-white"
                  }`}
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{t.bookingModal.trackStatusBtn} ({createdAppointment.booking_reference})</span>
                </a>

                <button
                  onClick={handleClose}
                  className={`w-full py-2 text-xs transition-colors ${
                    theme === "light"
                      ? "text-gray-500 hover:text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t.bookingModal.closeBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

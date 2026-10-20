"use client";

import React from "react";
import { CheckCircle2, Calendar, User, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface HowBookingWorksProps {
  onOpenBooking: () => void;
}

export function HowBookingWorksSection({ onOpenBooking }: HowBookingWorksProps) {
  const { language, t } = useLanguageTheme();

  const stepIcons = [
    <CheckCircle2 key="1" className="w-5 h-5 text-[#c5a880]" />,
    <Calendar key="2" className="w-5 h-5 text-[#c5a880]" />,
    <User key="3" className="w-5 h-5 text-[#c5a880]" />,
    <MessageCircle key="4" className="w-5 h-5 text-[#25D366]" />,
    <ShieldCheck key="5" className="w-5 h-5 text-[#c5a880]" />,
  ];

  return (
    <section className="py-20 bg-[#0d0d10] border-t border-white/[0.06] relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-2">
            {t.howItWorks.badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white mb-3">
            {t.howItWorks.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#94a3b8]">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {t.howItWorks.steps.map((step, idx) => (
            <div
              key={step.num}
              className="luxury-card p-6 flex flex-col justify-between border border-white/[0.06] hover:border-[#c5a880]/40 transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a20] border border-white/10 flex items-center justify-center group-hover:border-[#c5a880]/40 transition-colors">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-serif text-2xl font-bold text-white/20 group-hover:text-[#c5a880]/40 transition-colors">
                    0{step.num}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg text-white font-medium mb-1.5 group-hover:text-[#c5a880] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-white/20">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp Preview Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121215] border border-white/[0.08] max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06] mb-4">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#25D366]">
              {language === "kn" ? "ಸ್ವಯಂಚಾಲಿತ ವಾಟ್ಸಾಪ್ ಸಂದೇಶದ ಮುನ್ನೋಟ" : "Pre-filled WhatsApp Message Preview"}
            </h4>
          </div>
          <div className="p-4 rounded-xl bg-[#09090b] border border-white/[0.05] font-mono text-xs text-[#94a3b8] leading-relaxed select-none">
            {language === "kn" ? (
              <>
                ನಮಸ್ಕಾರ ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್, ನಾನು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ.
                <br />
                <span className="text-[#c5a880]">ಹೆಸರು:</span> [ಹೆಸರು] | <span className="text-[#c5a880]">ಸೇವೆ:</span> [ಸೇವೆ] | <span className="text-[#c5a880]">ದಿನಾಂಕ:</span> [ದಿನಾಂಕ] | <span className="text-[#c5a880]">ಸಮಯ:</span> [ಸಮಯ]
                <br />
                ದಯವಿಟ್ಟು ಖಚಿತಪಡಿಸಿ. ಧನ್ಯವಾದಗಳು.
              </>
            ) : (
              <>
                Hello New Model Gents Parlor, I would like to book an appointment.
                <br />
                <span className="text-[#c5a880]">Name:</span> [name] | <span className="text-[#c5a880]">Service:</span> [service] | <span className="text-[#c5a880]">Date:</span> [date] | <span className="text-[#c5a880]">Time:</span> [time]
                <br />
                Please confirm. Thank you.
              </>
            )}
          </div>
          <div className="mt-5 text-center">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>{t.nav.bookNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

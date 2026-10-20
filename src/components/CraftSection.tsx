"use client";

import React from "react";
import Image from "next/image";
import { Scissors, Flame, Sparkles } from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

export function CraftSection() {
  const { theme, language } = useLanguageTheme();

  return (
    <section
      id="craft"
      className={`py-24 relative scroll-mt-12 border-y transition-colors duration-300 ${
        theme === "light" ? "bg-[#fbfaf8] border-black/[0.08]" : "bg-[#0d0d10] border-white/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <Image
                  src="/brand/card-dark.jpg"
                  alt="New Model Gents Beauty Parlor Craft Card"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-serif text-[#c5a880] tracking-wider uppercase">
                    Signature Identity
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                <Image
                  src="/brand/tools-dark.jpg"
                  alt="Artisan Barbering Shears and Straight Razor"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-serif text-[#c5a880] tracking-wider uppercase">
                    Forged Steel & Leather
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Text */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              The Craft & Technique
            </p>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-medium leading-tight ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              More than a haircut. <br />
              <span className="italic font-normal gold-gradient-text">A discipline of craft.</span>
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              At{" "}
              <strong
                className={`font-medium ${
                  theme === "light" ? "text-[#18181b]" : "text-white"
                }`}
              >
                New Model Gents Beauty Parlor
              </strong>
              , we focus on individual style, hair whorls, and facial structure. Every cut is sculpted
              with razor-honed shears, heated herbal compress, and artisan finishing products.
            </p>

            <div className="space-y-4 pt-4">
              <div
                className={`flex gap-4 items-start p-3 rounded-xl border transition-all ${
                  theme === "light"
                    ? "bg-white border-black/[0.06] hover:border-[#c5a880] shadow-xs"
                    : "bg-[#141418] border-white/[0.04] hover:border-[#c5a880]/30"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                    theme === "light"
                      ? "bg-[#f4efe6] border-[#c5a880]/50 text-[#9e7946]"
                      : "bg-[#1a1a20] border-[#c5a880]/30 text-[#c5a880]"
                  }`}
                >
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    1. Structural Consultation
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    We analyze bone structure, hair growth directions, and lifestyle before water touches your hair.
                  </p>
                </div>
              </div>

              <div
                className={`flex gap-4 items-start p-3 rounded-xl border transition-all ${
                  theme === "light"
                    ? "bg-white border-black/[0.06] hover:border-[#c5a880] shadow-xs"
                    : "bg-[#141418] border-white/[0.04] hover:border-[#c5a880]/30"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                    theme === "light"
                      ? "bg-[#f4efe6] border-[#c5a880]/50 text-[#9e7946]"
                      : "bg-[#1a1a20] border-[#c5a880]/30 text-[#c5a880]"
                  }`}
                >
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    2. Steamed Botanical Towels
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    Infused with natural herbal tonics to relax facial muscles and prepare follicles for a smooth razor finish.
                  </p>
                </div>
              </div>

              <div
                className={`flex gap-4 items-start p-3 rounded-xl border transition-all ${
                  theme === "light"
                    ? "bg-white border-black/[0.06] hover:border-[#c5a880] shadow-xs"
                    : "bg-[#141418] border-white/[0.04] hover:border-[#c5a880]/30"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                    theme === "light"
                      ? "bg-[#f4efe6] border-[#c5a880]/50 text-[#9e7946]"
                      : "bg-[#1a1a20] border-[#c5a880]/30 text-[#c5a880]"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    3. Cold Compression & Styling
                  </h4>
                  <p
                    className={`text-xs mt-0.5 ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    Pore-toning cold compress followed by lightweight, residue-free matte pastes crafted for all-day sharpness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      className={`py-20 md:py-28 relative scroll-mt-12 border-y transition-colors duration-300 ${
        theme === "light" ? "bg-[#fbfaf8] border-black/[0.08]" : "bg-[#0d0d10] border-white/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 12-Column Balanced Grid: 7 cols for the 3 visual cards, 5 cols for craft text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Visual Showcase (7 Columns) */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3.5 lg:gap-4 relative items-center">
              {/* Card 1: Barber Portrait (Left Wing) */}
              <div className="space-y-3 sm:translate-y-3 transition-transform duration-500">
                <div
                  className={`relative h-80 sm:h-96 lg:h-[410px] rounded-2xl overflow-hidden border group shadow-2xl transition-all duration-500 ${
                    theme === "light"
                      ? "border-black/[0.08] bg-white hover:border-[#c5a880] hover:shadow-black/10"
                      : "border-white/10 bg-[#121215] hover:border-[#c5a880]/50"
                  }`}
                >
                  <Image
                    src="/brand/card-dark.png"
                    alt="New Model Gents Beauty Parlor"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                    <span className="text-xs font-serif text-[#c5a880] tracking-wider uppercase font-semibold">
                      Signature Identity
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Tools & Shears Emblem (Center Hero) */}
              <div className="space-y-3 sm:-translate-y-3 transition-transform duration-500">
                <div
                  className={`relative h-80 sm:h-96 lg:h-[410px] rounded-2xl overflow-hidden border group shadow-2xl transition-all duration-500 ${
                    theme === "light"
                      ? "border-black/[0.08] bg-white hover:border-[#c5a880] hover:shadow-black/10"
                      : "border-white/10 bg-[#121215] hover:border-[#c5a880]/50"
                  }`}
                >
                  <Image
                    src="/brand/tools-dark.jpg"
                    alt="Artisan Barbering Shears and Straight Razor"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                    <span className="text-xs font-serif text-[#c5a880] tracking-wider uppercase font-semibold">
                      Forged Steel & Leather
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Barber Portrait (Right Wing) */}
              <div className="space-y-3 sm:translate-y-3 transition-transform duration-500">
                <div
                  className={`relative h-80 sm:h-96 lg:h-[410px] rounded-2xl overflow-hidden border group shadow-2xl transition-all duration-500 ${
                    theme === "light"
                      ? "border-black/[0.08] bg-white hover:border-[#c5a880] hover:shadow-black/10"
                      : "border-white/10 bg-[#121215] hover:border-[#c5a880]/50"
                  }`}
                >
                  <Image
                    src="/brand/card2-dark.jpeg"
                    alt="Master Barber Styling"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                    <span className="text-xs font-serif text-[#c5a880] tracking-wider uppercase font-semibold">
                      Professional Styling
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Text (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              {language === "kn" ? "ಕಲೆ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ" : "The Craft & Technique"}
            </p>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-medium leading-tight ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {language === "kn" ? (
                <>
                  ಕೇವಲ ಕಟಿಂಗ್ ಅಲ್ಲ. <br />
                  <span className="italic font-normal gold-gradient-text">ಒಂದು ಪರಿಪೂರ್ಣ ಕಲೆ.</span>
                </>
              ) : (
                <>
                  More than a haircut. <br />
                  <span className="italic font-normal gold-gradient-text">A discipline of craft.</span>
                </>
              )}
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {language === "kn" ? (
                <>
                  <strong
                    className={`font-medium ${theme === "light" ? "text-[#18181b]" : "text-white"}`}
                  >
                    ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಬ್ಯೂಟಿ ಪಾರ್ಲರ್
                  </strong>
                  ನಲ್ಲಿ, ನಾವು ಪ್ರತಿಯೊಬ್ಬರ ಮುಖದ ಆಕಾರ ಮತ್ತು ಕೂದಲಿನ ಶೈಲಿಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸುತ್ತೇವೆ. ಪ್ರತಿಯೊಂದು
                  ಕಟಿಂಗ್ ಅನ್ನು ನುಣುಪಾದ ಕತ್ತರಿ, ಬಿಸಿ ಹರ್ಬಲ್ ಟವೆಲ್ ಮತ್ತು ಶ್ರೇಷ್ಠ ಉತ್ಪನ್ನಗಳಿಂದ
                  ಮಾಡಲಾಗುತ್ತದೆ.
                </>
              ) : (
                <>
                  At{" "}
                  <strong
                    className={`font-medium ${theme === "light" ? "text-[#18181b]" : "text-white"}`}
                  >
                    New Model Gents Beauty Parlor
                  </strong>
                  , we focus on individual style, hair whorls, and facial structure. Every cut is
                  sculpted with razor-honed shears, heated herbal compress, and artisan finishing
                  products.
                </>
              )}
            </p>

            <div className="space-y-4 pt-2">
              <div
                className={`flex gap-4 items-start p-3.5 rounded-xl border transition-all ${
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
                    className={`text-sm sm:text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {language === "kn" ? "1. ಮುಖದ ಆಕಾರಕ್ಕೆ ತಕ್ಕ ವಿಶ್ಲೇಷಣೆ" : "1. Structural Consultation"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 leading-relaxed ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    {language === "kn"
                      ? "ಕೂದಲಿಗೆ ನೀರು ಹಾಕುವ ಮುನ್ನ ನಿಮ್ಮ ಮುಖದ ಆಕಾರ, ಕೂದಲು ಬೆಳೆಯುವ ದಿಕ್ಕು ಮತ್ತು ಜೀವನಶೈಲಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತೇವೆ."
                      : "We analyze bone structure, hair growth directions, and lifestyle before water touches your hair."}
                  </p>
                </div>
              </div>

              <div
                className={`flex gap-4 items-start p-3.5 rounded-xl border transition-all ${
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
                    className={`text-sm sm:text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {language === "kn" ? "2. ಬಿಸಿ ಹರ್ಬಲ್ ಟವೆಲ್ ಆರೈಕೆ" : "2. Steamed Botanical Towels"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 leading-relaxed ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    {language === "kn"
                      ? "ಮುಖದ ಮಾಂಸಖಂಡಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ, ನುಣುಪಾದ ಶೇವ್‌ಗಾಗಿ ಚರ್ಮವನ್ನು ಸಿದ್ಧಪಡಿಸುವ ನೈಸರ್ಗಿಕ ಹರ್ಬಲ್ ಟವೆಲ್."
                      : "Infused with natural herbal tonics to relax facial muscles and prepare follicles for a smooth razor finish."}
                  </p>
                </div>
              </div>

              <div
                className={`flex gap-4 items-start p-3.5 rounded-xl border transition-all ${
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
                    className={`text-sm sm:text-base font-medium ${
                      theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                  >
                    {language === "kn" ? "3. ಕೋಲ್ಡ್ ಕಂಪ್ರೆಷನ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್" : "3. Cold Compression & Styling"}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 leading-relaxed ${
                      theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                  >
                    {language === "kn"
                      ? "ಚರ್ಮದ ರಂಧ್ರಗಳನ್ನು ಮುಚ್ಚುವ ತಂಪಾದ ಕಂಪ್ರೆಷನ್ ನಂತರ ದಿನವಿಡೀ ಬಾಳಿಕೆ ಬರುವ ಮ್ಯಾಟ್ ಸ್ಟೈಲಿಂಗ್."
                      : "Pore-toning cold compress followed by lightweight, residue-free matte pastes crafted for all-day sharpness."}
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

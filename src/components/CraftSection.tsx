"use client";

import React from "react";
import Image from "next/image";
import { Scissors, Flame, Sparkles } from "lucide-react";

export function CraftSection() {
  return (
    <section id="ritual" className="py-24 bg-[#0d0d10] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase (Images from uploaded identity) */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group">
                <Image
                  src="/brand/card-dark.jpg"
                  alt="RITUALCUT Bespoke Brand Craft Card"
                  fill
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
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group">
                <Image
                  src="/brand/tools-dark.jpg"
                  alt="Artisan Barbering Shears and Straight Razor"
                  fill
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
              The Philosophy
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight">
              More than a haircut. <br />
              <span className="italic font-normal text-[#c5a880]">A discipline of craft.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              At RITUALCUT, we rejected the conveyor-belt salon model. A true haircut takes patience,
              structural understanding of growth patterns, and mastery of scissor tension.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1f] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">1. Structural Consultation</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    We analyze bone structure, hair whorls, and styling habits before water touches your hair.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1f] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">2. Steamed Botanical Towels</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Infused with organic eucalyptus oils to open pores and soften follicles for a frictionless razor finish.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1f] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">3. Cold Compression & Styling</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Pore-sealing tonic followed by lightweight, residue-free matte pastes crafted for all-day hold.
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

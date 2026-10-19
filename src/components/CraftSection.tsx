"use client";

import React from "react";
import Image from "next/image";
import { Scissors, Flame, Sparkles } from "lucide-react";

export function CraftSection() {
  return (
    <section id="craft" className="py-24 bg-[#0d0d10] border-y border-white/[0.06] relative scroll-mt-12">
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
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight">
              More than a haircut. <br />
              <span className="italic font-normal gold-gradient-text">A discipline of craft.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              At <strong className="text-white font-medium">New Model Gents Beauty Parlor</strong>,
              we focus on individual style, hair whorls, and facial structure. Every cut is sculpted
              with razor-honed shears, heated herbal compress, and artisan finishing products.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start p-3 rounded-xl bg-[#141418] border border-white/[0.04] hover:border-[#c5a880]/30 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">1. Structural Consultation</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    We analyze bone structure, hair growth directions, and lifestyle before water touches your hair.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-[#141418] border border-white/[0.04] hover:border-[#c5a880]/30 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">2. Steamed Botanical Towels</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Infused with natural herbal tonics to relax facial muscles and prepare follicles for a smooth razor finish.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-[#141418] border border-white/[0.04] hover:border-[#c5a880]/30 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a20] border border-[#c5a880]/30 flex items-center justify-center shrink-0 text-[#c5a880]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-base font-medium">3. Cold Compression & Styling</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
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

import React from "react";
import Link from "next/link";
import { Scissors, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070708] border-t border-white/[0.06] pt-16 pb-12 text-[#94a3b8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141417] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white uppercase">
                RITUAL<span className="text-[#c5a880]">CUT</span>
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] max-w-sm leading-relaxed">
              An independently operated barbershop sanctuary committed to precision scissor work,
              tailored tapers, and authentic hot lather wet shaves.
            </p>
            <p className="text-[11px] text-[#c5a880] italic">
              “Your Style. Your Time. Your Ritual.”
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  Hours & Location
                </a>
              </li>
              <li>
                <Link href="/status" className="hover:text-[#c5a880] transition-colors">
                  Check Booking Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Owner & Privacy */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Shop Management
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 hover:text-[#c5a880] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Owner Dashboard</span>
                </Link>
              </li>
              <li className="text-gray-500">
                Single-chair booking concurrency enforced with PostgreSQL GiST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © 2026 RITUALCUT Barbershop. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Crafted with precision & care
          </div>
        </div>
      </div>
    </footer>
  );
}

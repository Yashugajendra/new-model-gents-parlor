"use client";

import React from "react";
import Link from "next/link";
import { Scissors } from "lucide-react";
import { ShopSettings } from "@/types/database.types";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface FooterProps {
  settings?: ShopSettings;
}

export function Footer({ settings }: FooterProps) {
  const { language, theme, t } = useLanguageTheme();

  const shopName =
    language === "kn"
      ? "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್"
      : settings?.shop_name || "New Model Gents Parlor";

  const ownerText =
    language === "kn" ? "ಮಾಲೀಕರು: ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)" : "Owner: Hanumanthu (Chinanna)";

  return (
    <footer
      className={`border-t pt-16 pb-12 text-xs transition-colors duration-300 ${
        theme === "light"
          ? "bg-[#f4efe6] border-black/[0.08] text-[#52525b]"
          : "bg-[#070708] border-white/[0.06] text-[#94a3b8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b ${
            theme === "light" ? "border-black/[0.08]" : "border-white/[0.06]"
          }`}
        >
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                  theme === "light"
                    ? "bg-[#e8e0d2] border-[#c5a880]/50 text-[#9e7946]"
                    : "bg-[#141417] border-[#c5a880]/30 text-[#c5a880]"
                }`}
              >
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span
                className={`font-serif text-xl font-bold tracking-wider uppercase ${
                  theme === "light" ? "text-[#18181b]" : "text-white"
                }`}
                suppressHydrationWarning
              >
                {shopName}
              </span>
            </div>
            <p
              className={`text-xs max-w-sm leading-relaxed ${
                theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
              }`}
            >
              {language === "kn"
                ? "ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ತೀರ್ಥಹಳ್ಳಿಯಲ್ಲಿ 2000ನೇ ಇಸವಿಯಿಂದ ಸ್ವಚ್ಛತೆ, ಶಿಸ್ತು ಮತ್ತು ಕೈಗೆಟುಕುವ ದರದ ಸೇವೆ ನೀಡುತ್ತಿರುವ ಪ್ರಮುಖ ಪುರುಷರ ಗ್ರೂಮಿಂಗ್ ಸಲೂನ್."
                : "A trusted gents grooming salon in Thirthahalli since 2000. Focused on clean tools, disciplined scissor craft, and personal attention."}
            </p>
            <div
              className={`flex items-center gap-2 text-xs font-medium ${
                theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
              }`}
            >
              <span>{ownerText}</span>
              <span className={theme === "light" ? "text-black/20" : "text-white/20"}>•</span>
              <span>Since 2000</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4
              className={`font-semibold uppercase tracking-wider text-[11px] ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className={`transition-colors ${
                    theme === "light" ? "hover:text-[#18181b]" : "hover:text-white"
                  }`}
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`transition-colors ${
                    theme === "light" ? "hover:text-[#18181b]" : "hover:text-white"
                  }`}
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`transition-colors ${
                    theme === "light" ? "hover:text-[#18181b]" : "hover:text-white"
                  }`}
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={`transition-colors ${
                    theme === "light" ? "hover:text-[#18181b]" : "hover:text-white"
                  }`}
                >
                  {t.nav.hairstyles}
                </a>
              </li>
              <li>
                <a
                  href="#hours"
                  className={`transition-colors ${
                    theme === "light" ? "hover:text-[#18181b]" : "hover:text-white"
                  }`}
                >
                  {t.nav.hours}
                </a>
              </li>
              <li>
                <Link
                  href="/status"
                  className={`transition-colors ${
                    theme === "light"
                      ? "text-[#9e7946] hover:text-[#18181b]"
                      : "hover:text-[#c5a880]"
                  }`}
                >
                  {t.nav.status}
                </Link>
              </li>
            </ul>
          </div>

          {/* Owner & Management */}
          <div className="space-y-3">
            <h4
              className={`font-semibold uppercase tracking-wider text-[11px] ${
                theme === "light" ? "text-[#18181b]" : "text-white"
              }`}
            >
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2">
              <li className={theme === "light" ? "text-[#52525b]" : "text-gray-400"}>
                Katte Complex, Thirthahalli
              </li>
              <li className={theme === "light" ? "text-[#52525b]" : "text-gray-400"}>
                Phone: +91 73380 76977
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with exact user-requested copyright */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
            theme === "light" ? "text-[#71717a]" : "text-gray-400"
          }`}
        >
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-2">
            <span>{ownerText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

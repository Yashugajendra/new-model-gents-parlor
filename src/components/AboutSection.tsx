"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Scissors,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Maximize2,
  X,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";
import { useLanguageTheme } from "@/context/LanguageThemeContext";

interface AboutSectionProps {
  onOpenBooking: () => void;
  shopName?: string;
  address?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  title_kn: string;
  categories: string[]; // e.g. ["classic", "fade"]
  categoryLabel: string;
  categoryLabel_kn: string;
  description: string;
  description_kn: string;
  imageSrc: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-01",
    title: "Executive Side-Part & Low Taper Fade",
    title_kn: "à²¸à³ˆà²¡à³-à²ªà²¾à²°à³à²Ÿà³ à²®à²¤à³à²¤à³ à²²à³‹ à²Ÿà³‡à²ªà²°à³ à²«à³‡à²¡à³",
    categories: ["classic", "fade"],
    categoryLabel: "Classic / Fade",
    categoryLabel_kn: "à²•à³à²²à²¾à²¸à²¿à²•à³ / à²«à³‡à²¡à³",
    description: "Sleek combed contour with a clean side parting and seamless low skin taper fade.",
    description_kn: "à²¨à³€à²Ÿà²¾à²¦ à²¬à²¾à²šà²¿à²¦ à²¹à³‡à²°à³à²¸à³à²Ÿà³ˆà²²à³ à²®à²¤à³à²¤à³ à²…à²šà³à²šà³à²•à²Ÿà³à²Ÿà²¾à²¦ à²²à³‹ à²¸à³à²•à²¿à²¨à³ à²Ÿà³‡à²ªà²°à³ à²«à³‡à²¡à³.",
    imageSrc: "/images/gallery/hairstyle-slick-sidepart-fade.png",
  },
  {
    id: "gallery-02",
    title: "Artisan Shear Styling & Beard Sculpt",
    title_kn: "à²•à²¤à³à²¤à²°à²¿ à²¸à³à²Ÿà³ˆà²²à²¿à²‚à²—à³ à²®à²¤à³à²¤à³ à²—à²¡à³à²¡à²¦ à²†à²•à²¾à²°",
    categories: ["beard", "trendy"],
    categoryLabel: "Beard Styles",
    categoryLabel_kn: "à²—à²¡à³à²¡à²¦ à²¸à³à²Ÿà³ˆà²²à³",
    description: "Freehand Japanese shear craftsmanship shaping crown volume paired with full textured beard shaping.",
    description_kn: "à²•à²¤à³à²¤à²°à²¿à²¯à²¿à²‚à²¦ à²¨à²¿à²–à²° à²•à²Ÿà²¿à²‚à²—à³ à²®à²¤à³à²¤à³ à²ªà³‚à²°à³à²£ à²—à²¡à³à²¡à²¦ à²…à²‚à²¦à²µà²¾à²¦ à²Ÿà³à²°à²¿à²®à³à²®à²¿à²‚à²—à³.",
    imageSrc: "/images/gallery/hairstyle-shear-beard-styling.jpg",
  },
  {
    id: "gallery-03",
    title: "Master Artisan Barber Tool Station",
    title_kn: "à²¬à²¾à²°à³à²¬à²°à³ à²•à²¾à²°à³à²¯à²•à³à²·à³‡à²¤à³à²°à²¦ à²‰à²ªà²•à²°à²£à²—à²³à³",
    categories: ["tools"],
    categoryLabel: "Chairs & Tools",
    categoryLabel_kn: "à²•à³à²°à³à²šà²¿ & à²‰à²ªà²•à²°à²£à²—à²³à³",
    description: "Wahl Senior cordless clippers, Andis foil shavers, Japanese steel texturizing shears, and sanitized combs.",
    description_kn: "à²µà²¾à²²à³ à²¸à³€à²¨à²¿à²¯à²°à³ à²•à²¾à²°à³à²¡à³à²²à³†à²¸à³ à²•à³à²²à²¿à²ªà³à²ªà²°à³à²—à²³à³, à²¶à³‡à²µà²°à³à²—à²³à³, à²œà²ªà²¾à²¨à³€à²¸à³ à²•à²¤à³à²¤à²°à²¿à²—à²³à³ à²®à²¤à³à²¤à³ à²¶à³à²¦à³à²§à³€à²•à²°à²¿à²¸à²¿à²¦ à²¬à²¾à²šà²£à²¿à²—à³†à²—à²³à³.",
    imageSrc: "/images/gallery/barber-workstation-tools.jpg",
  },
  {
    id: "gallery-04",
    title: "Hydraulic Reclining Leather Barber Chair",
    title_kn: "à²¹à³ˆà²¡à³à²°à²¾à²²à²¿à²•à³ à²²à³†à²¦à²°à³ à²¬à²¾à²°à³à²¬à²°à³ à²•à³à²°à³à²šà²¿",
    categories: ["tools"],
    categoryLabel: "Chairs & Tools",
    categoryLabel_kn: "à²•à³à²°à³à²šà²¿ & à²‰à²ªà²•à²°à²£à²—à²³à³",
    description: "Heavy-duty ergonomic vintage leather barber chairs with illuminated vanity stations.",
    description_kn: "à²†à²°à²¾à²®à²¦à²¾à²¯à²• à²¹à²¾à²—à³‚ à²¸à³à²¸à²œà³à²œà²¿à²¤ à²¹à³ˆà²¡à³à²°à²¾à²²à²¿à²•à³ à²²à³†à²¦à²°à³ à²•à³à²°à³à²šà²¿à²—à²³à³.",
    imageSrc: "/images/gallery/luxury-barber-chair-station.jpg",
  },
  {
    id: "gallery-05",
    title: "Royal Straight Razor Hot Lather Shave",
    title_kn: "à²°à²¾à²¯à²²à³ à²¹à²¾à²Ÿà³ à²Ÿà²µà³†à²²à³ à²¨à³à²£à³à²ªà²¾à²¦ à²¶à³‡à²µà²¿à²‚à²—à³",
    categories: ["beard", "classic"],
    categoryLabel: "Beard Styles / Classic",
    categoryLabel_kn: "à²—à²¡à³à²¡à²¦ à²¸à³à²Ÿà³ˆà²²à³ / à²•à³à²²à²¾à²¸à²¿à²•à³",
    description: "Traditional steamed eucalyptus towel, pre-shave botanical oils, and razor precision.",
    description_kn: "à²¸à²¾à²‚à²ªà³à²°à²¦à²¾à²¯à²¿à²• à²¬à²¿à²¸à²¿ à²Ÿà²µà³†à²²à³ à²®à²¤à³à²¤à³ à²¬à³Šà²Ÿà²¾à²¨à²¿à²•à²²à³ à²†à²¯à²¿à²²à³ à²œà³Šà²¤à³† à²¨à³à²£à³à²ªà²¾à²¦ à²¶à³‡à²µà³.",
    imageSrc: "/images/gallery/royal-straight-razor-shave.jpg",
  },
  {
    id: "gallery-06",
    title: "Master Barber Scissor Artistry",
    title_kn: "à²®à²¾à²¸à³à²Ÿà²°à³ à²•à²¤à³à²¤à²°à²¿ à²•à²Ÿà²¿à²‚à²—à³ à²®à²¤à³à²¤à³ à²¶à²¿à²¸à³à²¤à³",
    categories: ["trendy", "classic"],
    categoryLabel: "Trendy / Classic",
    categoryLabel_kn: "à²Ÿà³à²°à³†à²‚à²¡à²¿ / à²•à³à²²à²¾à²¸à²¿à²•à³",
    description: "Tailored grooming discipline in an exclusive, private appointment atmosphere.",
    description_kn: "à²µà³ˆà²¯à²•à³à²¤à²¿à²• à²•à²¾à²³à²œà²¿ à²®à²¤à³à²¤à³ à²¶à²¿à²¸à³à²¤à²¿à²¨à³Šà²‚à²¦à²¿à²—à³† à²®à²¾à²¡à³à²µ à²•à³‡à²¶ à²µà²¿à²¨à³à²¯à²¾à²¸.",
    imageSrc: "/images/gallery/master-barber-craftsman.jpg",
  },
  {
    id: "gallery-07",
    title: "Modern Textured Crew & Temple Taper",
    title_kn: "à²®à²¾à²¡à²°à³à²¨à³ à²Ÿà³†à²•à³à²¸à³à²šà²°à³à²¡à³ à²•à³à²°à³‚ à²•à²Ÿà³",
    categories: ["crew", "trendy", "fade"],
    categoryLabel: "Crew Cut / Trendy",
    categoryLabel_kn: "à²•à³à²°à³‚ à²•à²Ÿà³ / à²Ÿà³à²°à³†à²‚à²¡à²¿",
    description: "Layered crown texture with precision temple taper and natural wave flow.",
    description_kn: "à²®à³‡à²²à³à²­à²¾à²—à²¦à²²à³à²²à²¿ à²Ÿà³†à²•à³à²¸à³à²šà²°à³ à²•à²Ÿà³ à²®à²¤à³à²¤à³ à²¬à²¦à²¿à²—à²³à²²à³à²²à²¿ à²¨à³ˆà²¸à²°à³à²—à²¿à²• à²Ÿà³‡à²ªà²°à³.",
    imageSrc: "/images/gallery/hairstyle-textured-taper.jpg",
  },
  {
    id: "gallery-08",
    title: "Executive Low Skin Fade & Sculpted Beard",
    title_kn: "à²Žà²•à³à²¸à²¿à²•à³à²¯à³‚à²Ÿà²¿à²µà³ à²¸à³à²•à²¿à²¨à³ à²«à³‡à²¡à³ à²®à²¤à³à²¤à³ à²—à²¡à³à²¡",
    categories: ["fade", "beard"],
    categoryLabel: "Fade / Beard Styles",
    categoryLabel_kn: "à²«à³‡à²¡à³ / à²—à²¡à³à²¡à²¦ à²¸à³à²Ÿà³ˆà²²à³",
    description: "Seamless skin taper transition paired with razor-sharp cheekline beard definition.",
    description_kn: "à²¸à³à²ªà²·à³à²Ÿ à²¸à³à²•à²¿à²¨à³ à²«à³‡à²¡à³ à²®à²¤à³à²¤à³ à²—à²¡à³à²¡à²¦ à²šà³‚à²ªà²¾à²¦ à²²à³ˆà²¨à³-à²…à²ªà³.",
    imageSrc: "/images/gallery/hairstyle-classic-fade.jpg",
  },
];

export function AboutSection({
  onOpenBooking,
  shopName = "New Model Gents Parlor",
  address = "Katte Complex, Thirthahalli, Shivamogga",
}: AboutSectionProps) {
  const { language, theme, t } = useLanguageTheme();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  // Tabs as specified by user:
  // Classic Â· Fade Â· Crew Cut Â· Trendy Â· Beard Styles Â· Chairs & Tools Â· All
  const filterTabs = [
    { id: "all", label: t.gallery.tabs.all },
    { id: "classic", label: t.gallery.tabs.classic },
    { id: "fade", label: t.gallery.tabs.fade },
    { id: "crew", label: t.gallery.tabs.crew },
    { id: "trendy", label: t.gallery.tabs.trendy },
    { id: "beard", label: t.gallery.tabs.beard },
    { id: "tools", label: t.gallery.tabs.tools },
  ];

  const filteredItems =
    activeTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categories.includes(activeTab));

  return (
    <section
      id="about"
      className={`py-24 relative scroll-mt-12 overflow-hidden border-t transition-colors duration-300 ${theme === "light" ? "bg-[#fbfaf8] border-black/[0.08]" : "bg-[#0a0a0d] border-white/[0.06]"
        }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* About Us Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium ${theme === "light"
                  ? "border-[#c5a880]/50 bg-white text-[#9e7946] shadow-xs"
                  : "border-[#c5a880]/30 bg-[#141417] text-[#c5a880]"
                }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase font-semibold">{t.about.badge}</span>
            </div>

            <h2
              className={`font-serif text-3xl sm:text-5xl font-medium leading-[1.15] ${theme === "light" ? "text-[#18181b]" : "text-white"
                }`}
            >
              {t.about.heading}
            </h2>

            {/* Who we are / à²¨à²¾à²µà³ à²¯à²¾à²°à³ */}
            <div
              className={`p-5 rounded-2xl border space-y-2 transition-colors ${theme === "light"
                  ? "bg-white border-black/[0.08] shadow-xs"
                  : "bg-[#121215]/90 border-white/[0.06]"
                }`}
            >
              <h4
                className={`text-xs uppercase font-bold tracking-widest ${theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
                  }`}
              >
                {t.about.whoWeAreTitle}
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
              >
                {t.about.whoWeAreDesc}
              </p>
            </div>

            {/* What we do / à²¨à²¾à²µà³ à²à²¨à³ à²®à²¾à²¡à³à²¤à³à²¤à³‡à²µà³† */}
            <div
              className={`p-5 rounded-2xl border space-y-2 transition-colors ${theme === "light"
                  ? "bg-white border-black/[0.08] shadow-xs"
                  : "bg-[#121215]/90 border-white/[0.06]"
                }`}
            >
              <h4
                className={`text-xs uppercase font-bold tracking-widest ${theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
                  }`}
              >
                {t.about.whatWeDoTitle}
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
              >
                {t.about.whatWeDoDesc}
              </p>
            </div>

            {/* Why choose us / à²¨à²®à³à²®à²¨à³à²¨à³ à²à²•à³† à²†à²°à²¿à²¸à²¬à³‡à²•à³ */}
            <div className="space-y-3 pt-2">
              <h4
                className={`text-xs uppercase font-bold tracking-widest ${theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
                  }`}
              >
                {t.about.whyChooseTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.whyPoints.map((point, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border ${theme === "light"
                        ? "bg-white border-black/[0.06] shadow-xs text-[#27272a]"
                        : "bg-[#121215] border-white/[0.04] text-gray-300"
                      }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our promise / à²¨à²®à³à²® à²­à²°à²µà²¸à³† */}
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${theme === "light"
                  ? "border-[#c5a880]/50 bg-[#f4efe6] text-[#18181b]"
                  : "border-[#c5a880]/30 bg-[#c5a880]/5 text-white"
                }`}
            >
              <Award className="w-6 h-6 text-[#c5a880] shrink-0" />
              <div>
                <span
                  className={`text-xs uppercase font-bold tracking-wider block ${theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
                    }`}
                >
                  {t.about.promiseTitle}
                </span>
                <p
                  className={`text-sm font-medium italic mt-0.5 ${theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                >
                  &ldquo;{t.about.promiseDesc}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Master Barber Signature Card */}
          <div className="lg:col-span-5">
            <div
              className={`relative rounded-2xl overflow-hidden border p-7 space-y-6 transition-all ${theme === "light"
                  ? "bg-white border-black/[0.09] shadow-xl"
                  : "bg-[#121215] border-white/[0.09] shadow-2xl"
                }`}
            >
              <div
                className={`flex items-center gap-4 pb-5 border-b ${theme === "light" ? "border-black/[0.08]" : "border-white/[0.06]"
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 font-serif font-bold text-xl shadow-lg ${theme === "light"
                      ? "bg-[#f4efe6] border-[#c5a880]/50 text-[#9e7946]"
                      : "bg-gradient-to-br from-[#1a1a20] to-[#121215] border-[#c5a880]/40 text-[#c5a880]"
                    }`}
                >
                  NM
                </div>
                <div>
                  <h3
                    className={`font-serif text-lg font-semibold ${theme === "light" ? "text-[#18181b]" : "text-white"
                      }`}
                  >
                    {t.about.card.title}
                  </h3>
                  <p
                    className={`text-xs font-medium mt-0.5 ${theme === "light" ? "text-[#9e7946]" : "text-[#c5a880]"
                      }`}
                  >
                    {t.about.card.ownerBadge}
                  </p>
                  <p
                    className={`text-[11px] mt-0.5 ${theme === "light" ? "text-[#71717a]" : "text-[#94a3b8]"
                      }`}
                  >
                    {t.about.card.subtitle} â€¢ Since 2010
                  </p>
                </div>
              </div>

              <div
                className={`space-y-3.5 text-xs ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
              >
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>{t.about.card.f1}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>{t.about.card.f2}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>{t.about.card.f3}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs tracking-wide hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 group shadow-md"
                >
                  <span>{t.about.card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hairstyle Gallery / à²¹à³‡à²°à³à²¸à³à²Ÿà³ˆà²²à³ à²—à³à²¯à²¾à²²à²°à²¿ */}
        <div id="gallery" className="pt-10 scroll-mt-12">
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b ${theme === "light" ? "border-black/[0.08]" : "border-white/[0.08]"
              }`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-2">
                {t.gallery.badge}
              </p>
              <h3
                className={`font-serif text-2xl sm:text-4xl font-medium ${theme === "light" ? "text-[#18181b]" : "text-white"
                  }`}
              >
                {t.gallery.title}
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 max-w-xl ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                  }`}
              >
                {t.gallery.subtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === tab.id
                      ? "bg-[#c5a880] text-[#09090b] font-semibold shadow-md"
                      : theme === "light"
                        ? "bg-white text-[#52525b] hover:text-[#18181b] border border-black/10 hover:border-[#c5a880] shadow-xs"
                        : "bg-[#141417] text-[#94a3b8] hover:text-white border border-white/[0.06] hover:border-[#c5a880]/30"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const itemTitle = language === "kn" ? item.title_kn : item.title;
                const itemCategoryLabel = language === "kn" ? item.categoryLabel_kn : item.categoryLabel;
                const itemDescription = language === "kn" ? item.description_kn : item.description;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    key={item.id}
                    className="group luxury-card overflow-hidden rounded-2xl flex flex-col justify-between border border-white/[0.08] hover:border-[#c5a880]/50 transition-all cursor-pointer"
                    onClick={() => setPreviewImage(item)}
                  >
                    {/* Photo Container */}
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/60">
                      <Image
                        src={item.imageSrc}
                        alt={itemTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Category Pill */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/70 backdrop-blur-md text-[#c5a880] border border-[#c5a880]/30">
                          {itemCategoryLabel}
                        </span>
                      </div>

                      {/* Expand Icon Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#c5a880]">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-4">
                        <h4 className="font-serif text-base sm:text-lg text-white group-hover:text-[#c5a880] transition-colors font-medium leading-snug">
                          {itemTitle}
                        </h4>
                        <p className="text-xs text-[#94a3b8] line-clamp-2 mt-1 leading-relaxed">
                          {itemDescription}
                        </p>
                      </div>
                    </div>

                    {/* Quick Card Footer */}
                    <div
                      className={`px-4 py-2.5 border-t flex items-center justify-between text-xs transition-colors ${theme === "light"
                          ? "bg-white border-black/[0.06]"
                          : "bg-[#141418] border-white/[0.05]"
                        }`}
                    >
                      <span
                        className={`text-[11px] flex items-center gap-1.5 truncate ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                          }`}
                      >
                        <Scissors className="w-3 h-3 text-[#c5a880]" />
                        {t.gallery.authenticLabel}
                      </span>
                      <span className="text-[#c5a880] text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                        {t.gallery.detailBtn} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className={`relative max-w-3xl w-full border rounded-2xl overflow-hidden shadow-2xl transition-colors ${theme === "light"
                ? "bg-white border-black/10"
                : "bg-[#121215] border-white/[0.1]"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/70 text-white hover:text-[#c5a880] border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High Res Image */}
            <div className="relative h-[400px] sm:h-[480px] w-full bg-black">
              <Image
                src={previewImage.imageSrc}
                alt={language === "kn" ? previewImage.title_kn : previewImage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-contain"
                priority
              />
            </div>

            {/* Details Bar */}
            <div
              className={`p-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${theme === "light"
                  ? "bg-[#fbfaf8] border-black/[0.08]"
                  : "bg-[#16161b] border-white/[0.08]"
                }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block mb-1">
                  {language === "kn" ? previewImage.categoryLabel_kn : previewImage.categoryLabel}
                </span>
                <h3
                  className={`font-serif text-xl sm:text-2xl font-medium ${theme === "light" ? "text-[#18181b]" : "text-white"
                    }`}
                >
                  {language === "kn" ? previewImage.title_kn : previewImage.title}
                </h3>
                <p
                  className={`text-xs mt-1 max-w-xl ${theme === "light" ? "text-[#52525b]" : "text-[#94a3b8]"
                    }`}
                >
                  {language === "kn" ? previewImage.description_kn : previewImage.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setPreviewImage(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs shrink-0 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>{t.gallery.bookThisStyle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
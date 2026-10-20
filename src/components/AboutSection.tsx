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
    title_kn: "ಸೈಡ್-ಪಾರ್ಟ್ ಮತ್ತು ಲೋ ಟೇಪರ್ ಫೇಡ್",
    categories: ["classic", "fade"],
    categoryLabel: "Classic / Fade",
    categoryLabel_kn: "ಕ್ಲಾಸಿಕ್ / ಫೇಡ್",
    description: "Sleek combed contour with a clean side parting and seamless low skin taper fade.",
    description_kn: "ನೀಟಾದ ಬಾಚಿದ ಹೇರ್ಸ್ಟೈಲ್ ಮತ್ತು ಅಚ್ಚುಕಟ್ಟಾದ ಲೋ ಸ್ಕಿನ್ ಟೇಪರ್ ಫೇಡ್.",
    imageSrc: "/images/gallery/hairstyle-slick-sidepart-fade.png",
  },
  {
    id: "gallery-02",
    title: "Artisan Shear Styling & Beard Sculpt",
    title_kn: "ಕತ್ತರಿ ಸ್ಟೈಲಿಂಗ್ ಮತ್ತು ಗಡ್ಡದ ಆಕಾರ",
    categories: ["beard", "trendy"],
    categoryLabel: "Beard Styles",
    categoryLabel_kn: "ಗಡ್ಡದ ಸ್ಟೈಲ್",
    description: "Freehand Japanese shear craftsmanship shaping crown volume paired with full textured beard shaping.",
    description_kn: "ಕತ್ತರಿಯಿಂದ ನಿಖರ ಕಟಿಂಗ್ ಮತ್ತು ಪೂರ್ಣ ಗಡ್ಡದ ಅಂದವಾದ ಟ್ರಿಮ್ಮಿಂಗ್.",
    imageSrc: "/images/gallery/hairstyle-shear-beard-styling.jpg",
  },
  {
    id: "gallery-03",
    title: "Master Artisan Barber Tool Station",
    title_kn: "ಬಾರ್ಬರ್ ಕಾರ್ಯಕ್ಷೇತ್ರದ ಉಪಕರಣಗಳು",
    categories: ["tools"],
    categoryLabel: "Chairs & Tools",
    categoryLabel_kn: "ಕುರ್ಚಿ & ಉಪಕರಣಗಳು",
    description: "Wahl Senior cordless clippers, Andis foil shavers, Japanese steel texturizing shears, and sanitized combs.",
    description_kn: "ವಾಲ್ ಸೀನಿಯರ್ ಕಾರ್ಡ್ಲೆಸ್ ಕ್ಲಿಪ್ಪರ್ಗಳು, ಶೇವರ್ಗಳು, ಜಪಾನೀಸ್ ಕತ್ತರಿಗಳು ಮತ್ತು ಶುದ್ಧೀಕರಿಸಿದ ಬಾಚಣಿಗೆಗಳು.",
    imageSrc: "/images/gallery/barber-workstation-tools.jpg",
  },
  {
    id: "gallery-04",
    title: "Hydraulic Reclining Leather Barber Chair",
    title_kn: "ಹೈಡ್ರಾಲಿಕ್ ಲೆದರ್ ಬಾರ್ಬರ್ ಕುರ್ಚಿ",
    categories: ["tools"],
    categoryLabel: "Chairs & Tools",
    categoryLabel_kn: "ಕುರ್ಚಿ & ಉಪಕರಣಗಳು",
    description: "Heavy-duty ergonomic vintage leather barber chairs with illuminated vanity stations.",
    description_kn: "ಆರಾಮದಾಯಕ ಹಾಗೂ ಸುಸಜ್ಜಿತ ಹೈಡ್ರಾಲಿಕ್ ಲೆದರ್ ಕುರ್ಚಿಗಳು.",
    imageSrc: "/images/gallery/luxury-barber-chair-station.jpg",
  },
  {
    id: "gallery-05",
    title: "Royal Straight Razor Hot Lather Shave",
    title_kn: "ರಾಯಲ್ ಹಾಟ್ ಟವೆಲ್ ನುಣುಪಾದ ಶೇವಿಂಗ್",
    categories: ["beard", "classic"],
    categoryLabel: "Beard Styles / Classic",
    categoryLabel_kn: "ಗಡ್ಡದ ಸ್ಟೈಲ್ / ಕ್ಲಾಸಿಕ್",
    description: "Traditional steamed eucalyptus towel, pre-shave botanical oils, and razor precision.",
    description_kn: "ಸಾಂಪ್ರದಾಯಿಕ ಬಿಸಿ ಟವೆಲ್ ಮತ್ತು ಬೊಟಾನಿಕಲ್ ಆಯಿಲ್ ಜೊತೆ ನುಣುಪಾದ ಶೇವ್.",
    imageSrc: "/images/gallery/royal-straight-razor-shave.jpg",
  },
  {
    id: "gallery-06",
    title: "Master Barber Scissor Artistry",
    title_kn: "ಮಾಸ್ಟರ್ ಕತ್ತರಿ ಕಟಿಂಗ್ ಮತ್ತು ಶಿಸ್ತು",
    categories: ["trendy", "classic"],
    categoryLabel: "Trendy / Classic",
    categoryLabel_kn: "ಟ್ರೆಂಡಿ / ಕ್ಲಾಸಿಕ್",
    description: "Tailored grooming discipline in an exclusive, private appointment atmosphere.",
    description_kn: "ವೈಯಕ್ತಿಕ ಕಾಳಜಿ ಮತ್ತು ಶಿಸ್ತಿನೊಂದಿಗೆ ಮಾಡುವ ಕೇಶ ವಿನ್ಯಾಸ.",
    imageSrc: "/images/gallery/master-barber-craftsman.jpg",
  },
  {
    id: "gallery-07",
    title: "Modern Textured Crew & Temple Taper",
    title_kn: "ಮಾಡರ್ನ್ ಟೆಕ್ಸ್ಚರ್ಡ್ ಕ್ರೂ ಕಟ್",
    categories: ["crew", "trendy", "fade"],
    categoryLabel: "Crew Cut / Trendy",
    categoryLabel_kn: "ಕ್ರೂ ಕಟ್ / ಟ್ರೆಂಡಿ",
    description: "Layered crown texture with precision temple taper and natural wave flow.",
    description_kn: "ಮೇಲ್ಭಾಗದಲ್ಲಿ ಟೆಕ್ಸ್ಚರ್ ಕಟ್ ಮತ್ತು ಬದಿಗಳಲ್ಲಿ ನೈಸರ್ಗಿಕ ಟೇಪರ್.",
    imageSrc: "/images/gallery/hairstyle-textured-taper.jpg",
  },
  {
    id: "gallery-08",
    title: "Executive Low Skin Fade & Sculpted Beard",
    title_kn: "ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಸ್ಕಿನ್ ಫೇಡ್ ಮತ್ತು ಗಡ್ಡ",
    categories: ["fade", "beard"],
    categoryLabel: "Fade / Beard Styles",
    categoryLabel_kn: "ಫೇಡ್ / ಗಡ್ಡದ ಸ್ಟೈಲ್",
    description: "Seamless skin taper transition paired with razor-sharp cheekline beard definition.",
    description_kn: "ಸ್ಪಷ್ಟ ಸ್ಕಿನ್ ಫೇಡ್ ಮತ್ತು ಗಡ್ಡದ ಚೂಪಾದ ಲೈನ್-ಅಪ್.",
    imageSrc: "/images/gallery/hairstyle-classic-fade.jpg",
  },
];

export function AboutSection({
  onOpenBooking,
  shopName = "New Model Gents Parlor",
  address = "Katte Complex, Thirthahalli, Shivamogga",
}: AboutSectionProps) {
  const { language, t } = useLanguageTheme();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  // Tabs as specified by user:
  // Classic · Fade · Crew Cut · Trendy · Beard Styles · Kids · Chairs & Tools · All
  const filterTabs = [
    { id: "all", label: t.gallery.tabs.all },
    { id: "classic", label: t.gallery.tabs.classic },
    { id: "fade", label: t.gallery.tabs.fade },
    { id: "crew", label: t.gallery.tabs.crew },
    { id: "trendy", label: t.gallery.tabs.trendy },
    { id: "beard", label: t.gallery.tabs.beard },
    { id: "kids", label: t.gallery.tabs.kids },
    { id: "tools", label: t.gallery.tabs.tools },
  ];

  const filteredItems =
    activeTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categories.includes(activeTab));

  return (
    <section id="about" className="py-24 bg-[#0a0a0d] relative scroll-mt-12 overflow-hidden border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* About Us Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#141417] text-xs font-medium text-[#c5a880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase font-semibold">{t.about.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-[1.15]">
              {t.about.heading}
            </h2>

            {/* Who we are / ನಾವು ಯಾರು */}
            <div className="p-5 rounded-2xl bg-[#121215]/90 border border-white/[0.06] space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">
                {t.about.whoWeAreTitle}
              </h4>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                {t.about.whoWeAreDesc}
              </p>
            </div>

            {/* What we do / ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ */}
            <div className="p-5 rounded-2xl bg-[#121215]/90 border border-white/[0.06] space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">
                {t.about.whatWeDoTitle}
              </h4>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                {t.about.whatWeDoDesc}
              </p>
            </div>

            {/* Why choose us / ನಮ್ಮನ್ನು ಏಕೆ ಆರಿಸಬೇಕು */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a880]">
                {t.about.whyChooseTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.whyPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#121215] border border-white/[0.04]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-300 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our promise / ನಮ್ಮ ಭರವಸೆ */}
            <div className="p-4 rounded-xl border border-[#c5a880]/30 bg-[#c5a880]/5 flex items-center gap-3">
              <Award className="w-6 h-6 text-[#c5a880] shrink-0" />
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#c5a880] block">
                  {t.about.promiseTitle}
                </span>
                <p className="text-sm text-white font-medium italic mt-0.5">
                  &ldquo;{t.about.promiseDesc}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Master Barber Signature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.09] bg-[#121215] shadow-2xl p-7 space-y-6">
              <div className="flex items-center gap-4 border-b border-white/[0.06] pb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1a20] to-[#121215] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shrink-0 font-serif font-bold text-xl shadow-lg">
                  NM
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-semibold">
                    {t.about.card.title}
                  </h3>
                  <p className="text-xs text-[#c5a880] font-medium mt-0.5">
                    {t.about.card.ownerBadge}
                  </p>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">
                    {t.about.card.subtitle} • Since 2000
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[#94a3b8]">
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

        {/* Hairstyle Gallery / ಹೇರ್ಸ್ಟೈಲ್ ಗ್ಯಾಲರಿ */}
        <div id="gallery" className="pt-10 scroll-mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-2">
                {t.gallery.badge}
              </p>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium">
                {t.gallery.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1 max-w-xl">
                {t.gallery.subtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-[#c5a880] text-[#09090b] font-semibold shadow-md"
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
                    <div className="px-4 py-2.5 bg-[#141418] border-t border-white/[0.05] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#94a3b8] flex items-center gap-1.5 truncate">
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
            className="relative max-w-3xl w-full bg-[#121215] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl"
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
            <div className="p-6 bg-[#16161b] border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block mb-1">
                  {language === "kn" ? previewImage.categoryLabel_kn : previewImage.categoryLabel}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {language === "kn" ? previewImage.title_kn : previewImage.title}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1 max-w-xl">
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

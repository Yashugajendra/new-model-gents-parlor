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
} from "lucide-react";

interface AboutSectionProps {
  onOpenBooking: () => void;
  shopName?: string;
  address?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: "hairstyles" | "craft" | "studio";
  categoryLabel: string;
  description: string;
  imageSrc: string;
  aspect: "portrait" | "landscape" | "tall";
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-01",
    title: "Modern Textured Taper Crop",
    category: "hairstyles",
    categoryLabel: "Hairstyles",
    description: "Layered crown texture with precision temple taper and natural wave flow.",
    imageSrc: "/images/gallery/hairstyle-textured-taper.jpg",
    aspect: "portrait",
  },
  {
    id: "gallery-02",
    title: "Royal Straight Razor Hot Lather Shave",
    category: "craft",
    categoryLabel: "The Craft",
    description: "Traditional steamed eucalyptus towel, pre-shave botanical oils, and razor precision.",
    imageSrc: "/images/gallery/royal-straight-razor-shave.jpg",
    aspect: "landscape",
  },
  {
    id: "gallery-03",
    title: "Hydraulic Reclining Leather Chair Stations",
    category: "studio",
    categoryLabel: "Studio & Chairs",
    description: "Heavy-duty ergonomic vintage leather barber chairs with illuminated vanity stations.",
    imageSrc: "/images/gallery/luxury-barber-chair-station.jpg",
    aspect: "portrait",
  },
  {
    id: "gallery-04",
    title: "Executive Low Skin Fade & Sculpted Beard",
    category: "hairstyles",
    categoryLabel: "Hairstyles",
    description: "Seamless skin taper transition paired with razor-sharp cheekline beard definition.",
    imageSrc: "/images/gallery/hairstyle-classic-fade.jpg",
    aspect: "portrait",
  },
  {
    id: "gallery-05",
    title: "Master Barber Craftsmanship",
    category: "craft",
    categoryLabel: "The Craft",
    description: "Tailored grooming discipline in an exclusive, private appointment atmosphere.",
    imageSrc: "/images/gallery/master-barber-craftsman.jpg",
    aspect: "tall",
  },
];

export function AboutSection({
  onOpenBooking,
  shopName = "New Model Gents Beauty Parlor",
  address = "Kate Complex, Thirthahalli, Shivamogga",
}: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "hairstyles" | "craft" | "studio">("all");
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="about" className="py-24 bg-[#0a0a0d] relative scroll-mt-12 overflow-hidden border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* About Us Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#141417] text-xs font-medium text-[#c5a880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase font-semibold">About Our Sanctuary</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-[1.15]">
              Built for gentlemen who value{" "}
              <span className="gold-shimmer-text italic font-normal">master-grade precision.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Located at <strong className="text-white font-medium" suppressHydrationWarning>{address}</strong>,{" "}
              <strong className="text-white font-medium" suppressHydrationWarning>{shopName}</strong> was
              founded to bring an elevated, disciplined grooming culture to Thirthahalli.
            </p>

            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              We operate exclusively by appointment to ensure every client gets undivided attention.
              From bespoke structural shear cutting and modern texturizing to vintage straight-razor
              hot towel rituals, we treat grooming as an art form — not a rushed chore.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.05]">
                <div className="text-2xl font-serif font-bold text-[#c5a880]">1-on-1</div>
                <div className="text-xs text-gray-400 mt-0.5">Dedicated Attention</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.05]">
                <div className="text-2xl font-serif font-bold text-[#c5a880]">Zero Wait</div>
                <div className="text-xs text-gray-400 mt-0.5">Strict Appointment Slots</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121215] border border-white/[0.05] col-span-2 sm:col-span-1">
                <div className="text-2xl font-serif font-bold text-[#c5a880]">Premium</div>
                <div className="text-xs text-gray-400 mt-0.5">Reclining Leather Chairs</div>
              </div>
            </div>
          </div>

          {/* Master Barber Signature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.09] bg-[#121215] shadow-2xl p-7 space-y-6">
              <div className="flex items-center gap-4 border-b border-white/[0.06] pb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a20] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shrink-0 font-serif font-bold text-lg">
                  NM
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-semibold">The New Model Standard</h3>
                  <p className="text-xs text-[#94a3b8]" suppressHydrationWarning>{address}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[#94a3b8]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Japanese Steel Shears:</strong> Hand-honed convex blades for razor-sharp, split-end free cuts.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Punctuality Promise:</strong> Your reserved chair is sanitized and waiting the moment you step in.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Central Location:</strong> Prime spot in Kate Complex with convenient access and parking.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs tracking-wide hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Reserve Your Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery / Lookbook Section */}
        <div id="gallery" className="pt-10 scroll-mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880] mb-2">
                Visual Lookbook
              </p>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium">
                Our Work, Tools & Atmosphere
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
                Explore real photographs from our parlor — haircuts, straight-razor sessions, and chairs.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "all", label: "All Photos" },
                { id: "hairstyles", label: "Hairstyles" },
                { id: "craft", label: "The Shave & Craft" },
                { id: "studio", label: "Chairs & Tools" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-all ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="group luxury-card overflow-hidden rounded-2xl flex flex-col justify-between border border-white/[0.08] hover:border-[#c5a880]/50 transition-all cursor-pointer"
                  onClick={() => setPreviewImage(item)}
                >
                  {/* Photo Container */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/60">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Category Pill */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/70 backdrop-blur-md text-[#c5a880] border border-[#c5a880]/30">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Expand Icon Button */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#c5a880]">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <h4 className="font-serif text-lg sm:text-xl text-white group-hover:text-[#c5a880] transition-colors font-medium">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#94a3b8] line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Quick Card Footer */}
                  <div className="px-5 py-3 bg-[#141418] border-t border-white/[0.05] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#94a3b8] flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#c5a880]" />
                      Authentic Parlor Capture
                    </span>
                    <span className="text-[#c5a880] text-[11px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Detail <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
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
            <div className="relative h-[420px] sm:h-[500px] w-full bg-black">
              <Image
                src={previewImage.imageSrc}
                alt={previewImage.title}
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
                  {previewImage.categoryLabel}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {previewImage.title}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1 max-w-xl">
                  {previewImage.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setPreviewImage(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-xs shrink-0 hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book This Style</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

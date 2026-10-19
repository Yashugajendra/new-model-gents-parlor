"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { CraftSection } from "@/components/CraftSection";
import { LocationHoursSection } from "@/components/LocationHoursSection";
import { BookingModal } from "@/components/BookingModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Footer } from "@/components/Footer";
import { Service, ShopSettings } from "@/types/database.types";
import { NewModelData, INITIAL_SHOP_SETTINGS, INITIAL_SERVICES } from "@/lib/data";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Initialize with static default constants to guarantee 100% hydration match between SSR and Client
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [settings, setSettings] = useState<ShopSettings>(INITIAL_SHOP_SETTINGS);

  useEffect(() => {
    // Read and synchronize latest custom values saved by the owner in localStorage
    const syncData = () => {
      setServices(NewModelData.getServices());
      setSettings(NewModelData.getSettings());
    };

    syncData();

    // Listen to real-time events triggered by the Owner Dashboard
    window.addEventListener("newmodel-data-updated", syncData);
    window.addEventListener("ritualcut-data-updated", syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("newmodel-data-updated", syncData);
      window.removeEventListener("ritualcut-data-updated", syncData);
      window.removeEventListener("storage", syncData);
    };
  }, []);

  const handleOpenBooking = (service?: Service) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(null);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col selection:bg-[#c5a880] selection:text-[#09090b]">
      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} settings={settings} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          shopName={settings.shop_name}
          tagline={settings.tagline}
        />
        <ServicesSection
          services={services}
          onSelectService={(service) => handleOpenBooking(service)}
        />
        <CraftSection />
        <LocationHoursSection settings={settings} />
      </main>

      {/* Floating Elements & Modals */}
      <WhatsAppFloatingButton settings={settings} />
      <Footer settings={settings} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedService}
      />
    </div>
  );
}

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
import { RitualCutData } from "@/lib/data";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<ShopSettings>(RitualCutData.getSettings());

  useEffect(() => {
    setServices(RitualCutData.getServices());
    setSettings(RitualCutData.getSettings());
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
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection
          services={services}
          onSelectService={(service) => handleOpenBooking(service)}
        />
        <CraftSection />
        <LocationHoursSection settings={settings} />
      </main>

      {/* Floating Elements & Modals */}
      <WhatsAppFloatingButton />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedService}
      />
    </div>
  );
}

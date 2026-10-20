"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { HowBookingWorksSection } from "@/components/HowBookingWorksSection";
import { CraftSection } from "@/components/CraftSection";
import { LocationHoursSection } from "@/components/LocationHoursSection";
import { BookingModal } from "@/components/BookingModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Footer } from "@/components/Footer";
import { Service, ShopSettings } from "@/types/database.types";
import { NewModelData, INITIAL_SHOP_SETTINGS, INITIAL_SERVICES } from "@/lib/data";
import { useLanguageTheme } from "@/context/LanguageThemeContext";
import { AlertTriangle } from "lucide-react";

export default function HomePage() {
  const { language, theme } = useLanguageTheme();
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
    window.addEventListener("newmodel-settings-updated", syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("newmodel-data-updated", syncData);
      window.removeEventListener("newmodel-settings-updated", syncData);
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
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "light" ? "bg-[#fbfaf8] text-[#18181b]" : "bg-[#09090b] text-[#f8fafc]"
      } selection:bg-[#c5a880] selection:text-[#09090b]`}
    >
      {/* Dynamic Closure Notice Banner across top of site if closed */}
      {settings.is_closed && (
        <div className="bg-[#ef4444] text-white text-xs sm:text-sm px-4 py-2.5 text-center font-medium shadow-md flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {language === "kn"
              ? `⚠ ${settings.closure_date || "ನಿಗದಿತ ದಿನಾಂಕ"}ದಂದು ${
                  settings.closure_reason || "ವಿಶೇಷ ಕಾರಣ"
                }ದಿಂದ ಅಂಗಡಿ ಮುಚ್ಚಿರುತ್ತದೆ. ${
                  settings.closure_reopen_date || "ಶೀಘ್ರದಲ್ಲೇ"
                }ದಂದು ಮತ್ತೆ ತೆರೆಯುತ್ತದೆ. ಅನಾನುಕೂಲಕ್ಕಾಗಿ ಕ್ಷಮಿಸಿ.`
              : `⚠ We are closed on ${settings.closure_date || "the specified date"} due to ${
                  settings.closure_reason || "scheduled maintenance"
                }. We reopen on ${settings.closure_reopen_date || "soon"}. Sorry for the inconvenience.`}
          </span>
        </div>
      )}

      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} settings={settings} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          shopName={settings.shop_name}
          tagline={settings.tagline}
          whatsappNumber={settings.whatsapp_number}
        />
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
          shopName={settings.shop_name}
          address={settings.address}
        />
        <ServicesSection
          services={services}
          onSelectService={(service) => handleOpenBooking(service)}
        />
        <HowBookingWorksSection onOpenBooking={() => handleOpenBooking()} />
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

export type Language = "en" | "kn";

export interface ServiceTranslation {
  id: string;
  name: string;
  name_kn: string;
  description: string;
  description_kn: string;
  price_display: string;
  price_display_kn: string;
  price: number;
  duration_minutes: number;
  badge?: string;
  badge_kn?: string;
}

export const BILINGUAL_SERVICES: ServiceTranslation[] = [
  {
    id: "srv-01",
    name: "Haircut",
    name_kn: "ಹೇರ್ ಕಟಿಂಗ್",
    description: "Classic or modern cut with styling",
    description_kn: "ಕ್ಲಾಸಿಕ್ ಅಥವಾ ಮಾಡರ್ನ್ ಕಟ್, ಸ್ಟೈಲಿಂಗ್ ಸಹಿತ",
    price_display: "₹250 – ₹300",
    price_display_kn: "₹250 – ₹300",
    price: 250,
    duration_minutes: 30,
    badge: "Essential",
    badge_kn: "ಪ್ರಮುಖ",
  },
  {
    id: "srv-02",
    name: "Shaving",
    name_kn: "ಶೇವಿಂಗ್",
    description: "Clean, smooth shave with a hot towel",
    description_kn: "ಬಿಸಿ ಟವೆಲ್ನೊಂದಿಗೆ ನುಣುಪಾದ ಶೇವ್",
    price_display: "₹150 – ₹200",
    price_display_kn: "₹150 – ₹200",
    price: 150,
    duration_minutes: 25,
  },
  {
    id: "srv-03",
    name: "Beard Trim & Styling",
    name_kn: "ಗಡ್ಡ ಟ್ರಿಮ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್",
    description: "Shaping, trimming and line-up",
    description_kn: "ಆಕಾರ, ಟ್ರಿಮ್ ಮತ್ತು ಲೈನ್-ಅಪ್",
    price_display: "₹150",
    price_display_kn: "₹150",
    price: 150,
    duration_minutes: 20,
  },
  {
    id: "srv-04",
    name: "Haircut + Beard",
    name_kn: "ಕಟಿಂಗ್ + ಗಡ್ಡ",
    description: "Combined package",
    description_kn: "ಒಟ್ಟಿಗೆ ಪ್ಯಾಕೇಜ್",
    price_display: "₹399",
    price_display_kn: "₹399",
    price: 399,
    duration_minutes: 45,
    badge: "Popular",
    badge_kn: "ಜನಪ್ರಿಯ",
  },
  {
    id: "srv-05",
    name: "Head Massage",
    name_kn: "ಹೆಡ್ ಮಸಾಜ್",
    description: "Relaxing oil massage",
    description_kn: "ಆರಾಮದಾಯಕ ಎಣ್ಣೆ ಮಸಾಜ್",
    price_display: "₹200",
    price_display_kn: "₹200",
    price: 200,
    duration_minutes: 25,
  },
  {
    id: "srv-06",
    name: "Facial / Cleanup",
    name_kn: "ಫೇಶಿಯಲ್ / ಕ್ಲೀನಪ್",
    description: "Skin cleansing and refresh",
    description_kn: "ಚರ್ಮದ ಶುದ್ಧೀಕರಣ ಮತ್ತು ಹೊಳಪು",
    price_display: "₹250",
    price_display_kn: "₹250",
    price: 250,
    duration_minutes: 35,
  },
  {
    id: "srv-07",
    name: "Hair Colour / Mehendi",
    name_kn: "ಹೇರ್ ಕಲರ್ / ಮೆಹೆಂದಿ",
    description: "Black, brown or natural colour",
    description_kn: "ಕಪ್ಪು, ಕಂದು ಅಥವಾ ನೈಸರ್ಗಿಕ ಬಣ್ಣ",
    price_display: "₹200",
    price_display_kn: "₹200",
    price: 200,
    duration_minutes: 40,
  },
  {
    id: "srv-08",
    name: "Kids’ Haircut",
    name_kn: "ಮಕ್ಕಳ ಕಟಿಂಗ್",
    description: "Gentle, patient service for children",
    description_kn: "ಮಕ್ಕಳಿಗೆ ತಾಳ್ಮೆಯ, ಮೃದುವಾದ ಸೇವೆ",
    price_display: "₹150",
    price_display_kn: "₹150",
    price: 150,
    duration_minutes: 25,
  },
  {
    id: "srv-09",
    name: "Groom Package",
    name_kn: "ಗ್ರೂಮ್ ಪ್ಯಾಕೇಜ್",
    description: "Haircut, shave, facial and styling for weddings and functions",
    description_kn: "ಮದುವೆ ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಕಟಿಂಗ್, ಶೇವ್, ಫೇಶಿಯಲ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್",
    price_display: "₹2,999",
    price_display_kn: "₹2,999",
    price: 2999,
    duration_minutes: 90,
    badge: "Special",
    badge_kn: "ವಿಶೇಷ",
  },
];

export const TRANSLATIONS = {
  en: {
    // Top bar & Nav
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      hairstyles: "Hairstyles",
      hours: "Hours & Location",
      bookNow: "Book Now",
      status: "Status",
      ownerDashboard: "Owner Dashboard",
      taglineSub: "Thirthahalli • Shivamogga",
      langToggleText: "ಕನ್ನಡ",
      lightText: "Light",
      darkText: "Dark",
    },

    // Home / Hero
    hero: {
      badge: "Premier Men's Grooming • Thirthahalli",
      welcome: "Welcome to",
      shopName: "New Model Gents Parlor",
      tagline: "Look sharp. Feel confident.",
      subtitle:
        "Book your haircut or grooming appointment online in under a minute. No waiting, no phone calls.",
      bookBtn: "Book Appointment",
      chatWhatsappBtn: "Chat on WhatsApp",
      exploreServices: "Explore Services",
      highlights: {
        experience: {
          title: "15+ Years Experience",
          desc: "Serving Thirthahalli & nearby towns since 2010",
        },
        punctuality: {
          title: "No Waiting & Zero Queues",
          desc: "Dedicated personal slots. Your chair is waiting",
        },
        hygiene: {
          title: "Clean Tools & Fresh Towels",
          desc: "Strict hygiene with sterilized shears and razors",
        },
        location: {
          title: "Katte Complex",
          desc: "Thirthahalli, Shivamogga — 577432",
        },
      },
    },

    // About Us
    about: {
      badge: "About Us",
      heading: "Built for gentlemen who value master-grade precision.",
      whoWeAreTitle: "Who we are",
      whoWeAreDesc:
        "New Model Gents Parlor is a men’s grooming salon in Thirthahalli, Shivamogga district, Karnataka. Since 2010, we have served the people of Thirthahalli and nearby villages with clean, stylish and affordable grooming. Owner: Hanumanthu (Chinanna).",
      whatWeDoTitle: "What we do",
      whatWeDoDesc:
        "From an everyday haircut to a full groom for a wedding or festival, our experienced barbers take care of your hair, beard and skin with proper hygiene and attention to detail.",
      whyChooseTitle: "Why choose us",
      whyPoints: [
        "15+ years of experience",
        "Clean tools and a hygienic shop",
        "Fair, clearly listed prices",
        "Easy online booking, with no long queues",
      ],
      promiseTitle: "Our promise",
      promiseDesc: "Every customer leaves looking good and feeling confident.",
      stats: {
        stat1Num: "15+",
        stat1Label: "Years of Trust",
        stat2Num: "1-on-1",
        stat2Label: "Dedicated Chair",
        stat3Num: "100%",
        stat3Label: "Hygiene Standards",
      },
      card: {
        title: "New Model Gents Parlor",
        subtitle: "Katte Complex, Thirthahalli",
        ownerBadge: "Owner: Hanumanthu (Chinanna)",
        f1: "Japanese Steel Shears: Hand-honed convex blades for razor-sharp finishes.",
        f2: "Punctuality Promise: Cleaned and sanitized chair the moment you step in.",
        f3: "Central Location: Prime location in Katte Complex with convenient parking.",
        cta: "Reserve Your Seat",
      },
    },

    // Services
    services: {
      badge: "Menu of Styling & Grooming",
      title: "Services & Rates",
      subtitle:
        "Quality grooming with fair, transparent pricing. Pick your service to book in under a minute.",
      disclaimer: "Prices may change.",
      minutes: "Minutes",
      selectBtn: "Select & Pick Slot",
    },

    // Hairstyle Gallery
    gallery: {
      badge: "Visual Lookbook",
      title: "Hairstyle Gallery",
      subtitle:
        "Find Your Style. Browse our recent work and show your favourite look to your barber.",
      tabs: {
        all: "All Photos",
        classic: "Classic",
        fade: "Fade",
        crew: "Crew Cut",
        trendy: "Trendy",
        beard: "Beard Styles",
        kids: "Kids",
        tools: "Chairs & Tools",
      },
      detailBtn: "View Detail",
      bookThisStyle: "Book This Style",
      authenticLabel: "Authentic Parlor Capture",
    },

    // How Booking Works
    howItWorks: {
      badge: "Simple 5-Step Process",
      title: "How Booking Works",
      subtitle:
        "No waiting in crowded lines. Book your slot online in under a minute.",
      steps: [
        {
          num: "1",
          title: "Choose your service",
          desc: "Select haircut, beard styling, or full package.",
        },
        {
          num: "2",
          title: "Pick your date and time",
          desc: "Choose a dedicated slot that fits your schedule.",
        },
        {
          num: "3",
          title: "Enter your name and phone number",
          desc: "No password or complex account required.",
        },
        {
          num: "4",
          title: "Tap Send on WhatsApp",
          desc: "Your pre-filled request is shared directly with the owner.",
        },
        {
          num: "5",
          title: "The owner approves and confirms",
          desc: "Your appointment is locked in with zero wait time.",
        },
      ],
    },

    // Hours & Location
    hours: {
      badge: "Visit Our Shop",
      title: "Hours & Location",
      subtitle:
        "Visit us at Katte Complex, Thirthahalli for an exclusive, relaxed grooming experience.",
      exclusivityNote: "By appointment only, to maintain exclusivity.",
      addressTitle: "Address",
      addressText: "New Model Gents Parlor, Katte Complex, Thirthahalli, Shivamogga – 577432",
      directionsBtn: "Get Directions on Google Maps",
      phoneTitle: "Phone / WhatsApp",
      whatsappConcierge: "WhatsApp Shop Concierge",
      whatsappSub: "Fast replies for questions, bookings & custom times.",
      openingHoursTitle: "Opening Hours",
      todayBadge: "Today",
      closedBadge: "Closed",
      closureNoticeTitle: "Shop Notice",
      getDirectionsMap: "Get Directions",
    },

    // Closure Alert
    closure: {
      prefix: "⚠ Shop Notice:",
      template: (date: string, reason: string, reopen: string) =>
        `We are closed on ${date || "the specified date"} due to ${
          reason || "scheduled maintenance"
        }. We reopen on ${reopen || "soon"}. Sorry for the inconvenience.`,
    },

    // Booking Modal
    bookingModal: {
      step: "Step",
      of: "of",
      step1Title: "Select a Service",
      step2Title: "Pick Date & Time",
      step3Title: "Your Details",
      step4Title: "Request Submitted!",
      step1Desc: "Choose the grooming service you need.",
      step2Desc: "Select an available appointment slot.",
      step3Desc: "Enter your contact info so we can confirm.",
      step4Desc: "Tap the button below to send your request on WhatsApp.",
      dateLabel: "Select Date",
      timeLabel: "Available Slots",
      noSlots: "No slots remaining for this date. Please choose another date.",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      phoneLabel: "WhatsApp Phone Number",
      phonePlaceholder: "e.g. 917338076977 or 9876543210",
      notesLabel: "Special Requests (Optional)",
      notesPlaceholder: "e.g. Specific haircut style or beard trim preference",
      submitting: "Submitting Request...",
      continueBtn: "Continue",
      backBtn: "Back",
      submitRequestBtn: "Submit Booking Request",
      bookingRef: "Booking Reference",
      statusPending: "⏳ Pending Owner Approval",
      whatsappShareTitle: "Tap Send on WhatsApp to Complete",
      whatsappShareDesc:
        "Tap below to send your booking details directly to Hanumanthu (Chinanna) on WhatsApp.",
      sendWhatsappBtn: "Tap Send on WhatsApp",
      closeBtn: "Close",
      newBookingBtn: "Book Another Slot",
      trackStatusBtn: "Track Booking Status",
    },

    // Footer
    footer: {
      rights: "© New Model Gents Parlor, Thirthahalli. Since 2010. All rights reserved.",
      ownerText: "Owner: Hanumanthu (Chinanna)",
      tagline: "Your Style. Your Time. Your Signature Look.",
      navTitle: "Quick Navigation",
      contactTitle: "Contact & Hours",
    },
  },

  kn: {
    // Top bar & Nav
    nav: {
      home: "ಮುಖಪುಟ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      services: "ಸೇವೆಗಳು",
      hairstyles: "ಹೇರ್ಸ್ಟೈಲ್ಸ್",
      hours: "ಸಮಯ ಮತ್ತು ವಿಳಾಸ",
      bookNow: "ಬುಕ್ ಮಾಡಿ",
      status: "ಸ್ಥಿತಿ",
      ownerDashboard: "ಮಾಲೀಕರ ಡ್ಯಾಶ್ಬೋರ್ಡ್",
      taglineSub: "ತೀರ್ಥಹಳ್ಳಿ • ಶಿವಮೊಗ್ಗ",
      langToggleText: "English",
      lightText: "ಲೈಟ್",
      darkText: "ಡಾರ್ಕ್",
    },

    // Home / Hero
    hero: {
      badge: "ಪುರುಷರ ಪ್ರೀಮಿಯಂ ಗ್ರೂಮಿಂಗ್ • ತೀರ್ಥಹಳ್ಳಿ",
      welcome: "ಸ್ವಾಗತ",
      shopName: "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್",
      tagline: "ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.",
      subtitle:
        "ನಿಮ್ಮ ಕಟಿಂಗ್ ಅಥವಾ ಗ್ರೂಮಿಂಗ್ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಅನ್ನು ಒಂದು ನಿಮಿಷದೊಳಗೆ ಆನ್ಲೈನ್ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ. ಕಾಯುವ ಅಗತ್ಯವಿಲ್ಲ, ಫೋನ್ ಕರೆ ಬೇಡ.",
      bookBtn: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
      chatWhatsappBtn: "ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ",
      exploreServices: "ಸೇವೆಗಳನ್ನು ನೋಡಿ",
      highlights: {
        experience: {
          title: "15+ ವರ್ಷಗಳ ಅನುಭವ",
          desc: "2010ನೇ ಇಸವಿಯಿಂದ ತೀರ್ಥಹಳ್ಳಿ ಮತ್ತು ಹಳ್ಳಿಗಳ ಜನರಿಗೆ ಸೇವೆ",
        },
        punctuality: {
          title: "ಉದ್ದದ ಸಾಲಿಲ್ಲ, ಕಾಯುವಂತಿಲ್ಲ",
          desc: "ನಿಮಗಾಗಿ ಪ್ರತ್ಯೇಕ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಸಮಯ",
        },
        hygiene: {
          title: "ಸ್ವಚ್ಛ ಉಪಕರಣಗಳು ಮತ್ತು ಶುದ್ಧತೆ",
          desc: "ಶುದ್ಧೀಕರಿಸಿದ ಕತ್ತರಿ, ಬ್ಲೇಡ್ ಹಾಗೂ ಬಿಸಿ ಟವೆಲ್",
        },
        location: {
          title: "ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್",
          desc: "ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432",
        },
      },
    },

    // About Us
    about: {
      badge: "ನಮ್ಮ ಬಗ್ಗೆ",
      heading: "ಶ್ರೇಷ್ಠ ಮಟ್ಟದ ಗ್ರೂಮಿಂಗ್ ಬಯಸುವ ಪುರುಷರಿಗಾಗಿ.",
      whoWeAreTitle: "ನಾವು ಯಾರು",
      whoWeAreDesc:
        "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್ ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ತೀರ್ಥಹಳ್ಳಿಯಲ್ಲಿರುವ ಪುರುಷರ ಗ್ರೂಮಿಂಗ್ ಸಲೂನ್. 2010ನೇ ಇಸವಿಯಿಂದ ತೀರ್ಥಹಳ್ಳಿ ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಹಳ್ಳಿಗಳ ಜನರಿಗೆ ಸ್ವಚ್ಛ, ಸ್ಟೈಲಿಶ್ ಹಾಗೂ ಕೈಗೆಟುಕುವ ದರದ ಸೇವೆ ನೀಡುತ್ತಿದ್ದೇವೆ. ಮಾಲೀಕರು: ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ).",
      whatWeDoTitle: "ನಾವು ಏನು ಮಾಡುತ್ತೇವೆ",
      whatWeDoDesc:
        "ದಿನನಿತ್ಯದ ಕಟಿಂಗ್ನಿಂದ ಮದುವೆ ಅಥವಾ ಹಬ್ಬಕ್ಕೆ ಪೂರ್ಣ ಗ್ರೂಮಿಂಗ್ವರೆಗೆ, ನಮ್ಮ ಅನುಭವಿ ಕ್ಷೌರಿಕರು ನಿಮ್ಮ ಕೂದಲು, ಗಡ್ಡ ಮತ್ತು ಚರ್ಮದ ಆರೈಕೆಯನ್ನು ಸ್ವಚ್ಛತೆ ಮತ್ತು ಕಾಳಜಿಯೊಂದಿಗೆ ಮಾಡುತ್ತಾರೆ.",
      whyChooseTitle: "ನಮ್ಮನ್ನು ಏಕೆ ಆರಿಸಬೇಕು",
      whyPoints: [
        "15 ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚಿನ ಅನುಭವ",
        "ಸ್ವಚ್ಛ ಉಪಕರಣಗಳು ಮತ್ತು ಶುದ್ಧ ಅಂಗಡಿ",
        "ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಿದ ನ್ಯಾಯಯುತ ದರಗಳು",
        "ಸುಲಭ ಆನ್ಲೈನ್ ಬುಕಿಂಗ್, ಉದ್ದದ ಸಾಲಿಲ್ಲ",
      ],
      promiseTitle: "ನಮ್ಮ ಭರವಸೆ",
      promiseDesc: "ಪ್ರತಿ ಗ್ರಾಹಕರೂ ಚೆನ್ನಾಗಿ ಕಾಣುತ್ತಾ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಹೊರಡಬೇಕು.",
      stats: {
        stat1Num: "15+",
        stat1Label: "ವರ್ಷಗಳ ನಂಬಿಕೆ",
        stat2Num: "1-on-1",
        stat2Label: "ವೈಯಕ್ತಿಕ ಕುರ್ಚಿ",
        stat3Num: "100%",
        stat3Label: "ಶುದ್ಧತೆ & ಸ್ವಚ್ಛತೆ",
      },
      card: {
        title: "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್",
        subtitle: "ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ",
        ownerBadge: "ಮಾಲೀಕರು: ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)",
        f1: "ಜಪಾನೀಸ್ ಸ್ಟೀಲ್ ಕತ್ತರಿ: ನಿಖರ, ಸ್ಟೈಲಿಶ್ ಹೇರ್ಕಟ್ಗಾಗಿ ಹರಿತವಾದ ಬ್ಲೇಡ್ಗಳು.",
        f2: "ಸಮಯಪಾಲನೆ ಭರವಸೆ: ನೀವು ಬಂದ ತಕ್ಷಣ ಶುದ್ಧೀಕರಿಸಿದ ಕುರ್ಚಿ ಸಿದ್ಧವಾಗಿರುತ್ತದೆ.",
        f3: "ಕೇಂದ್ರ ಸ್ಥಳ: ಪಾರ್ಕಿಂಗ್ ಸೌಲಭ್ಯವಿರುವ ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್ನ ಪ್ರಮುಖ ಸ್ಥಳ.",
        cta: "ನಿಮ್ಮ ಸಮಯ ಕಾಯ್ದಿರಿಸಿ",
      },
    },

    // Services
    services: {
      badge: "ಸ್ಟೈಲಿಂಗ್ ಮತ್ತು ಗ್ರೂಮಿಂಗ್ ಸೇವೆಗಳು",
      title: "ಸೇವೆಗಳು ಮತ್ತು ದರಗಳು",
      subtitle:
        "ಸ್ಪಷ್ಟ ದರಗಳೊಂದಿಗೆ ಗುಣಮಟ್ಟದ ಗ್ರೂಮಿಂಗ್. ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಬುಕ್ ಮಾಡಲು ಸೇವೆಯನ್ನು ಆರಿಸಿ.",
      disclaimer: "ದರಗಳು ಬದಲಾಗಬಹುದು.",
      minutes: "ನಿಮಿಷಗಳು",
      selectBtn: "ಆರಿಸಿ ಮತ್ತು ಸಮಯ ಆಯ್ಕೆಮಾಡಿ",
    },

    // Hairstyle Gallery
    gallery: {
      badge: "ವಿಷುಯಲ್ ಲುಕ್ಬುಕ್",
      title: "ಹೇರ್ಸ್ಟೈಲ್ ಗ್ಯಾಲರಿ",
      subtitle:
        "ನಿಮ್ಮ ಸ್ಟೈಲ್ ಆರಿಸಿ. ನಮ್ಮ ಇತ್ತೀಚಿನ ಕೆಲಸಗಳನ್ನು ನೋಡಿ, ನಿಮಗಿಷ್ಟವಾದ ಲುಕ್ ಅನ್ನು ಕ್ಷೌರಿಕರಿಗೆ ತೋರಿಸಿ.",
      tabs: {
        all: "ಎಲ್ಲವೂ",
        classic: "ಕ್ಲಾಸಿಕ್",
        fade: "ಫೇಡ್",
        crew: "ಕ್ರೂ ಕಟ್",
        trendy: "ಟ್ರೆಂಡಿ",
        beard: "ಗಡ್ಡದ ಸ್ಟೈಲ್",
        kids: "ಮಕ್ಕಳು",
        tools: "ಕುರ್ಚಿ & ಉಪಕರಣಗಳು",
      },
      detailBtn: "ವಿವರ ನೋಡಿ",
      bookThisStyle: "ಈ ಸ್ಟೈಲ್ ಬುಕ್ ಮಾಡಿ",
      authenticLabel: "ನಮ್ಮ ಪಾರ್ಲರ್ನ ನೈಜ ಫೋಟೋ",
    },

    // How Booking Works
    howItWorks: {
      badge: "ಸುಲಭ 5 ಹಂತಗಳು",
      title: "ಬುಕಿಂಗ್ ಹೇಗೆ?",
      subtitle: "ಜನಸಂದಣಿಯಲ್ಲಿ ಕಾಯಬೇಕಿಲ್ಲ. ಒಂದು ನಿಮಿಷದೊಳಗೆ ಆನ್ಲೈನ್ನಲ್ಲಿ ಸುಲಭವಾಗಿ ಬುಕ್ ಮಾಡಿ.",
      steps: [
        {
          num: "1",
          title: "ಸೇವೆಯನ್ನು ಆರಿಸಿ",
          desc: "ಹೇರ್ ಕಟಿಂಗ್, ಶೇವಿಂಗ್ ಅಥವಾ ಪ್ಯಾಕೇಜ್ ಆಯ್ಕೆಮಾಡಿ.",
        },
        {
          num: "2",
          title: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಆರಿಸಿ",
          desc: "ನಿಮಗೆ ಅನುಕೂಲಕರವಾದ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಸಮಯ ಆರಿಸಿ.",
        },
        {
          num: "3",
          title: "ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ",
          desc: "ಯಾವುದೇ ಪಾಸ್ವರ್ಡ್ ಅಥವಾ ಖಾತೆಯ ಅಗತ್ಯವಿಲ್ಲ.",
        },
        {
          num: "4",
          title: "ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ಕಳುಹಿಸಿ ಒತ್ತಿ",
          desc: "ನಿಮ್ಮ ವಿನಂತಿ ನೇರವಾಗಿ ಮಾಲೀಕರಿಗೆ ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ತಲುಪುತ್ತದೆ.",
        },
        {
          num: "5",
          title: "ಮಾಲೀಕರು ಅನುಮೋದಿಸಿ ಖಚಿತಪಡಿಸುತ್ತಾರೆ",
          desc: "ನಿಮ್ಮ ಸಮಯ ಖಚಿತವಾಗುತ್ತದೆ, ಕಾಯುವ ಅಗತ್ಯವಿರುವುದಿಲ್ಲ.",
        },
      ],
    },

    // Hours & Location
    hours: {
      badge: "ನಮ್ಮ ಅಂಗಡಿಗೆ ಭೇಟಿ ನೀಡಿ",
      title: "ಸಮಯ ಮತ್ತು ವಿಳಾಸ",
      subtitle:
        "ಆರಾಮದಾಯಕ ಹಾಗೂ ಶ್ರೇಷ್ಠ ಗ್ರೂಮಿಂಗ್ ಅನುಭವಕ್ಕಾಗಿ ತೀರ್ಥಹಳ್ಳಿಯ ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್ಗೆ ಭೇಟಿ ನೀಡಿ.",
      exclusivityNote: "ವಿಶೇಷ ಸೇವೆಗಾಗಿ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಮೂಲಕ ಮಾತ್ರ.",
      addressTitle: "ವಿಳಾಸ",
      addressText: "ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್, ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432",
      directionsBtn: "ಗೂಗಲ್ ಮ್ಯಾಪ್ನಲ್ಲಿ ದಾರಿ ನೋಡಿ",
      phoneTitle: "ಫೋನ್ / ವಾಟ್ಸಾಪ್",
      whatsappConcierge: "ವಾಟ್ಸಾಪ್ ಅಂಗಡಿ ಸಂಪರ್ಕ",
      whatsappSub: "ಪ್ರಶ್ನೆಗಳು, ಬುಕಿಂಗ್ ಮತ್ತು ವಿಚಾರಣೆಗಾಗಿ ತಕ್ಷಣದ ಉತ್ತರ.",
      openingHoursTitle: "ಕೆಲಸದ ಸಮಯ",
      todayBadge: "ಇಂದು",
      closedBadge: "ಮುಚ್ಚಿದೆ",
      closureNoticeTitle: "ಅಂಗಡಿಯ ಪ್ರಕಟಣೆ",
      getDirectionsMap: "ದಾರಿ ತೋರಿಸಿ",
    },

    // Closure Alert
    closure: {
      prefix: "⚠ ಅಂಗಡಿ ಮುಚ್ಚಿರುವ ಸೂಚನೆ:",
      template: (date: string, reason: string, reopen: string) =>
        `${date || "ನಿಗದಿತ ದಿನಾಂಕ"}ದಂದು ${
          reason || "ವಿಶೇಷ ಕಾರಣ"
        }ದಿಂದ ಅಂಗಡಿ ಮುಚ್ಚಿರುತ್ತದೆ. ${
          reopen || "ಶೀಘ್ರದಲ್ಲೇ"
        }ದಂದು ಮತ್ತೆ ತೆರೆಯುತ್ತದೆ. ಅನಾನುಕೂಲಕ್ಕಾಗಿ ಕ್ಷಮಿಸಿ.`,
    },

    // Booking Modal
    bookingModal: {
      step: "ಹಂತ",
      of: "/",
      step1Title: "ಸೇವೆಯನ್ನು ಆರಿಸಿ",
      step2Title: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಆರಿಸಿ",
      step3Title: "ನಿಮ್ಮ ವಿವರಗಳು",
      step4Title: "ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!",
      step1Desc: "ನಿಮಗೆ ಬೇಕಾದ ಗ್ರೂಮಿಂಗ್ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      step2Desc: "ಲಭ್ಯವಿರುವ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಸಮಯ ಆರಿಸಿ.",
      step3Desc: "ಖಚಿತಪಡಿಸಲು ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ನೀಡಿ.",
      step4Desc: "ವಿನಂತಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ಕಳುಹಿಸಿ ಒತ್ತಿ.",
      dateLabel: "ದಿನಾಂಕ ಆರಿಸಿ",
      timeLabel: "ಲಭ್ಯವಿರುವ ಸಮಯಗಳು",
      noSlots: "ಈ ದಿನಾಂಕಕ್ಕೆ ಸಮಯ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ದಿನಾಂಕ ಆರಿಸಿ.",
      nameLabel: "ನಿಮ್ಮ ಹೆಸರು",
      namePlaceholder: "ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ",
      phoneLabel: "ವಾಟ್ಸಾಪ್ ಫೋನ್ ನಂಬರ್",
      phonePlaceholder: "ಉದಾ: 917338076977 ಅಥವಾ 9876543210",
      notesLabel: "ವಿಶೇಷ ವಿನಂತಿ (ಐಚ್ಛಿಕ)",
      notesPlaceholder: "ಉದಾ: ನಿರ್ದಿಷ್ಟ ಹೇರ್ಸ್ಟೈಲ್ ಅಥವಾ ಗಡ್ಡದ ಆಕಾರ",
      submitting: "ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
      continueBtn: "ಮುಂದೆ",
      backBtn: "ಹಿಂದೆ",
      submitRequestBtn: "ಬುಕಿಂಗ್ ವಿನಂತಿ ಸಲ್ಲಿಸಿ",
      bookingRef: "ಬುಕಿಂಗ್ ರೆಫರೆನ್ಸ್",
      statusPending: "⏳ ಮಾಲೀಕರ ಅನುಮೋದನೆಗೆ ಬಾಕಿ ಇದೆ",
      whatsappShareTitle: "ಪೂರ್ಣಗೊಳಿಸಲು ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ಕಳುಹಿಸಿ",
      whatsappShareDesc:
        "ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ, ನಿಮ್ಮ ಬುಕಿಂಗ್ ವಿವರಗಳನ್ನು ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ) ಅವರಿಗೆ ನೇರವಾಗಿ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.",
      sendWhatsappBtn: "ವಾಟ್ಸಾಪ್ನಲ್ಲಿ ಕಳುಹಿಸಿ",
      closeBtn: "ಮುಚ್ಚಿ",
      newBookingBtn: "ಮತ್ತೊಂದು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
      trackStatusBtn: "ಬುಕಿಂಗ್ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
    },

    // Footer
    footer: {
      rights: "© ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್, ತೀರ್ಥಹಳ್ಳಿ. 2010ರಿಂದ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      ownerText: "ಮಾಲೀಕರು: ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)",
      tagline: "ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.",
      navTitle: "ತ್ವರಿತ ಲಿಂಕ್ಗಳು",
      contactTitle: "ಸಂಪರ್ಕ ಮತ್ತು ಸಮಯ",
    },
  },
};

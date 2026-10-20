-- ==============================================================================
-- NEW MODEL GENTS PARLOR: Production PostgreSQL Database Schema
-- Location: Katte Complex, Thirthahalli, Shivamogga
-- Features: Bilingual English + Kannada Support, GiST Concurrency Protection,
--           Atomic Slot Reservation RPC, Row Level Security
-- Run this script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- 2. Shop Settings Table
CREATE TABLE IF NOT EXISTS public.shop_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_name TEXT NOT NULL DEFAULT 'New Model Gents Parlor',
    shop_name_kn TEXT DEFAULT 'ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್',
    tagline TEXT DEFAULT 'Look sharp. Feel confident.',
    tagline_kn TEXT DEFAULT 'ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.',
    owner_name TEXT DEFAULT 'Hanumanthu (Chinanna)',
    owner_name_kn TEXT DEFAULT 'ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)',
    since_year TEXT DEFAULT '2010',
    phone_number TEXT NOT NULL DEFAULT '+91 73380 76977',
    whatsapp_number TEXT NOT NULL DEFAULT '917338076977',
    address TEXT NOT NULL DEFAULT 'Katte Complex, Thirthahalli, Shivamogga – 577432',
    address_kn TEXT DEFAULT 'ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432',
    google_maps_url TEXT DEFAULT 'https://www.google.com/maps/search/?api=1&query=Katte+Complex%2C+Thirthahalli%2C+Shivamogga',
    currency_code TEXT NOT NULL DEFAULT 'INR',
    currency_symbol TEXT NOT NULL DEFAULT '₹',
    slot_interval_minutes INT NOT NULL DEFAULT 30,
    buffer_minutes INT NOT NULL DEFAULT 5,
    opening_time TIME NOT NULL DEFAULT '06:30:00',
    closing_time TIME NOT NULL DEFAULT '23:00:00',
    operating_days INT[] NOT NULL DEFAULT '{1,2,3,4,5,6,7}',
    is_closed BOOLEAN NOT NULL DEFAULT false,
    closure_reason TEXT DEFAULT '',
    closure_date TEXT DEFAULT '',
    closure_reopen_date TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist if table was previously created with older schema
DO $$ BEGIN
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS shop_name_kn TEXT DEFAULT 'ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS tagline_kn TEXT DEFAULT 'ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS owner_name TEXT DEFAULT 'Hanumanthu (Chinanna)';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS owner_name_kn TEXT DEFAULT 'ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS since_year TEXT DEFAULT '2010';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS address_kn TEXT DEFAULT 'ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS is_closed BOOLEAN NOT NULL DEFAULT false;
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS closure_reason TEXT DEFAULT '';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS closure_date TEXT DEFAULT '';
    ALTER TABLE public.shop_settings ADD COLUMN IF NOT EXISTS closure_reopen_date TEXT DEFAULT '';
EXCEPTION WHEN duplicate_column THEN null; END $$;

-- 3. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    name_kn TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    description_kn TEXT,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    price INT NOT NULL CHECK (price >= 0),
    price_display TEXT,
    price_display_kn TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    badge TEXT,
    badge_kn TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table already exists
DO $$ BEGIN
    ALTER TABLE public.services ADD COLUMN IF NOT EXISTS name_kn TEXT;
    ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description_kn TEXT;
    ALTER TABLE public.services ADD COLUMN IF NOT EXISTS price_display TEXT;
    ALTER TABLE public.services ADD COLUMN IF NOT EXISTS price_display_kn TEXT;
    ALTER TABLE public.services ADD COLUMN IF NOT EXISTS badge_kn TEXT;
EXCEPTION WHEN duplicate_column THEN null; END $$;

-- 4. Blocked Times Table
CREATE TABLE IF NOT EXISTS public.blocked_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL DEFAULT 'Shop Closed / Break',
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_block_range CHECK (end_time > start_time)
);

-- 5. Appointments Table & Status Enum
DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT NOT NULL UNIQUE,
    service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT,
    service_name_snapshot TEXT NOT NULL,
    service_price_snapshot INT NOT NULL,
    service_duration_snapshot INT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_notes TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'PENDING',
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_appointment_time CHECK (end_time > start_time)
);

-- 6. GiST Range Exclusion Constraint: Enforce NO overlapping CONFIRMED appointments
DO $$ BEGIN
    ALTER TABLE public.appointments
    ADD CONSTRAINT prevent_overlapping_confirmed_appointments
    EXCLUDE USING gist (
        tstzrange(start_time, end_time) WITH &&
    )
    WHERE (status = 'CONFIRMED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 7. Atomic Approval Function (Pessimistic Locking & Conflict Check)
CREATE OR REPLACE FUNCTION rpc_approve_appointment(target_appointment_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    target_record RECORD;
    conflict_count INT;
BEGIN
    SELECT * INTO target_record
    FROM public.appointments
    WHERE id = target_appointment_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'Appointment does not exist');
    END IF;

    IF target_record.status = 'CONFIRMED' THEN
        RETURN jsonb_build_object('success', true, 'code', 'ALREADY_CONFIRMED', 'message', 'Appointment is already confirmed');
    END IF;

    IF target_record.status NOT IN ('PENDING') THEN
        RETURN jsonb_build_object('success', false, 'code', 'INVALID_TRANSITION', 'message', 'Only PENDING requests can be confirmed');
    END IF;

    SELECT COUNT(*) INTO conflict_count
    FROM public.appointments
    WHERE status = 'CONFIRMED'
      AND id != target_appointment_id
      AND tstzrange(start_time, end_time) && tstzrange(target_record.start_time, target_record.end_time);

    IF conflict_count > 0 THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'CONFLICT_OVERLAPPING_CONFIRMED',
            'message', 'Another confirmed appointment already occupies this time slot'
        );
    END IF;

    UPDATE public.appointments
    SET status = 'CONFIRMED',
        updated_at = NOW()
    WHERE id = target_appointment_id;

    RETURN jsonb_build_object('success', true, 'code', 'OK', 'message', 'Appointment successfully confirmed');
END;
$$;

-- 8. Row Level Security Policies
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Idempotent policy creation
DO $$ BEGIN
    CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Public can view shop settings" ON public.shop_settings FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Public can view blocked time boundaries" ON public.blocked_times FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Public can request appointment" ON public.appointments FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Public can view their appointment" ON public.appointments FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin full access shop_settings" ON public.shop_settings TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin full access services" ON public.services TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin full access blocked_times" ON public.blocked_times TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Admin full access appointments" ON public.appointments TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 9. Insert All 9 Authentic New Model Gents Parlor Services
INSERT INTO public.services (
    name, name_kn, slug, description, description_kn,
    duration_minutes, price, price_display, price_display_kn,
    display_order, badge, badge_kn
)
VALUES
    (
        'Haircut', 'ಹೇರ್ ಕಟಿಂಗ್', 'haircut',
        'Classic or modern cut with styling', 'ಕ್ಲಾಸಿಕ್ ಅಥವಾ ಮಾಡರ್ನ್ ಕಟ್, ಸ್ಟೈಲಿಂಗ್ ಸಹಿತ',
        30, 250, '₹250 – ₹300', '₹250 – ₹300',
        1, 'Essential', 'ಪ್ರಮುಖ'
    ),
    (
        'Shaving', 'ಶೇವಿಂಗ್', 'shaving',
        'Clean, smooth shave with a hot towel', 'ಬಿಸಿ ಟವೆಲ್ನೊಂದಿಗೆ ನುಣುಪಾದ ಶೇವ್',
        25, 150, '₹150 – ₹200', '₹150 – ₹200',
        2, NULL, NULL
    ),
    (
        'Beard Trim & Styling', 'ಗಡ್ಡ ಟ್ರಿಮ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್', 'beard-trim-styling',
        'Shaping, trimming and line-up', 'ಆಕಾರ, ಟ್ರಿಮ್ ಮತ್ತು ಲೈನ್-ಅಪ್',
        20, 150, '₹150', '₹150',
        3, NULL, NULL
    ),
    (
        'Haircut + Beard', 'ಕಟಿಂಗ್ + ಗಡ್ಡ', 'haircut-beard-package',
        'Combined package', 'ಒಟ್ಟಿಗೆ ಪ್ಯಾಕೇಜ್',
        45, 399, '₹399', '₹399',
        4, 'Popular', 'ಜನಪ್ರಿಯ'
    ),
    (
        'Head Massage', 'ಹೆಡ್ ಮಸಾಜ್', 'head-massage',
        'Relaxing oil massage', 'ಆರಾಮದಾಯಕ ಎಣ್ಣೆ ಮಸಾಜ್',
        25, 200, '₹200', '₹200',
        5, NULL, NULL
    ),
    (
        'Facial / Cleanup', 'ಫೇಶಿಯಲ್ / ಕ್ಲೀನಪ್', 'facial-cleanup',
        'Skin cleansing and refresh', 'ಚರ್ಮದ ಶುದ್ಧೀಕರಣ ಮತ್ತು ಹೊಳಪು',
        35, 250, '₹250', '₹250',
        6, NULL, NULL
    ),
    (
        'Hair Colour / Mehendi', 'ಹೇರ್ ಕಲರ್ / ಮೆಹೆಂದಿ', 'hair-colour-mehendi',
        'Black, brown or natural colour', 'ಕಪ್ಪು, ಕಂದು ಅಥವಾ ನೈಸರ್ಗಿಕ ಬಣ್ಣ',
        40, 200, '₹200', '₹200',
        7, NULL, NULL
    ),
    (
        'Kids’ Haircut', 'ಮಕ್ಕಳ ಕಟಿಂಗ್', 'kids-haircut',
        'Gentle, patient service for children', 'ಮಕ್ಕಳಿಗೆ ತಾಳ್ಮೆಯ, ಮೃದುವಾದ ಸೇವೆ',
        25, 150, '₹150', '₹150',
        8, NULL, NULL
    ),
    (
        'Groom Package', 'ಗ್ರೂಮ್ ಪ್ಯಾಕೇಜ್', 'groom-package',
        'Haircut, shave, facial and styling for weddings and functions', 'ಮದುವೆ ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಕಟಿಂಗ್, ಶೇವ್, ಫೇಶಿಯಲ್ ಮತ್ತು ಸ್ಟೈಲಿಂಗ್',
        90, 2999, '₹2,999', '₹2,999',
        9, 'Special', 'ವಿಶೇಷ'
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    name_kn = EXCLUDED.name_kn,
    description = EXCLUDED.description,
    description_kn = EXCLUDED.description_kn,
    duration_minutes = EXCLUDED.duration_minutes,
    price = EXCLUDED.price,
    price_display = EXCLUDED.price_display,
    price_display_kn = EXCLUDED.price_display_kn,
    display_order = EXCLUDED.display_order,
    badge = EXCLUDED.badge,
    badge_kn = EXCLUDED.badge_kn;

-- 10. Insert Default Shop Settings for New Model Gents Parlor
INSERT INTO public.shop_settings (
    id,
    shop_name,
    shop_name_kn,
    tagline,
    tagline_kn,
    owner_name,
    owner_name_kn,
    since_year,
    phone_number,
    whatsapp_number,
    address,
    address_kn,
    google_maps_url,
    currency_code,
    currency_symbol,
    slot_interval_minutes,
    buffer_minutes,
    opening_time,
    closing_time,
    operating_days,
    is_closed,
    closure_reason,
    closure_date,
    closure_reopen_date
)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'New Model Gents Parlor',
    'ನ್ಯೂ ಮಾಡೆಲ್ ಜೆಂಟ್ಸ್ ಪಾರ್ಲರ್',
    'Look sharp. Feel confident.',
    'ಸ್ಟೈಲಿಶ್ ಆಗಿರಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದಿರಿ.',
    'Hanumanthu (Chinanna)',
    'ಹನುಮಂತು (ಚಿನ್ನಣ್ಣ)',
    '2010',
    '+91 73380 76977',
    '917338076977',
    'Katte Complex, Thirthahalli, Shivamogga – 577432',
    'ಕಟ್ಟೆ ಕಾಂಪ್ಲೆಕ್ಸ್, ತೀರ್ಥಹಳ್ಳಿ, ಶಿವಮೊಗ್ಗ – 577432',
    'https://www.google.com/maps/search/?api=1&query=Katte+Complex%2C+Thirthahalli%2C+Shivamogga',
    'INR',
    '₹',
    30,
    5,
    '06:30:00',
    '23:00:00',
    '{1,2,3,4,5,6,7}',
    false,
    '',
    '',
    ''
)
ON CONFLICT (id) DO UPDATE SET
    shop_name = EXCLUDED.shop_name,
    shop_name_kn = EXCLUDED.shop_name_kn,
    tagline = EXCLUDED.tagline,
    tagline_kn = EXCLUDED.tagline_kn,
    owner_name = EXCLUDED.owner_name,
    owner_name_kn = EXCLUDED.owner_name_kn,
    since_year = EXCLUDED.since_year,
    phone_number = EXCLUDED.phone_number,
    whatsapp_number = EXCLUDED.whatsapp_number,
    address = EXCLUDED.address,
    address_kn = EXCLUDED.address_kn,
    google_maps_url = EXCLUDED.google_maps_url,
    opening_time = EXCLUDED.opening_time,
    closing_time = EXCLUDED.closing_time,
    operating_days = EXCLUDED.operating_days;

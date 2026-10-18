-- ==============================================================================
-- RITUALCUT: Production PostgreSQL Database Schema & GiST Concurrency Protection
-- Run this script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- 2. Shop Settings Table
CREATE TABLE IF NOT EXISTS public.shop_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_name TEXT NOT NULL DEFAULT 'RITUALCUT',
    tagline TEXT DEFAULT 'Your Style. Your Time. Your Ritual.',
    phone_number TEXT NOT NULL DEFAULT '+91 98765 43210',
    whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
    address TEXT NOT NULL DEFAULT '42 Artisan Lane, Jubilee Enclave, Hyderabad',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Artisan+Barbershop',
    currency_code TEXT NOT NULL DEFAULT 'INR',
    currency_symbol TEXT NOT NULL DEFAULT '₹',
    slot_interval_minutes INT NOT NULL DEFAULT 30,
    buffer_minutes INT NOT NULL DEFAULT 5,
    opening_time TIME NOT NULL DEFAULT '09:00:00',
    closing_time TIME NOT NULL DEFAULT '20:00:00',
    operating_days INT[] NOT NULL DEFAULT '{1,2,3,4,5,6,7}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    price INT NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- 7. Atomic Approval Function (Pessimistic Locking)
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

-- 9. Insert Default Services
INSERT INTO public.services (name, slug, description, duration_minutes, price, display_order, badge)
VALUES
    ('The Master Ritual', 'the-master-ritual', 'Our definitive grooming experience: bespoke tailored haircut, charcoal detox wash, hot towel facial massage, straight razor neck clean, and styling consultation.', 60, 1200, 1, 'Signature'),
    ('Classic Scissor & Fade', 'classic-scissor-fade', 'Precision taper or skin fade executed with Japanese shears and fine clippers, followed by styling and organic matte clay finish.', 45, 750, 2, 'Popular'),
    ('Royal Hot Towel Shave', 'royal-hot-towel-shave', 'Old-school straight razor traditional shave with eucalyptus pre-shave oil, two steamed herbal towels, badger brush lather, and cold compress astringent.', 40, 650, 3, NULL),
    ('Beard Sculpt & Ozone Hydration', 'beard-sculpt-hydration', 'Meticulous beard reshaping, sharp razor cheek lines, high-frequency ozone steam, and conditioning botanical argan oil infusion.', 35, 550, 4, NULL),
    ('The Executive Quick Touchup', 'executive-touchup', 'Neckline cleanup, sideburn tapering, eyebrow shaping, and scalp refresh for gentlemen between major appointments.', 25, 450, 5, NULL)
ON CONFLICT (slug) DO NOTHING;

-- 10. Insert Default Settings
INSERT INTO public.shop_settings (id, shop_name, tagline, phone_number, whatsapp_number, address, google_maps_url)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'RITUALCUT',
    'Your Style. Your Time. Your Ritual.',
    '+91 98765 43210',
    '919876543210',
    '42 Artisan Lane, Jubilee Enclave, Hyderabad',
    'https://maps.google.com/?q=Artisan+Barbershop'
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE pet_type AS ENUM ('dog', 'cat', 'bird', 'reptile', 'fish', 'other');
CREATE TYPE appointment_status AS ENUM ('pending', 'approved', 'rejected', 'completed', 'cancelled');

-- Create caregivers table
CREATE TABLE caregivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    specialization TEXT[] DEFAULT '{}',
    bio TEXT,
    experience_years INTEGER DEFAULT 0,
    avatar_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pets table
CREATE TABLE pets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type pet_type NOT NULL,
    breed VARCHAR(255),
    age INTEGER,
    weight DECIMAL(5,2),
    has_paws BOOLEAN DEFAULT false,
    has_claws BOOLEAN DEFAULT false,
    special_needs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    caregiver_id UUID REFERENCES caregivers(id) ON DELETE CASCADE,
    pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    description TEXT NOT NULL,
    status appointment_status DEFAULT 'pending',
    pet_type VARCHAR(50) NOT NULL,
    pet_name VARCHAR(255),
    special_requirements TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointment slots table
CREATE TABLE appointment_slots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    caregiver_id UUID REFERENCES caregivers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_caregiver_id ON appointments(caregiver_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointment_slots_caregiver_date ON appointment_slots(caregiver_id, date);
CREATE INDEX idx_caregivers_available ON caregivers(is_available);

-- Enable Row Level Security
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to caregivers and appointment slots
CREATE POLICY "Public can view available caregivers" ON caregivers
    FOR SELECT USING (is_available = true);

CREATE POLICY "Public can view available appointment slots" ON appointment_slots
    FOR SELECT USING (is_available = true);

-- Create policies for appointment management
CREATE POLICY "Anyone can create appointments" ON appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Caregivers can view their appointments" ON appointments
    FOR SELECT USING (
        caregiver_id IN (
            SELECT id FROM caregivers WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Caregivers can update their appointments" ON appointments
    FOR UPDATE USING (
        caregiver_id IN (
            SELECT id FROM caregivers WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Insert sample data
INSERT INTO caregivers (name, email, specialization, bio, experience_years, avatar_url) VALUES
('Dr. Sarah Johnson', 'sarah.johnson@petvet.com', ARRAY['dogs', 'cats'], 'Specialized in small animal care with 8 years of experience. Passionate about helping pets live their happiest, healthiest lives! 🐕❤️', 8, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face'),
('Dr. Mike Chen', 'mike.chen@petvet.com', ARRAY['birds', 'reptiles'], 'Exotic animal specialist with expertise in avian and reptile care. Love working with unique pets! 🦎🐦', 6, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'),
('Dr. Emily Rodriguez', 'emily.rodriguez@petvet.com', ARRAY['cats', 'dogs', 'fish'], 'Comprehensive pet care specialist with focus on preventive medicine. Your pet''s wellness is my priority! 🐱💙', 10, 'https://images.unsplash.com/photo-1594824388852-8a0a4b0b0b0b?w=300&h=300&fit=crop&crop=face'),
('Dr. James Wilson', 'james.wilson@petvet.com', ARRAY['reptiles', 'birds'], 'Exotic pet veterinarian with special interest in behavioral issues. Every pet deserves understanding and care! 🦜🌟', 7, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face');

-- Insert sample appointment slots
INSERT INTO appointment_slots (caregiver_id, date, start_time, end_time) 
SELECT 
    c.id,
    CURRENT_DATE + INTERVAL '1 day' + (s.day_offset || ' days')::INTERVAL,
    s.start_time::TIME,
    s.end_time::TIME
FROM caregivers c
CROSS JOIN (
    VALUES 
        (0, '09:00', '10:00'),
        (0, '10:00', '11:00'),
        (0, '11:00', '12:00'),
        (0, '14:00', '15:00'),
        (0, '15:00', '16:00'),
        (1, '09:00', '10:00'),
        (1, '10:00', '11:00'),
        (1, '14:00', '15:00'),
        (2, '09:00', '10:00'),
        (2, '10:00', '11:00'),
        (2, '11:00', '12:00'),
        (2, '14:00', '15:00'),
        (2, '15:00', '16:00'),
        (2, '16:00', '17:00'),
        (3, '09:00', '10:00'),
        (3, '10:00', '11:00'),
        (3, '14:00', '15:00'),
        (3, '15:00', '16:00')
) AS s(day_offset, start_time, end_time)
WHERE c.is_available = true;

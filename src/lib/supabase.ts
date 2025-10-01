import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'bird' | 'reptile' | 'fish' | 'other'
  breed?: string
  age?: number
  weight?: number
  has_paws: boolean
  has_claws: boolean
  special_needs?: string
  created_at: string
  updated_at: string
}

export interface Caregiver {
  id: string
  name: string
  email: string
  specialization: string[]
  bio?: string
  experience_years: number
  avatar_url?: string
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  caregiver_id: string
  pet_id?: string
  client_name: string
  client_email: string
  client_phone?: string
  appointment_date: string
  appointment_time: string
  description: string
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'
  pet_type: string
  pet_name?: string
  special_requirements?: string
  created_at: string
  updated_at: string
  caregiver?: Caregiver
}

export interface AppointmentSlot {
  id: string
  caregiver_id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
  caregiver?: Caregiver
}

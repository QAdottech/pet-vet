import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CaregiverProfile from '@/components/CaregiverProfile'
import Header from '@/components/Header'

interface CaregiverPageProps {
  params: {
    id: string
  }
}

export default async function CaregiverPage({ params }: CaregiverPageProps) {
  const { id } = await params

  const { data: caregiver, error } = await supabase
    .from('caregivers')
    .select('*')
    .eq('id', id)
    .eq('is_available', true)
    .single()

  if (error || !caregiver) {
    notFound()
  }

  const { data: appointmentSlots } = await supabase
    .from('appointment_slots')
    .select('*')
    .eq('caregiver_id', id)
    .eq('is_available', true)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <CaregiverProfile
          caregiver={caregiver}
          availableSlots={appointmentSlots || []}
        />
      </main>
    </div>
  )
}

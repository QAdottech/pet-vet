'use client'

import { useState, useEffect } from 'react'
import { supabase, type Caregiver, type AppointmentSlot } from '@/lib/supabase'
import CaregiverCard from './CaregiverCard'
import LoadingSpinner from './LoadingSpinner'

interface FilterState {
  petType: string[]
  hasPaws: boolean | null
  hasClaws: boolean | null
  specialization: string[]
  experience: number | null
}

export default function AppointmentGrid() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([])
  const [appointmentSlots, setAppointmentSlots] = useState<AppointmentSlot[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [filters] = useState<FilterState>({
    petType: [],
    hasPaws: null,
    hasClaws: null,
    specialization: [],
    experience: null,
  })

  useEffect(() => {
    fetchCaregivers()
  }, [])

  useEffect(() => {
    if (caregivers.length > 0) {
      fetchAppointmentSlots()
    }
  }, [caregivers]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCaregivers = async () => {
    try {
      const { data, error } = await supabase
        .from('caregivers')
        .select('*')
        .eq('is_available', true)
        .order('experience_years', { ascending: false })

      if (error) throw error
      setCaregivers(data || [])
    } catch (error) {
      console.error('Error fetching caregivers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAppointmentSlots = async () => {
    try {
      const caregiverIds = caregivers.map((c) => c.id)
      const { data, error } = await supabase
        .from('appointment_slots')
        .select(
          `
          *,
          caregiver:caregivers(*)
        `
        )
        .in('caregiver_id', caregiverIds)
        .eq('is_available', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) throw error
      setAppointmentSlots(data || [])
    } catch (error) {
      console.error('Error fetching appointment slots:', error)
    }
  }

  const filteredCaregivers = caregivers.filter((caregiver) => {
    // Pet type filter
    if (filters.petType.length > 0) {
      const hasMatchingSpecialization = filters.petType.some((type) =>
        caregiver.specialization.includes(type)
      )
      if (!hasMatchingSpecialization) return false
    }

    // Specialization filter
    if (filters.specialization.length > 0) {
      const hasMatchingSpecialization = filters.specialization.some((spec) =>
        caregiver.specialization.includes(spec)
      )
      if (!hasMatchingSpecialization) return false
    }

    // Experience filter
    if (
      filters.experience !== null &&
      caregiver.experience_years < filters.experience
    ) {
      return false
    }

    return true
  })

  const getAvailableSlotsForCaregiver = (caregiverId: string) => {
    return appointmentSlots.filter((slot) => slot.caregiver_id === caregiverId)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Veterinarians
          </h2>
          <p className="text-gray-600">Find the perfect care for your pet</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border-2 border-blue-200">
          <span className="text-sm font-medium text-gray-700">
            {filteredCaregivers.length} caregiver
            {filteredCaregivers.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {filteredCaregivers.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No caregivers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 lg:gap-8">
          {filteredCaregivers.map((caregiver, index) => (
            <div
              key={caregiver.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CaregiverCard
                caregiver={caregiver}
                availableSlots={getAvailableSlotsForCaregiver(caregiver.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

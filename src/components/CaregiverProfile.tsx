'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Clock, Calendar, Award } from 'lucide-react'
import { type Caregiver, type AppointmentSlot } from '@/lib/supabase'
import BookingModal from './BookingModal'

interface CaregiverProfileProps {
  caregiver: Caregiver
  availableSlots: AppointmentSlot[]
}

export default function CaregiverProfile({
  caregiver,
  availableSlots,
}: CaregiverProfileProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

  const getSpecializationEmojis = (specializations: string[]) => {
    const emojiMap: Record<string, string> = {
      dogs: '🐕',
      cats: '🐱',
      birds: '🐦',
      reptiles: '🦎',
      fish: '🐠',
      exotic: '🦜',
      emergency: '🚨',
      surgery: '⚕️',
    }

    return specializations.map((spec) => emojiMap[spec] || '🐾').join(' ')
  }

  const handleSlotSelect = (slot: AppointmentSlot) => {
    setSelectedSlot(slot)
    setIsBookingModalOpen(true)
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const groupSlotsByDate = () => {
    const grouped: Record<string, AppointmentSlot[]> = {}
    availableSlots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = []
      }
      grouped[slot.date].push(slot)
    })
    return grouped
  }

  const groupedSlots = groupSlotsByDate()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              {caregiver.avatar_url ? (
                <Image
                  src={caregiver.avatar_url}
                  alt={caregiver.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                  {caregiver.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {caregiver.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">4.9</span>
                    <span>(127 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-5 w-5 text-blue-500" />
                    <span>{caregiver.experience_years} years experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {caregiver.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </span>
                ))}
              </div>
              <div className="text-3xl">
                {getSpecializationEmojis(caregiver.specialization)}
              </div>
            </div>

            {/* Bio */}
            {caregiver.bio && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">{caregiver.bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {caregiver.experience_years}
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">4.9</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">127</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {availableSlots.length}
                </div>
                <div className="text-sm text-gray-600">Available Slots</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Appointments
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>{availableSlots.length} slots available</span>
          </div>
        </div>

        {Object.keys(groupedSlots).length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No available appointments
            </h3>
            <p className="text-gray-600">
              This caregiver doesn&apos;t have any available slots at the
              moment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {formatDate(date)}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {formatTime(slot.start_time)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {formatTime(slot.end_time)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedSlot && (
        <BookingModal
          caregiver={caregiver}
          slot={selectedSlot}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false)
            setSelectedSlot(null)
          }}
        />
      )}
    </div>
  )
}

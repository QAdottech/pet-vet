import Link from 'next/link'
import Image from 'next/image'
import { Star, Clock, Calendar } from 'lucide-react'
import { type Caregiver, type AppointmentSlot } from '@/lib/supabase'

interface CaregiverCardProps {
  caregiver: Caregiver
  availableSlots: AppointmentSlot[]
}

export default function CaregiverCard({
  caregiver,
  availableSlots,
}: CaregiverCardProps) {
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

  const getNextAvailableSlot = () => {
    if (availableSlots.length === 0) return null
    return availableSlots[0]
  }

  const nextSlot = getNextAvailableSlot()

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl border border-white/30 hover:bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
      <div className="p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start space-x-5 mb-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-fuchsia-100 flex-shrink-0 ring-4 ring-white/50 group-hover:ring-violet-200 transition-all duration-300">
            {caregiver.avatar_url ? (
              <Image
                src={caregiver.avatar_url}
                alt={caregiver.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl">
                {caregiver.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
              {caregiver.name}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.9</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="font-medium">
                {caregiver.experience_years} years exp.
              </span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-semibold text-gray-600 tracking-wide">
              Specializes in:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {caregiver.specialization.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center px-3 py-1.5 rounded-2xl text-xs font-semibold bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 border border-violet-200"
              >
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </span>
            ))}
          </div>
          <div className="text-4xl flex justify-center group-hover:animate-bounce-gentle">
            {getSpecializationEmojis(caregiver.specialization)}
          </div>
        </div>

        {/* Bio */}
        {caregiver.bio && (
          <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
            {caregiver.bio}
          </p>
        )}

        {/* Availability */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 mb-6 border border-white/40">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4 text-cyan-600" />
              <span className="font-medium">
                {availableSlots.length} slots available
              </span>
            </div>
          </div>

          {nextSlot && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                Next: {new Date(nextSlot.date).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-2">
          <Link
            href={`/caregiver/${caregiver.id}`}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 text-center block hover:scale-105 tracking-wide"
          >
            View Profile & Book
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

interface FilterState {
  petType: string[]
  hasPaws: boolean | null
  hasClaws: boolean | null
  specialization: string[]
  experience: number | null
}

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    petType: [],
    hasPaws: null,
    hasClaws: null,
    specialization: [],
    experience: null,
  })

  const [isOpen, setIsOpen] = useState(false)

  const petTypes = [
    { value: 'dog', label: 'Dogs', emoji: '🐕' },
    { value: 'cat', label: 'Cats', emoji: '🐱' },
    { value: 'bird', label: 'Birds', emoji: '🐦' },
    { value: 'reptile', label: 'Reptiles', emoji: '🦎' },
    { value: 'fish', label: 'Fish', emoji: '🐠' },
    { value: 'other', label: 'Other', emoji: '🐾' },
  ]

  const specializations = [
    'dogs',
    'cats',
    'birds',
    'reptiles',
    'fish',
    'exotic',
    'emergency',
    'surgery',
  ]

  const updateFilter = (
    key: keyof FilterState,
    value: string | string[] | boolean | number | null
  ) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const toggleArrayFilter = (
    key: 'petType' | 'specialization',
    value: string
  ) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    const clearedFilters = {
      petType: [],
      hasPaws: null,
      hasClaws: null,
      specialization: [],
      experience: null,
    }
    setFilters(clearedFilters)
    onFilterChange?.(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== null
  )

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-3xl border border-white/30 mb-6 hover:bg-white hover:shadow-soft transition-all duration-300"
      >
        <Filter className="h-5 w-5 text-violet-600" />
        <span className="font-semibold text-gray-700">Filters</span>
        {hasActiveFilters && (
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
            {Object.values(filters).reduce(
              (count, value) =>
                count +
                (Array.isArray(value) ? value.length : value !== null ? 1 : 0),
              0
            )}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
         ${
           isOpen
             ? 'fixed inset-0 z-50 xl:relative xl:inset-auto'
             : 'hidden xl:block'
         }
         bg-white/90 backdrop-blur-sm rounded-3xl border border-white/30 p-8 shadow-lg
       `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-8 xl:hidden">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 hover:bg-white/50 rounded-2xl transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Pet Type Filter */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-white/40">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">🐾</span>
              Pet Type
            </h3>
            <div className="space-y-3">
              {petTypes.map((type) => (
                <label
                  key={type.value}
                  className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group"
                >
                  <input
                    type="checkbox"
                    checked={filters.petType.includes(type.value)}
                    onChange={() => toggleArrayFilter('petType', type.value)}
                    className="rounded-lg border-gray-300 text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    <span className="text-lg mr-2">{type.emoji}</span>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Physical Features */}
          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-6 border border-white/40">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">✨</span>
              Physical Features
            </h3>
            <div className="space-y-3">
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasPaws"
                    checked={filters.hasPaws === true}
                    onChange={() => updateFilter('hasPaws', true)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    🐾 Has Paws
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasPaws"
                    checked={filters.hasPaws === false}
                    onChange={() => updateFilter('hasPaws', false)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    🦎 No Paws
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasPaws"
                    checked={filters.hasPaws === null}
                    onChange={() => updateFilter('hasPaws', null)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    Any
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Claws Filter */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-white/40">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">🦅</span>
              Claws
            </h3>
            <div className="space-y-3">
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasClaws"
                    checked={filters.hasClaws === true}
                    onChange={() => updateFilter('hasClaws', true)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    🦅 Has Claws
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasClaws"
                    checked={filters.hasClaws === false}
                    onChange={() => updateFilter('hasClaws', false)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    🐠 No Claws
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                  <input
                    type="radio"
                    name="hasClaws"
                    checked={filters.hasClaws === null}
                    onChange={() => updateFilter('hasClaws', null)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    Any
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Specialization Filter */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-white/40">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">🏥</span>
              Specialization
            </h3>
            <div className="space-y-3">
              {specializations.map((spec) => (
                <label
                  key={spec}
                  className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group"
                >
                  <input
                    type="checkbox"
                    checked={filters.specialization.includes(spec)}
                    onChange={() => toggleArrayFilter('specialization', spec)}
                    className="rounded-lg border-gray-300 text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 capitalize font-semibold group-hover:text-gray-800">
                    {spec}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-white/40">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <span className="text-2xl mr-3">⭐</span>
              Experience (Years)
            </h3>
            <div className="space-y-3">
              {[1, 3, 5, 10].map((years) => (
                <label
                  key={years}
                  className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group"
                >
                  <input
                    type="radio"
                    name="experience"
                    checked={filters.experience === years}
                    onChange={() => updateFilter('experience', years)}
                    className="text-violet-600 focus:ring-violet-500 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                    {years}+ years
                  </span>
                </label>
              ))}
              <label className="flex items-center space-x-4 cursor-pointer p-3 rounded-xl hover:bg-white/50 transition-all duration-200 group">
                <input
                  type="radio"
                  name="experience"
                  checked={filters.experience === null}
                  onChange={() => updateFilter('experience', null)}
                  className="text-soft-violet focus:ring-soft-violet/20 w-5 h-5"
                />
                <span className="text-sm text-gray-700 font-semibold group-hover:text-gray-800">
                  Any
                </span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full text-sm text-violet-600 hover:text-fuchsia-600 font-semibold px-6 py-4 rounded-2xl transition-all duration-300 bg-white/50 hover:bg-white hover:shadow-lg"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

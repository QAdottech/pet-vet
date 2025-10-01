import { Suspense } from 'react'
import AppointmentGrid from '@/components/AppointmentGrid'
import FilterSidebar from '@/components/FilterSidebar'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      {/* Modern gradient background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/30 via-transparent to-rose-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>

      <Header />

      <main className="container mx-auto px-6 py-12 relative z-10 max-w-7xl">
        <div className="text-center mb-24 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight tracking-tight">
            Find the Perfect Care for Your
            <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Furry Friends
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16 font-light">
            Connect with experienced veterinarians for online consultations.
            Whether your pet has paws, claws, or scales - we&apos;ve got you
            covered!
          </p>

          {/* Modern feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                🐕
              </div>
              <div className="text-sm font-semibold text-gray-700 tracking-wide">
                Dogs & Cats
              </div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                🐦
              </div>
              <div className="text-sm font-semibold text-gray-700 tracking-wide">
                Birds & Reptiles
              </div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                ⚡
              </div>
              <div className="text-sm font-semibold text-gray-700 tracking-wide">
                Instant Booking
              </div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                🏆
              </div>
              <div className="text-sm font-semibold text-gray-700 tracking-wide">
                Expert Care
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
          {/* Filter Sidebar */}
          <aside className="xl:col-span-3">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <section className="xl:col-span-9">
            <div className="bg-white/60 backdrop-blur-sm rounded-4xl p-8 shadow-soft border border-white/30">
              <Suspense fallback={<LoadingSpinner />}>
                <AppointmentGrid />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

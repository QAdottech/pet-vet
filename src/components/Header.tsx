import Link from 'next/link'
import { Heart, User, Calendar } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-3 rounded-2xl group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              PetVet
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className="text-gray-600 hover:text-violet-600 transition-colors font-medium relative group py-2"
            >
              Find Care
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-violet-600 transition-colors font-medium relative group py-2"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-violet-600 transition-colors font-medium relative group py-2"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/caregiver/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-violet-600 transition-colors font-medium px-4 py-2 rounded-2xl hover:bg-white/50"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Caregiver Login</span>
            </Link>
            <Link
              href="/appointments"
              className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 font-medium hover:scale-105"
            >
              <Calendar className="h-4 w-4" />
              <span>My Appointments</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

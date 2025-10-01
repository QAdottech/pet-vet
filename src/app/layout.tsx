import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetVet - Online Veterinary Care',
  description:
    "Connect with experienced veterinarians for online consultations. Whether your pet has paws, claws, or scales - we've got you covered!",
  keywords:
    'veterinary, online vet, pet care, animal health, veterinary consultation',
  authors: [{ name: 'PetVet Team' }],
  openGraph: {
    title: 'PetVet - Online Veterinary Care',
    description:
      'Connect with experienced veterinarians for online consultations',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

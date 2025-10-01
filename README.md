# PetVet - Online Veterinary Clinic

A modern Next.js application for online veterinary consultations, allowing pet owners to book appointments with experienced veterinarians and caregivers to manage their schedules.

## Features

### Public Site

- **Appointment Browsing**: Browse available veterinarians with filtering options
- **Advanced Filtering**: Filter by pet type (dogs, cats, birds, reptiles, fish), physical features (paws, claws), specialization, and experience
- **Caregiver Profiles**: Detailed profiles with specializations, experience, and availability
- **Appointment Booking**: Comprehensive booking form with pet information and visit description

### Caregiver Dashboard

- **Authentication**: Secure login system for caregivers
- **Appointment Management**: View, approve, or reject appointment requests
- **Status Tracking**: Track appointment status (pending, approved, rejected, completed)
- **Client Information**: Access to client and pet details for each appointment

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, authentication, real-time)
- **UI Components**: Custom components with Lucide React icons
- **Styling**: Tailwind CSS with custom gradients and animations

## Database Schema

### Tables

- `caregivers`: Veterinarian information and specializations
- `appointments`: Client appointments and booking details
- `appointment_slots`: Available time slots for booking
- `pets`: Pet information (optional, for future use)

### Key Features

- Row Level Security (RLS) for data protection
- Real-time updates for appointment status
- Comprehensive filtering and search capabilities

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pet-vet
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

4. Set up the database:
   Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor to create the necessary tables and sample data.

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Pet Owners

1. Browse available veterinarians on the homepage
2. Use filters to find the right specialist for your pet
3. Click on a caregiver to view their detailed profile
4. Select an available time slot
5. Fill out the booking form with your and your pet's information
6. Submit the appointment request

### For Caregivers

1. Navigate to `/caregiver/login`
2. Sign in with your credentials
3. Access the dashboard to view appointment requests
4. Approve or reject appointments as needed
5. Track appointment status and client information

## Sample Data

The application includes sample data with 4 veterinarians:

- Dr. Sarah Johnson (Dogs, Cats)
- Dr. Mike Chen (Birds, Reptiles)
- Dr. Emily Rodriguez (Cats, Dogs, Fish)
- Dr. James Wilson (Reptiles, Birds)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── caregiver/         # Caregiver-specific pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── AppointmentGrid.tsx
│   ├── BookingModal.tsx
│   ├── CaregiverCard.tsx
│   ├── CaregiverProfile.tsx
│   ├── FilterSidebar.tsx
│   ├── Header.tsx
│   └── LoadingSpinner.tsx
└── lib/
    └── supabase.ts        # Supabase client and types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.

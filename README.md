# UpWaiter

A modern job platform connecting hospitality professionals with restaurants and hospitality businesses across Italy.

## Overview

UpWaiter is a specialized job marketplace designed for the hospitality industry, making it easy for waiters and service staff to find opportunities and for restaurants to discover talented professionals. Built with Next.js 14 and modern web technologies, the platform provides a seamless experience for both job seekers and employers.

## Features

### For Waiters
- **Professional Profiles**: Create and manage detailed resumes with experience, languages, and availability
- **Job Discovery**: Browse job posts filtered by location (region, province, municipality)
- **Easy Applications**: Apply to positions with one click
- **Application Tracking**: Monitor all applications in one place

### For Companies
- **Company Profiles**: Showcase your restaurant or hospitality business
- **Job Posting**: Create and manage job advertisements
- **Applicant Management**: Review applications and connect with candidates
- **Location-Based Targeting**: Post jobs for specific Italian locations

### Platform Features
- **Bilingual Support**: Full English and Italian translations
- **Location Intelligence**: Granular location selection (Italian regions, provinces, municipalities)
- **Secure Authentication**: User authentication powered by Stack Auth
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type Safety**: Built with TypeScript for reliability and maintainability

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **TanStack React Query**: Server state management
- **next-intl**: Internationalization (i18n)
- **React Hook Form**: Form handling with Zod validation
- **Shadcn/ui**: Accessible component library

### Backend
- **Prisma ORM**: Type-safe database access
- **PostgreSQL**: Relational database
- **Stack Auth**: Authentication and user management

### Development Tools
- **Biome**: Fast linter and formatter
- **TypeScript**: Static type checking

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Stack Auth account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd upwaiter-v2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_STACK_PROJECT_ID="your_stack_project_id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your_stack_key"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
upwaiter-v2/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable React components
│   ├── services/       # API service layer
│   ├── schemas/        # Zod validation schemas
│   ├── types/          # TypeScript type definitions
│   ├── store/          # State management (Zustand)
│   ├── utils/          # Utility functions and providers
│   └── i18n/           # Internationalization config
├── messages/           # Translation files (en-US, it-IT)
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:error` - Show only linting errors
- `npm run format` - Format code with Biome

## Database Schema

The platform uses Prisma with PostgreSQL and includes the following main entities:
- **Waiter**: Service professional profiles
- **Company**: Restaurant/business profiles
- **JobPost**: Job advertisements
- **Application**: Job applications
- **Location**: Italian geographic data (regions, provinces, municipalities)

## Internationalization

UpWaiter supports English and Italian with the following configuration:
- Default locale: English (en-US)
- Supported locales: en-US, it-IT
- Translation files: `/messages/en-US.json`, `/messages/it-IT.json`
- URL strategy: No locale prefix in URLs (automatic detection)

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Run linting and type checks
5. Submit a pull request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team

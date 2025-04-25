# XPulse - Gamify Your Life 🎮

XPulse is a modern habit-tracking application that turns your daily tasks into an engaging RPG-like experience. Level up your life by completing quests, earning XP, and unlocking rewards!

## Features ✨

- **Quest System**: Complete daily quests to earn XP
- **Reward System**: Spend earned XP on customizable rewards
- **Quest Types**: Various quest categories (Focus, Creativity, Physical, Learning, Social, Wellness)
- **Progress Tracking**: Track your active quests and rewards with built-in timers
- **Points Management**: Dynamic XP system that updates in real-time
- **Modern UI**: Beautiful, responsive design with dark mode support
- **Secure Authentication**: User authentication and data protection

## Tech Stack 🛠

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **State Management**: Zustand
- **UI Components**: Radix UI primitives
- **Type Safety**: TypeScript

## Project Structure 📁

```
xpulse/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # Backend API endpoints
│   ├── dashboard/         # Dashboard pages
│   └── components/        # App-specific components
├── components/            # Shared UI components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and database
│   ├── db.ts             # Database client
│   ├── store.ts          # Zustand store
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── prisma/               # Database schema and migrations
```

## Getting Started 🚀

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/xpulse.git
   cd xpulse
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:

   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key

   # Database
   DATABASE_URL="your_database_url"
   ```

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features in Detail 🎯

### Quests

- Create custom quests with titles, descriptions, and durations
- Choose from multiple quest types (Focus, Creativity, Physical, etc.)
- Track quest progress with built-in timers
- Earn XP upon quest completion

### Rewards

- Create personalized rewards
- Set XP costs for rewards
- Time-based reward system
- Track claimed rewards

### Points System

- Earn XP by completing quests
- Spend XP on rewards
- Real-time points tracking
- Persistent points storage

## Acknowledgments 🙏

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.dev/)
- Database ORM by [Prisma](https://www.prisma.io/)

# XPulse - Gamify Your Life 🎮

XPulse is a modern habit-tracking application that turns your daily tasks into an engaging RPG-like experience. Level up your life by completing tasks, earning points, and unlocking rewards!

## Features ✨

- **Task-Based Point System**: Earn points by completing daily tasks and challenges
- **Photo Proof**: Upload photos to verify task completion for bonus points
- **Reward System**: Spend earned points on customizable rewards
- **Time Management**: Built-in timer for tasks and rewards
- **PWA Support**: Install as a native app on any device
- **Real-time Notifications**: Get notified when timers end
- **Modern UI**: Beautiful, responsive design with dark mode support

## Tech Stack 🛠

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + ShadcnUI
- **Authentication**: Clerk Auth
- **PWA**: next-pwa
- **UI Components**: Radix UI
- **Notifications**: Web Push API

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

3. Create a `.env.local` file with your Clerk credentials:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure 📁

```
xpulse/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # ShadcnUI components
│   └── ...                # Custom components
├── lib/                   # Utility functions
├── public/                # Static assets
└── ...
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Inspired by [Habitica](https://habitica.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication by [Clerk](https://clerk.dev/)

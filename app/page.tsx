
import { auth } from "@clerk/nextjs";
import { NavBar } from "@/components/nav-bar";
import { AuthButtons } from "@/components/auth-buttons";
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();
  if (userId) {
    redirect('/dashboard');
  }
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Level Up Your Life with XPulse
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your daily habits into an epic adventure. Complete
                  tasks, earn points, and unlock rewards in this gamified
                  productivity app.
                </p>
              </div>
              <AuthButtons />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full shadow-lg dark:bg-gray-900">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Earn Points</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete tasks and daily challenges to earn experience points
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full shadow-lg dark:bg-gray-900">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor your growth with detailed statistics and achievements
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full shadow-lg dark:bg-gray-900">
                  <svg
                    className=" h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 19V5" />
                    <path d="M20 19V5" />
                    <path d="M6 19h14" />
                    <path d="M6 5h14" />
                    <path d="M9 9h1" />
                    <path d="M9 15h1" />
                    <path d="M14 9h1" />
                    <path d="M14 15h1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Unlock Rewards</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Use your points to unlock rewards and special features
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 XPulse. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
              <a
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-sm hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}


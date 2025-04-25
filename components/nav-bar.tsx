"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { usePointsStore } from "@/lib/store";

export function NavBar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const points = usePointsStore((state) => state.points);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">XPulse</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <SignedIn>
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Points:</span>
                <span className="font-bold text-primary">{points}</span>
              </div>
            </SignedIn>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {deferredPrompt && (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={handleInstallClick}
              >
                <Download className="mr-2 h-4 w-4" />
                Install App
              </Button>
            )}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </SignedIn>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

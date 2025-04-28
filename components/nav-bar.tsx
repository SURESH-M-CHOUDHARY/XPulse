"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { usePointsStore } from "@/lib/store";

export function NavBar() {
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const points = usePointsStore((state) => state.points);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event): void => {
            e.preventDefault();
            setPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    },[]);

    const handleInstallClick = async () => {
        if (prompt) {
            
            await prompt.prompt();
            const { outcome } = await prompt.userChoice;
            if (outcome === "accepted") {
                setPrompt(null);
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
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Points:</span>
                        <span className="font-bold text-primary">{points}</span>

                        {prompt && (
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

                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}

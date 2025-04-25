"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="space-x-4">
      <SignInButton mode="modal">
        <Button size="lg">Get Started</Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button variant="outline" size="lg">
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  );
}

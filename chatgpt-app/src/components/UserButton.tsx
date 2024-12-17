"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

function getFirstTwoCapitalLetters(str?: string | null) {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
}

interface UserButtonProps {
  onSignOut: () => Promise<void>;
  onSignIn: () => Promise<void>;
}

export default function UserButton({ onSignOut, onSignIn }: UserButtonProps) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={session?.user?.image!}
                alt="Avatar"
              />
              <AvatarFallback>
                {getFirstTwoCapitalLetters(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onSignOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => onSignIn()}>Sign in</Button>
      )}
    </>
  );
}

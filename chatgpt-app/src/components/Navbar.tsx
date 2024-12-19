import Link from "next/link";
import UserButton from "./UserButton";
import { signIn, signOut } from "@/auth";

export default function Navbar() {
  return (
    <header className="font-bold bg-green-900 text-2xl text-white px-6 py-4">
      <nav className="flex flex-grow justify-between">
        <ul>
          <Link href="/">GPT Chat</Link>
          <Link
            href="/about"
            className="ml-5 font-light"
          >
            About
          </Link>
        </ul>

        <UserButton
          onSignIn={async () => {
            "use server";
            await signIn();
          }}
          onSignOut={async () => {
            "use server";
            await signOut();
          }}
        />
      </nav>
    </header>
  );
}

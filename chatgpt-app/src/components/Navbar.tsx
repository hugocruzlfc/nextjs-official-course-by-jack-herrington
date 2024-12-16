import Link from "next/link";
import UserButton from "./UserButton";

export default function Navbar() {
  return (
    <header className="font-bold bg-green-900 text-2xl text-white p-4 rounded-b-md">
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
        <div>
          <UserButton />
        </div>
      </nav>
    </header>
  );
}

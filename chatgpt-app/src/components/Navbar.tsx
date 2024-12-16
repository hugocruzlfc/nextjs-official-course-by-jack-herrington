import Link from "next/link";

export default function Navbar() {
  return (
    <header className="font-bold bg-green-900 text-2xl text-white p-4 rounded-b-md">
      <nav className="flex flex-grow">
        <ul>
          <Link href="/">GPT Chat</Link>
          <Link
            href="/about"
            className="ml-5 font-light"
          >
            About
          </Link>
        </ul>
      </nav>
    </header>
  );
}

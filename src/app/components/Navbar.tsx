"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link href="/">
          <a className="text-white mr-4">Home</a>
        </Link>
        <Link href="/decks">
          <a className="text-white">Decks</a>
        </Link>
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Flashcard App</div>
        <div>
          <Link href="/">
            <a className="text-white mr-4">Home</a>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}
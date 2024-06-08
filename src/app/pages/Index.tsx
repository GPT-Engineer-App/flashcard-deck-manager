"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Flashcard Education App</h1>
      <p className="mb-4 text-lg">Create and manage your flashcard decks to enhance your learning experience.</p>
      <Link href="/decks">
        <a className="bg-blue-500 text-white px-4 py-2 rounded">Go to Decks</a>
      </Link>
    </div>
  );
}
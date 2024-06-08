"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Flashcard Education App</h1>
      <p className="mb-4">Create and manage your flashcard decks to enhance your learning experience.</p>
      <Link href="/decks">
        <a className="text-blue-500 underline">Go to Decks</a>
      </Link>
    </div>
  );
}
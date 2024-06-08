"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Deck {
  id: string;
  name: string;
}

export default function Home() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    setDecks(storedDecks);
  }, []);

  const addDeck = () => {
    const newDeck: Deck = { id: Date.now().toString(), name: "New Deck" };
    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
  };

  const deleteDeck = (id: string) => {
    const updatedDecks = decks.filter(deck => deck.id !== id);
    setDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Flashcard Education App</h1>
      <p className="mb-4 text-lg">Create and manage your flashcard decks to enhance your learning experience.</p>
      <button onClick={addDeck} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Deck</button>
      <ul>
        {decks.map(deck => (
          <li key={deck.id} className="mb-2 flex justify-between items-center">
            <Link href={`/deck/${deck.id}`}>
              <a className="text-blue-500 underline">{deck.name}</a>
            </Link>
            <button onClick={() => deleteDeck(deck.id)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Deck {
  id: string;
  name: string;
}

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>([]);

  const router = useRouter();

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Decks</h1>
      <button onClick={addDeck} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Deck</button>
      <ul>
        {decks.map(deck => (
          <div key={deck.id} className="mb-2 flex justify-between items-center">
            <a onClick={() => router.push(`/deck/${deck.id}`)} className="text-blue-500 underline cursor-pointer">{deck.name}</a>
            <button onClick={() => deleteDeck(deck.id)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
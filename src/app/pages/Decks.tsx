"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Deck {
  id: string;
  name: string;
}

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [newDeckName, setNewDeckName] = useState("");

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

  const startEditing = (deck: Deck) => {
    setEditingDeckId(deck.id);
    setNewDeckName(deck.name);
  };

  const saveDeckName = (id: string) => {
    const updatedDecks = decks.map(deck => {
      if (deck.id === id) {
        return { ...deck, name: newDeckName };
      }
      return deck;
    });
    setDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
    setEditingDeckId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Decks</h1>
      <button onClick={addDeck} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Deck</button>
      <ul>
        {decks.map(deck => (
          <li key={deck.id} className="mb-2 flex justify-between items-center">
            {editingDeckId === deck.id ? (
              <input
                type="text"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                onBlur={() => saveDeckName(deck.id)}
                className="border p-2 rounded"
              />
            ) : (
              <Link href={`/deck/${deck.id}`}>
                <a className="text-blue-500 underline">{deck.name}</a>
              </Link>
            )}
            <div>
              <button onClick={() => startEditing(deck)} className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded">Edit</button>
              <button onClick={() => deleteDeck(deck.id)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
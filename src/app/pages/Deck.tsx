"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface Deck {
  id: string;
  name: string;
  cards: Card[];
}

export default function Home() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [showDecks, setShowDecks] = useState(true);

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    setDecks(storedDecks);
  }, []);

  const addCard = (deckId: string) => {
    const newCard: Card = { id: Date.now().toString(), question: "New Question", answer: "New Answer" };
    const updatedDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return { ...deck, cards: [...deck.cards, newCard] };
      }
      return deck;
    });
    setDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
  };

  const deleteCard = (deckId: string, cardId: string) => {
    const updatedDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return { ...deck, cards: deck.cards.filter(card => card.id !== cardId) };
      }
      return deck;
    });
    setDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
  };

  const selectDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setShowDecks(false);
  };

  const goBackToDecks = () => {
    setSelectedDeck(null);
    setShowDecks(true);
  };

  return (
    <div className="container mx-auto p-4">
      {showDecks ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Decks</h1>
          <ul>
            {decks.map(deck => (
              <li key={deck.id} className="mb-2">
                <div className="border p-2 rounded">
                  <p>{deck.name}</p>
                  <button onClick={() => selectDeck(deck)} className="bg-blue-500 text-white px-2 py-1 mt-2 rounded">View Cards</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <button onClick={goBackToDecks} className="bg-gray-500 text-white px-4 py-2 mb-4 rounded">Back to Decks</button>
          <h1 className="text-3xl font-bold mb-4">{selectedDeck?.name}</h1>
          <button onClick={() => addCard(selectedDeck!.id)} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Card</button>
          <ul>
            {selectedDeck?.cards.map(card => (
              <li key={card.id} className="mb-2">
                <div className="border p-2 rounded">
                  <p>Question: {card.question}</p>
                  <p>Answer: {card.answer}</p>
                  <button onClick={() => deleteCard(selectedDeck.id, card.id)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <Link href={`/learn/${selectedDeck?.id}`}>
            <a className="text-blue-500 underline mt-4 block">Go to Learn Mode</a>
          </Link>
        </>
      )}
    </div>
  );
}
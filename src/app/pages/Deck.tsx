"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Card {
  id: string;
  question: string;
  answer: string;
}

export default function Deck() {
  const router = useRouter();
  const { id } = router.query;
  const [cards, setCards] = useState<Card[]>([]);
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    if (id) {
      const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
      const deck = storedDecks.find((d: any) => d.id === id);
      if (deck) {
        setDeckName(deck.name);
        setCards(deck.cards || []);
      }
    }
  }, [id]);

  const addCard = () => {
    const newCard: Card = { id: Date.now().toString(), question: "New Question", answer: "New Answer" };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    updateDeck(updatedCards);
  };

  const deleteCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    updateDeck(updatedCards);
  };

  const updateDeck = (updatedCards: Card[]) => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    const updatedDecks = storedDecks.map((deck: any) => {
      if (deck.id === id) {
        return { ...deck, cards: updatedCards };
      }
      return deck;
    });
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{deckName}</h1>
      <button onClick={addCard} className="bg-blue-500 text-white px-4 py-2 mb-4">Add Card</button>
      <ul>
        {cards.map(card => (
          <li key={card.id} className="mb-2">
            <div className="border p-2">
              <p>Question: {card.question}</p>
              <p>Answer: {card.answer}</p>
              <button onClick={() => deleteCard(card.id)} className="bg-red-500 text-white px-2 py-1 mt-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link href={`/learn/${id}`}>
        <a className="text-blue-500 underline mt-4 block">Go to Learn Mode</a>
      </Link>
    </div>
  );
}
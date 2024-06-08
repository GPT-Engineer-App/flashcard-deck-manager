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
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

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

  const startEditing = (card: Card) => {
    setEditingCardId(card.id);
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
  };

  const saveCard = (cardId: string) => {
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return { ...card, question: newQuestion, answer: newAnswer };
      }
      return card;
    });
    setCards(updatedCards);
    updateDeck(updatedCards);
    setEditingCardId(null);
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
      <button onClick={addCard} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Card</button>
      <ul>
        {cards.map(card => (
          <li key={card.id} className="mb-2">
            {editingCardId === card.id ? (
              <div className="border p-2 rounded">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Question"
                  className="border p-2 rounded mb-2 w-full"
                />
                <input
                  type="text"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Answer"
                  className="border p-2 rounded mb-2 w-full"
                />
                <button onClick={() => saveCard(card.id)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
              </div>
            ) : (
              <div className="border p-2 rounded">
                <p>Question: {card.question}</p>
                <p>Answer: {card.answer}</p>
                <button onClick={() => startEditing(card)} className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded">Edit</button>
                <button onClick={() => deleteCard(card.id)} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link href={`/learn/${id}`}>
        <a className="text-blue-500 underline mt-4 block">Go to Learn Mode</a>
      </Link>
    </div>
  );
}
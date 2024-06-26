"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Card {
  id: string;
  question: string;
  answer: string;
}

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearningMode, setIsLearningMode] = useState(false);

  useEffect(() => {
    if (id) {
      const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
      const deck = storedDecks.find((d: any) => d.id === id);
      if (deck) {
        setCards(deck.cards || []);
      }
    }
  }, [id]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const startLearningMode = () => {
    setIsLearningMode(true);
  };

  if (isLearningMode) {
    if (cards.length === 0) {
      return <div className="container mx-auto p-4">No cards available in this deck.</div>;
    }

    const currentCard = cards[currentCardIndex];

    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Learn Mode</h1>
        <div className="border p-4 mb-4 rounded cursor-pointer" onClick={flipCard}>
          {isFlipped ? <p>Answer: {currentCard.answer}</p> : <p>Question: {currentCard.question}</p>}
        </div>
        <button onClick={nextCard} className="bg-blue-500 text-white px-4 py-2 rounded">Next Card</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <button onClick={startLearningMode} className="bg-blue-500 text-white px-4 py-2 rounded">Start Learning</button>
    </div>
  );
}
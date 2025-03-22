import React, { useState, useEffect } from 'react';
import { getRandomWords } from '../data/words';
import { Card as CardType, GameState } from '../types';
import Card from './Card';
import Timer from './Timer';

const PREVIEW_DURATION = 10; // Preview duration in seconds

interface GameProps {
  group: number;
  onComplete: (time: number) => void;
}

const Game: React.FC<GameProps> = ({ group, onComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    isGameComplete: false,
    startTime: null,
    endTime: null,
  });

  const [isPreview, setIsPreview] = useState(true);
  const [previewCountdown, setPreviewCountdown] = useState(PREVIEW_DURATION);

  const initializeGame = () => {
    const selectedWords = getRandomWords(8);
    const cards: CardType[] = [];

    // Create a pair of cards for each word (English and Chinese)
    selectedWords.forEach((word, index) => {
      // English card
      cards.push({
        id: index * 2,
        content: word.english,
        type: 'english',
        pairId: index,
        isFlipped: true,
        isMatched: false,
      });
      // Chinese card
      cards.push({
        id: index * 2 + 1,
        content: word.chinese,
        type: 'chinese',
        pairId: index,
        isFlipped: true,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    setGameState({
      cards: shuffledCards,
      flippedCards: [],
      isGameComplete: false,
      startTime: null,
      endTime: null,
    });
    setIsPreview(true);
    setPreviewCountdown(PREVIEW_DURATION);
  };

  useEffect(() => {
    if (isPreview && previewCountdown > 0) {
      const timer = setInterval(() => {
        setPreviewCountdown(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (isPreview && previewCountdown === 0) {
      setIsPreview(false);
      setGameState(prev => ({
        ...prev,
        cards: prev.cards.map(card => ({ ...card, isFlipped: false })),
        startTime: Date.now(),
      }));
    }
  }, [isPreview, previewCountdown]);

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedCard: CardType) => {
    if (
      isPreview ||
      gameState.flippedCards.length === 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    const newCards = gameState.cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    const newFlippedCards = [...gameState.flippedCards, clickedCard];

    setGameState((prev) => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlippedCards,
    }));

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      const isMatch = firstCard.pairId === secondCard.pairId && 
                     firstCard.type !== secondCard.type;

      if (isMatch) {
        const matchedCards = newCards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        );

        const isGameComplete = matchedCards.every((card) => card.isMatched);
        const endTime = isGameComplete ? Date.now() : null;

        setGameState((prev) => ({
          ...prev,
          cards: matchedCards,
          flippedCards: [],
          isGameComplete,
          endTime,
        }));

        if (isGameComplete && endTime && gameState.startTime) {
          const timeTaken = Math.floor((endTime - gameState.startTime) / 1000);
          onComplete(timeTaken);
        }
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          );

          setGameState((prev) => ({
            ...prev,
            cards: resetCards,
            flippedCards: [],
          }));
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {!isPreview && (
              <Timer
                startTime={gameState.startTime}
                endTime={gameState.endTime}
              />
            )}
            <div className="text-lg font-semibold text-blue-600">
              Group {group}
            </div>
          </div>
          {isPreview ? (
            <div className="text-2xl font-bold text-blue-600">
              Preview: {previewCountdown}s
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {gameState.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game; 
import { WordPair } from '../data/words';

export interface Card {
  id: number;
  content: string;
  type: 'english' | 'chinese';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  isGameComplete: boolean;
  startTime: number | null;
  endTime: number | null;
}

export interface Score {
  group: number;
  time: number;
  date: string;
}

export interface GameData {
  currentGroup: number | null;
  scores: Score[];
  isGroupSelectionOpen: boolean;
} 
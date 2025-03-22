export interface Card {
  id: number;
  content: string;
  type: 'english' | 'chinese';
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Score {
  group: number;
  time: number;
  date: string;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  isGameComplete: boolean;
  startTime: number | null;
  endTime: number | null;
}

export interface GameData {
  currentGroup: number | null;
  scores: Score[];
  isGroupSelectionOpen: boolean;
} 
import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <motion.div
      className={`relative w-32 h-40 cursor-pointer transition-opacity duration-500
        ${card.isMatched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={onClick}
      initial={false}
      animate={{ 
        rotateY: card.isFlipped ? 180 : 0,
        scale: card.isMatched ? 0.8 : 1
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 卡片正面 */}
      <div
        className={`absolute inset-0 backface-hidden rounded-lg shadow-lg 
          flex items-center justify-center text-white text-xl font-bold
          ${card.type === 'english' ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
            : 'bg-gradient-to-br from-green-500 to-green-600'}`}
        style={{ backfaceVisibility: "hidden" }}
      >
        ?
      </div>

      {/* 卡片背面 */}
      <div
        className={`absolute inset-0 backface-hidden bg-white rounded-lg shadow-lg 
          flex items-center justify-center p-4
          ${card.isMatched ? 'bg-gray-100' : 'bg-white'}`}
        style={{ 
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}
      >
        <div className="text-center">
          <div className={`text-lg font-bold ${
            card.type === 'english' 
              ? 'text-blue-600' 
              : 'text-green-600'
          }`}>
            {card.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card; 
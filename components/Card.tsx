
import React from 'react';
import type { CardData } from '../types';

interface CardProps {
  card: CardData | null;
}

const CostIcon: React.FC<{ cost: number }> = ({ cost }) => (
  <div className="absolute -top-3 -right-3 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-gray-800 shadow-lg">
    {cost}
  </div>
);

const StatsIcon: React.FC<{ icon: 'attack' | 'health', value: number }> = ({ icon, value }) => {
  const SvgIcon = icon === 'attack' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.13,4.14l-1.4-1.41a1,1,0,0,0-1.41,0L13.5,5.55l-1-1a1,1,0,0,0-1.41,0L8.27,7.36l-1-1a1,1,0,0,0-1.41,0L3.11,9.11a1,1,0,0,0,0,1.41l1.41,1.41a1,1,0,0,0,1.41,0l2.76-2.76,1,1a1,1,0,0,0,1.41,0l2.83-2.83,1,1a1,1,0,0,0,1.41,0l2.76-2.76a1,1,0,0,0,0-1.41z"/>
      <path d="M12,13a1,1,0,0,0-1,1v7a1,1,0,0,0,2,0V14A1,1,0,0,0,12,13z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5,9.66l-6.2-6.2a3,3,0,0,0-4.24,0l-6.2,6.2a3,3,0,0,0,0,4.24l6.2,6.2a3,3,0,0,0,4.24,0l6.2-6.2A3,3,0,0,0,20.5,9.66ZM12,17.56a5.56,5.56,0,1,1,5.56-5.56A5.57,5.57,0,0,1,12,17.56Z"/>
    </svg>
  );

  return (
    <div className="flex items-center space-x-1 px-3 py-1 bg-gray-900 rounded-full text-white font-bold text-lg">
      {SvgIcon}
      <span>{value}</span>
    </div>
  );
};


const Card: React.FC<CardProps> = ({ card }) => {
  if (!card) {
    return (
      <div className="w-[340px] h-[475px] bg-gray-800 border-2 border-gray-700 rounded-xl flex flex-col items-center justify-center p-4 text-center text-gray-400 shadow-2xl">
        <h3 className="text-xl font-bold mb-2">Your Card Awaits</h3>
        <p>Enter a theme and click "Forge Card" to bring a new creation to life.</p>
      </div>
    );
  }

  const isSpell = card.attack === 0 && card.health === 0;

  return (
    <div className="w-[340px] h-[475px] bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col border-2 border-gray-600 relative select-none">
      {/* Cost */}
      <CostIcon cost={card.cost} />

      {/* Card Header */}
      <div className="px-4 pt-4 pb-2 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
        <h2 className="text-white text-xl font-bold truncate">{card.name}</h2>
      </div>

      {/* Image */}
      <div className="h-1/2 w-full bg-black overflow-hidden">
        <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
      </div>

      {/* Body */}
      <div className="p-4 flex-grow flex flex-col bg-gray-800">
        <div className="bg-gray-700 rounded-md p-3 flex-grow text-gray-200 text-sm">
          <p className="whitespace-pre-wrap">{card.cardText}</p>
        </div>
      </div>
      
      {/* Stats Footer */}
      {!isSpell && (
         <div className="absolute bottom-4 right-4 flex space-x-2">
            <StatsIcon icon="attack" value={card.attack} />
            <StatsIcon icon="health" value={card.health} />
        </div>
      )}
    </div>
  );
};

export default Card;

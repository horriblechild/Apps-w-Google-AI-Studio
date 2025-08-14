
import React from 'react';

const ForgeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.62 3.25a2.06 2.06 0 00-2.06-.21l-3.38.94-3.5-3.5a2.06 2.06 0 00-2.92 0l-3.5 3.5-3.38-.94a2.06 2.06 0 00-2.06.21 2.08 2.08 0 00-.9 1.83v13.84a2.06 2.06 0 002.94 1.83l3.39-.94 3.5 3.5a2.06 2.06 0 002.92 0l3.5-3.5 3.39.94a2.06 2.06 0 002.94-1.83V5.08a2.08 2.08 0 00-.9-1.83zM12 18a6 6 0 116-6 6 6 0 01-6 6z"/>
    <path d="M12 10a2 2 0 102 2 2 2 0 00-2-2z"/>
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <ForgeIcon />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wider text-center" style={{fontFamily: 'serif'}}>
          Eternal Card Forge
        </h1>
      </div>
      <p className="text-center text-gray-400 mt-2">AI-Powered Card Generation for Eternal</p>
    </header>
  );
};

export default Header;

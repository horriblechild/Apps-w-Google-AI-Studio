
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import { generateCardDetails, generateCardImage } from './services/geminiService';
import type { CardData } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Dragon Samurai');
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCard = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a theme for the card.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCardData(null);

    try {
      // Step 1: Generate card text and visual prompt
      const details = await generateCardDetails(prompt);

      // Step 2: Generate image using the visual prompt
      const imageUrl = await generateCardImage(details.visualPrompt);

      // Step 3: Combine and set state
      setCardData({ ...details, imageUrl });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to forge card. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4"
         style={{
           backgroundImage: 'radial-gradient(circle at top, #374151, #111827)',
         }}>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center flex-grow w-full max-w-4xl px-4">
        <div className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a card theme (e.g., Void Hydra, Skycrag Shaman)"
              className="w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <Button onClick={handleGenerateCard} isLoading={isLoading}>
              Forge Card
            </Button>
          </div>
        </div>

        {error && (
          <div className="my-4 p-4 bg-red-800 border border-red-600 text-white rounded-md w-full max-w-md text-center">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center" style={{minHeight: '475px'}}>
          {isLoading ? <LoadingSpinner /> : <Card card={cardData} />}
        </div>

      </main>

      <footer className="py-4 text-center text-gray-500">
        <p>Powered by Google Gemini & Imagen. Not affiliated with Dire Wolf Digital.</p>
      </footer>
    </div>
  );
};

export default App;

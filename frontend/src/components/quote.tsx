import React, { useMemo } from 'react';
import { quotes } from '../data/quotes';

const Quote: React.FC = () => {
  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 shadow-3xl backdrop-blur-lg bg-white bg-opacity-30 rounded-lg transition-all duration-300 ease-in-out">
      <blockquote className="text-xl italic font-semibold text-gray-900">
        <svg className="w-8 h-8 text-gray-400 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <p className="mb-4">{randomQuote.text}</p>
        <cite className="block text-right text-sm text-gray-600 not-italic">
          - {randomQuote.author}
        </cite>
      </blockquote>
    </div>
  );
};

export default Quote;


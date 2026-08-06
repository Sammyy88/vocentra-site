import React, { useState, useCallback, useEffect } from 'react';
import { WordCard } from '../components/ui/WordCard';
import { getRandomWord, getRandomPrompt, type WordEntry } from '../data/dictionary';
import { useStore } from '../store/useStore';

export const Home: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  
  const { preferredCategory, incrementWordsExplored, addToHistory, updateLastSession, triggerTimerReset } = useStore();

  const handleDiscover = useCallback(() => {
    const newWord = getRandomWord(preferredCategory as any);
    
    let newPrompt = getRandomPrompt();
    while (newPrompt === currentPrompt) {
      newPrompt = getRandomPrompt();
    }
    
    setCurrentWord(newWord);
    setCurrentPrompt(newPrompt);
    
    incrementWordsExplored();
    addToHistory(newWord.word);
    updateLastSession();
    triggerTimerReset();
  }, [preferredCategory, incrementWordsExplored, addToHistory, updateLastSession, triggerTimerReset, currentPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleDiscover();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDiscover]);

  return (
    <main className="relative z-10 w-full min-h-screen flex items-center justify-center pointer-events-auto pt-20 md:pt-0 pb-10 md:pb-0">
      <WordCard 
        currentWord={currentWord}
        currentPrompt={currentPrompt}
        onDiscover={handleDiscover}
      />
    </main>
  );
};

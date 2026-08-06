import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Heart, Copy } from 'lucide-react';
import type { WordEntry } from '../../data/dictionary';
import { useStore } from '../../store/useStore';
import { TimerIsland } from './TimerIsland';

interface WordCardProps {
  currentWord: WordEntry | null;
  currentPrompt: string | null;
  onDiscover: () => void;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const WordCard: React.FC<WordCardProps> = ({ currentWord, currentPrompt, onDiscover }) => {
  const [displayWord, setDisplayWord] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const { addFavorite, removeFavorite, favoriteWords, preferredCategory, setPreferredCategory } = useStore();

  const isFavorite = currentWord ? favoriteWords.includes(currentWord.word) : false;

  const handleToggleFavorite = () => {
    if (!currentWord) return;
    if (isFavorite) {
      removeFavorite(currentWord.word);
    } else {
      addFavorite(currentWord.word);
    }
  };

  const handleCopy = () => {
    if (currentWord) {
      navigator.clipboard.writeText(currentWord.word);
    }
  };

  const handleSpeak = () => {
    if (currentWord && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15); // Slide to A6
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.error("Audio API not supported or blocked");
    }
  };

  useEffect(() => {
    if (!currentWord) return;
    
    // Scrambling effect
    setIsScrambling(true);
    let iterations = 0;
    const targetWord = currentWord.word.toUpperCase();
    
    const interval = setInterval(() => {
      setDisplayWord(
        targetWord
          .split("")
          .map((_, index) => {
            if (index < iterations) {
              return targetWord[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      
      if (iterations >= targetWord.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iterations += 1/3; // Speed of unscrambling
    }, 30);

    return () => clearInterval(interval);
  }, [currentWord]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 md:pt-0 pb-10 md:pb-0 px-4 md:px-6 relative z-10">
      
      <AnimatePresence mode="wait">
        {!currentWord ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center justify-center max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-primary mb-6 leading-tight">
              Ready, for Domination?
            </h1>
            <p className="text-secondary/80 mb-8 text-sm md:text-base font-light tracking-wide leading-relaxed">
              We don't just practice. We transform.<br/>
              From ideas to impact — step into what's possible.
            </p>

            <div className="mb-10 w-full max-w-xs mx-auto">
              <label className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3 block">Focus Area</label>
              <select 
                value={preferredCategory}
                onChange={(e) => setPreferredCategory(e.target.value)}
                className="w-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-primary/20 dark:border-white/20 rounded-xl px-4 py-3 text-primary text-sm font-medium hover:border-primary/50 transition-colors cursor-pointer outline-none text-center shadow-sm"
              >
                <option value="Random">Random Mix</option>
                <option value="Everyday Life">Everyday Life</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Technology">Technology</option>
                <option value="Society & Current Issues">Society & Current Issues</option>
                <option value="Opinion & Abstract Topics">Opinion & Abstract</option>
              </select>
            </div>

            <button
              onClick={() => {
                playChime();
                onDiscover();
              }}
              className="relative overflow-hidden group px-10 py-4 bg-primary text-background rounded-2xl font-bold tracking-wide shadow-[0_0_40px_-10px_rgba(17,17,17,0.5)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-10px_rgba(17,17,17,0.8)] dark:hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-500 ease-out"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 drop-shadow-sm">Explore your challenge</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="word"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full max-w-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative transition-colors duration-700"
          >
            <TimerIsland />
            
            <div className="flex w-full justify-between items-center mb-6 text-secondary mt-2">
              <select 
                value={preferredCategory}
                onChange={(e) => setPreferredCategory(e.target.value)}
                className="text-xs uppercase tracking-widest font-semibold bg-transparent hover:text-primary transition-colors cursor-pointer outline-none appearance-none border-b border-dashed border-transparent hover:border-primary pb-0.5"
              >
                <option value="Random">RANDOM MIX</option>
                <option value="Everyday Life">EVERYDAY LIFE</option>
                <option value="Personal Development">PERSONAL DEV</option>
                <option value="Technology">TECHNOLOGY</option>
                <option value="Society & Current Issues">SOCIETY & ISSUES</option>
                <option value="Opinion & Abstract Topics">OPINION & ABSTRACT</option>
              </select>
              <div className="flex gap-4">
                <button onClick={handleSpeak} className="hover:text-primary transition-colors"><Volume2 size={20} /></button>
                <button onClick={handleCopy} className="hover:text-primary transition-colors"><Copy size={20} /></button>
                <button onClick={handleToggleFavorite} className={`${isFavorite ? 'text-red-500' : 'hover:text-primary'} transition-colors`}>
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <h2 className={`text-3xl md:text-5xl font-bold tracking-tighter text-primary mb-4 text-center break-words w-full px-4 ${isScrambling ? 'opacity-80' : 'opacity-100'}`}>
              {displayWord}
            </h2>
            
            <p className="text-lg md:text-xl text-secondary mb-8">
              {currentWord.pronunciation}
            </p>
            
            <div className="flex items-center gap-3 text-[10px] md:text-xs font-semibold text-secondary uppercase tracking-widest border border-secondary/20 bg-white/30 dark:bg-white/5 px-4 py-2 rounded-full mb-10 shadow-sm transition-colors duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-pulse" />
              {currentWord.definition}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />

            <div className="text-center w-full">
              <span className="block text-xs uppercase tracking-widest text-secondary mb-3 font-semibold">Daily Challenge</span>
              <p className="text-lg text-primary/80 italic">
                {currentPrompt}
              </p>
            </div>

            <button
              onClick={onDiscover}
              className="mt-12 px-8 py-4 bg-primary/5 hover:bg-primary/10 text-primary rounded-full font-medium tracking-wide transition-colors duration-300"
            >
              Next Word
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

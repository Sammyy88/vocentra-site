import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Heart, Copy, Mic, X } from 'lucide-react';
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
  const [speakTimerActive, setSpeakTimerActive] = useState(false);
  const [speakTimeLeft, setSpeakTimeLeft] = useState(60);
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

  const playRevealSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.error("Audio API not supported");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speakTimerActive && speakTimeLeft > 0) {
      interval = setInterval(() => {
        setSpeakTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (speakTimeLeft === 0) {
      setSpeakTimerActive(false);
      playChime();
    }
    return () => clearInterval(interval);
  }, [speakTimerActive, speakTimeLeft]);

  useEffect(() => {
    if (!currentWord) return;
    
    // Scrambling effect
    setIsScrambling(true);
    const targetWord = currentWord.word.toUpperCase();
    const duration = 3000; // 3 seconds stretch
    const startTime = performance.now();
    let animationFrameId: number;

    // --- Audio setup for scrambling SFX ---
    let sfxCtx: AudioContext | null = null;
    let sfxGain: GainNode | null = null;
    let sfxLfo: OscillatorNode | null = null;
    
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        sfxCtx = new AudioCtx();
        const sfxOsc = sfxCtx.createOscillator();
        sfxGain = sfxCtx.createGain();
        
        // Create a fast clicking/ticking sound using high frequency sine modulated rapidly
        sfxOsc.type = 'square';
        sfxOsc.frequency.setValueAtTime(100, sfxCtx.currentTime); // Low pitch click
        
        sfxLfo = sfxCtx.createOscillator();
        sfxLfo.type = 'sawtooth';
        sfxLfo.frequency.setValueAtTime(40, sfxCtx.currentTime); // 40 ticks per second initially
        const lfoGain = sfxCtx.createGain();
        lfoGain.gain.setValueAtTime(200, sfxCtx.currentTime);
        sfxLfo.connect(lfoGain);
        lfoGain.connect(sfxOsc.frequency);
        
        sfxGain.gain.setValueAtTime(0, sfxCtx.currentTime);
        sfxGain.gain.linearRampToValueAtTime(0.04, sfxCtx.currentTime + 0.1);
        
        sfxOsc.connect(sfxGain);
        sfxGain.connect(sfxCtx.destination);
        
        sfxLfo.start();
        sfxOsc.start();
      }
    } catch (e) {
      console.error("Audio API not supported");
    }
    // ----------------------------------------

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Fast start, slow stop
      const easedProgress = easeOutQuart(progress);
      const revealedCount = Math.floor(easedProgress * targetWord.length);

      // Slow down the ticking sound as we near the end
      if (sfxLfo && sfxCtx) {
        const currentTicksPerSec = 40 - (35 * easedProgress); // Slow from 40 down to 5 ticks
        sfxLfo.frequency.setValueAtTime(Math.max(2, currentTicksPerSec), sfxCtx.currentTime);
      }

      setDisplayWord(
        targetWord
          .split("")
          .map((_, index) => {
            if (index < revealedCount) {
              return targetWord[index];
            }
            return LETTERS[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsScrambling(false);
        if (sfxGain && sfxCtx) {
          sfxGain.gain.linearRampToValueAtTime(0, sfxCtx.currentTime + 0.05);
          setTimeout(() => { if (sfxCtx) sfxCtx.close(); }, 100);
        }
        playRevealSound();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (sfxGain && sfxCtx) {
        try {
          sfxGain.gain.linearRampToValueAtTime(0, sfxCtx.currentTime + 0.05);
          setTimeout(() => { if (sfxCtx && sfxCtx.state !== 'closed') sfxCtx.close(); }, 100);
        } catch(e) {}
      }
    };
  }, [currentWord]);

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-10">
      
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
            <div className={`transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
              <TimerIsland />
            </div>
            
            <div className={`flex w-full justify-between items-center mb-6 text-secondary mt-2 transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
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

            <h2 className={`text-3xl md:text-5xl font-bold tracking-tighter text-primary mb-4 text-center break-words w-full px-4 transition-all duration-300 ${isScrambling ? 'scale-110 drop-shadow-2xl' : 'scale-100 drop-shadow-none'}`}>
              {displayWord}
            </h2>
            
            <p className={`text-lg md:text-xl text-secondary mb-8 transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
              {currentWord.pronunciation}
            </p>
            
            <div className={`flex items-center gap-3 text-[10px] md:text-xs font-semibold text-secondary uppercase tracking-widest border border-secondary/20 bg-white/30 dark:bg-white/5 px-4 py-2 rounded-full mb-10 shadow-sm transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-pulse" />
              {currentWord.definition}
            </div>

            <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8 transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm' : 'opacity-100 blur-0'}`} />

            <div className={`text-center w-full transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
              <span className="block text-xs uppercase tracking-widest text-secondary mb-3 font-semibold">Daily Challenge</span>
              <p className="text-lg text-primary/80 italic">
                {currentPrompt}
              </p>
            </div>

            <div className={`mt-12 flex items-center gap-4 transition-all duration-700 ${isScrambling ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100 blur-0'}`}>
              <button
                onClick={() => {
                  setSpeakTimerActive(true);
                  setSpeakTimeLeft(60);
                }}
                className="shrink-0 w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center transition-all duration-300 bg-red-50 hover:bg-red-100 dark:bg-red-500/5 dark:hover:bg-red-500/10 text-red-500/70 hover:text-red-500 border border-red-500/20"
              >
                <Mic size={22} />
              </button>

              <button
                onClick={() => {
                  playChime();
                  onDiscover();
                  setSpeakTimerActive(false);
                  setSpeakTimeLeft(60);
                }}
                className="px-8 py-4 bg-primary/5 hover:bg-primary/10 text-primary rounded-full font-medium tracking-wide transition-colors duration-300 flex-1"
              >
                Next Word
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {speakTimerActive && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/60"
          >
            <button
              onClick={() => {
                setSpeakTimerActive(false);
                setSpeakTimeLeft(60);
              }}
              className="absolute top-8 right-8 text-secondary hover:text-primary transition-colors bg-white/10 dark:bg-black/10 p-3 rounded-full backdrop-blur-md border border-white/20 dark:border-white/10"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-red-500/10 dark:bg-red-500/5 backdrop-blur-2xl border border-red-500/30 shadow-[0_0_80px_rgba(239,68,68,0.2)]"
            >
              <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-red-500/10 animate-[spin_15s_linear_infinite_reverse]" />
              
              <span className="font-bold font-mono text-7xl md:text-8xl text-red-500 tracking-tighter drop-shadow-md animate-pulse">
                {speakTimeLeft}
              </span>
              <span className="mt-4 text-sm uppercase tracking-[0.3em] font-semibold text-red-500/70">
                Speak
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

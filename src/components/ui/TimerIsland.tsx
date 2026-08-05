import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, X, Timer } from 'lucide-react';
import { useGlobalClickSound } from '../../hooks/useClickSound';
import { useStore } from '../../store/useStore';

export const TimerIsland: React.FC = () => {
  const { timerResetKey } = useStore();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound effect for alarm
  const playAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playChime = (timeOffset: number, freq1: number, freq2: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq1, audioCtx.currentTime + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + timeOffset + 0.8);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime + timeOffset);
        gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + timeOffset + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + timeOffset + 1.5);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + timeOffset);
        osc.stop(audioCtx.currentTime + timeOffset + 1.6);
      };

      playChime(0, 1046.50, 523.25); // C6 to C5
      playChime(0.4, 1318.51, 659.25); // E6 to E5
      playChime(0.8, 1567.98, 783.99); // G6 to G5
    } catch (e) {
      console.warn('AudioContext not supported');
    }
  };

  useEffect(() => {
    if (timerResetKey > 0) {
      setIsActive(false);
      setTimeLeft(600);
      setIsRinging(false);
      setIsExpanded(false);
    }
  }, [timerResetKey]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsRinging(true);
      playAlarm();
      setIsExpanded(true); // Open to show stop button
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRinging) {
      setIsRinging(false);
      setTimeLeft(600);
      setIsExpanded(false);
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(false);
    setTimeLeft(600);
    setIsRinging(false);
  };

  const closeIsland = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-auto">
      <motion.div
        layout
        initial={{ borderRadius: 32 }}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={`bg-primary text-background overflow-hidden shadow-2xl flex flex-col justify-center cursor-pointer ${
          isRinging ? 'animate-pulse bg-red-500' : ''
        }`}
        animate={{
          width: isExpanded ? 240 : (isActive ? 100 : 120),
          height: isExpanded ? 72 : 44,
          borderRadius: isExpanded ? 24 : 22,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="relative w-full h-full flex items-center px-4">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {isRinging ? (
                    <Timer size={14} className="animate-bounce" />
                  ) : isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  ) : (
                    <Timer size={14} className="opacity-70" />
                  )}
                  <span className="font-mono text-sm font-medium tabular-nums tracking-tight">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xl font-medium tabular-nums tracking-tight ${isRinging ? 'text-white' : ''}`}>
                    {formatTime(timeLeft)}
                  </span>
                  {isActive && !isRinging && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mt-1" />
                  )}
                </div>

                <div className="flex items-center gap-2 text-background/80">
                  <button 
                    onClick={toggleTimer}
                    className="p-2 hover:bg-white/10 hover:text-white rounded-full transition-colors"
                  >
                    {isRinging ? <Square size={18} /> : (isActive ? <Pause size={18} /> : <Play size={18} />)}
                  </button>
                  
                  {(!isActive || isRinging) && timeLeft !== 600 && (
                    <button 
                      onClick={resetTimer}
                      className="p-2 hover:bg-white/10 hover:text-white rounded-full transition-colors"
                    >
                      <Square size={16} />
                    </button>
                  )}

                  <div className="w-[1px] h-4 bg-background/20 mx-1" />

                  <button 
                    onClick={closeIsland}
                    className="p-2 hover:bg-white/10 hover:text-white rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

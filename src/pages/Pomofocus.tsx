import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Timer, Volume2, Coffee, Target } from 'lucide-react';
import PhysicsTomatoes from '../components/PhysicsTomatoes';

type Mode = 'focus' | 'shortBreak' | 'longBreak';

const MODES = {
  focus: { label: 'Focus', time: 25 * 60 },
  shortBreak: { label: 'Short Break', time: 5 * 60 },
  longBreak: { label: 'Long Break', time: 15 * 60 },
};

export const Pomofocus: React.FC = () => {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES['focus'].time);
  const [isRunning, setIsRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(MODES['longBreak'].time);
        } else {
          setMode('shortBreak');
          setTimeLeft(MODES['shortBreak'].time);
        }
      } else {
        setMode('focus');
        setTimeLeft(MODES['focus'].time);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, cycles]);

  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  const handleStartPause = async () => {
    if (!isRunning && typeof (window as any).DeviceOrientationEvent !== 'undefined' && typeof (window as any).DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await (window as any).DeviceOrientationEvent.requestPermission();
        if (permissionState !== 'granted') {
          console.warn('Device orientation permission not granted');
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-[#fef8ea] dark:bg-[#000000] text-black dark:text-white font-sans transition-colors duration-700 relative z-40">
      <Helmet>
        <title>Pomodoro Timer - Vocentra</title>
      </Helmet>

      {/* Physics Overlay for Tomatoes */}
      <PhysicsTomatoes count={cycles} />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-20 pb-32 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-black/40 dark:text-white/40 mb-12 tracking-[0.3em] uppercase transition-colors duration-700">{MODES[mode].label} Timer</h2>

        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full flex justify-center"
        >
          {/* Using inline styles for massive font size */}
          <h1 
            className="font-bold leading-none tracking-tighter tabular-nums text-black dark:text-white drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-colors duration-700"
            style={{ fontSize: 'clamp(5rem, 20vw, 18rem)' }}
          >
            {formatTime(timeLeft)}
          </h1>
        </motion.div>

        {/* Tomato Indicators */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="flex gap-2 bg-black/5 dark:bg-white/10 px-4 py-2 rounded-full transition-colors duration-700">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 flex items-center justify-center transition-colors duration-500
                  ${i < (cycles % 4) ? 'text-orange-500' : 'text-black/20 dark:text-white/30'}
                `}
              >
                <Target size={18} strokeWidth={i < (cycles % 4) ? 3 : 2} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="mt-8 md:mt-12 mb-12 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 p-4 w-full max-w-5xl">
          
          {/* Modes Container */}
          <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-10">
            {/* Focus Button */}
            <button 
              onClick={() => handleModeSwitch('focus')}
              className={`flex flex-col flex-shrink-0 transition-all duration-300 hover:-translate-y-1 ${
                mode === 'focus' 
                  ? 'text-[#ff5757] drop-shadow-[0_0_12px_rgba(255,87,87,0.6)]' 
                  : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
              }`}
            >
              <div className="flex items-center justify-start gap-1 w-full mb-2">
                <span className="text-sm font-bold tracking-wide">Focus</span>
                <Volume2 size={16} className={mode === 'focus' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
              </div>
              <div className="flex items-center justify-start gap-1 w-full">
                <Target size={26} className={mode === 'focus' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">25</span>
                  <span className="text-sm font-medium opacity-80">min</span>
                </div>
              </div>
            </button>

            {/* Short Break Button */}
            <button 
              onClick={() => handleModeSwitch('shortBreak')}
              className={`flex flex-col flex-shrink-0 transition-all duration-300 hover:-translate-y-1 ${
                mode === 'shortBreak' 
                  ? 'text-[#ff5757] drop-shadow-[0_0_12px_rgba(255,87,87,0.6)]' 
                  : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
              }`}
            >
              <div className="flex items-center justify-start gap-1 w-full mb-2">
                <span className="text-sm font-bold tracking-wide">Short Break</span>
                <Volume2 size={16} className={mode === 'shortBreak' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
              </div>
              <div className="flex items-center justify-start gap-1 w-full">
                <Coffee size={26} className={mode === 'shortBreak' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">5</span>
                  <span className="text-sm font-medium opacity-80">min</span>
                </div>
              </div>
            </button>

            {/* Long Break Button */}
            <button 
              onClick={() => handleModeSwitch('longBreak')}
              className={`flex flex-col flex-shrink-0 transition-all duration-300 hover:-translate-y-1 ${
                mode === 'longBreak' 
                  ? 'text-[#ff5757] drop-shadow-[0_0_12px_rgba(255,87,87,0.6)]' 
                  : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
              }`}
            >
              <div className="flex items-center justify-start gap-1 w-full mb-2">
                <span className="text-sm font-bold tracking-wide">Long Break</span>
                <Volume2 size={16} className={mode === 'longBreak' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
              </div>
              <div className="flex items-center justify-start gap-1 w-full">
                <Timer size={26} className={mode === 'longBreak' ? 'text-[#ff5757]' : 'text-black/40 dark:text-white/40'} />
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">15</span>
                  <span className="text-sm font-medium opacity-80">min</span>
                </div>
              </div>
            </button>
          </div>

          {/* Start/Pause Button Separated */}
          <div className="flex items-center ml-0 md:ml-12 mt-4 md:mt-0">
            <button
              onClick={handleStartPause}
              className={`px-10 py-6 rounded-2xl font-black text-xl tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center hover:-translate-y-1 ${
                isRunning 
                  ? 'bg-transparent text-white/50 border-2 border-white/20 shadow-none' 
                  : 'bg-[#ff5757] text-white shadow-[0_0_40px_rgba(255,87,87,0.6)] hover:shadow-[0_0_60px_rgba(255,87,87,0.8)]'
              }`}
            >
              {isRunning ? 'PAUSE' : 'START'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

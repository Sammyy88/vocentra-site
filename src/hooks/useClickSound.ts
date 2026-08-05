import { useEffect } from 'react';

export const useGlobalClickSound = () => {
  useEffect(() => {
    // Only initialize AudioContext on the first interaction to comply with browser policies
    let audioCtx: AudioContext | null = null;

    const playClickSound = () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Create a subtle, premium "shuttle/press" sound
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitched initially
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05); // Rapidly drop pitch

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01); // Quick attack (very subtle volume)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); // Quick decay

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.06);
    };

    const handleClick = (e: MouseEvent) => {
      // Traverse up to see if a button or link was clicked
      let target = e.target as HTMLElement | null;
      let isInteractive = false;
      
      while (target && target !== document.body) {
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'SELECT') {
          isInteractive = true;
          break;
        }
        target = target.parentElement;
      }

      if (isInteractive) {
        playClickSound();
      }
    };

    window.addEventListener('click', handleClick, true); // use capture phase

    return () => {
      window.removeEventListener('click', handleClick, true);
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, []);
};

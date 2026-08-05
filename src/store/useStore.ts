import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currentStreak: number;
  wordsExplored: number;
  favoriteWords: string[];
  practiceHistory: string[];
  lastSession: string | null;
  preferredCategory: string;
  darkMode: boolean;
  timerResetKey: number;
  incrementStreak: () => void;
  incrementWordsExplored: () => void;
  addFavorite: (word: string) => void;
  removeFavorite: (word: string) => void;
  addToHistory: (word: string) => void;
  setPreferredCategory: (category: string) => void;
  toggleDarkMode: () => void;
  updateLastSession: () => void;
  triggerTimerReset: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentStreak: 0,
      wordsExplored: 0,
      favoriteWords: [],
      practiceHistory: [],
      lastSession: null,
      preferredCategory: 'Random',
      darkMode: false,
      timerResetKey: 0,

      incrementStreak: () =>
        set((state) => ({ currentStreak: state.currentStreak + 1 })),
      
      incrementWordsExplored: () =>
        set((state) => ({ wordsExplored: state.wordsExplored + 1 })),

      addFavorite: (word) =>
        set((state) => ({
          favoriteWords: [...new Set([...state.favoriteWords, word])],
        })),

      removeFavorite: (word) =>
        set((state) => ({
          favoriteWords: state.favoriteWords.filter((w) => w !== word),
        })),

      addToHistory: (word) =>
        set((state) => ({
          practiceHistory: [word, ...state.practiceHistory].slice(0, 100), // keep last 100
        })),

      setPreferredCategory: (category) =>
        set(() => ({ preferredCategory: category })),

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      updateLastSession: () =>
        set(() => ({ lastSession: new Date().toISOString() })),
        
      triggerTimerReset: () =>
        set((state) => ({ timerResetKey: state.timerResetKey + 1 })),
    }),
    {
      name: 'word-generator-storage',
    }
  )
);

import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
const Scene = lazy(() => import('./components/3d/Scene').then(module => ({ default: module.Scene })));
import { CustomCursor } from './components/ui/CustomCursor';
import { useStore } from './store/useStore';
import { useGlobalClickSound } from './hooks/useClickSound';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun } from 'lucide-react';

import { Home } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  useGlobalClickSound();
  
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favoriteWords, removeFavorite, darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <HelmetProvider>
      <Router>
        <div className="relative min-h-screen bg-background text-primary font-sans overflow-x-hidden selection:bg-primary selection:text-background transition-colors duration-700">
          <CustomCursor />
          
          {/* 3D Background - Lazy Loaded for <2s TTI */}
          <Suspense fallback={null}>
            <Scene />
          </Suspense>

          {/* Header */}
          <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto">
            <Link to="/" className="text-xl font-semibold tracking-tighter cursor-pointer hover:opacity-70 transition-opacity">
              Vocentra.
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-secondary items-center">
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <button onClick={() => setIsFavoritesOpen(true)} className="hover:text-primary transition-colors">Favorites</button>
              <button className="hover:text-primary transition-colors">History</button>
              <button onClick={toggleDarkMode} className="hover:text-primary transition-colors ml-2">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </nav>
          </header>

          {/* Favorites Modal */}
          <AnimatePresence>
            {isFavoritesOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative w-full max-w-lg bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 p-8 rounded-[2rem] shadow-2xl max-h-[80vh] flex flex-col transition-colors duration-700 pointer-events-auto"
                >
                  <button
                    onClick={() => setIsFavoritesOpen(false)}
                    className="absolute top-6 right-6 text-secondary hover:text-primary transition-colors"
                  >
                    <X size={24} />
                  </button>
                  
                  <h2 className="text-2xl font-bold tracking-tight text-primary mb-6">Your Favorites</h2>
                  
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {favoriteWords.length === 0 ? (
                      <p className="text-secondary text-sm">No favorites yet. Click the heart icon to save topics!</p>
                    ) : (
                      favoriteWords.map((word) => (
                        <div key={word} className="flex justify-between items-center p-4 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl hover:bg-white/80 dark:hover:bg-white/10 transition-colors group">
                          <span className="font-medium text-primary break-words pr-4">{word}</span>
                          <button
                            onClick={() => removeFavorite(word)}
                            className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

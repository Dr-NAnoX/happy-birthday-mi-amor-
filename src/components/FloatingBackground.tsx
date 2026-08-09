import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioSynth } from '../utils/audioSynth';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

export const FloatingBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Spawn particle on click
  const handleGlobalClick = (e: React.MouseEvent) => {
    // Avoid spawning inside buttons or inputs to keep UI clean
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;

    audioSynth.playHeartPop();

    const emojis = ['💖', '🌸', '✨', '🎈', '🧸', '🦋', '⭐', '💕'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      emoji: randomEmoji,
      size: Math.floor(Math.random() * 16) + 24
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1500);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div
      onClick={handleGlobalClick}
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden select-none"
    >
      {/* Soft Pastel Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F8] via-[#FCE7F3] to-[#E0F2FE] opacity-80" />

      {/* Floating Clouds */}
      <motion.div
        animate={{ x: [-50, 100, -50] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-12 left-10 text-white/70 pointer-events-none"
      >
        <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md text-3xl">
          ☁️
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [100, -80, 100] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/3 right-12 text-white/70 pointer-events-none"
      >
        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-2xl">
          ☁️
        </div>
      </motion.div>

      {/* Swaying Balloons */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-1/4 text-4xl pointer-events-none"
      >
        🎈
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/3 left-10 text-4xl pointer-events-none"
      >
        🎁
      </motion.div>

      {/* Fluttering Butterflies */}
      <motion.div
        animate={{ 
          x: [0, 80, 160, 80, 0], 
          y: [0, -60, -20, 40, 0] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/3 pointer-events-none flex items-center"
      >
        <span className="text-3xl animate-wings inline-block">🦋</span>
      </motion.div>

      <motion.div
        animate={{ 
          x: [0, -100, -50, -120, 0], 
          y: [0, 50, -40, -10, 0] 
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/3 pointer-events-none flex items-center"
      >
        <span className="text-3xl animate-wings inline-block">🦋</span>
      </motion.div>

      {/* Floating Flowers & Hearts */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-40 left-1/5 text-pink-300 text-3xl opacity-70 pointer-events-none"
      >
        🌸
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-40 right-1/5 text-pink-400 text-3xl opacity-70 pointer-events-none"
      >
        💖
      </motion.div>

      {/* Click Particles Burst */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.3, x: p.x - 12, y: p.y - 12 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: p.y - 80, 
              x: p.x + (Math.random() * 40 - 20) 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 font-bold"
            style={{ fontSize: `${p.size}px` }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

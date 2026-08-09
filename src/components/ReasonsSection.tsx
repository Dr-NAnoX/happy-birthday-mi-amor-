import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Trophy, RotateCcw, CheckCircle2 } from 'lucide-react';
import { REASONS_DATA } from '../data/reasonsData';
import { REASONS_DATA_AR, translations } from '../data/translations';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

export const ReasonsSection: React.FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang];

  const currentDataset = lang === 'ar' ? REASONS_DATA_AR : REASONS_DATA;

  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [showRewardModal, setShowRewardModal] = useState(false);

  // Reset flipped cards state on language change if desired or retain
  useEffect(() => {
    // Retain flipped count or dataset sync
  }, [lang]);

  const handleCardClick = (id: number) => {
    audioSynth.playHeartPop();

    setFlippedIds((prev) => {
      const isFlipped = prev.includes(id);
      const next = isFlipped ? prev.filter((item) => item !== id) : [...prev, id];

      // Check if all 20 are discovered!
      if (next.length === 20 && prev.length < 20) {
        audioSynth.playSparkleSound();
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FF69B4', '#FFB6C1', '#87CEEB', '#FFD700', '#9D4EDD']
        });
        setTimeout(() => {
          setShowRewardModal(true);
        }, 600);
      }

      return next;
    });
  };

  const handleFlipAll = () => {
    audioSynth.playSparkleSound();
    const allIds = currentDataset.map((r) => r.id);
    setFlippedIds(allIds);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      setShowRewardModal(true);
    }, 600);
  };

  const discoveredProgressText = t.discoveredProgress.replace('{count}', flippedIds.length.toString());

  return (
    <section id="reasons" className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full font-fredoka text-xs font-bold tracking-wider uppercase shadow-sm">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>{t.reasonsBadge}</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#4A1D2F]">
          {t.reasonsTitle}
        </h2>
        <p className="font-nunito text-base text-[#7C4A63]">
          {t.reasonsSubtitle}
        </p>

        {/* Progress Tracker Bar */}
        <div className="clay-card p-4 max-w-md mx-auto rounded-full flex items-center justify-between space-x-4 rtl:space-x-reverse border-2 border-white">
          <span className="font-fredoka text-xs font-bold text-pink-600">
            {discoveredProgressText}
          </span>
          <div className="flex-1 h-3 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(flippedIds.length / 20) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {flippedIds.length < 20 ? (
            <button
              onClick={handleFlipAll}
              className="font-fredoka text-[11px] font-bold text-purple-600 hover:text-purple-800 underline cursor-pointer"
            >
              {t.flipAllBtn}
            </button>
          ) : (
            <span className="font-fredoka text-xs font-bold text-emerald-600 flex items-center space-x-1 rtl:space-x-reverse">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.completeBadge}</span>
            </span>
          )}
        </div>
      </div>

      {/* 20 Flip Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentDataset.map((reason) => {
          const isFlipped = flippedIds.includes(reason.id);

          return (
            <div
              key={reason.id}
              onClick={() => handleCardClick(reason.id)}
              className="perspective-1000 h-48 cursor-pointer select-none"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full h-full relative transform-style-3d"
              >
                {/* Front Side */}
                <div className="clay-card-pink absolute inset-0 p-4 flex flex-col items-center justify-between text-center rounded-3xl border-2 border-white shadow-md backface-hidden">
                  <span className="w-7 h-7 bg-white text-pink-500 font-fredoka text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    #{reason.id}
                  </span>

                  <div className="text-3xl my-1 animate-pulse">
                    💖
                  </div>

                  <h4 className="font-fredoka text-xs sm:text-sm font-bold text-[#4A1D2F] line-clamp-2">
                    {reason.title}
                  </h4>

                  <span className="font-nunito text-[10px] text-pink-500 font-semibold bg-white/80 px-2.5 py-0.5 rounded-full">
                    {t.tapToFlip}
                  </span>
                </div>

                {/* Back Side */}
                <div className="clay-card-purple absolute inset-0 p-4 flex flex-col justify-between text-center rounded-3xl border-2 border-white shadow-md backface-hidden rotate-y-180">
                  <span className="font-fredoka text-[10px] font-bold text-purple-600 bg-white/80 px-2 py-0.5 rounded-full inline-block self-center">
                    {lang === 'ar' ? `سبب #${reason.id}` : `Reason #${reason.id}`}
                  </span>

                  <p className="font-nunito text-xs text-[#3E1E50] font-semibold leading-snug overflow-y-auto max-h-28 my-1 px-1">
                    {reason.description}
                  </p>

                  <span className="font-fredoka text-[10px] text-purple-500 font-bold">
                    ❤️ Mi Amor
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Completion Trophy Reward Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="clay-card p-8 max-w-md w-full text-center border-4 border-white shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg border-2 border-amber-300">
                👑
              </div>

              <h3 className="font-fredoka text-2xl font-bold text-[#4A1D2F] mb-2">
                {t.unlockedAllModalTitle}
              </h3>
              <p className="font-nunito text-sm text-[#7C4A63] mb-6">
                {t.unlockedAllModalText}
              </p>

              <button
                onClick={() => setShowRewardModal(false)}
                className="clay-btn bg-pink-500 text-white font-fredoka text-sm px-8 py-3 cursor-pointer"
              >
                {t.keepExploringBtn}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

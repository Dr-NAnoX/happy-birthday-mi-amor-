import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Gift, Crown, RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface FinalSectionProps {
  onRestart: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onRestart }) => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang];

  const [hugCount, setHugCount] = useState(188);

  const handleSendHug = () => {
    audioSynth.playSparkleSound();
    setHugCount((prev) => prev + 1);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF69B4', '#FFB6C1', '#87CEEB', '#FFD700']
    });
  };

  return (
    <section id="final" className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
      <div className="clay-card-pink p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl relative overflow-hidden space-y-8">
        {/* Floating Background Stars */}
        <div className="absolute top-6 left-8 text-3xl animate-bounce">✨</div>
        <div className="absolute bottom-6 right-8 text-3xl animate-bounce delay-300">🌸</div>

        {/* Large Pulsing Heart Badge */}
        <div className="mx-auto w-28 h-28 bg-gradient-to-tr from-[#FF4D6D] to-[#FF85A1] rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-pulse-glow">
          <Heart className="w-16 h-16 text-white fill-white" />
        </div>

        {/* Large Headings */}
        <div className="space-y-4">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="font-fredoka text-4xl sm:text-6xl font-extrabold text-[#4A1D2F] leading-tight"
          >
            {t.finalTitle}
          </motion.h2>

          <p className="font-fredoka text-2xl sm:text-3xl text-pink-600 font-bold">
            {t.finalSubtitle}
          </p>

          <p className="font-nunito text-base sm:text-lg text-[#7C4A63] max-w-xl mx-auto font-semibold leading-relaxed">
            {t.finalText}
          </p>
        </div>

        {/* Hug Counter Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSendHug}
            className="clay-btn bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-fredoka text-lg px-8 py-4 flex items-center space-x-2 rtl:space-x-reverse cursor-pointer shadow-xl border-2 border-white/80 group"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">🧸</span>
            <span>{t.sendHugBtn} ({hugCount})</span>
          </button>

          <button
            onClick={onRestart}
            className="px-6 py-4 rounded-full font-fredoka text-sm font-bold text-pink-600 hover:bg-white/80 bg-white/60 border border-pink-200 cursor-pointer transition-colors flex items-center space-x-2 rtl:space-x-reverse"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.replayStoryBtn}</span>
          </button>
        </div>

        {/* Footer Signature */}
        <div className="pt-8 border-t border-pink-200/80 font-fredoka text-sm text-[#7C4A63] flex flex-col items-center justify-center space-y-1">
          <p className="font-bold text-pink-600 text-base">
            {t.footerMadeWithLove}
          </p>
          <p className="text-xs text-pink-400">
            {t.footerDate}
          </p>
        </div>
      </div>
    </section>
  );
};

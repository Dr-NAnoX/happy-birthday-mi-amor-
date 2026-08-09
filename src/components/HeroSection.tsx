import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Flame, Volume2, ArrowDown, Gift, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface HeroSectionProps {
  onOpenHeart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHeart }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [bearMessage, setBearMessage] = useState(t.bearInitialMessage);

  // Synchronize initial bear message on lang change
  useEffect(() => {
    if (!isCandleBlown) {
      setBearMessage(t.bearInitialMessage);
    }
  }, [lang, t.bearInitialMessage, isCandleBlown]);

  const handleBlowCandle = () => {
    audioSynth.playSparkleSound();
    setIsCandleBlown(!isCandleBlown);

    if (!isCandleBlown) {
      setBearMessage(t.bearWishMessage);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF69B4', '#FFD700', '#87CEEB', '#FFB6C1']
      });
    } else {
      setBearMessage(t.bearRelitMessage);
    }
  };

  const handleBearClick = () => {
    audioSynth.playHeartPop();
    const bearQuotesEn = [
      'You are the prettiest girl in the whole wide world! 👑',
      'Sending you 1,000,000 warm bear hugs right now! 🧸❤️',
      'Today is all about celebrating YOU! ✨',
      'I love you more than honey! 🍯💕'
    ];
    const bearQuotesAr = [
      'أنتِ أجمل فتاة في هذا العالم الفسيح! 👑',
      'أرسل لكِ مليون حضن دافئ الآن! 🧸❤️',
      'اليوم هو يوم احتفال بكِ وحدكِ! ✨',
      'أحبكِ أكثر من حب الدببة للعسل! 🍯💕'
    ];
    const bearQuotes = lang === 'ar' ? bearQuotesAr : bearQuotesEn;
    const randomQuote = bearQuotes[Math.floor(Math.random() * bearQuotes.length)];
    setBearMessage(randomQuote);
  };

  return (
    <section id="hero" className="relative z-10 min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border-2 border-pink-200"
        >
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
          <span className="font-fredoka text-xs md:text-sm font-bold text-pink-600 tracking-wide uppercase">
            {t.heroBadge}
          </span>
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-fredoka text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#4A1D2F] leading-tight tracking-tight drop-shadow-sm"
        >
          {t.heroTitleLine1} <br />
          <span className="bg-gradient-to-r from-[#FF4D6D] via-[#FF758F] to-[#9D4EDD] bg-clip-text text-transparent">
            {t.heroTitleLine2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-nunito text-lg sm:text-xl text-[#7C4A63] font-semibold max-w-xl mx-auto leading-relaxed"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Clay Cake & Teddy Bear Interactive Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-md mx-auto my-6 p-6 clay-card-pink text-center overflow-hidden border-4 border-white/90 shadow-2xl"
        >
          {/* Bear Speech Bubble */}
          <motion.div
            key={bearMessage}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border-2 border-pink-200 text-xs md:text-sm font-fredoka text-[#5C3A4D] mb-6 inline-block max-w-xs relative"
          >
            {bearMessage}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-pink-200 rotate-45" />
          </motion.div>

          {/* Interactive Stage Items: Clay Cake & Bear */}
          <div className="flex items-end justify-center space-x-6 sm:space-x-10 rtl:space-x-reverse py-2">
            {/* Cute Teddy Bear */}
            <motion.div
              onClick={handleBearClick}
              whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group select-none text-center"
              title="Click Teddy for a hug!"
            >
              <div className="text-6xl sm:text-7xl animate-sway inline-block filter drop-shadow-md">
                🧸
              </div>
              <div className="font-fredoka text-[11px] font-bold text-pink-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm mt-1">
                {t.teddyTapLabel}
              </div>
            </motion.div>

            {/* 3D Clay Cake */}
            <div
              onClick={handleBlowCandle}
              className="cursor-pointer group select-none relative"
              title="Click cake to blow or relight candle!"
            >
              {/* Candle Flame Animation */}
              <div className="relative -mb-3 z-20 flex justify-center">
                {!isCandleBlown ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [-3, 3, -3] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-8 bg-gradient-to-t from-yellow-500 via-orange-400 to-amber-200 rounded-full blur-[1px] shadow-lg flex items-center justify-center animate-flame"
                  >
                    <Flame className="w-5 h-5 text-yellow-100 fill-yellow-200" />
                  </motion.div>
                ) : (
                  <div className="text-xs font-fredoka text-gray-400 animate-pulse font-bold">
                    💨 Puff!
                  </div>
                )}
              </div>

              {/* Candle Stick */}
              <div className="w-2.5 h-7 mx-auto bg-gradient-to-b from-pink-300 to-purple-300 rounded-t-sm shadow-inner" />

              {/* Cake Layers */}
              <div className="w-28 sm:w-36 h-20 bg-gradient-to-b from-amber-100 via-pink-100 to-rose-200 rounded-3xl border-4 border-white shadow-xl flex flex-col items-center justify-between p-2 relative overflow-hidden">
                {/* Frosting drips */}
                <div className="w-full flex justify-around text-pink-300 text-xs">
                  <span>🍓</span>
                  <span>👑</span>
                  <span>🍓</span>
                </div>
                <div className="font-fredoka text-xs font-bold text-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  {isCandleBlown ? t.wishUnlocked : t.makeAWish}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-2"
        >
          <button
            onClick={onOpenHeart}
            className="clay-btn bg-gradient-to-r from-[#FF69B4] via-[#FF4D6D] to-[#FF85A1] text-white font-fredoka text-xl md:text-2xl px-10 py-4 shadow-xl cursor-pointer flex items-center justify-center space-x-3 rtl:space-x-reverse mx-auto group border-2 border-white/80"
          >
            <span>{t.openHeartBtn}</span>
            <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

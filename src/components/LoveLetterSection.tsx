import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Volume2, Bookmark, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const LoveLetterSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    audioSynth.playSparkleSound();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full font-fredoka text-xs font-bold tracking-wider uppercase shadow-sm">
          <Mail className="w-4 h-4" />
          <span>{t.letterBadge}</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#4A1D2F]">
          {t.letterTitle}
        </h2>
        <p className="font-nunito text-base text-[#7C4A63]">
          {t.letterSubtitle}
        </p>
      </div>

      {/* Main Envelope & Letter Box */}
      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Folded Envelope State */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={handleToggleOpen}
              className="clay-card-pink p-12 text-center cursor-pointer border-4 border-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform"
            >
              {/* Ribbon Graphic */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-rose-300/40 border-x-2 border-rose-300/60 pointer-events-none" />

              {/* Red Wax Seal */}
              <div className="relative z-10 w-24 h-24 mx-auto bg-gradient-to-tr from-rose-600 to-red-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white group-hover:rotate-12 transition-transform mb-6">
                <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
              </div>

              <h3 className="font-fredoka text-2xl md:text-3xl font-bold text-[#4A1D2F] relative z-10 mb-2">
                {t.forPrincess}
              </h3>
              <p className="font-handwriting text-2xl text-purple-700 relative z-10 mb-6">
                {t.clickSealToRead}
              </p>

              <button className="clay-btn bg-rose-500 text-white font-fredoka text-base px-8 py-3 relative z-10 inline-flex items-center space-x-2 rtl:space-x-reverse">
                <span>{t.unfoldLetterBtn}</span>
              </button>
            </motion.div>
          ) : (
            /* Opened Handwritten Paper State */
            <motion.div
              key="opened-letter"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="bg-[#FFFDF0] p-8 md:p-12 rounded-[2.5rem] border-4 border-[#F3E5AB] shadow-2xl relative text-start font-handwriting text-2xl md:text-3xl text-[#3E2723] leading-relaxed space-y-6"
            >
              {/* Top Seal Stamp */}
              <div className="flex items-center justify-between border-b-2 border-pink-200 pb-4 font-fredoka text-xs text-pink-500">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t.letterHeaderTitle}</span>
                </div>
                <button
                  onClick={handleToggleOpen}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-3 py-1 rounded-full cursor-pointer transition-colors"
                >
                  {t.foldBackBtn}
                </button>
              </div>

              {/* Letter Text */}
              <div className="whitespace-pre-line font-medium text-[#4A2E1A] pt-2">
                {t.letterBody}
              </div>

              {/* Bottom Stamp Signature */}
              <div className="pt-6 border-t-2 border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-fredoka text-sm text-[#7C4A63]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-rose-500">
                  <CheckCircle2 className="w-5 h-5 fill-rose-100" />
                  <span>{t.sealedWithKisses}</span>
                </div>
                <button
                  onClick={() => {
                    audioSynth.playSparkleSound();
                    alert(lang === 'ar' ? 'تم إرسال قبلة دافئة الآن! 😘❤️' : 'Sending a virtual kiss right now! 😘❤️');
                  }}
                  className="clay-btn bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs px-5 py-2.5 cursor-pointer"
                >
                  {t.sendKissBackBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

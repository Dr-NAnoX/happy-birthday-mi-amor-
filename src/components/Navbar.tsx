import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Volume2, VolumeX, Music, Globe } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [daysCount, setDaysCount] = useState(0);

  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  // Calculate days together from Aug 18, 2022
  useEffect(() => {
    const startDate = new Date('2022-08-18').getTime();
    const today = new Date().getTime();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setDaysCount(diffDays > 0 ? diffDays : 876);
  }, []);

  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleMusic = () => {
    const playing = audioSynth.toggleBackgroundMusic();
    setIsMusicPlaying(playing);
  };

  const dayLabelText = t.dayLabel.replace('{days}', daysCount.toString());

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 max-w-5xl mx-auto pointer-events-none">
      <div className="clay-card py-2.5 px-4 md:px-6 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-white/90 shadow-lg border-2 border-white/90 rounded-full">
        {/* Brand / Days Counter */}
        <button
          onClick={() => onScrollTo('hero')}
          className="flex items-center space-x-2 rtl:space-x-reverse text-start cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="font-fredoka text-sm font-bold text-[#5C3A4D] flex items-center space-x-1 rtl:space-x-reverse">
              <span>Mi Amor</span>
              <span className="text-pink-500">❤️</span>
            </div>
            <div className="font-nunito text-[11px] text-pink-500 font-semibold">
              {dayLabelText}
            </div>
          </div>
        </button>

        {/* Quick Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse font-fredoka text-xs font-semibold text-[#6C425A]">
          <button
            onClick={() => onScrollTo('memories')}
            className="px-3 py-1.5 rounded-full hover:bg-pink-100/70 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <span>{t.navMemories}</span>
          </button>
          <button
            onClick={() => onScrollTo('letter')}
            className="px-3 py-1.5 rounded-full hover:bg-pink-100/70 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <span>{t.navLetter}</span>
          </button>
          <button
            onClick={() => onScrollTo('garden')}
            className="px-3 py-1.5 rounded-full hover:bg-pink-100/70 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <span>{t.navGarden}</span>
          </button>
          <button
            onClick={() => onScrollTo('reasons')}
            className="px-3 py-1.5 rounded-full hover:bg-pink-100/70 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <span>{t.navReasons}</span>
          </button>
          <button
            onClick={() => onScrollTo('future')}
            className="px-3 py-1.5 rounded-full hover:bg-pink-100/70 hover:text-pink-600 transition-colors cursor-pointer"
          >
            <span>{t.navFuture}</span>
          </button>
        </nav>

        {/* Audio Controls & Language Toggle */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
            className="px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-600 font-fredoka text-xs font-bold flex items-center space-x-1 rtl:space-x-reverse transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-pink-500" />
            <span>{lang === 'en' ? '🇸🇦 عربي' : '🇬🇧 EN'}</span>
          </button>

          {/* Background Lullaby Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isMusicPlaying ? 'Pause Ambient Lullaby' : 'Play Ambient Lullaby'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMusicPlaying 
                ? 'bg-pink-500 text-white shadow-md animate-pulse' 
                : 'bg-pink-100 text-pink-400 hover:bg-pink-200'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Master Audio Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="w-9 h-9 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

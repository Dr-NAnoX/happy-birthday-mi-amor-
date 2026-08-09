import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, User, Sparkles, Key, ArrowRight, Globe, Clock, Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpeningEnvelope, setIsOpeningEnvelope] = useState(false);

  // Timer & Lock states
  const [showLockModal, setShowLockModal] = useState(false);
  const [currentCuteMsg, setCurrentCuteMsg] = useState('');
  const [bypassTimer, setBypassTimer] = useState(false);

  const { lang, toggleLang, isRtl } = useLanguage();
  const t = translations[lang];

  // Target date: August 18, 2026 00:00:00
  const targetDate = new Date(2026, 7, 18, 0, 0, 0);

  const calculateTimeLeft = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLocked = !timeLeft.isPast && !bypassTimer;

  const handleUnlockAndEnter = () => {
    setErrorMessage('');
    setShowLockModal(false);
    setIsOpeningEnvelope(true);
    audioSynth.playSparkleSound();
    audioSynth.startMusic();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFB6C1', '#87CEEB', '#E6E6FA', '#FFD700']
    });

    setTimeout(() => {
      onLoginSuccess();
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playHeartPop();

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (normalizedUsername === 'admin' && normalizedPassword === 'admin') {
      setErrorMessage('');
      handleUnlockAndEnter();
    } else if (normalizedUsername === 'mi amor' && normalizedPassword === '1882002') {
      setErrorMessage('');

      if (isLocked) {
        // Pick a cute message each attempt!
        const messages = t.cuteMessages;
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setCurrentCuteMsg(randomMsg);
        setShowLockModal(true);
        audioSynth.playSparkleSound();
      } else {
        handleUnlockAndEnter();
      }
    } else {
      setErrorMessage(t.loginError);
      audioSynth.playPluckNote(220); // Low error tone
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[#FFE4E1] via-[#FFF0F5] to-[#E0F2FE]">
      {/* Top Floating Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleLang}
          className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border-2 border-pink-200 font-fredoka text-xs font-bold text-pink-600 hover:bg-pink-50 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <Globe className="w-4 h-4 text-pink-500" />
          <span>{lang === 'en' ? '🇬🇧 English' : '🇸🇦 العربية'}</span>
          <span className="text-gray-400">|</span>
          <span className="text-purple-600">{lang === 'en' ? 'عربي' : 'EN'}</span>
        </button>
      </div>

      {/* Background Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Clouds */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -15, 0] }} 
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 text-white/80"
        >
          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 rtl:space-x-reverse text-pink-300">
            <span className="text-2xl">☁️</span>
            <span className="font-fredoka text-xs text-pink-400 font-bold">Secret Realm</span>
          </div>
        </motion.div>

        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }} 
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 right-10 text-white/80"
        >
          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 rtl:space-x-reverse text-purple-300">
            <span className="text-2xl">🎂</span>
            <span className="font-fredoka text-xs text-purple-400 font-bold">August 18th</span>
          </div>
        </motion.div>

        {/* Floating Hearts & Flowers */}
        <motion.div 
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 text-pink-400 opacity-60 text-4xl"
        >
          💖
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 left-1/4 text-pink-300 opacity-60 text-4xl"
        >
          🌸
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }} 
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/3 left-1/6 text-yellow-300 text-3xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Main Login Envelope Container */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isOpeningEnvelope ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
              className="clay-card p-8 md:p-10 relative text-center"
            >
              {/* Live Countdown Banner Header */}
              {isLocked && (
                <div className="mb-4 bg-pink-50 border-2 border-pink-200 p-2.5 rounded-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs font-fredoka font-bold text-pink-600 shadow-inner">
                  <Clock className="w-4 h-4 text-pink-500 animate-spin" />
                  <span>
                    🎂 18-8 Lock: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </span>
                </div>
              )}

              {/* Cute Badge Header */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[#FFB6C1] to-[#FF69B4] rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4 animate-float-slow">
                <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
              </div>

              <h1 className="font-fredoka text-2xl md:text-3xl text-[#5C3A4D] font-bold mb-1">
                {t.loginTitle}
              </h1>
              <p className="font-nunito text-sm text-[#8C6078] mb-6">
                {t.loginSubtitle}
              </p>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-start">
                {/* Username Input */}
                <div>
                  <label className="block font-fredoka text-xs font-semibold text-[#6C425A] mb-1 px-2">
                    {t.nicknameLabel}
                  </label>
                  <div className="relative">
                    <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400 ${isRtl ? 'right-4' : 'left-4'}`} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className={`clay-input w-full py-3 font-nunito text-base text-[#4A1D2F] placeholder-pink-300 font-semibold ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block font-fredoka text-xs font-semibold text-[#6C425A] mb-1 px-2">
                    {t.passcodeLabel}
                  </label>
                  <div className="relative">
                    <Key className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400 ${isRtl ? 'right-4' : 'left-4'}`} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passcodePlaceholder}
                      required
                      className={`clay-input w-full py-3 font-nunito text-base text-[#4A1D2F] placeholder-pink-300 font-semibold ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                    />
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 border-2 border-red-200 text-red-500 font-fredoka text-xs md:text-sm p-3 rounded-2xl text-center shadow-inner"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Clay Button */}
                <button
                  type="submit"
                  className="clay-btn w-full bg-gradient-to-r from-[#FF7B9C] via-[#FF69B4] to-[#FF85A1] text-white font-fredoka text-lg py-3.5 px-6 flex items-center justify-center space-x-2 shadow-md cursor-pointer group mt-2"
                >
                  <span>{t.loginButton}</span>
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </button>
              </form>
            </motion.div>
          ) : (
            /* Opening Envelope Animation State */
            <motion.div
              key="envelope-opening"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              className="clay-card-pink p-10 text-center relative overflow-hidden"
            >
              {/* Envelope flap open graphic */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 180 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="w-24 h-24 mx-auto bg-pink-400 rounded-3xl flex items-center justify-center shadow-2xl mb-4 border-4 border-white"
              >
                <Sparkles className="w-12 h-12 text-yellow-200 animate-spin" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-fredoka text-3xl text-pink-600 font-bold mb-2"
              >
                {t.loginUnlocking}
              </motion.h2>

              <p className="font-handwriting text-2xl text-purple-700">
                {t.loginWelcome}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lock Countdown & Cute Attempt Message Modal */}
      <AnimatePresence>
        {showLockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="clay-card max-w-md w-full p-6 md:p-8 text-center relative border-4 border-white shadow-2xl bg-[#FFFDF9]"
            >
              <button
                onClick={() => setShowLockModal(false)}
                className={`absolute top-4 w-9 h-9 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors cursor-pointer ${isRtl ? 'left-4' : 'right-4'}`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-md mb-3 border-2 border-white">
                <Lock className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-fredoka text-2xl font-bold text-[#4A1D2F] mb-1">
                {t.lockTitle}
              </h3>
              <p className="font-nunito text-xs text-[#8C6078] mb-4 font-semibold">
                {t.lockSubtitle}
              </p>

              {/* Cute Attempt Message Box */}
              <div className="bg-pink-50 border-2 border-pink-200 p-4 rounded-2xl mb-6 shadow-inner relative overflow-hidden">
                <Sparkles className="w-5 h-5 text-amber-400 absolute top-2 right-2 animate-pulse" />
                <p className="font-handwriting text-xl md:text-2xl text-purple-800 leading-snug">
                  "{currentCuteMsg}"
                </p>
              </div>

              {/* Live Countdown Grid */}
              <div className="mb-6">
                <p className="font-fredoka text-xs font-bold text-pink-600 mb-2 uppercase tracking-wider">
                  {t.countdownLabel}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="clay-card-pink p-2 text-center rounded-2xl border-2 border-white">
                    <span className="font-fredoka text-xl font-extrabold text-pink-600 block">
                      {timeLeft.days}
                    </span>
                    <span className="font-nunito text-[10px] font-bold text-pink-400">
                      {t.days}
                    </span>
                  </div>
                  <div className="clay-card-pink p-2 text-center rounded-2xl border-2 border-white">
                    <span className="font-fredoka text-xl font-extrabold text-pink-600 block">
                      {timeLeft.hours}
                    </span>
                    <span className="font-nunito text-[10px] font-bold text-pink-400">
                      {t.hours}
                    </span>
                  </div>
                  <div className="clay-card-pink p-2 text-center rounded-2xl border-2 border-white">
                    <span className="font-fredoka text-xl font-extrabold text-pink-600 block">
                      {timeLeft.minutes}
                    </span>
                    <span className="font-nunito text-[10px] font-bold text-pink-400">
                      {t.minutes}
                    </span>
                  </div>
                  <div className="clay-card-pink p-2 text-center rounded-2xl border-2 border-white">
                    <span className="font-fredoka text-xl font-extrabold text-pink-600 block">
                      {timeLeft.seconds}
                    </span>
                    <span className="font-nunito text-[10px] font-bold text-pink-400">
                      {t.seconds}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowLockModal(false)}
                  className="clay-btn w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-fredoka text-base py-3 px-6 cursor-pointer shadow-md"
                >
                  {t.willWaitBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

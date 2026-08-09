import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { FloatingBackground } from './components/FloatingBackground';
import { HeroSection } from './components/HeroSection';
import { MemoriesSection } from './components/MemoriesSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FlowerGardenSection } from './components/FlowerGardenSection';
import { ReasonsSection } from './components/ReasonsSection';
import { FutureTimelineSection } from './components/FutureTimelineSection';
import { FinalSection } from './components/FinalSection';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="min-h-screen relative font-nunito bg-[#FFF5F8] text-[#5C3A4D] overflow-x-hidden">
          {/* Floating Ambient Interactive Background */}
          <FloatingBackground />

          {/* Floating Header */}
          <Navbar onScrollTo={handleScrollTo} />

          {/* Main Love Letter Content */}
          <main className="relative z-10 space-y-12">
            <HeroSection onOpenHeart={() => handleScrollTo('memories')} />
            <MemoriesSection />
            <LoveLetterSection />
            <FlowerGardenSection />
            <ReasonsSection />
            <FutureTimelineSection />
            <FinalSection onRestart={handleRestart} />
          </main>
        </div>
      )}
    </LanguageProvider>
  );
}

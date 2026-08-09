import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Heart, Sparkles, Plus, Check } from 'lucide-react';
import { GardenFlower } from '../types';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const FlowerGardenSection: React.FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang];

  const initialFlowersEn: GardenFlower[] = [
    { id: 1, type: 'Rose', color: '#FF4D6D', petals: 6, quote: 'Your beauty blossoms brighter every single day! 🌹', bloomed: true, x: 15, y: 30 },
    { id: 2, type: 'Tulip', color: '#FF85A1', petals: 5, quote: 'Fresh, sweet, and perfectly radiant! 🌷', bloomed: true, x: 35, y: 20 },
    { id: 3, type: 'Daisy', color: '#FFB703', petals: 8, quote: 'You bring sunshine into every cloudy room! 🌼', bloomed: true, x: 55, y: 35 },
    { id: 4, type: 'Lavender', color: '#9D4EDD', petals: 7, quote: 'Your gentle spirit soothes my soul! 🪻', bloomed: true, x: 75, y: 25 },
    { id: 5, type: 'Cherry Blossom', color: '#FFB6C1', petals: 5, quote: 'Delicate, timeless, and unforgettable! 🌸', bloomed: true, x: 88, y: 40 },
  ];

  const initialFlowersAr: GardenFlower[] = [
    { id: 1, type: 'وردة', color: '#FF4D6D', petals: 6, quote: 'جمالكِ يتفتح ويزدهر كل يوم أكثر! 🌹', bloomed: true, x: 15, y: 30 },
    { id: 2, type: 'توليب', color: '#FF85A1', petals: 5, quote: 'رقيقة، عذبة، ومشرقة دائماً! 🌷', bloomed: true, x: 35, y: 20 },
    { id: 3, type: 'أقحوان', color: '#FFB703', petals: 8, quote: 'تُدخلين أشعة الشمس والبهجة في كل مكان! 🌼', bloomed: true, x: 55, y: 35 },
    { id: 4, type: 'خزامى', color: '#9D4EDD', petals: 7, quote: 'روحكِ الرقيقة تنشر السلام والهدوء في قلبي! 🪻', bloomed: true, x: 75, y: 25 },
    { id: 5, type: 'زهرة الكرز', color: '#FFB6C1', petals: 5, quote: 'ناعمة، خالدة، ولا تُنسى أبداً! 🌸', bloomed: true, x: 88, y: 40 },
  ];

  const [flowers, setFlowers] = useState<GardenFlower[]>(lang === 'ar' ? initialFlowersAr : initialFlowersEn);
  const [activeMessage, setActiveMessage] = useState<string | null>(t.defaultGardenMessage);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [newFlowerName, setNewFlowerName] = useState('');
  const [newFlowerColor, setNewFlowerColor] = useState('#FF69B4');

  const handleFlowerClick = (flower: GardenFlower) => {
    audioSynth.playSparkleSound();
    setActiveMessage(flower.quote);

    setFlowers((prev) =>
      prev.map((f) => (f.id === flower.id ? { ...f, bloomed: true } : f))
    );
  };

  const handlePlantFlower = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlowerName.trim()) return;

    audioSynth.playHeartPop();

    const newF: GardenFlower = {
      id: Date.now(),
      type: newFlowerName,
      color: newFlowerColor,
      petals: 6,
      quote: lang === 'ar' ? `زُعت بكتلة حب من أجل ${newFlowerName}! 💖` : `Planted with love for ${newFlowerName}! 💖`,
      bloomed: true,
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 30) + 20
    };

    setFlowers((prev) => [...prev, newF]);
    setActiveMessage(lang === 'ar' ? `تم زراعة زهرة ${newFlowerName} الجديدة في حديقتنا! 🌸` : `New ${newFlowerName} planted in our garden! 🌸`);
    setNewFlowerName('');
    setShowPlantModal(false);
  };

  return (
    <section id="garden" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full font-fredoka text-xs font-bold tracking-wider uppercase shadow-sm">
          <Flower2 className="w-4 h-4" />
          <span>{t.gardenBadge}</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#4A1D2F]">
          {t.gardenTitle}
        </h2>
        <p className="font-nunito text-base text-[#7C4A63]">
          {t.gardenSubtitle}
        </p>
      </div>

      {/* Garden Stage Box */}
      <div className="clay-card-cream p-8 md:p-12 relative min-h-[380px] rounded-[3rem] border-4 border-white shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Active Speech Bubble */}
        <div className="text-center mb-6 z-10">
          <AnimatePresence mode="wait">
            {activeMessage && (
              <motion.div
                key={activeMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-block bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-md border-2 border-pink-200 font-fredoka text-sm md:text-base text-pink-600 font-semibold"
              >
                {activeMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Flower Bed Stage */}
        <div className="relative h-56 w-full bg-gradient-to-t from-emerald-200/80 via-emerald-100/40 to-transparent rounded-3xl border-b-8 border-emerald-300/80 p-4 flex items-end justify-around">
          {/* Fluttering Butterfly in Garden */}
          <motion.div
            animate={{ x: [-20, 100, -20], y: [-10, -50, -10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 left-10 text-3xl z-20 pointer-events-none animate-wings"
          >
            🦋
          </motion.div>

          {/* Planted Flowers */}
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              onClick={() => handleFlowerClick(flower)}
              whileHover={{ scale: 1.25, y: -10 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer text-center relative z-10 group"
            >
              {/* Flower Blossom */}
              <div 
                className="text-5xl sm:text-6xl animate-sway transition-transform filter drop-shadow-md"
                style={{ color: flower.color }}
              >
                🌸
              </div>

              {/* Stem */}
              <div className="w-2 h-12 bg-emerald-500 mx-auto rounded-full -mt-2 shadow-sm" />

              {/* Flower Badge */}
              <span className="font-fredoka text-[11px] font-bold bg-white/90 text-emerald-800 px-2 py-0.5 rounded-full shadow-sm border border-emerald-200 opacity-90 group-hover:opacity-100 transition-opacity">
                {flower.type}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Garden Controls */}
        <div className="mt-6 text-center z-10">
          <button
            onClick={() => setShowPlantModal(true)}
            className="clay-btn bg-emerald-500 hover:bg-emerald-600 text-white font-fredoka text-sm px-6 py-3 inline-flex items-center space-x-2 rtl:space-x-reverse cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{t.plantNewFlowerBtn}</span>
          </button>
        </div>
      </div>

      {/* Plant Flower Modal */}
      <AnimatePresence>
        {showPlantModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="clay-card p-6 md:p-8 max-w-md w-full border-4 border-white shadow-2xl relative text-start"
            >
              <h3 className="font-fredoka text-2xl font-bold text-[#4A1D2F] mb-2">
                {t.plantModalTitle}
              </h3>
              <p className="font-nunito text-xs text-[#7C4A63] mb-4">
                {t.plantModalSubtitle}
              </p>

              <form onSubmit={handlePlantFlower} className="space-y-4">
                <div>
                  <label className="block font-fredoka text-xs font-semibold text-[#5C3A4D] mb-1">
                    {t.flowerNameLabel}
                  </label>
                  <input
                    type="text"
                    value={newFlowerName}
                    onChange={(e) => setNewFlowerName(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: فل ياسمين الحلو' : 'e.g. Sweet Jasmine'}
                    required
                    className="clay-input w-full px-4 py-2.5 font-nunito text-sm"
                  />
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-semibold text-[#5C3A4D] mb-1">
                    {t.chooseColorLabel}
                  </label>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {['#FF4D6D', '#FF85A1', '#FFB703', '#9D4EDD', '#3A86FF', '#06D6A0'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewFlowerColor(color)}
                        className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${
                          newFlowerColor === color ? 'scale-125 ring-2 ring-pink-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPlantModal(false)}
                    className="px-4 py-2 rounded-full font-fredoka text-xs font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="clay-btn bg-emerald-500 text-white font-fredoka text-xs px-5 py-2.5 cursor-pointer"
                  >
                    {t.plantBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

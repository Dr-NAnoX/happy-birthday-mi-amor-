import React from 'react';
import { motion } from 'motion/react';
import { Compass, Plane, Home, Cat, HeartHandshake, Sparkles } from 'lucide-react';
import { FUTURE_DATA } from '../data/futureData';
import { FUTURE_DATA_AR, translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

export const FutureTimelineSection: React.FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang];

  const currentDataset = lang === 'ar' ? FUTURE_DATA_AR : FUTURE_DATA;

  return (
    <section id="future" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full font-fredoka text-xs font-bold tracking-wider uppercase shadow-sm">
          <Compass className="w-4 h-4" />
          <span>{t.futureBadge}</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#4A1D2F]">
          {t.futureTitle}
        </h2>
        <p className="font-nunito text-base text-[#7C4A63]">
          {t.futureSubtitle}
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {currentDataset.map((item, index) => {
          const cardClass = item.color === 'pink' 
            ? 'clay-card-pink' 
            : item.color === 'purple' 
            ? 'clay-card-purple' 
            : item.color === 'blue' 
            ? 'clay-card-blue' 
            : 'clay-card-cream';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`${cardClass} p-8 relative border-4 border-white shadow-xl flex flex-col justify-between text-start`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-fredoka text-xs font-bold text-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                    {item.period}
                  </span>
                  <span className="text-3xl">
                    {item.id === 1 ? '✈️' : item.id === 2 ? '🏡' : item.id === 3 ? '🐱' : '👴👵'}
                  </span>
                </div>

                <h3 className="font-fredoka text-2xl font-bold text-[#4A1D2F] mb-3">
                  {item.title}
                </h3>

                <p className="font-nunito text-sm text-[#5C3A4D] font-semibold leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                <span className="font-fredoka text-xs text-pink-500 font-bold">
                  {t.futurePromise}
                </span>
                <span className="font-fredoka text-xs font-bold bg-white/80 text-purple-700 px-3 py-1 rounded-full shadow-sm">
                  #{item.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Sparkles, Eye, X, Filter } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memoriesData';
import { MEMORIES_DATA_AR, translations } from '../data/translations';
import { MemoryItem } from '../types';
import { audioSynth } from '../utils/audioSynth';
import { useLanguage } from '../context/LanguageContext';

export const MemoriesSection: React.FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang];

  const currentDataset = lang === 'ar' ? MEMORIES_DATA_AR : MEMORIES_DATA;

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>(currentDataset);

  // Update memories dataset on language change
  useEffect(() => {
    setMemories(currentDataset);
    setSelectedTag('All');
  }, [lang]);

  const tags = lang === 'ar'
    ? ['All', 'First Meet', 'Laughter', 'Surprise', 'Deep Talk', 'Sunset']
    : ['All', 'First Meet', 'Laughter', 'Surprise', 'Deep Talk', 'Sunset'];

  const filteredMemories = selectedTag === 'All'
    ? memories
    : memories.filter((m) => m.tags.includes(selectedTag));

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.playHeartPop();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likesCount: m.likesCount + 1 } : m))
    );
  };

  return (
    <section id="memories" className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full font-fredoka text-xs font-bold tracking-wider uppercase shadow-sm">
          <Heart className="w-4 h-4 fill-pink-500" />
          <span>{t.memoriesBadge}</span>
        </div>
        <h2 className="font-fredoka text-3xl sm:text-5xl font-extrabold text-[#4A1D2F]">
          {t.memoriesTitle}
        </h2>
        <p className="font-nunito text-base sm:text-lg text-[#7C4A63]">
          {t.memoriesSubtitle}
        </p>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                audioSynth.playHeartPop();
                setSelectedTag(tag);
              }}
              className={`px-4 py-2 rounded-full font-fredoka text-xs font-bold cursor-pointer transition-all ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md scale-105'
                  : 'bg-white/80 text-pink-500 hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {tag === 'All' ? t.allMemoriesFilter : `✨ ${tag}`}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -8 }}
            className="clay-card p-6 flex flex-col justify-between relative group cursor-pointer border-4 border-white/90"
            onClick={() => setSelectedMemory(memory)}
          >
            {/* Top Ribbon Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-fredoka text-xs font-bold text-pink-600 bg-pink-100/80 px-3 py-1 rounded-full border border-pink-200">
                {memory.badge}
              </span>
              <button
                onClick={(e) => handleLike(memory.id, e)}
                className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-fredoka text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full border border-rose-200 cursor-pointer transition-colors"
                title="Send a heart"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>{memory.likesCount}</span>
              </button>
            </div>

            {/* Clay Frame Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4 border-4 border-white shadow-md aspect-video group-hover:shadow-lg transition-shadow">
              <img
                src={memory.imagePlaceholder}
                alt={memory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-pink-600 font-fredoka text-xs px-3 py-1.5 rounded-full flex items-center space-x-1 rtl:space-x-reverse shadow-lg">
                  <Eye className="w-4 h-4" />
                  <span>{t.viewFullMemory}</span>
                </span>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2 mb-3">
              <h3 className="font-fredoka text-xl font-bold text-[#4A1D2F]">
                {memory.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs font-nunito font-semibold text-pink-500">
                <span className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{memory.date}</span>
                </span>
                <span className="flex items-center space-x-1 rtl:space-x-reverse">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{memory.location}</span>
                </span>
              </div>
            </div>

            {/* Romantic Quote */}
            <p className="font-handwriting text-xl text-purple-700 bg-purple-50/70 p-3 rounded-xl border border-purple-100 italic mb-3">
              {memory.quote}
            </p>

            {/* Feelings Description */}
            <p className="font-nunito text-xs text-[#6C425A] line-clamp-3 leading-relaxed">
              {memory.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Memory Preview Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="clay-card p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border-4 border-white shadow-2xl"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className={`absolute top-4 w-9 h-9 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors cursor-pointer ${isRtl ? 'left-4' : 'right-4'}`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 text-start">
                <span className="inline-block font-fredoka text-xs font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                  {selectedMemory.badge}
                </span>

                <h3 className="font-fredoka text-2xl md:text-3xl font-bold text-[#4A1D2F]">
                  {selectedMemory.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm font-nunito font-bold text-pink-500">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedMemory.date}</span>
                  </span>
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedMemory.location}</span>
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={selectedMemory.imagePlaceholder}
                    alt={selectedMemory.title}
                    className="w-full max-h-80 object-cover"
                  />
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <p className="font-handwriting text-2xl text-purple-800 text-center">
                    {selectedMemory.quote}
                  </p>
                </div>

                <p className="font-nunito text-base text-[#5C3A4D] leading-relaxed">
                  {selectedMemory.description}
                </p>

                <div className="pt-4 flex justify-between items-center border-t border-pink-100">
                  <span className="font-fredoka text-xs text-pink-400">
                    Memory #{selectedMemory.id} of 9
                  </span>
                  <button
                    onClick={(e) => handleLike(selectedMemory.id, e)}
                    className="clay-btn bg-pink-500 text-white font-fredoka text-xs px-4 py-2 flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{t.sendHeart} ({selectedMemory.likesCount})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

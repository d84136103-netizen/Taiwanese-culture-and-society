import React, { useState } from 'react';
import { FoodItem, FOODS } from '../data/gameData';
import { Compass, Search, Sparkles, ArrowUpRight, Star } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FoodSelectorProps {
  onSelectFood: (food: FoodItem) => void;
  lang: 'zh' | 'en';
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focalOnly, setFocalOnly] = useState(false);
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);

  const filteredFoods = FOODS.filter(food => {
    if (focalOnly && !food.isFocal) return false;
    const name = food.name[lang === 'en' ? 1 : 0].toLowerCase();
    const lead = food.lead[lang === 'en' ? 1 : 0].toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || lead.includes(query);
  });

  return (
    <div className="space-y-6">
      {/* Chapter Badge and Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'CHAPTER 01 · NIGHT MARKET TO THE WORLD' : '第一章 · 夜市裡的文化旅行'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            {lang === 'en' ? 'Which flavour will your camera follow tonight?' : '今晚，你的鏡頭會追隨哪一道臺灣味道？'}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Ten iconic foods, ten trajectories of migration, craft and cross-border reinvention. Research focuses on 3 primary documented cases (Boba, Beef Noodles, Gua Bao).'
              : '十條不同的小吃遷徙路線。本期中研究特別聚焦「珍珠奶茶、牛肉麵、刈包」三大具備明確文獻與跨境案例的主例，其餘七道為比較素材。'}
          </p>
        </div>

        {/* Filters and Search input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Focal filter button */}
          <button
            onClick={() => {
              setFocalOnly(!focalOnly);
              sounds.playSelect();
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              focalOnly
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                : 'bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${focalOnly ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
            <span>{lang === 'en' ? '3 Core Cases Only' : '僅顯示3大核心案例'}</span>
          </button>

          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'en' ? 'Filter food...' : '搜尋料理...'}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400/60 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 10 Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {filteredFoods.map((food, idx) => {
          const isHovered = hoveredFood === food.id;
          return (
            <button
              key={food.id}
              onClick={() => {
                sounds.playShutter();
                onSelectFood(food);
              }}
              onMouseEnter={() => {
                setHoveredFood(food.id);
                sounds.playSelect();
              }}
              onMouseLeave={() => setHoveredFood(null)}
              className={`group relative text-left rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between overflow-hidden hover:-translate-y-1 hover:shadow-xl ${
                food.isFocal
                  ? 'bg-gradient-to-b from-slate-900 to-amber-950/30 border-2 border-amber-400/40 hover:border-amber-400 hover:shadow-amber-500/10'
                  : 'bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 hover:border-teal-400/50 hover:shadow-teal-950/40'
              }`}
            >
              {/* Focal Case Tag */}
              {food.isFocal && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-bold text-amber-300 flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                  <span>{lang === 'en' ? 'CORE CASE' : '專題核心'}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-amber-300 font-bold">
                    0{idx + 1}
                  </span>
                  {!food.isFocal && (
                    <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-teal-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 text-xs transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Big icon */}
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200 drop-shadow-md">
                  {food.icon}
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-teal-200 transition-colors">
                  {food.name[lang === 'en' ? 1 : 0]}
                </h3>

                <p className="text-[11px] text-amber-300/80 font-medium mt-1 line-clamp-1">
                  {food.micro[lang === 'en' ? 1 : 0]}
                </p>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {food.lead[lang === 'en' ? 1 : 0]}
                </p>
              </div>

              {/* Bottom footprint */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                <span>3 Clues · 2 Tasks</span>
                <span className="text-teal-400/80 font-medium group-hover:text-teal-300">
                  {lang === 'en' ? 'Start Film →' : '開啟路線 →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pedagogical footnote */}
      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-4">
        <span>
          {lang === 'en'
            ? '★ Marked with "CORE CASE": The 3 focal subjects for formal midterm analysis (Bubble Tea, Beef Noodles, Gua Bao), grounded in documented transnational flows.'
            : '★ 標註「專題核心」者：為期中報告建議深入分析的三項主例（珍奶、牛肉麵、刈包），皆具備完備文獻、清晰起源爭議與跨境案例。'}
        </span>
        <span className="text-amber-300/90 font-mono text-xs">RESEARCH SCOPE</span>
      </div>
    </div>
  );
};

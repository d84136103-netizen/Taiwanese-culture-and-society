import React from 'react';
import { FoodItem } from '../data/gameData';
import { Play, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ChapterTransitionProps {
  food: FoodItem;
  editedTitle: [string, string];
  onProceed: () => void;
  lang: 'zh' | 'en';
}

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({
  food,
  editedTitle,
  onProceed,
  lang
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center py-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
        <Sparkles className="w-3.5 h-3.5" />
        <span>CHAPTER 01 COMPLETE · BROADCAST LIVE</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white">
        {lang === 'en' ? 'Your first episode is live.' : '你的第一支影片，已經發布。'}
      </h1>

      {/* Simulated YouTube Video Card */}
      <div className="text-left bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
        <div className="aspect-video bg-gradient-to-br from-slate-800 via-teal-950 to-slate-950 flex items-center justify-center relative">
          <div className="text-7xl drop-shadow-2xl">{food.icon}</div>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center pl-1 shadow-lg shadow-red-600/40">
              <Play className="w-6 h-6 fill-white" />
            </span>
          </div>
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
            08:00
          </span>
        </div>

        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>ALEX IN TAIWAN</span>
            <span className="text-teal-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Trending in Taiwan & Diaspora' : '發燒熱播中'}</span>
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white">
            {editedTitle[lang === 'en' ? 1 : 0]}
          </h2>
          <p className="text-xs text-slate-300 line-clamp-2">
            {food.sample[lang === 'en' ? 1 : 0]}
          </p>
        </div>
      </div>

      {/* Chapter 2 teaser */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/20 text-xs text-amber-200 text-left">
        <span className="font-bold text-amber-300 mr-2">
          {lang === 'en' ? 'Chapter 2 Preview:' : '第二章導言：'}
        </span>
        <span>
          {lang === 'en'
            ? 'When you film Taiwan, everyday life here begins to film you, too. What happens when the camera turns around?'
            : '當你用鏡頭凝視臺灣，臺灣的生活也開始凝視你。鏡頭轉向自身時，你會看見怎樣的歸屬感？'}
        </span>
      </div>

      <button
        onClick={() => {
          sounds.playShutter();
          onProceed();
        }}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <span>{lang === 'en' ? 'Enter Chapter II: The Mirror →' : '進入第二章：鏡頭回望 →'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

import React from 'react';
import { FoodItem, DilemmaOption } from '../data/gameData';
import { Video, ArrowUpRight, MessageSquareQuote, Camera } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MarketScreenProps {
  food: FoodItem;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const MarketScreen: React.FC<MarketScreenProps> = ({
  food,
  options,
  onSelectOption,
  lang
}) => {
  const handlePick = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      {/* Live Scene Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-5 md:p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl p-3 bg-teal-500/10 rounded-2xl border border-teal-500/30">
            {food.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE ON-SITE FILMING</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              {food.name[lang === 'en' ? 1 : 0]}
            </h2>
            <p className="text-xs text-slate-400">
              {food.micro[lang === 'en' ? 1 : 0]}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <Camera className="w-3.5 h-3.5 text-teal-400" />
          <span>TAKE 01 / ON THE STREET</span>
        </div>
      </div>

      {/* Field Dialogue Box */}
      <div className="space-y-4 bg-slate-900/70 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <MessageSquareQuote className="w-4 h-4" />
          <span>{lang === 'en' ? 'Field Dialogue & Conflict' : '攤位前的真實對話與掙扎'}</span>
        </div>

        {/* Vendor's line */}
        <div className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
            {lang === 'en' ? 'V' : '攤'}
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 mb-1">
              {food.exp[lang === 'en' ? 1 : 0]}
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic">
              "{food.tension[lang === 'en' ? 1 : 0]}"
            </p>
          </div>
        </div>

        {/* Alex's internal monologue */}
        <div className="flex items-start gap-3 bg-teal-950/20 p-4 rounded-xl border border-teal-500/20">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-xs">
            {lang === 'en' ? 'A' : '亞'}
          </div>
          <div>
            <div className="text-xs font-bold text-teal-300 mb-1">
              {lang === 'en' ? 'Alex · Internal Monologue' : 'Alex · 你的內心抉擇'}
            </div>
            <p className="text-xs md:text-sm text-teal-100 leading-relaxed">
              "{food.sample[lang === 'en' ? 1 : 0]}"
            </p>
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Video className="w-4 h-4 text-teal-400" />
          <span>{lang === 'en' ? 'Director’s Shot Choice:' : '你決定將鏡頭對準哪裡？'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handlePick(idx)}
              className="group text-left p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-teal-400/50 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/40"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-300">0{idx + 1}</span>
                  <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-teal-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 text-xs transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h4 className="font-bold text-sm md:text-base text-white group-hover:text-teal-200 transition-colors">
                  {opt.title[lang === 'en' ? 1 : 0]}
                </h4>

                <p className="text-xs text-slate-400 mt-2">
                  {opt.detail[lang === 'en' ? 1 : 0]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>STANCE: {opt.tag.toUpperCase()}</span>
                <span className="text-teal-300 font-bold group-hover:underline">
                  {lang === 'en' ? 'Film This Take →' : '保留此片段 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

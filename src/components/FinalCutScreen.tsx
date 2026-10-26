import React from 'react';
import { FoodItem, DilemmaOption } from '../data/gameData';
import { Film, Play, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FinalCutScreenProps {
  food: FoodItem;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const FinalCutScreen: React.FC<FinalCutScreenProps> = ({
  food,
  options,
  onSelectOption,
  lang
}) => {
  const handleSelect = (idx: number) => {
    sounds.playShutter();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Projected Film Screen */}
        <div className="lg:col-span-5 bg-slate-950 border-2 border-slate-700/80 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-2">
            <span>PROJECTOR SCREEN · 23:59</span>
            <span className="text-teal-400">READY TO PUBLISH</span>
          </div>

          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-teal-950/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-2 drop-shadow-2xl">
              {food.icon}
            </div>
            <div className="text-base font-bold text-white">
              {food.name[lang === 'en' ? 1 : 0]}
            </div>
            <p className="text-xs text-amber-200/90 font-mono italic mt-2 max-w-xs">
              “{food.sample[lang === 'en' ? 1 : 0]}”
            </p>

            <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
              FINAL RESOLUTION: 4K MASTER
            </span>
          </div>
        </div>

        {/* Right: The Final Cut Philosophy Decision */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300">
            <Film className="w-3.5 h-3.5" />
            <span>THE MASTER TIMELINE · THE FINAL FRAME</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {lang === 'en'
              ? 'One last choice before publishing.'
              : '影片即將上傳。最後一個鏡頭，你想留給誰？'}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? `Your documentary began with the flavour of ${food.name[1]}. In the end, it became a film about the people who frame Taiwan—and how those stories transform the storytellers themselves.`
              : `你的紀錄片從${food.name[0]}的味覺源流開始，最後卻拍出了另一個故事：那些拿起相機講述臺灣的人，也在被自己所說出的故事與遇到的人群深深改變。`}
          </p>

          <div className="space-y-2.5 pt-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-teal-400/50 transition-all duration-200 flex items-center justify-between gap-4 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-300 font-bold mb-1">
                    FRAME SELECTION 0{idx + 1} · {opt.tag.toUpperCase()}
                  </div>
                  <div className="font-bold text-sm text-white group-hover:text-teal-200 transition-colors">
                    {opt.title[lang === 'en' ? 1 : 0]}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {opt.detail[lang === 'en' ? 1 : 0]}
                  </div>
                </div>

                <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-teal-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 text-xs shrink-0 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

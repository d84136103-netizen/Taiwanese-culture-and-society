import React, { useState } from 'react';
import { FoodItem, FoodMission } from '../data/gameData';
import { SlidersHorizontal, ArrowUpRight, CheckCircle2, AlertCircle, Building2, Globe2, Sparkles, Sliders } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WorkshopTaskProps {
  food: FoodItem;
  mission: FoodMission;
  currentStep: number;
  totalSteps: number;
  lastFeedback: [string, string] | null;
  onSelectChoice: (choiceIdx: number) => void;
  lang: 'zh' | 'en';
}

export const WorkshopTask: React.FC<WorkshopTaskProps> = ({
  food,
  mission,
  currentStep,
  totalSteps,
  lastFeedback,
  onSelectChoice,
  lang
}) => {
  const task = mission.tasks[currentStep] || mission.tasks[0];
  
  // Interactive cooking calibration parameter slider (feedback from Friend 1 - Engineering student)
  const [flavorRatio, setFlavorRatio] = useState<number>(50);

  const handlePick = (idx: number) => {
    sounds.playSelect();
    onSelectChoice(idx);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/60 border border-teal-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl shrink-0">
            {food.icon}
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 font-bold">
                TASK 0{currentStep + 1} / 0{totalSteps}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-amber-300">{task.label[lang === 'en' ? 1 : 0]}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white">
              {task.question[lang === 'en' ? 1 : 0]}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {mission.history[lang === 'en' ? 1 : 0]}
            </p>
          </div>
        </div>
      </div>

      {/* Urban Geography Insight (Friend 2 - Urban Planning feedback) */}
      {food.urbanSpace && (
        <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-indigo-300 uppercase font-mono text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'en' ? 'URBAN GEOGRAPHY & NIGHT MARKET SPACE' : '都市空間與夜市地緣變遷'}</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            {food.urbanSpace[lang === 'en' ? 1 : 0]}
          </p>
        </div>
      )}

      {/* Interactive Flavor Calibration Slider (Mini-game interactive widget) */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="font-bold text-teal-300 flex items-center gap-1.5 font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'RECIPE & ADAPTATION CALIBRATION' : '風味平衡調製器（動態實作）'}</span>
          </div>
          <span className="text-[11px] font-mono text-amber-300">
            {flavorRatio < 35 
              ? (lang === 'en' ? 'Core: 100% Traditional Recipe' : '偏向：純粹正宗手藝') 
              : flavorRatio > 65 
              ? (lang === 'en' ? 'Core: Localized Innovation' : '偏向：跨國市場改造') 
              : (lang === 'en' ? 'Core: Dynamic Hybrid' : '偏向：文化交融平衡')}
          </span>
        </div>

        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={100}
            value={flavorRatio}
            onChange={(e) => setFlavorRatio(Number(e.target.value))}
            className="w-full accent-teal-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>{lang === 'en' ? 'Heritage / Vendor Tradition' : '原攤手藝堅持'}</span>
            <span>{lang === 'en' ? 'Nuanced Adaptation' : '彈性雙向調整'}</span>
            <span>{lang === 'en' ? 'Global Market Adaptation' : '海外迎合大眾'}</span>
          </div>
        </div>
      </div>

      {/* Previous Feedback Consequence Strip */}
      {lastFeedback && (
        <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs md:text-sm text-teal-200 flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-teal-300 mr-2">
              {lang === 'en' ? 'Consequence from Previous Choice:' : '上一抉擇的連鎖劇情反饋：'}
            </span>
            <span>{lastFeedback[lang === 'en' ? 1 : 0]}</span>
          </div>
        </div>
      )}

      {/* 3 Choices Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'en' ? 'DIRECTOR’S EXPERIMENTAL DIRECTION' : '導演實作決策方案'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {task.choices.map((choiceItem, idx) => {
            const [textPair, tag, feedbackPair] = choiceItem;
            return (
              <button
                key={idx}
                onClick={() => handlePick(idx)}
                className="group text-left p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-teal-400/50 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      0{idx + 1}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-teal-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 text-xs transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h4 className="font-bold text-sm md:text-base text-white group-hover:text-teal-200 transition-colors leading-snug">
                    {textPair[lang === 'en' ? 1 : 0]}
                  </h4>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {feedbackPair[lang === 'en' ? 1 : 0]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>STANCE: {tag.toUpperCase()}</span>
                  <span className="text-teal-300 font-bold group-hover:underline">
                    {lang === 'en' ? 'Select →' : '選擇此鏡頭 →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

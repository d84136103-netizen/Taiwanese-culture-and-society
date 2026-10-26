import React from 'react';
import { FoodItem, FoodMission } from '../data/gameData';
import { Globe, Plane, ArrowUpRight, Compass, MapPin, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface PassportScreenProps {
  food: FoodItem;
  mission: FoodMission;
  lastFeedback: [string, string] | null;
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const PassportScreen: React.FC<PassportScreenProps> = ({
  food,
  mission,
  lastFeedback,
  onSelectOption,
  lang
}) => {
  const options = [
    {
      title: ['比對食材、作法與當地限制', 'Compare ingredients, methods and local constraints'],
      detail: ['不只問改了什麼，也問為什麼改。', 'Ask what changes, and why.']
    },
    {
      title: ['跟著跨海的人與記憶走', 'Follow people and memories crossing borders'],
      detail: ['誰思念家鄉？誰找到新家？', 'Who misses home? Who discovers a new one?']
    },
    {
      title: ['追蹤品牌如何吸引新觀眾', 'Explore the brand and the new audience'],
      detail: ['誰決定一道食物在國外叫什麼？', 'Who has the power to rename a dish?']
    }
  ];

  const handlePick = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      {/* Cultural Passport Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-950/70 via-slate-900 to-slate-950 border border-teal-400/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>CULTURAL PASSPORT · {food.name[lang === 'en' ? 1 : 0].toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
              <span>BORDER CROSSING</span>
              <Plane className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-white">
            <span className="text-2xl text-teal-400">◉</span>
            <span>{mission.place[lang === 'en' ? 1 : 0]}</span>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-3xl">
            {mission.overseas[lang === 'en' ? 1 : 0]}
          </p>

          {/* Southeast Asia Case Highlight (Friend 3 - Thai student feedback) */}
          {food.southeastAsiaCase && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-400/30 text-xs text-amber-100 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono text-[11px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'SOUTHEAST ASIAN DIASPORA DIALOGUE' : '東南亞跨境案例（泰國／印尼／越南）：'}</span>
              </div>
              <p className="leading-relaxed">
                {food.southeastAsiaCase[lang === 'en' ? 1 : 0]}
              </p>
            </div>
          )}

          {/* Overseas Taiwanese Student Perspective (Friend 5 - US Taiwanese student feedback) */}
          {food.diasporaVoice && (
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-400/30 text-xs text-indigo-100 space-y-1">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5 font-mono text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'OVERSEAS TAIWANESE DIASPORA VOICE' : '海外臺灣留學生雙向適應視角（留美五年）：'}</span>
              </div>
              <p className="italic leading-relaxed">
                {food.diasporaVoice[lang === 'en' ? 1 : 0]}
              </p>
            </div>
          )}

          {lastFeedback && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-teal-300 mr-2">✦ {lang === 'en' ? 'Previous Take Outcome:' : '上一抉擇的成片軌道：'}</span>
              <span>{lastFeedback[lang === 'en' ? 1 : 0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Directorial Decision */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-teal-400" />
          <span>
            {lang === 'en'
              ? 'When a dish changes overseas, what should your camera focus on?'
              : '當料理跨海變形，你會把鏡頭對準什麼？'}
          </span>
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

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-teal-300 font-bold group-hover:underline">
                {lang === 'en' ? 'Select Shot Angle →' : '選定拍攝視角 →'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

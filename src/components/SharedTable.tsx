import React, { useState } from 'react';
import { DilemmaOption, CHARACTER_PERSPECTIVES } from '../data/gameData';
import { Utensils, MessageCircleQuestion, Users, ArrowUpRight, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SharedTableProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const SharedTable: React.FC<SharedTableProps> = ({
  options,
  onSelectOption,
  lang
}) => {
  const [activeCharId, setActiveCharId] = useState<string>('rani');
  const [activeProbeIdx, setActiveProbeIdx] = useState<number | null>(null);

  const activeChar = CHARACTER_PERSPECTIVES.find(c => c.id === activeCharId) || CHARACTER_PERSPECTIVES[0];

  const handleSelect = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  const handleTabClick = (id: string) => {
    sounds.playSelect();
    setActiveCharId(id);
    setActiveProbeIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Scene Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 mb-1">
            <Utensils className="w-3.5 h-3.5" />
            <span>THE SHARED TABLE · FOUR CULTURAL POSITIONS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en'
              ? '“We are all crossing cultures” — A two-way conversation'
              : '同一張餐桌上的四種身分：雙向文化適應'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Around this dinner table sit four individuals: an Indonesian graduate student, a long-term Western resident, a local Taiwanese urbanite, and a Taiwanese student back from 5 years in the US. Click their avatars to hear their distinct lived realities.'
              : '圍坐在餐桌旁的四位青年：印尼留學生 Rani、長居創作者 Maya、臺灣在地朋友小安、以及在美留學五年的 Leo。點選下方角色頭像，可主動向他們發起深度追問。'}
          </p>
        </div>
      </div>

      {/* 4 Interactive Character Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CHARACTER_PERSPECTIVES.map((c) => {
          const isSelected = c.id === activeCharId;
          return (
            <button
              key={c.id}
              onClick={() => handleTabClick(c.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-teal-500/15 border-teal-400 text-teal-200 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/60 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 text-sm ${
                isSelected ? 'bg-teal-400 text-slate-950' : 'bg-white/10 text-slate-300'
              }`}>
                {c.avatar}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs md:text-sm text-white truncate">
                  {c.name[lang === 'en' ? 1 : 0]}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {c.role[lang === 'en' ? 1 : 0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Character Spotlight & In-Depth Probes */}
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
        {/* Core Quote */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-teal-300 font-bold uppercase">
              SPEAKER: {activeChar.name[lang === 'en' ? 1 : 0]} · {activeChar.role[lang === 'en' ? 1 : 0]}
            </span>
            <span>VOICE OVER DINNER</span>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-white/5">
            "{activeChar.quote[lang === 'en' ? 1 : 0]}"
          </p>
        </div>

        {/* Follow-up Interactive Questions */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase font-mono">
            <MessageCircleQuestion className="w-4 h-4" />
            <span>{lang === 'en' ? 'Directorial Follow-up Inquiries:' : '向此角色深入追問（點擊查看回應）：'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeChar.probes.map((probe, pIdx) => {
              const isOpen = activeProbeIdx === pIdx;
              return (
                <div
                  key={pIdx}
                  onClick={() => {
                    sounds.playSelect();
                    setActiveProbeIdx(isOpen ? null : pIdx);
                  }}
                  className={`cursor-pointer p-3.5 rounded-xl border text-xs transition-all space-y-2 ${
                    isOpen
                      ? 'bg-slate-950 border-amber-400/50'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-slate-200 flex items-center justify-between gap-2">
                    <span>Q: {probe.question[lang === 'en' ? 1 : 0]}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-amber-400' : ''}`} />
                  </div>
                  {isOpen && (
                    <p className="text-amber-100/90 leading-relaxed pt-2 border-t border-white/5 animate-fadeIn">
                      {probe.response[lang === 'en' ? 1 : 0]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-400" />
          <span>{lang === 'en' ? 'Whom will you give more space to in the next episode?' : '下一集你會留給誰更多鏡頭與對話時間？'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
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
                  {lang === 'en' ? 'Choose Perspective →' : '選擇此角度 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { Sparkles, ArrowUpRight, PenLine } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MirrorStageProps {
  mirrorText: string;
  onMirrorTextChange: (text: string) => void;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const MirrorStage: React.FC<MirrorStageProps> = ({
  mirrorText,
  onMirrorTextChange,
  options,
  onSelectOption,
  lang
}) => {
  const handleSelect = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      {/* Mirror Stage Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-400/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400/20 to-teal-400/20 border border-white/20 flex items-center justify-center text-4xl shadow-inner shrink-0 text-amber-200">
            ◉
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE MIRROR · YOUR OWN POSITION</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {lang === 'en' ? 'Now the camera faces you.' : '現在，鏡頭轉向了你。'}
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {lang === 'en'
                ? 'You may identify as Taiwanese, diasporic, mixed, a foreigner, a wanderer—or not use any of these labels. What part of everyday life makes you feel connected?'
                : '你可能認同自己是臺灣人、華人、海外華裔、新住民、客居旅人，也可能不喜歡任何既定標籤。在哪種平凡的日常生活細節裡，你最能感受到那份歸屬感？'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Personal Reflection Note */}
      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="mirrorNote" className="font-bold text-amber-300 flex items-center gap-1.5">
            <PenLine className="w-4 h-4" />
            <span>{lang === 'en' ? 'A sentence you want to leave in your film (Optional):' : '你想留在這部片尾的一句話（選填）：'}</span>
          </label>
          <span className="font-mono text-slate-500">{mirrorText.length} / 150</span>
        </div>

        <textarea
          id="mirrorNote"
          rows={3}
          maxLength={150}
          value={mirrorText}
          onChange={(e) => onMirrorTextChange(e.target.value)}
          placeholder={
            lang === 'en'
              ? 'For me, belonging is not a passport, but the taste of...'
              : '對我而言，歸屬感不是一本護照，而是在某個街角聞到……'
          }
          className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3.5 text-xs md:text-sm text-amber-100 placeholder-slate-600 focus:outline-none focus:border-teal-400/60 transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white">
          {lang === 'en' ? 'Which frame would you leave as your final shot?' : '如果只能留下最後一個片尾定格畫面，你會選？'}
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
                  {lang === 'en' ? 'Set Final Frame →' : '定格此畫面 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

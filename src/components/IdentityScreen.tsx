import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { HelpCircle, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface IdentityScreenProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const IdentityScreen: React.FC<IdentityScreenProps> = ({
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>INTERVIEW · CROSS-CULTURAL IDENTITY NEGOTIATION</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en' ? '“So, do you consider yourself Taiwanese now?”' : '「所以，你現在算臺灣人嗎？」'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'A straightforward question with no simple answer. After months of filming and living here, how do you articulate your relationship with this society?'
              : '一個看似簡單的提問，背後卻沒有二選一的標準解答。拍了這麼多夜市、生活瑣事與跨國變遷，你如何用語言表達自己與這座島嶼的關係？'}
          </p>
        </div>
      </div>

      {/* Xiao-An & Alex Dialogues */}
      <div className="space-y-4 bg-slate-900/80 border border-white/10 rounded-2xl p-6">
        {/* Xiao-An */}
        <div className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
            安
          </div>
          <div>
            <div className="text-xs font-bold text-slate-300 mb-1">
              {lang === 'en' ? 'Xiao-An · Viewer & Friend' : '小安 · 臺灣朋友與觀眾'}
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic">
              "{lang === 'en'
                ? 'I have watched your videos from your first night market visit until now. You know local jokes and daily habits so well. Yet on forums, people still argue over whether you are an "outsider" or an "insider." How do you feel internally?'
                : '我一直看著你的影片從一開始的生疏走到現在。你現在懂臺灣的冷笑話、熟悉捷運與小吃。但在網路上，大家似乎總糾結於你到底算「外國人」還是「自己人」。你自己心裡是怎麼想的？'}"
            </p>
          </div>
        </div>

        {/* Alex */}
        <div className="flex items-start gap-3 bg-teal-950/20 p-4 rounded-xl border border-teal-500/20">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-xs">
            A
          </div>
          <div>
            <div className="text-xs font-bold text-teal-300 mb-1">
              {lang === 'en' ? 'Alex · Your Response' : 'Alex · 你的心聲'}
            </div>
            <p className="text-xs md:text-sm text-teal-100 leading-relaxed">
              "{lang === 'en'
                ? 'Some days I feel completely at home, navigating markets with ease. Other days, a rapid sentence or administrative rule reminds me of how much I still have to learn.'
                : '有時我覺得自己完全融入了這裡，能自在穿梭巷弄買早餐；有時候遇到一句太快的閩南語或行政法規，又會突然提醒我，我還有太多的未知。'}"
            </p>
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{lang === 'en' ? 'Which perspective feels closest to your stance?' : '哪種回答最接近你此刻的思考？'}</span>
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
                  {lang === 'en' ? 'Frame This View →' : '留下此觀點 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

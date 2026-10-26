import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { Volume2, ArrowUpRight, MessageSquare, FastForward } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LanguageScreenProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const LanguageScreen: React.FC<LanguageScreenProps> = ({
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
      {/* Live Scene Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-5 md:p-6 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 mb-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>FIELD INCIDENT · LANGUAGE & SPEED AT THE COUNTER</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en' ? 'A sentence lost in rapid speech' : '一句在高速中被丟失的話'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'At an administrative counter, bureaucratic jargon and rapid conversational flow clash with intermediate language ability. A queue forms behind you.'
              : '在日常公務或服務櫃檯前，連珠砲般的專業指引與稍慢的聽力理解形成張力。後面還有排隊的視線，尷尬悄悄升起。'}
          </p>
        </div>
      </div>

      {/* Counter Dialogue Box */}
      <div className="space-y-4 bg-slate-900/80 border border-white/10 rounded-2xl p-6">
        {/* Staff Dialogue */}
        <div className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-white/5">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-slate-200 font-bold flex items-center justify-center shrink-0 text-xs">
            {lang === 'en' ? 'Staff' : '櫃檯'}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Service Counter Staff' : '服務櫃檯人員（虛構對白）'}</span>
              <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.2 rounded bg-amber-400/10">FAST SPEECH</span>
            </div>
            <p className="text-xs md:text-sm text-amber-100 leading-relaxed italic">
              "{lang === 'en'
                ? '“Fill this out first, then take it to counter two for the extra verification, and then pick up a ticket over there to wait!”'
                : '「這張先填，等一下到二號櫃台再補一個審核資料，然後去那邊拿號碼牌等叫號喔！」'}"
            </p>
          </div>
        </div>

        {/* Alex's inner thoughts */}
        <div className="flex items-start gap-3 bg-teal-950/20 p-4 rounded-xl border border-teal-500/20">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-xs">
            A
          </div>
          <div>
            <div className="text-xs font-bold text-teal-300 mb-1">
              {lang === 'en' ? 'Alex · Internal Reaction' : 'Alex · 你的當下感受'}
            </div>
            <p className="text-xs md:text-sm text-teal-100 leading-relaxed">
              "{lang === 'en'
                ? 'I recognized individual words, but together they flew by too fast. People are waiting behind me. Will it feel awkward if I ask them to repeat it a second time?'
                : '每個字好像都學過，但連在一起速度太快了。身後排隊的人正看著我。現在如果開口請對方說第二次，會不會顯得自己很笨、耽誤大家時間？'}"
            </p>
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{lang === 'en' ? 'How will you respond in this moment?' : '在這一刻，你會如何因應？'}</span>
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
                  {lang === 'en' ? 'Choose Action →' : '選擇此應對 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { Sparkles, ArrowUpRight, Compass, Film } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ArrivalScreenProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const ArrivalScreen: React.FC<ArrivalScreenProps> = ({
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
      {/* Chapter 2 Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 mb-1">
            <Film className="w-3.5 h-3.5" />
            <span>CHAPTER 02 · A LIFE OUTSIDE THE TOURIST FRAME</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en' ? 'The camera goes home. Daily life continues.' : '鏡頭關掉了，日常生活還在繼續。'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Videos thrive on warm hospitality and exotic surprises. But behind the lens, living in Taiwan involves paperwork, garbage truck rhythms, and real adaptation.'
              : '影片裡拍滿了熱情款待與驚奇美食。但鏡頭關閉後，在臺生活還有追垃圾車時間、辦手機門號文件不全的挫折。這些鏡頭外的日常，該如何被安放？'}
          </p>
        </div>
      </div>

      {/* Two Creator Dialogues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Maya */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold flex items-center justify-center text-sm">
              M
            </div>
            <div>
              <div className="font-bold text-sm text-white">Maya</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Long-Term Resident Creator (6 Yrs)' : '在臺多年外籍創作者'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            "{lang === 'en'
              ? 'When I first moved here, I could not even figure out the garbage truck melody and schedule. People say life is convenient—but that does not mean every newcomer knows how it works immediately.'
              : '我剛搬來臺灣時，連垃圾車的音樂和時間都搞不清楚。大家總說臺灣很便利，但那不代表每個初來乍到的人一來就知道如何生活。'}"
          </p>
        </div>

        {/* Alex */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold flex items-center justify-center text-sm">
              A
            </div>
            <div>
              <div className="font-bold text-sm text-white">Alex (You)</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Documentary Creator' : '外籍創作者（你）'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            "{lang === 'en'
              ? 'My channel is full of smiling night market vendors. Yesterday, bureaucratic paperwork and language barriers sent me back twice. Are the unglamorous parts worthy of screen time?'
              : '我的頻道拍滿了熱情的老闆。昨天我去辦電信門號，卻因為文件規定和聽不懂連續中文來回跑了兩趟。這種不順利的一天，有沒有資格被放進鏡頭？'}"
          </p>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-teal-400" />
          <span>{lang === 'en' ? 'What would you do with this unseen day?' : '面對這段鏡頭外的日常，你會如何處理？'}</span>
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
                  {lang === 'en' ? 'Record This Take →' : '選擇此視角 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

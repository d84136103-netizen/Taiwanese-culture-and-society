import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { Smile, MessageCircle, ArrowUpRight, HeartHandshake } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NeighborhoodScreenProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const NeighborhoodScreen: React.FC<NeighborhoodScreenProps> = ({
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
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>THE NEIGHBORHOOD · KINDNESS & SUBTLE BOUNDARIES</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en' ? '“Wow! Your Chinese is so fluent!”' : '「哇！你中文講得很好耶！」'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'A well-meaning compliment heard daily at convenience stores. But when does warmth become an unintentional reminder that you will always be a guest?'
              : '一聲在超商、街角每天都能聽見的真誠稱讚。然而，當善意的誇獎日復一日重複，何時會悄悄成為「你永遠是客人」的微妙邊界？'}
          </p>
        </div>
      </div>

      {/* Two Voices: Xiao-An & Maya */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Xiao-An */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
              安
            </div>
            <div>
              <div className="font-bold text-sm text-white">Xiao-An</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Taiwanese Friend & Collaborator' : '小安 · 臺灣在地朋友'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            "{lang === 'en'
              ? 'I only meant it as hospitality and encouragement. But you told me that hearing it every single day at the market reminds you that you are never considered an insider. I had never reflected on that perspective.'
              : '我只是出於熱情想表達友善與鼓勵。可是你告訴我，每次在超商買杯咖啡都被誇獎「中文真好」，反而提醒你自己永遠是個被特別看待的「外國人」……我以前從來沒想過這個角度。'}"
          </p>
        </div>

        {/* Maya */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-bold flex items-center justify-center text-sm">
              M
            </div>
            <div>
              <div className="font-bold text-sm text-white">Maya</div>
              <div className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Long-Term Resident' : 'Maya · 長住者'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            "{lang === 'en'
              ? 'I genuinely love living here, and people are kind. But feeling welcomed and feeling truly included as part of ordinary life are two different emotional states.'
              : '我很喜歡生活在這裡，很多人也對我非常照顧。但「感受到熱情招待」與「真正被視為普通生活的一分子」，有時候是兩種完全不同的心理狀態。'}"
          </p>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{lang === 'en' ? 'What kind of conversation will you bring into the frame?' : '接下來，你會引導出怎樣的對話？'}</span>
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
                  {lang === 'en' ? 'Explore Dialogue →' : '深入此對話 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

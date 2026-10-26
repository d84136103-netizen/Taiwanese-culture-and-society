import React from 'react';
import { DilemmaOption } from '../data/gameData';
import { Video, ArrowUpRight, Clapperboard, Eye } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CreatorScreenProps {
  firstEpisodeChoice: number;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const CreatorScreen: React.FC<CreatorScreenProps> = ({
  firstEpisodeChoice,
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
            <Clapperboard className="w-3.5 h-3.5" />
            <span>EPISODE 02 PRE-PRODUCTION · THE CREATOR’S CROSSROAD</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            {lang === 'en' ? 'Your audience demands more “Taiwan.” But what Taiwan?' : '觀眾期待看更多「臺灣」。但又是怎樣的臺灣？'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Episode 1 gained massive traction. The algorithm rewards sensational reactions. But as a creator who lives here, what story will you film next?'
              : '第一支影片獲得了巨量點擊與轉發，演算法不斷推薦你拍更多「誇張驚奇」的反應。但作為在這裡生活的創作者，你的第二支影片想走向何方？'}
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
                {lang === 'en' ? 'Collaborating Creator' : 'Maya · 合作創作者'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            {firstEpisodeChoice === 0
              ? `"${lang === 'en' ? 'The reaction video blew up! The algorithm pushes for even more exotic shocks. But is our long-term life here only about being amazed?' : '上一集誇張表情的片段流量爆表！大家敲碗要更奇怪的東西。可是我們住在這裡這麼多年，真的只有獵奇和驚喜可以拍嗎？'}"`
              : firstEpisodeChoice === 2
              ? `"${lang === 'en' ? 'The vendor auntie loved that you showed her dawn labor. But comments complained it was "too slow." Must ordinary life always be spiced up to deserve attention?' : '攤位阿姨很感動你拍出了她凌晨備料的手藝。但有人留言嫌節奏「太普通無聊」。難道真實的生活，一定要加上戲劇化衝突才值得被看見嗎？'}"`
              : `"${lang === 'en' ? 'You explored how the food traveled overseas. What about you? You crossed borders too. Will your next film talk about your own internal shifts?' : '上一集你拍出了食物跨海變形的故事。那你自己呢？你也跨了海來到這裡。你的下一支影片，會說出自己內心的身分轉變嗎？'}"`}
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
                {lang === 'en' ? 'Channel Host' : 'Alex · 頻道主（你）'}
              </div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-4 rounded-xl border border-white/5">
            "{lang === 'en'
              ? 'I originally thought I was just here to introduce Taiwan to outsiders. Now I realize my viewers are also watching how I negotiate my own sense of home and belonging.'
              : '我最初以為自己只是一個拿著相機介紹臺灣的旅人。現在我才發現，觀眾其實也在透過我的鏡頭，檢視我如何理解自己的家園與歸屬。'}"
          </p>
        </div>
      </div>

      {/* Decision Options */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{lang === 'en' ? 'What creative direction will you commit to for Episode 2?' : '第二集影片，你決定確立怎樣的創作方向？'}</span>
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
                  {lang === 'en' ? 'Set Direction →' : '確定方向 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

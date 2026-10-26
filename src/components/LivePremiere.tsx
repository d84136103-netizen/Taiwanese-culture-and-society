import React from 'react';
import { FoodItem, DilemmaOption } from '../data/gameData';
import { ThumbsUp, MessageSquare, Flame, ArrowUpRight, Radio } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LivePremiereProps {
  food: FoodItem;
  videoChoice: number;
  subtitleChoice: number;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const LivePremiere: React.FC<LivePremiereProps> = ({
  food,
  videoChoice,
  subtitleChoice,
  options,
  onSelectOption,
  lang
}) => {
  const scenarios = videoChoice === 0
    ? [
        {
          author: '@WandererWorld',
          avatar: '🌏',
          zh: '「下一集拜託再拍你被臺灣食物震撼的表情！太好笑了！」',
          en: '“More videos where Taiwan shocks you, please! So funny!”',
          likes: '1.2k'
        },
        {
          author: '@TaipeiResident',
          avatar: '🇹🇼',
          zh: '「我也是在臺多年的外籍居民，真實生活不是每天都在驚訝和獵奇。」',
          en: '“I have lived here for years; real life is not being shocked every day.”',
          likes: '842'
        }
      ]
    : videoChoice === 2
    ? [
        {
          author: '@DiasporaBoba',
          avatar: '🧋',
          zh: '「我也住在兩種文化中間，謝謝你把那種歸屬感的猶豫拍出來。」',
          en: '“I live between two cultures too. Thank you for showing that hesitation of belonging.”',
          likes: '2.5k'
        },
        {
          author: '@StreetCritic',
          avatar: '⚡',
          zh: '「不要說自己像臺灣人了，到底誰有資格給自己貼這個標籤？」',
          en: '“Stop saying you feel Taiwanese. Who gets to claim that label anyway?”',
          likes: '630'
        }
      ]
    : [
        {
          author: '@EverydayTaiwan',
          avatar: '🛵',
          zh: '「這些日常看起來很普通，但我反而第一次真正理解你在這裡的生活。」',
          en: '“It looks ordinary, yet I finally understand your real life here.”',
          likes: '1.8k'
        },
        {
          author: '@QuickTraveler',
          avatar: '✈️',
          zh: '「我是來看熱鬧美食旅遊的，不是來看你辦手機門號和跑公文的！」',
          en: '“I came for mouthwatering street food, not for phone bills and paperwork!”',
          likes: '419'
        }
      ];

  const handlePick = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Player Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>COMMUNITY FEEDBACK · SIMULATED AUDIENCE</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            {lang === 'en' ? 'The same video. Very different eyes.' : '同一支影片，不同人眼中的你。'}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'Your video received thousands of reactions. Viewers from overseas and locals in Taiwan interpret your identity in contrasting ways. How will you respond?'
              : '影片引來了熱烈迴響。海外觀眾、臺灣在地朋友與其他移居者從留言區看見了截然不同的你。作為創作者，你會在留言區留下什麼立場？'}
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-bold flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>EPISODE 02 ENGAGEMENT</span>
              </span>
              <span className="font-mono text-teal-400">98.4% POSITIVE</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-teal-400 to-amber-400 h-full w-[88%]"></div>
            </div>
          </div>
        </div>

        {/* Right: Simulated YouTube Comments Thread */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/10 rounded-2xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>SIMULATED COMMENTS (342)</span>
            </div>
            <span>SORT BY: TOP</span>
          </div>

          {/* Comment items */}
          {scenarios.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5">
              <span className="text-xl p-1 bg-white/5 rounded-full shrink-0">{item.avatar}</span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono">1 hr ago</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{item[lang === 'en' ? 'en' : 'zh']}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-amber-300/90 font-mono">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{item.likes}</span>
                  </span>
                  <span>Reply</span>
                </div>
              </div>
            </div>
          ))}

          {/* Subtitle impact comment if dramatic was picked */}
          {subtitleChoice === 1 && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-950/20 border border-amber-400/20 animate-fadeIn">
              <span className="text-xl p-1 bg-white/5 rounded-full shrink-0">⚑</span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300">@NuanceWatcher</span>
                  <span className="text-[10px] text-slate-500 font-mono">25m ago</span>
                </div>
                <p className="text-amber-100">
                  {lang === 'en'
                    ? '“Did Maya really say she NEVER belongs? The subtitle feels way more dramatic than what she actually meant.”'
                    : '「Maya 原話真的是說永遠不屬於這裡嗎？字幕看起來比受訪者本人說得激烈很多，有點為了流量煽情了。」'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Creator's Reply Dilemma */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>{lang === 'en' ? 'How will you pin your creator comment?' : '你會如何在置頂留言中回應？'}</span>
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

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>STANCE: {opt.tag.toUpperCase()}</span>
                <span className="text-teal-300 font-bold group-hover:underline">
                  {lang === 'en' ? 'Pin This Reply →' : '置頂此回應 →'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

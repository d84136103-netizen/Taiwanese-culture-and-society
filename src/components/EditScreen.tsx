import React, { useState } from 'react';
import { FoodItem, DilemmaOption } from '../data/gameData';
import { Play, Pause, Film, Scissors, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EditScreenProps {
  food: FoodItem;
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const EditScreen: React.FC<EditScreenProps> = ({
  food,
  options,
  onSelectOption,
  lang
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeClipIndex, setActiveClipIndex] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    sounds.playReel();
  };

  const handlePick = (idx: number) => {
    sounds.playShutter();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Video Editing Monitor & Waveform */}
        <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-700/80 rounded-2xl p-4 shadow-2xl shadow-black/80 relative overflow-hidden">
          {/* Monitor top bar */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-400 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-slate-200">TIMELINE_EP01.PRPROJ</span>
            </div>
            <span className="text-teal-400">08:00 / 08:00</span>
          </div>

          {/* Video Preview Frame */}
          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 border border-white/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            <div className="text-7xl mb-2 drop-shadow-2xl animate-bounce">
              {food.icon}
            </div>
            <div className="text-lg font-bold text-white tracking-wide">
              {food.name[lang === 'en' ? 1 : 0]}
            </div>
            <div className="text-xs text-amber-300 font-mono mt-1">
              {food.sample[lang === 'en' ? 1 : 0]}
            </div>

            {/* Simulated play button */}
            <button
              onClick={togglePlay}
              className="absolute bottom-3 left-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
              AUDIO: STEREO 48kHz
            </span>
          </div>

          {/* Timeline Tracks */}
          <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <Film className="w-3 h-3 text-teal-400" />
              <span>V1: B-ROLL & STALL FOOTAGE</span>
            </div>
            <div className="flex gap-1 h-6">
              <div className="flex-1 bg-teal-500/30 rounded border border-teal-400/30 flex items-center justify-center text-[10px] font-mono text-teal-200">
                01: INTRO
              </div>
              <div className="flex-[2] bg-amber-500/30 rounded border border-amber-400/30 flex items-center justify-center text-[10px] font-mono text-amber-200">
                02: CLUES & MEMORY
              </div>
              <div className="flex-[2] bg-purple-500/30 rounded border border-purple-400/30 flex items-center justify-center text-[10px] font-mono text-purple-200">
                03: CONFLICT
              </div>
              <div className="flex-1 bg-emerald-500/30 rounded border border-emerald-400/30 flex items-center justify-center text-[10px] font-mono text-emerald-200">
                04: RESOLUTION
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Final Cut Title Decision */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300">
            <Scissors className="w-3.5 h-3.5" />
            <span>THE 8-MINUTE CUT · EDITING DECISION</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {lang === 'en'
              ? 'Eight minutes left. What gets top billing?'
              : '只有八分鐘片長，你會把什麼放在最高位置？'}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'Maya sits beside you, waiting for a thumbnail and title. Alex holds the mouse. The vendor in Taiwan and the overseas barista are both waiting to see how they are framed.'
              : 'Maya 坐在剪輯台旁等你決定標題；Alex 握著滑鼠；臺灣攤主與海外店員，都在等待看到自己是如何被放進這支影片裡。'}
          </p>

          {/* 3 Title Options */}
          <div className="space-y-2.5 pt-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handlePick(idx)}
                className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-teal-400/50 transition-all duration-200 flex items-center justify-between gap-4 group"
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-300 font-bold mb-1">
                    CUT OPTION 0{idx + 1} · {opt.tag.toUpperCase()}
                  </div>
                  <div className="font-bold text-sm text-white group-hover:text-teal-200 transition-colors">
                    {opt.title[lang === 'en' ? 1 : 0]}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {opt.detail[lang === 'en' ? 1 : 0]}
                  </div>
                </div>

                <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-teal-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 text-xs shrink-0 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

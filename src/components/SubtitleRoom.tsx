import React, { useState } from 'react';
import { DilemmaOption } from '../data/gameData';
import { Type, Play, MessageSquare, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SubtitleRoomProps {
  options: DilemmaOption[];
  onSelectOption: (idx: number) => void;
  lang: 'zh' | 'en';
}

export const SubtitleRoom: React.FC<SubtitleRoomProps> = ({
  options,
  onSelectOption,
  lang
}) => {
  const [previewSubIndex, setPreviewSubIndex] = useState(0);

  const subtitleChoices = [
    {
      zh: '「我有時仍覺得自己像個客人。」',
      en: '“Sometimes I still feel like a guest.”'
    },
    {
      zh: '「住這麼久，我還是永遠不屬於這裡！」',
      en: '“I have lived here forever and STILL do not belong!”'
    },
    {
      zh: '「我有時仍覺得自己像客人……（附生活筆記）」',
      en: '“Sometimes I still feel like a guest... [Context note attached]”'
    }
  ];

  const handleSelect = (idx: number) => {
    sounds.playSelect();
    onSelectOption(idx);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Video Preview with Live Subtitle Overlay */}
        <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-700/80 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-2">
            <span>PREVIEW · CLIP_MAYA_027.MOV</span>
            <span className="text-teal-400">1080P PRORES</span>
          </div>

          <div className="relative aspect-video rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 border border-white/10 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-amber-300">
                INTERVIEWEE: MAYA (RESIDENT 6 YRS)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>

            {/* Maya Avatar in Video */}
            <div className="my-auto text-center">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border-2 border-teal-400/50 mx-auto flex items-center justify-center text-2xl font-bold text-teal-300 shadow-xl">
                M
              </div>
            </div>

            {/* The Live Subtitle Bar at Bottom */}
            <div className="bg-black/75 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center transition-all animate-fadeIn">
              <div className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">
                {subtitleChoices[previewSubIndex][lang === 'en' ? 'en' : 'zh']}
              </div>
            </div>
          </div>

          <div className="mt-2 text-center text-[10px] text-slate-500">
            {lang === 'en' ? 'Hover options to preview subtitle tone on screen' : '懸停或點選方案可即時預覽字幕在成片畫面上的效果'}
          </div>
        </div>

        {/* Right: The Dilemma Explanation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400">
            <Type className="w-3.5 h-3.5" />
            <span>SUBTITLE ROOM · TRANSLATION & REPRESENTATION</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {lang === 'en'
              ? 'One sentence. Three subtitles. Who gets to frame Maya?'
              : '一句話，三種字幕。翻譯也在塑造一個人的形象。'}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'A subtitle is never neutral. Making a quote dramatic brings clicks, but risks flattening the speaker into a caricature. Which subtitle will you burn into the video?'
              : '字幕絕非單純字對字翻譯。更誇張的標題能帶來點擊率，卻可能把受訪者簡化成刻板符號。你會選擇發布哪一種字幕？'}
          </p>

          <div className="space-y-2.5 pt-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setPreviewSubIndex(idx)}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 group ${
                  previewSubIndex === idx
                    ? 'bg-slate-900 border-teal-400 ring-1 ring-teal-400/20'
                    : 'bg-slate-900/60 border-white/10 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-amber-300 font-bold mb-1">
                    SUBTITLE STANCE 0{idx + 1} · {opt.tag.toUpperCase()}
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

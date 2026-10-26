import React from 'react';
import { Video, Disc, BatteryCharging, Compass } from 'lucide-react';
import { PERSONAS } from '../data/gameData';

interface GameHUDProps {
  phase: string;
  lang: 'zh' | 'en';
  points: Record<string, number>;
  stepInfo: {
    current: number;
    total: number;
    title: string;
    chapter: 1 | 2;
  };
}

export const GameHUD: React.FC<GameHUDProps> = ({ lang, points, stepInfo }) => {
  // Calculate top dominant stances
  const totalPoints = Object.values(points).reduce((a, b) => a + b, 0) || 1;
  const sortedStances = Object.entries(points)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .filter(([, val]) => val > 0);

  return (
    <div className="w-full bg-slate-950/80 backdrop-blur-md border-b border-teal-500/20 px-4 py-2 text-slate-300 select-none">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Viewfinder Camera Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 font-mono font-bold tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            <span>REC</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span>4K 24FPS</span>
            <span className="text-slate-600">|</span>
            <span>ISO 400</span>
            <span className="text-slate-600">|</span>
            <span className="text-teal-400">F/2.8 35mm</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">98%</span>
          </div>
        </div>

        {/* Center: Chapter and Step Tracker */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold text-[11px]">
            {stepInfo.chapter === 1 ? (lang === 'en' ? 'CH 01 · TASTE & MIGRATION' : '第一章 · 味覺遷徙') : (lang === 'en' ? 'CH 02 · THE MIRROR' : '第二章 · 鏡頭回望')}
          </span>
          <span className="font-mono text-slate-400 text-xs">
            [{stepInfo.current} / {stepInfo.total}]
          </span>
          <span className="hidden md:inline font-medium text-amber-200/90 text-xs">
            · {stepInfo.title}
          </span>
        </div>

        {/* Right: Dynamic Creator Stance (Director's Eye) */}
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {lang === 'en' ? 'Directorial Stance:' : '拍攝視角傾向:'}
          </span>
          
          <div className="flex items-center gap-1.5">
            {sortedStances.length === 0 ? (
              <span className="text-[11px] text-slate-500 italic">
                {lang === 'en' ? 'Calibrating...' : '觀察取景中...'}
              </span>
            ) : (
              sortedStances.map(([key, val]) => {
                const persona = PERSONAS[key];
                const pct = Math.round((val / totalPoints) * 100);
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border"
                    style={{
                      borderColor: `${persona.color}40`,
                      backgroundColor: `${persona.color}15`,
                      color: persona.color
                    }}
                    title={`${persona.name[lang === 'en' ? 1 : 0]}: ${pct}%`}
                  >
                    <span>{persona.glyph}</span>
                    <span className="hidden sm:inline">{persona.name[lang === 'en' ? 1 : 0]}</span>
                    <span className="font-mono opacity-80">{pct}%</span>
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

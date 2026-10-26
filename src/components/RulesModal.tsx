import React from 'react';
import { GAME_RULES } from '../data/gameData';
import { X, Play, Compass, Keyboard, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'zh' | 'en';
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-6 md:p-8 max-h-[92vh] overflow-y-auto text-slate-200 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playSelect();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-mono font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>DIRECTOR’S ORIENTATION · 遊戲規則與導演指南</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {GAME_RULES.title[lang === 'en' ? 1 : 0]}
          </h2>
          <p className="text-xs md:text-sm text-amber-300 font-medium">
            {GAME_RULES.subtitle[lang === 'en' ? 1 : 0]}
          </p>
        </div>

        {/* Intro */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs md:text-sm text-slate-300 leading-relaxed">
          {GAME_RULES.intro[lang === 'en' ? 1 : 0]}
        </div>

        {/* 4 Core Rule Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {GAME_RULES.steps.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">STEP {s.step}</span>
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              </div>
              <h4 className="font-bold text-sm text-white">{s.title[lang === 'en' ? 1 : 0]}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc[lang === 'en' ? 1 : 0]}</p>
            </div>
          ))}
        </div>

        {/* Keyboard Controls Guide */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider font-mono">
            <Keyboard className="w-4 h-4" />
            <span>{lang === 'en' ? 'KEYBOARD SHORTCUTS & CONTROLS' : '操作方式與快捷鍵支援'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {GAME_RULES.controls.map((ctrl, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-300">{ctrl.action[lang === 'en' ? 1 : 0]}</span>
                <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-amber-300 text-xs font-bold">
                  {ctrl.key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 text-[11px] text-slate-500 italic">
          <ShieldAlert className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <span>{GAME_RULES.disclaimer[lang === 'en' ? 1 : 0]}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              sounds.playShutter();
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{lang === 'en' ? 'I Understand the Rules · Begin Filming' : '我已了解規則 · 開機拍攝'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

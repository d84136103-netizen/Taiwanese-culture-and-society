import React from 'react';
import { FoodItem, Clue } from '../data/gameData';
import { Check, BookOpen, Compass, ArrowRight, Eye, Lightbulb } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ClueInspectorProps {
  food: FoodItem;
  collectedClues: number[];
  activeClueIdx: number | null;
  onInspectClue: (idx: number) => void;
  onProceed: () => void;
  lang: 'zh' | 'en';
}

export const ClueInspector: React.FC<ClueInspectorProps> = ({
  food,
  collectedClues,
  activeClueIdx,
  onInspectClue,
  onProceed,
  lang
}) => {
  const isReady = collectedClues.length >= 2;

  const handleCardClick = (idx: number) => {
    sounds.playSelect();
    onInspectClue(idx);
  };

  return (
    <div className="space-y-6">
      {/* Food Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-6xl shadow-inner shrink-0">
          {food.icon}
        </div>
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 uppercase tracking-widest">
            <span>ROUTE SELECTED</span>
            <span>·</span>
            <span>{food.micro[lang === 'en' ? 1 : 0]}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {food.name[lang === 'en' ? 1 : 0]}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {food.lead[lang === 'en' ? 1 : 0]}
          </p>
        </div>
      </div>

      {/* Historical Trajectory Route Bar */}
      <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-teal-400" />
          <span>{lang === 'en' ? 'HISTORICAL TRAJECTORY' : '歷史流變與跨海軌跡'}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {food.trace.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <span className="w-4 h-4 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-mono flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="font-medium">{item[lang === 'en' ? 1 : 0]}</span>
              </div>
              {i < food.trace.length - 1 && (
                <span className="text-slate-600 font-mono">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Investigative Clue Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <h3 className="font-bold text-sm text-white">
              {lang === 'en' ? 'Archival Clue Dossiers' : '歷史線索檔案夾'}
            </h3>
            <span className="text-xs text-slate-400">
              ({lang === 'en' ? 'Inspect at least 2 to unlock filming' : '請至少查閱 2 份以解鎖攤位訪談'})
            </span>
          </div>

          <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-teal-300 font-bold">{collectedClues.length}</span>
            <span className="text-slate-500"> / 3</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {food.clues.map((clue: Clue, idx: number) => {
            const isSeen = collectedClues.includes(idx);
            const isOpen = activeClueIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`relative cursor-pointer text-left rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  isOpen
                    ? 'bg-slate-900 border-teal-400 ring-1 ring-teal-400/30 shadow-xl shadow-teal-950/50'
                    : isSeen
                    ? 'bg-slate-900/70 border-white/20 hover:border-teal-400/50'
                    : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/80 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white/5 text-amber-300 border border-white/5">
                      {clue.tag[lang === 'en' ? 1 : 0]}
                    </span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isSeen ? 'bg-teal-400 text-slate-950' : 'bg-white/10 text-slate-400'
                    }`}>
                      {isSeen ? <Check className="w-3 h-3 stroke-[3]" /> : (idx + 1)}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-white mb-2">
                    {clue.title[lang === 'en' ? 1 : 0]}
                  </h4>

                  {isOpen ? (
                    <div className="space-y-3 mt-3 animate-fadeIn">
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed border-l-2 border-teal-400/40 pl-3">
                        {lang === 'en' ? clue.en : clue.zh}
                      </p>

                      <div className="bg-amber-950/20 border border-amber-400/20 rounded-xl p-3 text-[11px] text-amber-200 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span className="italic">"{clue.note[lang === 'en' ? 1 : 0]}"</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {lang === 'en' ? clue.en : clue.zh}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    {isOpen ? (lang === 'en' ? 'Click to minimize' : '點擊收起') : (lang === 'en' ? 'Click to inspect' : '點擊查閱細節')}
                  </span>
                  <span className="text-teal-300 font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{isOpen ? 'Expanded' : 'Read'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="text-xs text-slate-400">
          {isReady ? (
            <span className="text-teal-300 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-teal-400" />
              {lang === 'en' ? 'Ready! You have collected sufficient historical context.' : '已解鎖！你已收集足夠的歷史脈絡與田野線索。'}
            </span>
          ) : (
            <span>
              {lang === 'en'
                ? `Inspect ${2 - collectedClues.length} more clue(s) to unlock the stall filming session.`
                : `還需查閱 ${2 - collectedClues.length} 張線索卡即可開啟下個拍攝環節。`}
            </span>
          )}
        </div>

        <button
          onClick={() => {
            sounds.playShutter();
            onProceed();
          }}
          disabled={!isReady}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
            isReady
              ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed'
          }`}
        >
          <span>{lang === 'en' ? 'Enter Workshop Dilemma' : '進入料理兩難工坊'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

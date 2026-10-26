import React from 'react';
import { FOODS, MISSIONS } from '../data/gameData';
import { X, ExternalLink, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'zh' | 'en';
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-teal-500/30 rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto text-slate-200 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playSelect();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SCHOLARLY & ARCHIVAL SOURCES</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {lang === 'en' ? 'Facts Behind the Narrative' : '故事背後的歷史考據與學術筆記'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'The culinary origins and diaspora trajectories in this game are supported by published archives, official records, and academic research. Dialogue and specific overseas shop dilemmas are fictional scenarios designed to explore cultural representation.'
              : '本遊戲中的十道料理源流、遷徙軌跡與移居身分議題皆奠基於官方檔案、學術專著與田野研究。個別人物對白與海外店鋪情境為教學敘事創作，爭議史實皆保留各方說法。'}
          </p>
        </div>

        {/* Food Archives Links */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Culinary History References (10 Foods)' : '10 道料理歷史文獻依據'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FOODS.map((f) => (
              <a
                key={f.id}
                href={MISSIONS[f.id]?.source || f.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-white/5 hover:border-teal-500/30 text-xs text-slate-300 hover:text-teal-200 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{f.icon}</span>
                  <span className="font-medium">{f.name[lang === 'en' ? 1 : 0]}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Sociological and Cultural Studies Citations */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Peer-Reviewed Academic Studies' : '當代社會學與跨文化傳播論文'}</span>
          </h3>

          <div className="space-y-2 text-xs">
            <a
              href="https://www.tandfonline.com/doi/full/10.1080/14708477.2018.1450878"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-teal-400/40 transition-colors group"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-teal-300 mb-1">
                <span>Foreign YouTubers and negotiated identity in Taiwan</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                探討在臺外籍創作者如何透過影片媒介協商跨文化認同，以及觀眾期待中的「客旅/異國凝視」壓力。
              </p>
            </a>

            <a
              href="https://jossh.ussh.edu.vn/index.php/JOSSH-VN/article/view/588"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-teal-400/40 transition-colors group"
            >
              <div className="flex items-center justify-between font-bold text-white group-hover:text-teal-300 mb-1">
                <span>International student adaptation and language barriers in Taiwan</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                分析在臺外籍學生在日常租屋、醫療與行政流程中的語言適應經驗，呼應第二章 Rani 的餐桌對白。
              </p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              sounds.playSelect();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
          >
            {lang === 'en' ? 'Back to Story' : '返回遊戲'}
          </button>
        </div>
      </div>
    </div>
  );
};

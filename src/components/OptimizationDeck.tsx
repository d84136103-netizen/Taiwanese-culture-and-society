import React, { useState } from 'react';
import { 
  OPTIMIZATION_REPORT, 
  OptimizationPillar 
} from '../data/optimizationReport';
import { 
  Gamepad2, 
  Headphones, 
  BookOpen, 
  Sparkles, 
  Code2, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Play, 
  Layers, 
  Cpu, 
  Calendar, 
  Volume2, 
  Eye, 
  Sliders
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface OptimizationDeckProps {
  onStartGame: () => void;
  lang: 'zh' | 'en';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Gamepad2,
  Headphones,
  BookOpen,
  Sparkles,
  Code2,
  GraduationCap
};

export const OptimizationDeck: React.FC<OptimizationDeckProps> = ({ onStartGame, lang }) => {
  const [activePillarId, setActivePillarId] = useState<string>('mechanics');
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'comparison' | 'roadmap'>('overview');

  const { overview, pillars, beforeAfterComparison, roadmap } = OPTIMIZATION_REPORT;
  const activePillar = pillars.find(p => p.id === activePillarId) || pillars[0];

  const handlePillarChange = (id: string) => {
    setActivePillarId(id);
    sounds.playSelect();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-200">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/70 border border-teal-500/30 p-6 md:p-8 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              {lang === 'en' ? 'Game Optimization & Architecture Blueprint' : '遊戲深度優化診斷與架構藍圖'}
            </div>
            <div className="text-xs font-mono text-slate-400">
              TARGET: <span className="text-amber-300">{overview.gameTitle}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            {lang === 'en' ? 'Comprehensive Optimization Proposal' : '《臺灣印象製作所》遊戲深度優化建議書'}
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed mb-6">
            {overview.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playShutter();
                onStartGame();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 hover:from-teal-300 hover:to-emerald-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{lang === 'en' ? 'Launch Playable Enhanced Game' : '啟動升級版遊戲原型實測'}</span>
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 ml-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>{lang === 'en' ? 'Includes all 10 Food Routes & 2 Chapters' : '包含完整 10 道料理與兩大章節實測'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-8 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('overview'); sounds.playSelect(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{lang === 'en' ? 'Executive Diagnosis' : '總體評估矩陣'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('pillars'); sounds.playSelect(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
            activeTab === 'pillars'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{lang === 'en' ? '6 Optimization Pillars' : '六大維度優化方案'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('comparison'); sounds.playSelect(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
            activeTab === 'comparison'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{lang === 'en' ? 'Before vs. After Matrix' : '前後版本對比矩陣'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('roadmap'); sounds.playSelect(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'en' ? 'Evolution Roadmap' : '演進落地路線圖'}</span>
        </button>
      </div>

      {/* TAB 1: EXECUTIVE DIAGNOSIS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Health Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: '文本深度', labelEn: 'Narrative Depth', score: overview.scoreCard.narrativeDepth, color: 'text-emerald-400', bar: 'bg-emerald-400' },
              { label: '玩法機制', labelEn: 'Mechanics', score: overview.scoreCard.gameplayMechanics, color: 'text-amber-400', bar: 'bg-amber-400' },
              { label: '視聽氛圍', labelEn: 'Audio/Vibe', score: overview.scoreCard.audioAtmosphere, color: 'text-red-400', bar: 'bg-red-400' },
              { label: '視覺沉浸', labelEn: 'Visuals', score: overview.scoreCard.visualImmersion, color: 'text-amber-400', bar: 'bg-amber-400' },
              { label: '工程架構', labelEn: 'Architecture', score: overview.scoreCard.technicalArchitecture, color: 'text-orange-400', bar: 'bg-orange-400' },
              { label: '無障礙性', labelEn: 'A11y', score: overview.scoreCard.accessibility, color: 'text-rose-400', bar: 'bg-rose-400' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-[11px] text-slate-400 mb-1">{lang === 'en' ? item.labelEn : item.label}</div>
                <div className={`text-2xl font-black font-mono ${item.color}`}>{item.score}<span className="text-xs text-slate-500">/100</span></div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Diagnosis Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/70 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
                <AlertTriangle className="w-5 h-5" />
                <span>{lang === 'en' ? 'Core Bottlenecks in Current Implementation' : '原版本核心體驗瓶頸與痛點'}</span>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>純文本閱讀疲勞：</strong>大量的歷史文字一次性堆疊，玩家閱讀負荷高，容易快速點擊略過。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>完全靜音，缺少夜市環境感：</strong>無任何聲效、快門聲或街道白噪音，削弱了作為紀錄片導演的沉浸感。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>選擇結果反饋延遲：</strong>後台累計分數對當前畫面無任何可視化反饋，直到結局才出現定論。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>單一文件代碼耦合：</strong>850+ 行 HTML 內嵌字串模板，維護與擴展新菜餚難度高，且無無障礙導航。</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-teal-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-teal-300 font-bold mb-4">
                <Sparkles className="w-5 h-5" />
                <span>{lang === 'en' ? 'Strategic Transformation Highlights' : '優化後之核心亮點架構'}</span>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span><strong>導演相機 HUD 介面：</strong>將畫面轉化為 4K 24FPS 取景框，包含 REC 閃爍燈、光圈刻度與進度指針。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span><strong>Web Audio 原生合成音效：</strong>無須加載外部檔案，即刻合成夜市暖意氛圍音、快門聲與錄音帶機械聲。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span><strong>即時母帶剪輯時間軸：</strong>每次抉擇皆會以「片段膠卷」卡扣進下方的成片軌道，可實時預覽剪輯效果。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span><strong>全鍵盤與無障礙支援：</strong>鍵盤 1/2/3 鍵選、Space 前進、M 鍵靜音、L 鍵切換語言，流暢無阻。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PILLARS DETAIL */}
      {activeTab === 'pillars' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pillar Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            {pillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.icon] || Gamepad2;
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handlePillarChange(pillar.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-500/15 border-teal-400 text-teal-200 shadow-lg shadow-teal-500/10'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-teal-400 text-slate-950' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs md:text-sm text-slate-100">{pillar.title}</div>
                      <div className="text-[10px] text-slate-400">{pillar.titleEn}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-300/90 border border-white/5">
                    {pillar.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pillar Content Panel */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">{activePillar.badge}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{activePillar.title}</h3>
                <p className="text-xs text-slate-400">{activePillar.titleEn}</p>
              </div>
            </div>

            {/* Current Issues */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Identified Issues' : '現況痛點分析'}</span>
              </h4>
              <div className="space-y-2 bg-red-950/20 border border-red-500/20 rounded-xl p-4">
                {activePillar.currentIssues.map((issue, idx) => (
                  <div key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposed Solutions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Proposed Solutions & Design' : '具體解決方案與設計'}</span>
              </h4>
              <div className="space-y-2.5 bg-teal-950/20 border border-teal-500/20 rounded-xl p-4">
                {activePillar.proposedSolutions.map((sol, idx) => (
                  <div key={idx} className="text-xs md:text-sm text-slate-200 flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items & Expected Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/50 border border-white/5 rounded-xl p-4">
                <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Key Action Items' : '執行落地清單'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activePillar.actionItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/50 border border-white/5 rounded-xl p-4">
                <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Expected Impact' : '預期改善效果'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePillar.expectedImpact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BEFORE VS AFTER COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">
              {lang === 'en' ? 'Before vs. After Comparative Matrix' : '版本迭代前後關鍵體驗對照表'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Direct contrast between legacy v5.0 and the enhanced playable architecture' : '原版 v5.0 與重製升級版之核心指標對照'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-3 px-4 font-semibold">{lang === 'en' ? 'Dimension' : '體驗維度'}</th>
                  <th className="py-3 px-4 font-semibold text-red-400">{lang === 'en' ? 'Original v5.0 (Before)' : '原版本 (Before)'}</th>
                  <th className="py-3 px-4 font-semibold text-teal-300">{lang === 'en' ? 'Enhanced Edition (After)' : '重製升級版 (After)'}</th>
                  <th className="py-3 px-4 font-semibold text-amber-300">{lang === 'en' ? 'Key Value Gain' : '核心升級收益'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {beforeAfterComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-200">{row.dimension}</td>
                    <td className="py-3.5 px-4 text-slate-400 bg-red-950/10">{row.before}</td>
                    <td className="py-3.5 px-4 text-teal-200 bg-teal-950/10 font-medium">{row.after}</td>
                    <td className="py-3.5 px-4 text-amber-300/90 font-mono text-xs">{row.gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">
              {lang === 'en' ? 'Implementation & Evolution Roadmap' : '產品演進三階段落地規劃'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Phased execution plan for production rollout and academic workshop adoption' : '從即刻體驗到社群共創與課堂推廣之完整路徑'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, idx) => (
              <div key={idx} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 text-[10px] font-bold font-mono">
                      PHASE 0{idx + 1}
                    </span>
                    <span className="text-xs text-amber-400 font-mono">{phase.timeline}</span>
                  </div>
                  <h4 className="font-bold text-base text-white mb-4">{phase.phase}</h4>

                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{lang === 'en' ? 'Key Goals' : '核心目標'}</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {phase.goals.map((g, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-400 font-bold">•</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{lang === 'en' ? 'Deliverables' : '產出成果'}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.deliverables.map((d, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

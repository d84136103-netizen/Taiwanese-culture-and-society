import React, { useState, useEffect, useCallback } from 'react';
import { 
  FOODS, 
  MISSIONS, 
  PERSONAS, 
  FoodItem 
} from './data/gameData';
import { GameHUD } from './components/GameHUD';
import { AudioController } from './components/AudioController';
import { RulesModal } from './components/RulesModal';
import { FoodSelector } from './components/FoodSelector';
import { ClueInspector } from './components/ClueInspector';
import { WorkshopTask } from './components/WorkshopTask';
import { PassportScreen } from './components/PassportScreen';
import { MarketScreen } from './components/MarketScreen';
import { EditScreen } from './components/EditScreen';
import { ChapterTransition } from './components/ChapterTransition';
import { ArrivalScreen } from './components/ArrivalScreen';
import { LanguageScreen } from './components/LanguageScreen';
import { NeighborhoodScreen } from './components/NeighborhoodScreen';
import { SharedTable } from './components/SharedTable';
import { CreatorScreen } from './components/CreatorScreen';
import { SubtitleRoom } from './components/SubtitleRoom';
import { LivePremiere } from './components/LivePremiere';
import { IdentityScreen } from './components/IdentityScreen';
import { MirrorStage } from './components/MirrorStage';
import { FinalCutScreen } from './components/FinalCutScreen';
import { PersonaResult } from './components/PersonaResult';
import { SourcesModal } from './components/SourcesModal';
import { AssessmentModal } from './components/AssessmentModal';
import { 
  Play, 
  Languages, 
  BookOpen, 
  Sparkles, 
  Award,
  HelpCircle
} from 'lucide-react';
import { sounds } from './utils/audio';

type GamePhase =
  | 'home'
  | 'food'
  | 'trace'
  | 'workshop'
  | 'passport'
  | 'market'
  | 'cut'
  | 'transition'
  | 'arrival'
  | 'language'
  | 'neighborhood'
  | 'table'
  | 'creator'
  | 'subtitle'
  | 'comments'
  | 'identity'
  | 'mirror'
  | 'finalcut'
  | 'end';

interface GameState {
  lang: 'zh' | 'en';
  phase: GamePhase;
  selectedFoodId: string | null;
  collectedClues: number[];
  activeClueIdx: number | null;
  taskStep: number;
  lastFeedback: [string, string] | null;
  editedTitle: [string, string];
  firstEpisodeChoice: number;
  videoChoice: number;
  subtitleChoice: number;
  mirrorText: string;
  points: Record<string, number>;
}

const STORAGE_KEY = 'framing_taiwan_game_pure_v5';

const INITIAL_POINTS: Record<string, number> = {
  archivist: 0,
  translator: 0,
  spotlight: 0,
  editor: 0,
  between: 0,
  questioner: 0
};

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phase && parsed.points) return parsed;
      }
    } catch {
      // Storage fallback
    }
    return {
      lang: 'zh',
      phase: 'home',
      selectedFoodId: 'bubble',
      collectedClues: [],
      activeClueIdx: null,
      taskStep: 0,
      lastFeedback: null,
      editedTitle: ['夜市裡的另一種故事', 'Another Story from the Night Market'],
      firstEpisodeChoice: 1,
      videoChoice: 0,
      subtitleChoice: 0,
      mirrorText: '',
      points: { ...INITIAL_POINTS }
    };
  });

  // Automatically show the rules guide when entering the game
  const [rulesModalOpen, setRulesModalOpen] = useState(true);
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable
    }
  }, [state]);

  const currentFood: FoodItem = FOODS.find(f => f.id === state.selectedFoodId) || FOODS[0];
  const currentMission = MISSIONS[currentFood.id] || MISSIONS.bubble;

  const addPoints = (tag: string, delta: number = 2) => {
    setState(prev => ({
      ...prev,
      points: {
        ...prev.points,
        [tag]: (prev.points[tag] || 0) + delta
      }
    }));
  };

  // Keyboard Navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        sounds.setMuted(!sounds.getMuted());
      } else if (e.key === 'l' || e.key === 'L') {
        setState(prev => ({ ...prev, lang: prev.lang === 'zh' ? 'en' : 'zh' }));
        sounds.playSelect();
      } else if (e.key === 'Escape') {
        setRulesModalOpen(false);
        setSourcesModalOpen(false);
        setAssessmentModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute dominant persona
  const computeOutcome = useCallback((): string => {
    let max = -1;
    let topPersona = 'archivist';
    Object.entries(state.points).forEach(([id, val]) => {
      if (val > max) {
        max = val;
        topPersona = id;
      }
    });
    return topPersona;
  }, [state.points]);

  // Restart game
  const handleRestart = () => {
    setState(prev => ({
      ...prev,
      phase: 'food',
      collectedClues: [],
      activeClueIdx: null,
      taskStep: 0,
      lastFeedback: null,
      firstEpisodeChoice: 1,
      videoChoice: 0,
      subtitleChoice: 0,
      mirrorText: '',
      points: { ...INITIAL_POINTS }
    }));
  };

  // Step tracker matching the 17 sequential phases
  const getStepInfo = () => {
    switch (state.phase) {
      case 'home':
        return { current: 1, total: 17, title: state.lang === 'en' ? 'Lens Opening' : '取景開篇', chapter: 1 as const };
      case 'food':
        return { current: 2, total: 17, title: state.lang === 'en' ? 'Food Selection' : '選定拍攝小吃', chapter: 1 as const };
      case 'trace':
        return { current: 3, total: 17, title: state.lang === 'en' ? 'Archival Clues' : '歷史線索偵蒐', chapter: 1 as const };
      case 'workshop':
        return { current: 4, total: 17, title: state.lang === 'en' ? 'Cooking Dilemma' : '料理兩難工坊', chapter: 1 as const };
      case 'passport':
        return { current: 5, total: 17, title: state.lang === 'en' ? 'Cultural Passport' : '跨海文化護照', chapter: 1 as const };
      case 'market':
        return { current: 6, total: 17, title: state.lang === 'en' ? 'Vendor Encounter' : '夜市攤位取景', chapter: 1 as const };
      case 'cut':
        return { current: 7, total: 17, title: state.lang === 'en' ? 'The Final Cut' : '母帶剪輯室', chapter: 1 as const };
      case 'transition':
        return { current: 8, total: 17, title: state.lang === 'en' ? 'Broadcast Episode 1' : '第一集首映', chapter: 1 as const };
      case 'arrival':
        return { current: 9, total: 17, title: state.lang === 'en' ? 'Outside the Frame' : '鏡頭外的生活', chapter: 2 as const };
      case 'language':
        return { current: 10, total: 17, title: state.lang === 'en' ? 'Language Speed' : '櫃檯前的話語', chapter: 2 as const };
      case 'neighborhood':
        return { current: 11, total: 17, title: state.lang === 'en' ? 'The Friendly Line' : '友善與邊界', chapter: 2 as const };
      case 'table':
        return { current: 12, total: 17, title: state.lang === 'en' ? 'The Shared Table' : '同一張餐桌', chapter: 2 as const };
      case 'creator':
        return { current: 13, total: 17, title: state.lang === 'en' ? 'Creator Dilemma' : '創作者十字路口', chapter: 2 as const };
      case 'subtitle':
        return { current: 14, total: 17, title: state.lang === 'en' ? 'Subtitle Nuance' : '字幕微調教室', chapter: 2 as const };
      case 'comments':
        return { current: 15, total: 17, title: state.lang === 'en' ? 'Live Premiere' : '留言區的凝視', chapter: 2 as const };
      case 'identity':
        return { current: 16, total: 17, title: state.lang === 'en' ? 'Are You Taiwanese?' : '你是哪裡人？', chapter: 2 as const };
      case 'mirror':
      case 'finalcut':
      case 'end':
        return { current: 17, total: 17, title: state.lang === 'en' ? 'The Mirror Frame' : '鏡頭回望自身', chapter: 2 as const };
      default:
        return { current: 1, total: 17, title: 'Documentary', chapter: 1 as const };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans film-grain selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Global Navigation Bar (Pure Game Interface) */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Project Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setState(prev => ({ ...prev, phase: 'home' }));
                sounds.playSelect();
              }}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-400 group-hover:text-slate-950 transition-colors">
                <span className="font-bold text-sm">◉</span>
              </div>
              <div>
                <div className="font-extrabold text-xs md:text-sm text-white tracking-wide flex items-center gap-1.5">
                  <span>{state.lang === 'en' ? 'FRAMING TAIWAN' : '臺灣印象製作所'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono font-bold">
                    GAME
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
                  {state.lang === 'en'
                    ? 'CHINESE CULTURE & SOCIETY · INTERACTIVE DOCUMENTARY'
                    : '「華人文化與社會」期中報告 · 鏡頭內外的文化歸屬'}
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Controls: Game Rules, Assessment, Sources */}
          <div className="flex items-center gap-1.5 text-xs">
            {/* Rules Button */}
            <button
              onClick={() => {
                setRulesModalOpen(true);
                sounds.playSelect();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 border border-teal-400/40 text-teal-300 font-bold hover:bg-teal-400/25 transition-colors shadow-sm"
              title={state.lang === 'en' ? 'View Game Rules & Field Guide' : '查看遊戲規則與導演指南'}
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-300" />
              <span>{state.lang === 'en' ? 'Game Rules' : '遊戲規則'}</span>
            </button>

            {/* Assessment Button */}
            <button
              onClick={() => {
                setAssessmentModalOpen(true);
                sounds.playSelect();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold transition-colors hidden sm:flex"
              title={state.lang === 'en' ? 'Pre/Post Play Learning Assessment' : '學習成效評估問卷'}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{state.lang === 'en' ? 'Assessment' : '成效評估'}</span>
            </button>

            {/* Academic Sources modal button */}
            <button
              onClick={() => {
                setSourcesModalOpen(true);
                sounds.playSelect();
              }}
              className="p-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors hidden md:flex"
              title={state.lang === 'en' ? 'Academic & Archival Sources' : '歷史考據與學術文獻'}
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Audio Controller */}
            <AudioController lang={state.lang} />

            {/* Language Switcher */}
            <button
              onClick={() => {
                setState(prev => ({ ...prev, lang: prev.lang === 'zh' ? 'en' : 'zh' }));
                sounds.playSelect();
              }}
              className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
              title="Shortcut: L"
            >
              <Languages className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono">{state.lang === 'zh' ? 'EN' : '中'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Interface */}
      <main className="flex-1 flex flex-col">
        {/* Top Camera Viewfinder HUD */}
        <GameHUD
          phase={state.phase}
          lang={state.lang}
          points={state.points}
          stepInfo={getStepInfo()}
        />

        <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
          {/* Phase 1: Home / Opening */}
          {state.phase === 'home' && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 border border-teal-500/30 p-8 md:p-12 shadow-2xl flex flex-col justify-center min-h-[560px]">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>「華人文化與社會」期中報告 · 互動敘事網頁遊戲</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {state.lang === 'en' ? (
                    <>Framing Taiwan: <span className="text-amber-300 italic font-serif">Belonging Inside and Outside the Lens</span></>
                  ) : (
                    <>《臺灣印象製作所：<br /><span className="text-amber-300 italic font-serif">鏡頭內外的文化歸屬》</span></>
                  )}
                </h1>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {state.lang === 'en'
                    ? 'Target play time: ~20 mins. Follow 10 food routes (focusing on Boba, Beef Noodles, and Gua Bao) from night markets to overseas tables, then turn the camera around to question who gets to define "Taiwanese flavor" and "belonging."'
                    : '目標遊玩時間約 20 分鐘。以 10 種常見小吃為起點（聚焦珍奶、牛肉麵、刈包三大案例），從夜市手藝、跨海變形到在臺外籍居民的真實生活。你的每一次選擇都在探問：「臺灣味」由誰定義？「自己人」由誰決定？'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      sounds.playShutter();
                      setState(prev => ({ ...prev, phase: 'food' }));
                    }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{state.lang === 'en' ? 'Start 20-Min Experience' : '開始 20 分鐘故事體驗'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setRulesModalOpen(true);
                      sounds.playSelect();
                    }}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-teal-300" />
                    <span>{state.lang === 'en' ? 'Review Game Rules' : '查看遊戲規則指南'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setAssessmentModalOpen(true);
                      sounds.playSelect();
                    }}
                    className="px-5 py-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-xs text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>{state.lang === 'en' ? 'Pre-Play Quiz' : '學習成效前測問卷'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Food Route Selection */}
          {state.phase === 'food' && (
            <FoodSelector
              lang={state.lang}
              onSelectFood={(food) => {
                setState(prev => ({
                  ...prev,
                  selectedFoodId: food.id,
                  collectedClues: [],
                  activeClueIdx: null,
                  taskStep: 0,
                  lastFeedback: null,
                  phase: 'trace'
                }));
              }}
            />
          )}

          {/* Phase 3: Clue Dossier Inspector */}
          {state.phase === 'trace' && (
            <ClueInspector
              food={currentFood}
              collectedClues={state.collectedClues}
              activeClueIdx={state.activeClueIdx}
              onInspectClue={(idx) => {
                setState(prev => {
                  const newClues = prev.collectedClues.includes(idx)
                    ? prev.collectedClues
                    : [...prev.collectedClues, idx];
                  const tag = idx === 0 ? 'archivist' : idx === 1 ? 'translator' : 'questioner';
                  return {
                    ...prev,
                    activeClueIdx: prev.activeClueIdx === idx ? null : idx,
                    collectedClues: newClues,
                    points: {
                      ...prev.points,
                      [tag]: (prev.points[tag] || 0) + 1
                    }
                  };
                });
              }}
              onProceed={() => {
                setState(prev => ({ ...prev, phase: 'workshop' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 4: Culinary Adaptation Tasks (Workshop with Flavor Slider) */}
          {state.phase === 'workshop' && (
            <WorkshopTask
              food={currentFood}
              mission={currentMission}
              currentStep={state.taskStep}
              totalSteps={currentMission.tasks.length}
              lastFeedback={state.lastFeedback}
              onSelectChoice={(idx) => {
                const t = currentMission.tasks[state.taskStep];
                const choiceItem = t.choices[idx];
                if (choiceItem) {
                  addPoints(choiceItem[1], 2);
                  const nextStep = state.taskStep + 1;
                  if (nextStep >= currentMission.tasks.length) {
                    setState(prev => ({
                      ...prev,
                      lastFeedback: choiceItem[2],
                      phase: 'passport'
                    }));
                  } else {
                    setState(prev => ({
                      ...prev,
                      taskStep: nextStep,
                      lastFeedback: choiceItem[2]
                    }));
                  }
                }
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 5: Cultural Passport (Southeast Asia & US Diaspora Highlights) */}
          {state.phase === 'passport' && (
            <PassportScreen
              food={currentFood}
              mission={currentMission}
              lastFeedback={state.lastFeedback}
              onSelectOption={(idx) => {
                const tags = ['translator', 'between', 'spotlight'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'market' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 6: Market Stall Vendor Dilemma */}
          {state.phase === 'market' && (
            <MarketScreen
              food={currentFood}
              options={[
                {
                  tag: 'archivist',
                  title: ['先留下人的日常', 'Stay for the human story'],
                  detail: ['把備料、顧客、時間與生活放進鏡頭。', 'Film the hands, customers, hours and daily work.']
                },
                {
                  tag: 'translator',
                  title: ['追去海外版本的故事', 'Follow the overseas version'],
                  detail: ['問一問：不同地方為什麼做得不一樣？', 'Ask why it changes in different places.']
                },
                {
                  tag: 'spotlight',
                  title: ['先用第一口反應留住觀眾', 'Lead with a first-bite reaction'],
                  detail: ['讓更多人停下來，再看看故事會走到哪。', 'Capture attention first and see where the story goes.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['archivist', 'translator', 'spotlight'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'cut' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 7: Video Editing Suite (Chapter 1 Final Cut) */}
          {state.phase === 'cut' && (
            <EditScreen
              food={currentFood}
              options={[
                {
                  tag: 'spotlight',
                  title: ['「第一次吃！這味道太不可思議！」', '“My FIRST BITE! I cannot believe this taste!”'],
                  detail: ['驚訝、快剪、表情特寫。', 'Reactions, fast cuts and close-up faces.']
                },
                {
                  tag: 'translator',
                  title: ['「這道臺灣小吃，出了海變成什麼？」', '“What happens when this Taiwanese food goes abroad?”'],
                  detail: ['保留海外版本與在地故事的對話。', 'Let overseas and local stories answer one another.']
                },
                {
                  tag: 'archivist',
                  title: ['「那個攤位，與每天準時來的人」', '“The stall and the people who return each day”'],
                  detail: ['把攤主的日常放在片頭。', 'Put the vendor’s daily life at the beginning.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['spotlight', 'translator', 'archivist'];
                const titles: Array<[string, string]> = [
                  ['「第一次吃！這味道太不可思議！」', '“My FIRST BITE! I cannot believe this taste!”'],
                  ['「這道臺灣小吃，出了海變成什麼？」', '“What happens when this Taiwanese food goes abroad?”'],
                  ['「那個攤位，與每天準時來的人」', '“The stall and the people who return each day”']
                ];
                addPoints(tags[idx], 2);
                setState(prev => ({
                  ...prev,
                  firstEpisodeChoice: idx,
                  editedTitle: titles[idx],
                  phase: 'transition'
                }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 8: Episode 1 Premiere Card -> Transition to Ch 2 */}
          {state.phase === 'transition' && (
            <ChapterTransition
              food={currentFood}
              editedTitle={state.editedTitle}
              onProceed={() => {
                setState(prev => ({ ...prev, phase: 'arrival' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 9: Arrival & Life Outside the Tourist Frame */}
          {state.phase === 'arrival' && (
            <ArrivalScreen
              options={[
                {
                  tag: 'between',
                  title: ['把自己的不熟悉拍進下一支影片', 'Film your own unfamiliarity'],
                  detail: ['不把困難拍成整個臺灣的標籤。', 'Show difficulty without branding an entire society.']
                },
                {
                  tag: 'editor',
                  title: ['邀請其他居民分享不同經驗', 'Invite residents with different experiences'],
                  detail: ['讓學生、移居者與在地朋友都有聲音。', 'Let students, migrants and locals speak.']
                },
                {
                  tag: 'spotlight',
                  title: ['先剪掉麻煩，只留下順利的一天', 'Edit the trouble out and keep the happy day'],
                  detail: ['維持好看的人設，但也留下盲點。', 'Maintain the cheerful persona, and its blind spots.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['between', 'editor', 'spotlight'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'language' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 10: Language & Speed at Service Counter */}
          {state.phase === 'language' && (
            <LanguageScreen
              options={[
                {
                  tag: 'translator',
                  title: ['請對方慢慢說，並把流程寫下來', 'Ask them to repeat slowly, and write the steps'],
                  detail: ['互相理解需要時間，也需要制度配合。', 'Understanding takes time and responsive systems.']
                },
                {
                  tag: 'between',
                  title: ['請朋友協助，之後自己再試一次', 'Ask a friend, then try again yourself'],
                  detail: ['支持不等於沒有自主。', 'Accepting help does not erase agency.']
                },
                {
                  tag: 'questioner',
                  title: ['先退出排隊，想想下一次怎麼處理', 'Step away to regroup and try later'],
                  detail: ['當下先保護自己，仍有待解的障礙。', 'Protect your limits while barriers remain.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['translator', 'between', 'questioner'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'neighborhood' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 11: Neighborhood & The Friendly Boundary ("You speak Chinese so well!") */}
          {state.phase === 'neighborhood' && (
            <NeighborhoodScreen
              options={[
                {
                  tag: 'editor',
                  title: ['問每個人怎麼理解善意與距離感', 'Ask what kindness and distance mean to each person'],
                  detail: ['不同經驗並列，而不是誰一句話代表全部。', 'Keep perspectives distinct; no one voice represents everyone.']
                },
                {
                  tag: 'archivist',
                  title: ['拍下真正發生的細小日常', 'Film the small moments of ordinary life'],
                  detail: ['不只拍攝驚奇，也保留長期相處。', 'Preserve long-term life beyond spectacles.']
                },
                {
                  tag: 'between',
                  title: ['坦白說自己同時感到被接納與被區分', 'Say you feel both welcomed and singled out'],
                  detail: ['讓矛盾成為可說的事。', 'Let contradictory feelings coexist.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['editor', 'archivist', 'between'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'table' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 12: The Shared Table (Rani, Maya, Xiao-An, Leo 4 Characters with Probes) */}
          {state.phase === 'table' && (
            <SharedTable
              options={[
                {
                  tag: 'editor',
                  title: ['四人的聲音都留下，讓他們彼此提問', 'Keep all four voices, and let them ask each other'],
                  detail: ['不把「外籍與移居經驗」簡化成同一種視角。', 'Refuse to portray all migrant and diasporic lives alike.']
                },
                {
                  tag: 'between',
                  title: ['跟著 Rani 與 Leo 探討雙向文化適應', 'Follow Rani and Leo’s two-way cultural adaptation'],
                  detail: ['在臺適應與海外留學經驗的互為鏡像。', 'Mirroring adaptation in Taiwan and studying abroad.']
                },
                {
                  tag: 'archivist',
                  title: ['從小安談的夜市都市空間切入生活日常', 'Explore ordinary life through Xiao-An’s urban night market insights'],
                  detail: ['看見攤販清晨勞動、地租流動與城鄉記憶。', 'Notice vendor labor, micro-rent economics, and urban memory.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['editor', 'between', 'archivist'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'creator' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 13: The Creator's Crossroad */}
          {state.phase === 'creator' && (
            <CreatorScreen
              firstEpisodeChoice={state.firstEpisodeChoice}
              options={[
                {
                  tag: 'spotlight',
                  title: ['繼續追逐令人驚奇的臺灣', 'Keep finding surprising Taiwan'],
                  detail: ['觀看數成長，但大家期待你一直是「驚訝的外國人」。', 'More views, but an endless expectation of the “shocked foreigner.”']
                },
                {
                  tag: 'archivist',
                  title: ['拍一個星期的普通生活', 'Film one ordinary week'],
                  detail: ['捷運、買早餐、跟鄰居聊天，連無聊也留下。', 'Transit, breakfast, neighbours—and even the boring bits.']
                },
                {
                  tag: 'between',
                  title: ['拍自己在兩種文化間的變化', 'Film your own changing identity'],
                  detail: ['把熟悉、陌生與矛盾，拍進同一個畫面。', 'Film familiarity, strangeness and contradictions together.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['spotlight', 'archivist', 'between'];
                addPoints(tags[idx], 2);
                setState(prev => ({
                  ...prev,
                  videoChoice: idx,
                  phase: 'subtitle'
                }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 14: Subtitle Nuance Workshop */}
          {state.phase === 'subtitle' && (
            <SubtitleRoom
              options={[
                {
                  tag: 'translator',
                  title: ['「我有時仍覺得自己像個客人」', '“Sometimes I still feel like a guest.”'],
                  detail: ['保留猶豫、不確定與她自己的語氣。', 'Preserve uncertainty and her own voice.']
                },
                {
                  tag: 'spotlight',
                  title: ['「住這麼久，我還是永遠不屬於這裡！」', '“I have lived here forever and STILL do not belong!”'],
                  detail: ['更戲劇化，但扭轉了原本比較含蓄的意思。', 'More dramatic; less faithful to the nuance.']
                },
                {
                  tag: 'editor',
                  title: ['保留原話，補上 Maya 自己的生活背景', 'Keep the quote and add Maya’s context'],
                  detail: ['留給受訪者回看與提出修改的空間。', 'Invite the interviewee to review her portrayal.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['translator', 'spotlight', 'editor'];
                addPoints(tags[idx], 2);
                setState(prev => ({
                  ...prev,
                  subtitleChoice: idx,
                  phase: 'comments'
                }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 15: Live Video Premiere & Audience Comments */}
          {state.phase === 'comments' && (
            <LivePremiere
              food={currentFood}
              videoChoice={state.videoChoice}
              subtitleChoice={state.subtitleChoice}
              options={[
                {
                  tag: 'editor',
                  title: ['邀請在地居民和其他外籍朋友一起對談', 'Invite local and foreign residents into the next film'],
                  detail: ['不是每個人都用同一種方式理解臺灣。', 'Different people live different Taiwans.']
                },
                {
                  tag: 'spotlight',
                  title: ['回應最多人按讚的留言', 'Reply to the most-liked comment'],
                  detail: ['讓社群平台數字決定下一個故事。', 'Let platform numbers shape the next story.']
                },
                {
                  tag: 'questioner',
                  title: ['承認影片無法代表所有人的生活', 'Admit this video cannot represent everyone'],
                  detail: ['說出你還沒拍到的部分與視角局限。', 'Name what the camera has missed.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['editor', 'spotlight', 'questioner'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'identity' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 16: Identity Question ("Are you Taiwanese now?") */}
          {state.phase === 'identity' && (
            <IdentityScreen
              options={[
                {
                  tag: 'between',
                  title: ['「我能同時屬於不只一個地方。」', '“I can belong to more than one place.”'],
                  detail: ['不必在家鄉與臺灣之間二選一。', 'Home and Taiwan do not have to compete.']
                },
                {
                  tag: 'editor',
                  title: ['「不要只問我，也問問住在這裡的人。」', '“Do not only ask me—ask the people here too.”'],
                  detail: ['把問題交回給不同身分的居民。', 'Bring other residents into the conversation.']
                },
                {
                  tag: 'questioner',
                  title: ['「我還沒想好，或許答案會變。」', '“I have not decided. My answer may change.”'],
                  detail: ['不確定也是可以被說出來的身份。', 'Uncertainty can be part of identity.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['between', 'editor', 'questioner'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'mirror' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 17: The Mirror Frame (Reflexive Stance & Quote) */}
          {state.phase === 'mirror' && (
            <MirrorStage
              mirrorText={state.mirrorText}
              onMirrorTextChange={(text) => {
                setState(prev => ({ ...prev, mirrorText: text }));
              }}
              options={[
                {
                  tag: 'archivist',
                  title: ['一種陪我長大的味道，讓我想起家人與童年', 'A food from childhood makes me think of family'],
                  detail: ['文化在日常細節與家庭記憶裡延續。', 'Culture persists through mundane family memories.']
                },
                {
                  tag: 'translator',
                  title: ['我熟悉的文化到了另一個地方，也能有新樣子', 'My culture can take new forms elsewhere'],
                  detail: ['不必把所有跨海變化都視為失去。', 'Change need not always mean loss.']
                },
                {
                  tag: 'editor',
                  title: ['我希望別人不要只用一個身分標籤看待我', 'I do not want one single label to define me'],
                  detail: ['歸屬感不必只有非黑即白的標準答案。', 'Belonging need not have one answer.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['archivist', 'translator', 'editor'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'finalcut' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 18: Final Cut of the Series */}
          {state.phase === 'finalcut' && (
            <FinalCutScreen
              food={currentFood}
              options={[
                {
                  tag: 'editor',
                  title: ['把受訪者的不同看法留在片尾', 'End with the people who disagree'],
                  detail: ['沒有總結旁白，觀眾自己聽見差異。', 'No final voiceover; let people hear the differences.']
                },
                {
                  tag: 'archivist',
                  title: ['留下攤主明天清晨準備開店的畫面', 'End with tomorrow morning at the stall'],
                  detail: ['鏡頭回到普通人的日常。', 'The camera returns to ordinary life.']
                },
                {
                  tag: 'translator',
                  title: ['讓臺灣與海外的兩個畫面並排', 'Place Taiwan and overseas versions side by side'],
                  detail: ['讓不同地方彼此對照，卻不宣布誰比較正宗。', 'Compare places without ranking their authenticity.']
                }
              ]}
              onSelectOption={(idx) => {
                const tags = ['editor', 'archivist', 'translator'];
                addPoints(tags[idx], 2);
                setState(prev => ({ ...prev, phase: 'end' }));
              }}
              lang={state.lang}
            />
          )}

          {/* Phase 19: Ending Persona Card & 2K Poster */}
          {state.phase === 'end' && (
            <PersonaResult
              persona={PERSONAS[computeOutcome()]}
              food={currentFood}
              mirrorText={state.mirrorText}
              onRestart={handleRestart}
              onOpenSources={() => setSourcesModalOpen(true)}
              lang={state.lang}
            />
          )}
        </div>
      </main>

      {/* Game Rules Modal (Pops up automatically on first entry, or via Rules button) */}
      <RulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
        lang={state.lang}
      />

      {/* Sources & Academic Notes Modal */}
      <SourcesModal
        isOpen={sourcesModalOpen}
        onClose={() => setSourcesModalOpen(false)}
        lang={state.lang}
      />

      {/* Learning Assessment & Research Question Modal */}
      <AssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
        lang={state.lang}
      />

      {/* Global Footer */}
      <footer className="border-t border-white/10 px-4 py-4 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <span>© 2026 FRAMING TAIWAN · 《臺灣印象製作所：鏡頭內外的文化歸屬》</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => {
                setRulesModalOpen(true);
                sounds.playSelect();
              }}
              className="text-teal-400 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{state.lang === 'en' ? 'Game Rules Guide' : '導演規則指南'}</span>
            </button>
            <button
              onClick={() => {
                setAssessmentModalOpen(true);
                sounds.playSelect();
              }}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{state.lang === 'en' ? 'Learning Assessment' : '填寫學習評估問卷'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

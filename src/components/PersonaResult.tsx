import React, { useEffect } from 'react';
import { Persona, FoodItem } from '../data/gameData';
import { Download, FileJson, Copy, RotateCcw, Share2, HelpCircle, CheckCircle2, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface PersonaResultProps {
  persona: Persona;
  food: FoodItem;
  mirrorText: string;
  onRestart: () => void;
  onOpenSources: () => void;
  lang: 'zh' | 'en';
}

export const PersonaResult: React.FC<PersonaResultProps> = ({
  persona,
  food,
  mirrorText,
  onRestart,
  onOpenSources,
  lang
}) => {
  useEffect(() => {
    // Trigger celebratory confetti on ending unlock
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2dd4bf', '#fbbf24', '#f43f5e', '#a78bfa']
      });
    } catch {
      // Ignore if canvas is unavailable
    }
  }, []);

  const copyToClipboard = () => {
    sounds.playSelect();
    const text = `${persona.name[lang === 'en' ? 1 : 0]} — ${persona.subtitle[lang === 'en' ? 1 : 0]}\n\n${persona.paragraph[lang === 'en' ? 1 : 0]}\n\n“${persona.question[lang === 'en' ? 1 : 0]}”\n\n[Framing Taiwan · 臺灣印象製作所]`;
    navigator.clipboard.writeText(text);
    alert(lang === 'en' ? 'Ending summary copied to clipboard!' : '結局摘要已複製到剪貼簿！');
  };

  const exportJSON = () => {
    sounds.playSelect();
    const data = {
      game: 'Framing Taiwan Enhanced',
      version: '5.0',
      food: food.id,
      foodName: food.name[lang === 'en' ? 1 : 0],
      persona: persona.id,
      personaName: persona.name[lang === 'en' ? 1 : 0],
      personalQuote: mirrorText || null,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Framing_Taiwan_${persona.id}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadPoster = () => {
    sounds.playShutter();
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
    bgGrad.addColorStop(0, '#09151e');
    bgGrad.addColorStop(0.5, '#0e2330');
    bgGrad.addColorStop(1, '#08121a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Frame border
    ctx.strokeStyle = `${persona.color}60`;
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 980, 1250);

    // Header badge
    ctx.fillStyle = persona.color;
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('FRAMING TAIWAN · YOUR STORY UNLOCKED', 90, 120);

    // Icon & Dish Badge
    ctx.fillStyle = '#ffffff';
    ctx.font = '72px sans-serif';
    ctx.fillText(food.icon, 90, 230);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px sans-serif';
    ctx.fillText(`EPISODE 01: ${food.name[lang === 'en' ? 1 : 0].toUpperCase()}`, 190, 220);

    // Persona Title & Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px sans-serif';
    ctx.fillText(persona.name[lang === 'en' ? 1 : 0], 90, 360);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '32px sans-serif';
    ctx.fillText(persona.subtitle[lang === 'en' ? 1 : 0], 90, 420);

    // Paragraph text wrap
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '28px sans-serif';
    const text = persona.paragraph[lang === 'en' ? 1 : 0];
    const words = [...text];
    let line = '';
    let y = 500;
    for (let char of words) {
      if (ctx.measureText(line + char).width > 860 && line) {
        ctx.fillText(line, 90, y);
        line = char;
        y += 44;
      } else {
        line += char;
      }
    }
    if (line) ctx.fillText(line, 90, y);

    // Personal Quote if any
    if (mirrorText) {
      y += 80;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(90, y - 40, 900, 140);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(90, y - 40, 900, 140);

      ctx.fillStyle = '#fde68a';
      ctx.font = 'italic 28px sans-serif';
      ctx.fillText(`“${mirrorText}”`, 120, y + 35);
    }

    // Question
    y += mirrorText ? 190 : 120;
    ctx.fillStyle = persona.color;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(`“${persona.question[lang === 'en' ? 1 : 0]}”`, 90, y);

    // Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '22px sans-serif';
    ctx.fillText('A Cultural Sociological Narrative Game on Media & Belonging in Taiwan', 90, 1240);

    // Download trigger
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Framing_Taiwan_Poster_${persona.id}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      alert(lang === 'en' ? 'Director Story Card saved as PNG!' : '創作者故事卡已儲存為高畫質圖片！');
    }, 'image/png');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Persona Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-teal-500/30 p-6 md:p-10 shadow-2xl">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: persona.color }}
        ></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: persona.color }}></span>
              <span className="text-slate-300">DIRECTOR PERSONA UNLOCKED</span>
            </div>
            <span className="text-4xl" style={{ color: persona.color }}>{persona.glyph}</span>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              {persona.name[lang === 'en' ? 1 : 0]}
            </h1>
            <p className="text-base md:text-lg font-medium text-amber-300 mt-2">
              {persona.subtitle[lang === 'en' ? 1 : 0]}
            </p>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-2xl">
            {persona.paragraph[lang === 'en' ? 1 : 0]}
          </p>

          {/* Keywords badge list */}
          <div className="flex flex-wrap gap-2 pt-1">
            {persona.keywords[lang === 'en' ? 1 : 0].map((kw, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  borderColor: `${persona.color}40`,
                  backgroundColor: `${persona.color}15`,
                  color: persona.color
                }}
              >
                #{kw}
              </span>
            ))}
          </div>

          {/* Unlocked Reflection Question */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {lang === 'en' ? 'OPEN QUESTION LEFT FOR YOUR AUDIENCE:' : '留給觀眾的未完詰問：'}
            </div>
            <div className="text-sm md:text-base font-bold italic" style={{ color: persona.color }}>
              “{persona.question[lang === 'en' ? 1 : 0]}”
            </div>
          </div>

          {/* User's custom quote if provided */}
          {mirrorText && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-400/20 text-xs text-amber-200">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
                {lang === 'en' ? 'A LINE YOU KEPT ON SCREEN:' : '你在片尾留下的個人話語：'}
              </div>
              <p className="italic text-sm font-medium">"{mirrorText}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Production Journey Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] font-mono text-teal-400 uppercase">CHAPTER 01 · ROUTE</div>
          <div className="font-bold text-sm text-white flex items-center gap-2">
            <span>{food.icon}</span>
            <span>{food.name[lang === 'en' ? 1 : 0]}</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] font-mono text-amber-300 uppercase">CHAPTER 02 · PERSPECTIVE</div>
          <div className="font-bold text-sm text-white">
            {lang === 'en' ? 'The Camera Turns Around' : '鏡頭回望創作者自身'}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] font-mono text-indigo-400 uppercase">INQUIRY POINT</div>
          <div className="font-bold text-xs text-slate-200 line-clamp-1">
            {food.sample[lang === 'en' ? 1 : 0]}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={downloadPoster}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{lang === 'en' ? 'Download 2K Story Card' : '下載創作者故事卡 (PNG)'}</span>
        </button>

        <button
          onClick={exportJSON}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 font-semibold text-xs md:text-sm transition-all"
        >
          <FileJson className="w-4 h-4 text-amber-400" />
          <span>{lang === 'en' ? 'Export Play Route (JSON)' : '匯出遊玩路徑 (JSON)'}</span>
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 font-semibold text-xs md:text-sm transition-all"
        >
          <Copy className="w-4 h-4 text-teal-300" />
          <span>{lang === 'en' ? 'Copy Summary' : '複製結局文字'}</span>
        </button>

        <button
          onClick={() => {
            sounds.playSelect();
            onRestart();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs md:text-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{lang === 'en' ? 'Explore Another Food' : '重選另一道料理'}</span>
        </button>
      </div>

      {/* Sources & Academic Notes Link */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            sounds.playSelect();
            onOpenSources();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-200 underline underline-offset-4 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'View Academic Sources & Archival Notes' : '查閱歷史考據文獻與學術筆記 ↗'}</span>
        </button>
      </div>
    </div>
  );
};

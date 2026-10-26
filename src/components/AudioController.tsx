import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Keyboard } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AudioControllerProps {
  lang: 'zh' | 'en';
}

export const AudioController: React.FC<AudioControllerProps> = ({ lang }) => {
  const [muted, setMuted] = useState(sounds.getMuted());
  const [ambientActive, setAmbientActive] = useState(false);
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  useEffect(() => {
    sounds.setMuted(muted);
  }, [muted]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    sounds.setMuted(next);
    if (!next) {
      sounds.playSelect();
    }
  };

  const toggleAmbient = () => {
    const next = !ambientActive;
    setAmbientActive(next);
    sounds.toggleAmbient(next);
    sounds.playSelect();
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Ambient sound toggle */}
      <button
        onClick={toggleAmbient}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
          ambientActive
            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-500/20'
            : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-slate-200'
        }`}
        title={lang === 'en' ? 'Toggle Night Market Ambient Sound' : '開關夜市氛圍白噪音'}
      >
        <Radio className={`w-3.5 h-3.5 ${ambientActive ? 'animate-pulse text-amber-400' : ''}`} />
        <span className="hidden sm:inline font-medium">
          {ambientActive
            ? (lang === 'en' ? 'Night Ambience: ON' : '夜市氛圍：開')
            : (lang === 'en' ? 'Night Ambience: OFF' : '夜市氛圍：關')}
        </span>
      </button>

      {/* Master Mute Toggle */}
      <button
        onClick={toggleMute}
        className={`p-1.5 rounded-lg border transition-all ${
          muted
            ? 'bg-red-500/10 text-red-400 border-red-500/30'
            : 'bg-white/5 text-teal-300 border-white/10 hover:bg-white/10'
        }`}
        title={muted ? (lang === 'en' ? 'Unmute Sound FX' : '開啟音效') : (lang === 'en' ? 'Mute Sound FX' : '靜音音效')}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Keyboard shortcuts trigger */}
      <div className="relative">
        <button
          onClick={() => setShowKeyHelp(!showKeyHelp)}
          className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
          title={lang === 'en' ? 'Keyboard shortcuts' : '鍵盤快捷鍵'}
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {showKeyHelp && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-teal-500/30 rounded-xl p-3 shadow-2xl z-50 text-slate-300">
            <div className="font-bold text-teal-300 text-xs mb-2 pb-1 border-b border-white/10 flex items-center justify-between">
              <span>{lang === 'en' ? 'Keyboard Shortcuts' : '鍵盤快捷鍵指南'}</span>
              <span className="text-[10px] text-slate-500">ESC to close</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{lang === 'en' ? 'Pick Option 1, 2, 3' : '選擇選項 1, 2, 3'}</span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-amber-300">1 / 2 / 3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{lang === 'en' ? 'Proceed / Next' : '前進 / 確認'}</span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-teal-300">Space</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{lang === 'en' ? 'Mute / Unmute' : '靜音開關'}</span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-slate-300">M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{lang === 'en' ? 'Switch Language' : '切換語言'}</span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-slate-300">L</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

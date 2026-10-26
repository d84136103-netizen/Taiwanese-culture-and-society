import React, { useState } from 'react';
import { PRE_POST_QUESTIONS, QUALITATIVE_PROMPTS } from '../data/studyQuestions';
import { X, CheckCircle2, Award, Download, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'zh' | 'en';
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose, lang }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({});
  const [qualitativeAnswers, setQualitativeAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const toggleOption = (questionId: string, optionIdx: number) => {
    sounds.playSelect();
    setSelectedAnswers(prev => {
      const current = prev[questionId] || [];
      const updated = current.includes(optionIdx)
        ? current.filter(i => i !== optionIdx)
        : [...current, optionIdx];
      return { ...prev, [questionId]: updated };
    });
  };

  const exportAssessmentData = () => {
    sounds.playSelect();
    const data = {
      project: '《臺灣印象製作所：鏡頭內外的文化歸屬》',
      course: '「華人文化與社會」期中報告試玩評估問卷',
      timestamp: new Date().toISOString(),
      objectiveAnswers: selectedAnswers,
      qualitativeFeedback: qualitativeAnswers,
      rubricPassedCount: PRE_POST_QUESTIONS.filter(q => {
        const userPicks = selectedAnswers[q.id] || [];
        return q.bestAnswerIndices.some(idx => userPicks.includes(idx));
      }).length,
      totalQuestions: PRE_POST_QUESTIONS.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Framing_Taiwan_Assessment_Record.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    alert(lang === 'en' ? 'Assessment responses exported!' : '期中研究評估問卷已成功匯出為 JSON！');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-teal-500/30 rounded-2xl p-6 md:p-8 max-h-[92vh] overflow-y-auto text-slate-200 shadow-2xl space-y-6">
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

        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400">
            <Award className="w-3.5 h-3.5" />
            <span>LEARNING ASSESSMENT & RESEARCH MODULE</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {lang === 'en'
              ? 'Cultural Perception & Critical Inquiry Assessment'
              : '「華人文化與社會」學習成效與文化辨識評估'}
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'Based on Section VI of the midterm project proposal. Test your ability to identify culinary adaptation causes, media framing nuances, and multidimensional cultural belonging.'
              : '依據期中專題企劃第六節「如何評估作品」設計：檢視玩家在（1）食物跨境改造原因、（2）影音字幕/剪輯改寫意義、（3）日常生活中的多元文化歸屬感等三項核心能力的掌握程度。'}
          </p>
        </div>

        {/* 3 Competency Scenario Questions */}
        <div className="space-y-6">
          {PRE_POST_QUESTIONS.map((q, qIdx) => {
            const userPicks = selectedAnswers[q.id] || [];
            return (
              <div key={q.id} className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 font-bold">
                    COMPETENCY 0{qIdx + 1} · {q.category.toUpperCase()}
                  </span>
                  <span className="text-slate-500">
                    {lang === 'en' ? 'Select all that apply' : '可複選多個合適觀點'}
                  </span>
                </div>

                <h3 className="font-bold text-sm md:text-base text-white">
                  {q.question[lang === 'en' ? 1 : 0]}
                </h3>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userPicks.includes(oIdx);
                    const isOptimal = q.bestAnswerIndices.includes(oIdx);
                    return (
                      <button
                        key={oIdx}
                        onClick={() => toggleOption(q.id, oIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-teal-500/15 border-teal-400 text-teal-100 font-medium'
                            : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border text-[10px] ${
                          isSelected ? 'bg-teal-400 border-teal-400 text-slate-950 font-bold' : 'border-white/20'
                        }`}>
                          {isSelected && '✓'}
                        </span>
                        <span>{opt[lang === 'en' ? 1 : 0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation toggle */}
                {showResults && (
                  <div className="mt-3 p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200 animate-fadeIn">
                    <span className="font-bold text-teal-300 mr-2">✦ {lang === 'en' ? 'Sociological Perspective:' : '社會學脈絡解析：'}</span>
                    <span>{q.explanation[lang === 'en' ? 1 : 0]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Qualitative Reflection Section */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'en' ? 'Qualitative Self-Reflections' : '質性開放反思問題'}</span>
          </div>

          <div className="space-y-4">
            {QUALITATIVE_PROMPTS.map((prompt) => (
              <div key={prompt.id} className="space-y-2">
                <label className="block text-xs md:text-sm font-semibold text-slate-200">
                  {prompt.prompt[lang === 'en' ? 1 : 0]}
                </label>
                <textarea
                  rows={2}
                  value={qualitativeAnswers[prompt.id] || ''}
                  onChange={(e) => setQualitativeAnswers(prev => ({ ...prev, [prompt.id]: e.target.value }))}
                  placeholder={prompt.placeholder[lang === 'en' ? 1 : 0]}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl p-3 text-xs md:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-400/60 transition-colors resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => setShowResults(!showResults)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold transition-colors"
          >
            {showResults
              ? (lang === 'en' ? 'Hide Analysis' : '隱藏解析')
              : (lang === 'en' ? 'View Sociological Analysis' : '查看社會學解析與評分')}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAssessmentData}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Export Questionnaire (JSON)' : '匯出評估問卷數據 (JSON)'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors"
            >
              {lang === 'en' ? 'Done' : '完成關閉'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatFieldNoteTag, formatFieldNoteDate, formatReadTime } from '../utils/formatters';

export const FieldNoteDetailModal: React.FC = () => {
  const { language, selectedFieldNote, setSelectedFieldNote, setActiveTab, scrollToSection } = useApp();
  const isZh = language === 'zh-TW';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFieldNote(null);
      }
    };
    if (selectedFieldNote) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFieldNote, setSelectedFieldNote]);

  if (!selectedFieldNote) return null;

  return (
    <div
      id="field-note-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141715]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedFieldNote(null);
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="field-note-modal-title"
        id="field-note-modal-content"
        className="relative bg-[#FAF8F5] border border-[#DCD4C4] rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(20,34,24,0.12),0_24px_48px_-12px_rgba(20,34,24,0.18)] focus:outline-none"
      >
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD0] px-6 sm:px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-[#526056] truncate mr-4">
            <button
              type="button"
              className="hover:text-[#16241B] cursor-pointer focus-visible:ring-1 focus-visible:ring-[#A84528] rounded-xs"
              onClick={() => setSelectedFieldNote(null)}
            >
              {language === 'en' ? 'Field Notes' : '現場筆記'}
            </button>
            <span>/</span>
            <span className="text-[#A84528] font-medium">{formatFieldNoteTag(selectedFieldNote.tag, isZh)}</span>
          </div>

          <button
            id="close-field-note-modal-btn"
            onClick={() => setSelectedFieldNote(null)}
            className="w-10 h-10 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-sm text-[#526056] hover:text-[#16241B] hover:bg-[#EFEAE0] transition-[color,background-color,transform] duration-150 active:scale-[0.96] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A84528]"
            aria-label="Close field note"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-10">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7C8880] font-mono border-b border-[#E8E2D6] pb-4">
            <span className="px-2 py-0.5 rounded-sm bg-[#EFEAE0] text-[#16241B] text-[10px] uppercase tracking-wider">
              {formatFieldNoteTag(selectedFieldNote.tag, isZh)}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#A8B0A8]" />
              <span>{formatFieldNoteDate(selectedFieldNote.date, isZh)}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A8B0A8]" />
              <span>{formatReadTime(selectedFieldNote.readTime, isZh)}</span>
            </div>
          </div>

          {/* Frontline Voice Speaker Profile */}
          {selectedFieldNote.voice && (
            <div className="p-5 sm:p-6 rounded-sm bg-[#F4EFE6] border border-[#DDD5C5] space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center font-serif text-lg font-medium shadow-xs border border-[#D5CCBC]"
                    style={{
                      backgroundColor: selectedFieldNote.voice.avatarBg,
                      color: selectedFieldNote.voice.avatarColor,
                    }}
                  >
                    {selectedFieldNote.voice.avatarInitial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-medium text-base text-[#16241B]">
                        {language === 'en' ? selectedFieldNote.voice.name.en : selectedFieldNote.voice.name.zh}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-[#EFEAE0] text-[#657368] border border-[#DDD5C5]">
                        {language === 'en' ? 'Verified Voice' : '現場認證'}
                      </span>
                    </div>
                    <p className="text-xs text-[#556358] font-mono mt-0.5">
                      {language === 'en' ? selectedFieldNote.voice.role.en : selectedFieldNote.voice.role.zh}
                    </p>
                    <p className="text-[11px] text-[#7C8880] font-mono">
                      {language === 'en' ? selectedFieldNote.voice.setting.en : selectedFieldNote.voice.setting.zh}
                      {selectedFieldNote.voice.experience && (
                        <span> · {language === 'en' ? selectedFieldNote.voice.experience.en : selectedFieldNote.voice.experience.zh}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quote */}
              <div className="pt-3 border-t border-[#E8E0D2] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86646] block">
                  {language === 'en' ? 'Frontline Statement:' : '現場真實心聲：'}
                </span>
                <p className="text-sm sm:text-base text-[#243329] font-serif italic leading-relaxed">
                  "{language === 'en' ? selectedFieldNote.voice.quote.en : selectedFieldNote.voice.quote.zh}"
                </p>
              </div>

              {/* Expressed Primary Anxiety */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#5A685E]">
                <span className="text-[#8C9890]">{language === 'en' ? 'Main Friction/Anxiety:' : '主要焦慮來源：'}</span>
                <span className="text-[#C86646] font-medium">
                  {language === 'en' ? selectedFieldNote.voice.primaryAnxiety.en : selectedFieldNote.voice.primaryAnxiety.zh}
                </span>
              </div>
            </div>
          )}

          {/* Headline & Subtitle */}
          <div className="space-y-3">
            <h1 id="field-note-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#16241B] leading-tight">
              {language === 'en' ? selectedFieldNote.title.en : selectedFieldNote.title.zh}
            </h1>
            <p className="text-sm sm:text-base text-[#5A685E] leading-relaxed">
              {language === 'en' ? selectedFieldNote.subtitle.en : selectedFieldNote.subtitle.zh}
            </p>
          </div>

          {/* Takeaway Stamp */}
          <div className="bg-[#F3EFE6] border-l-2 border-[#1A261F] p-5 rounded-r-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C8880] block">
              {language === 'en' ? 'Core Field Takeaway' : '核心結論'}
            </span>
            <p className="text-base sm:text-lg font-serif italic text-[#16241B] leading-relaxed">
              “{language === 'en' ? selectedFieldNote.takeaway.en : selectedFieldNote.takeaway.zh}”
            </p>
          </div>

          {/* 01. The Scene */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C9890] block">
              {language === 'en' ? '01. The Frontline Scene' : '01. 現場還原'}
            </span>
            <div className="bg-[#F8F6F1] border border-[#E2DCD0] p-5 rounded-sm text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
              {language === 'en' ? selectedFieldNote.scene.en : selectedFieldNote.scene.zh}
            </div>
          </div>

          {/* 02. The Friction */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86646] block">
              {language === 'en' ? '02. The Operational Friction' : '02. 真實摩擦點'}
            </span>
            <p className="text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
              {language === 'en' ? selectedFieldNote.friction.en : selectedFieldNote.friction.zh}
            </p>
          </div>

          {/* 03. Why This Matters */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C9890] block">
              {language === 'en' ? '03. Why This Matters' : '03. 為什麼重要'}
            </span>
            <p className="text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
              {language === 'en' ? selectedFieldNote.whyMatters.en : selectedFieldNote.whyMatters.zh}
            </p>
          </div>

          {/* 04. Our Conviction */}
          <div className="bg-[#1A261F] text-[#F8F6F1] p-6 sm:p-8 rounded-sm space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0B6A8] block">
              {language === 'en' ? '04. Operator Conviction' : '04. 我們的判斷'}
            </span>
            <p className="text-base sm:text-lg font-serif font-light leading-relaxed text-[#F8F6F1]">
              {language === 'en' ? selectedFieldNote.ourConviction.en : selectedFieldNote.ourConviction.zh}
            </p>
          </div>

          {/* 05. What We Would Build */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C9890] block">
              {language === 'en' ? '05. Desired Solution Profile' : '05. 我們期待怎樣的方案'}
            </span>
            <div className="p-5 rounded-sm bg-[#F3EFE6] border border-[#DDD5C5] text-xs sm:text-sm text-[#3A473F] leading-relaxed">
              {language === 'en' ? selectedFieldNote.whatWeWouldBuild.en : selectedFieldNote.whatWeWouldBuild.zh}
            </div>
          </div>

          {/* 06. Questions We Are Still Asking */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C9890] block">
              {language === 'en' ? '06. Open Field Questions' : '06. 我們仍在追問的問題'}
            </span>
            <div className="space-y-2">
              {(language === 'en'
                ? selectedFieldNote.questionsStillAsking.en
                : selectedFieldNote.questionsStillAsking.zh
              ).map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-sm bg-[#FAF8F5] border border-[#DCD4C4] text-xs text-[#4E5B52] flex items-start gap-2.5">
                  <span className="font-mono text-[#C86646] shrink-0">0{idx + 1}.</span>
                  <span className="italic">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dialogue Box */}
          <div className="bg-[#EFEAE0] rounded-sm p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 border border-[#DDD5C5]">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-serif font-medium text-[#16241B]">
                {language === 'en'
                  ? 'Have you observed this friction too?'
                  : '你也見過這個問題嗎？'}
              </h4>
              <p className="text-xs text-[#5A685E]">
                {language === 'en'
                  ? 'Share your frontline observations with our operating team.'
                  : '歡迎與我們的運營團隊分享你的第一手現場觀察。'}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedFieldNote(null);
                scrollToSection('contact');
              }}
              className="px-5 py-2.5 rounded-sm bg-[#1A261F] text-[#F8F6F1] text-xs font-mono uppercase tracking-wider hover:bg-[#283C30] transition-[background-color,transform] duration-150 active:scale-[0.96] shrink-0 cursor-pointer"
            >
              {language === 'en' ? 'Share Observation' : '分享現場觀察'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

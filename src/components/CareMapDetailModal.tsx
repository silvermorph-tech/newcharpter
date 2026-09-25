import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowRight } from 'lucide-react';
import { fieldNotesData } from '../data/fieldNotesData';
import { formatFieldNoteTag } from '../utils/formatters';

export const CareMapDetailModal: React.FC = () => {
  const { language, selectedCareMap, setSelectedCareMap, openFieldNoteBySlug, setActiveTab, scrollToSection } = useApp();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCareMap(null);
      }
    };
    if (selectedCareMap) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCareMap, setSelectedCareMap]);

  if (!selectedCareMap) return null;

  const relatedNotes = fieldNotesData.filter((note) =>
    selectedCareMap.relatedFieldNoteIds.includes(note.id)
  );

  return (
    <div
      id="care-map-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141715]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedCareMap(null);
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="care-map-modal-title"
        id="care-map-modal-content"
        className="relative bg-[#FAF8F5] border border-[#DCD4C4] rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_-4px_rgba(20,34,24,0.12),0_24px_48px_-12px_rgba(20,34,24,0.18)] focus:outline-none"
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD0] px-6 sm:px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-[#526056]">
            <button
              type="button"
              className="hover:text-[#16241B] cursor-pointer focus-visible:ring-1 focus-visible:ring-[#A84528] rounded-xs"
              onClick={() => setSelectedCareMap(null)}
            >
              {language === 'en' ? 'Care Maps' : '照護場景地圖'}
            </button>
            <span>/</span>
            <span className="text-[#16241B] font-medium">
              {language === 'en' ? selectedCareMap.title.en : selectedCareMap.title.zh}
            </span>
          </div>

          <button
            id="close-care-map-modal-btn"
            onClick={() => setSelectedCareMap(null)}
            className="p-1.5 rounded-sm text-[#526056] hover:text-[#16241B] hover:bg-[#EFEAE0] transition-[color,background-color,transform] duration-150 active:scale-[0.96] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A84528]"
            aria-label="Close care map"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-9">
          {/* Header */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#526056] block font-semibold">
              {language === 'en' ? 'Setting Architecture' : '場景營運藍圖'}
            </span>
            <h1 id="care-map-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#16241B]">
              {language === 'en' ? selectedCareMap.title.en : selectedCareMap.title.zh}
            </h1>
            <p className="text-sm sm:text-base text-[#5A685E] leading-relaxed">
              {language === 'en' ? selectedCareMap.subtitle.en : selectedCareMap.subtitle.zh}
            </p>

            {/* Pain point chips */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {(language === 'en' ? selectedCareMap.painPoints.en : selectedCareMap.painPoints.zh).map((pt, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-sm bg-[#F5ECE8] text-[#8B422D] border border-[#ECD3CA] text-[10px] font-mono"
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>

          {/* Breakthrough Opportunity Callout */}
          <div className="p-5 sm:p-6 rounded-sm bg-[#F3EFE6] border-l-2 border-[#C86646] space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86646] block">
              {language === 'en' ? 'Breakthrough Opportunity' : '突破性機會'}
            </span>
            <p className="text-base sm:text-lg font-serif italic text-[#16241B] leading-relaxed">
              “{language === 'en' ? selectedCareMap.opportunity.en : selectedCareMap.opportunity.zh}”
            </p>
          </div>

          {/* Operational Breakdown: What Fails vs What Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* What Fails */}
            <div className="p-5 rounded-sm bg-[#FAF8F5] border border-[#ECD3CA] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B84E34] block">
                {language === 'en' ? 'What Fails Here' : '此場景常犯錯誤'}
              </span>
              <p className="text-xs text-[#556358] leading-relaxed">
                {language === 'en'
                  ? selectedCareMap.detailedBreakdown.whatFails.en
                  : selectedCareMap.detailedBreakdown.whatFails.zh}
              </p>
            </div>

            {/* What Works */}
            <div className="p-5 rounded-sm bg-[#FAF8F5] border border-[#CDE0D5] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B4D30] block">
                {language === 'en' ? 'What Actually Works' : '真正行之有效的方案'}
              </span>
              <p className="text-xs text-[#556358] leading-relaxed">
                {language === 'en'
                  ? selectedCareMap.detailedBreakdown.whatWorks.en
                  : selectedCareMap.detailedBreakdown.whatWorks.zh}
              </p>
            </div>
          </div>

          {/* Operator Reality */}
          <div className="p-6 rounded-sm bg-[#F3EFE6] border border-[#DDD5C5] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C8880] block">
              {language === 'en' ? 'The Frontline Reality' : '一線真實營運現狀'}
            </span>
            <p className="text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
              {language === 'en'
                ? selectedCareMap.detailedBreakdown.operatorReality.en
                : selectedCareMap.detailedBreakdown.operatorReality.zh}
            </p>
          </div>

          {/* Key Adoption Metrics */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C8880] block">
              {language === 'en' ? 'Core Adoption & Health Metrics' : '核心採用與成效衡量指標'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(language === 'en'
                ? selectedCareMap.detailedBreakdown.keyMetrics.en
                : selectedCareMap.detailedBreakdown.keyMetrics.zh
              ).map((metric, i) => (
                <div key={i} className="p-3 rounded-sm bg-[#FAF8F5] border border-[#DCD4C4] text-xs font-serif text-[#16241B]">
                  {metric}
                </div>
              ))}
            </div>
          </div>

          {/* Hard Questions for Builders */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86646] block">
              {language === 'en' ? 'Questions for Builders in this Space' : '給該賽道創業者的關鍵自省'}
            </span>
            <div className="space-y-2">
              {(language === 'en'
                ? selectedCareMap.detailedBreakdown.questionsForBuilders.en
                : selectedCareMap.detailedBreakdown.questionsForBuilders.zh
              ).map((q, i) => (
                <div key={i} className="p-3.5 rounded-sm bg-[#FAF8F5] border border-[#DCD4C4] text-xs text-[#4E5B52] italic font-serif">
                  “{q}”
                </div>
              ))}
            </div>
          </div>

          {/* Related Field Notes */}
          {relatedNotes.length > 0 && (
            <div className="pt-6 border-t border-[#E2DCD0] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C8880] block">
                {language === 'en' ? 'Related Field Observations' : '相關現場筆記'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      setSelectedCareMap(null);
                      openFieldNoteBySlug(note.slug);
                    }}
                    className="text-left p-4 rounded-sm bg-[#F3EFE6] hover:bg-[#EAE4D6] border border-[#DDD5C5] transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] group flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#C86646] block">
                        {formatFieldNoteTag(note.tag, language === 'zh-TW')}
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif text-[#16241B] line-clamp-1 mt-0.5">
                        {language === 'en' ? note.title.en : note.title.zh}
                      </h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C9890] group-hover:translate-x-0.5 group-hover:text-[#16241B] transition-transform duration-150 shrink-0 ml-2" strokeWidth={1.75} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="bg-[#1A261F] text-[#F8F6F1] rounded-sm p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-xs text-[#C2CDC6] text-center sm:text-left max-w-md">
              {language === 'en'
                ? 'Building in this specific setting? Let’s test your product against real frontline operating constraints.'
                : '正在這個特定場景中研發？歡迎與我們一起在真實運營環境中驗證產品。'}
            </p>
            <button
              onClick={() => {
                setSelectedCareMap(null);
                scrollToSection('contact');
              }}
              className="px-6 py-2.5 rounded-sm bg-[#F8F6F1] text-[#1A261F] text-xs font-mono uppercase tracking-wider hover:bg-[#EFEAE0] transition-[background-color,transform] duration-150 active:scale-[0.96] shrink-0 cursor-pointer"
            >
              {language === 'en' ? 'Submit Project' : '提交項目'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


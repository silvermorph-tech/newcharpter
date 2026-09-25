import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useApp } from '../context/AppContext';
import { 
  insightsArticlesData, 
  careEconomicsArticles, 
  column2Articles, 
  columnsData,
  InsightArticle,
  ColumnId
} from '../data/insightsArticlesData';
import { insightsEnglishTranslations } from '../data/insightsEnglishTranslations';
import { 
  ArrowLeft, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Share2,
  Check,
  TrendingUp,
  FileText,
  Building2,
  Users,
  Compass
} from 'lucide-react';

export const InsightsSection: React.FC = () => {
  const { language, selectedInsightId, setSelectedInsightId } = useApp();
  const isZh = language === 'zh-TW';
  const [copied, setCopied] = useState(false);
  const [selectedColumnFilter, setSelectedColumnFilter] = useState<'all' | ColumnId>('all');

  // Translation accessor helpers
  const getArticleTitle = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.titleEn) {
      return insightsEnglishTranslations[a.id].titleEn;
    }
    return a.title;
  };

  const getArticleSummary = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.summaryEn) {
      return insightsEnglishTranslations[a.id].summaryEn;
    }
    return a.summary;
  };

  const getArticleSeriesType = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.seriesTypeEn) {
      return insightsEnglishTranslations[a.id].seriesTypeEn;
    }
    return a.seriesType;
  };

  const getArticleReadTime = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.readTimeEn) {
      return insightsEnglishTranslations[a.id].readTimeEn;
    }
    return a.readTime;
  };

  const getArticlePositioning = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.seriesPositioningEn) {
      return insightsEnglishTranslations[a.id].seriesPositioningEn;
    }
    return a.seriesPositioning;
  };

  const getArticleContent = (a?: InsightArticle | null) => {
    if (!a) return '';
    if (!isZh && insightsEnglishTranslations[a.id]?.contentEn) {
      return insightsEnglishTranslations[a.id].contentEn;
    }
    return a.content;
  };

  // Find currently active article if selected
  const activeArticle: InsightArticle | undefined = insightsArticlesData.find(
    (a) => a.id === selectedInsightId
  );

  // If inside an article, get its column-specific list for prev / next
  const currentColumnArticles = activeArticle
    ? insightsArticlesData.filter((a) => a.columnId === activeArticle.columnId)
    : [];

  const activeIndexInColumn = activeArticle
    ? currentColumnArticles.findIndex((a) => a.id === activeArticle.id)
    : -1;

  const prevArticle = activeIndexInColumn > 0 ? currentColumnArticles[activeIndexInColumn - 1] : null;
  const nextArticle =
    activeIndexInColumn >= 0 && activeIndexInColumn < currentColumnArticles.length - 1
      ? currentColumnArticles[activeIndexInColumn + 1]
      : null;

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedInsightId]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ----------------------------------------------------
  // VIEW 1: Reader View (Reading a full article)
  // ----------------------------------------------------
  if (activeArticle) {
    const parentColumn = columnsData.find((c) => c.id === activeArticle.columnId);

    return (
      <div className="min-h-screen bg-[#FBF9F5] text-[#111813] py-8 sm:py-14">
        {/* Top Macro Ticker Line */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="border-t-2 border-b border-[#142218] py-2 flex items-center justify-between text-[11px] font-mono text-[#58665E] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#142218]">SILVERMORPH DISPATCH</span>
              <span>/</span>
              <span>{parentColumn?.englishName || 'INSIGHTS'}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>SERIES ORDER: {activeIndexInColumn + 1} OF {currentColumnArticles.length}</span>
              <span>·</span>
              <span>EST. {getArticleReadTime(activeArticle)}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Reader Top Action Bar & Column Navigator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D2C4] mb-8">
            <button
              onClick={() => setSelectedInsightId(null)}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#142218] hover:text-[#C86646] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold uppercase">
                {isZh 
                  ? `← 返回「${parentColumn?.name || '專欄'}」總覽` 
                  : `← Back to ${parentColumn?.englishName || 'Column'} Overview`}
              </span>
            </button>

            {/* In-column quick jump indicators */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[10px] font-mono text-[#7C8880] uppercase mr-1 hidden md:inline">
                {isZh ? '本專欄篇目：' : 'In Series:'}
              </span>
              {currentColumnArticles.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => setSelectedInsightId(art.id)}
                  title={getArticleTitle(art)}
                  className={`px-2 py-1 text-[11px] font-mono rounded-xs transition-colors cursor-pointer border ${
                    art.id === activeArticle.id
                      ? 'bg-[#142218] text-[#FAF8F5] border-[#142218] font-bold'
                      : 'bg-[#FAF8F5] text-[#4A5950] border-[#D8D2C4] hover:border-[#142218] hover:text-[#142218]'
                  }`}
                >
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </button>
              ))}

              <div className="h-4 w-px bg-[#D8D2C4] mx-1" />

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5A6860] hover:text-[#142218] px-2 py-1 rounded-xs border border-[#D8D2C4] bg-[#FAF8F5] cursor-pointer shrink-0"
                title={isZh ? '複製本篇鏈接' : 'Copy essay link'}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Share2 className="w-3 h-3" />}
                <span>{copied ? (isZh ? '已複製' : 'Copied') : (isZh ? '分享' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Article Editorial Header */}
          <header className="mb-10 sm:mb-14 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#C86646] font-semibold tracking-wider uppercase">
                [{getArticleSeriesType(activeArticle)}]
              </span>
              <span className="text-[#8C9890]">·</span>
              <span className="inline-flex items-center gap-1 text-[#627066]">
                <Clock className="w-3.5 h-3.5" />
                {getArticleReadTime(activeArticle)}
              </span>
              <span className="text-[#8C9890]">·</span>
              <span className="text-[#5A6860]">
                {isZh ? parentColumn?.name : parentColumn?.englishName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-normal text-[#111813] leading-[1.25] tracking-tight">
              {getArticleTitle(activeArticle)}
            </h1>

            {/* Bloomberg-Style Editorial Deck / Summary */}
            <div className="p-5 sm:p-6 bg-[#F3EFE6] border-l-4 border-[#142218] space-y-2">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#142218]">
                {isZh ? '核心論點概要 · EXECUTIVE THESIS' : 'EXECUTIVE THESIS'}
              </div>
              <p className="text-base sm:text-lg font-serif text-[#1F2E24] leading-relaxed font-normal">
                {getArticleSummary(activeArticle)}
              </p>
            </div>

            {/* Series Positioning Note */}
            <div className="text-xs font-mono text-[#6C7A70] pt-1 flex items-start gap-2 border-b border-[#E5DFD3] pb-4">
              <span className="font-bold text-[#142218] shrink-0 uppercase tracking-wider">
                {isZh ? '專欄定位：' : 'SERIES POSITION:'}
              </span>
              <span className="leading-relaxed">{getArticlePositioning(activeArticle)}</span>
            </div>
          </header>

          {/* Article Body - Bloomberg Opinion Style Markdown */}
          <article className="prose-neutral max-w-none text-[17px] sm:text-[18px] leading-[1.95] text-[#1E2B22] font-sans font-light">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#111813] mt-14 mb-6 pb-3 border-b-2 border-[#142218] tracking-tight">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#142218] mt-12 mb-4 tracking-tight">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="text-lg sm:text-xl font-serif font-semibold text-[#142218] mt-8 mb-3">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="my-6 text-[#1E2B22] leading-[1.95] font-normal">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#0E1712]">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside pl-6 my-6 space-y-2.5 text-[#243328]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside pl-6 my-6 space-y-2.5 text-[#243328]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-[1.85] pl-1">{children}</li>
                ),
                hr: () => (
                  <div className="my-12 flex items-center justify-center gap-3 text-[#A0AAA2]">
                    <div className="h-px bg-[#D8D2C4] flex-1" />
                    <span className="font-mono text-xs tracking-widest text-[#8C9890]">§ § §</span>
                    <div className="h-px bg-[#D8D2C4] flex-1" />
                  </div>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 border-2 border-[#142218] bg-[#FAF8F5]">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#142218] text-[#FAF8F5] font-mono uppercase tracking-wider text-xs">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="p-3.5 sm:p-4 font-semibold border-r border-[#2C3E32] last:border-r-0">
                    {children}
                  </th>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-[#E2DCD0] font-sans">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-[#F3EFE6] transition-colors">
                    {children}
                  </tr>
                ),
                td: ({ children }) => (
                  <td className="p-3.5 sm:p-4 border-r border-[#E2DCD0] last:border-r-0 text-[#2B3A30] align-top">
                    {children}
                  </td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#C86646] pl-6 my-8 italic font-serif text-[#16241B] text-lg sm:text-xl leading-relaxed bg-[#F8F5EC] py-3 pr-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="font-mono text-xs bg-[#EFEAE0] px-1.5 py-0.5 rounded-xs text-[#8C3A22] border border-[#DDD5C5]">
                    {children}
                  </code>
                )
              }}
            >
              {getArticleContent(activeArticle)}
            </ReactMarkdown>
          </article>

          {/* Article Footer & Operator Angel Badge */}
          <footer className="mt-16 pt-10 border-t-2 border-[#142218] space-y-10">
            <div className="p-6 bg-[#142218] text-[#FAF8F5] rounded-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86646] font-bold">
                  {isZh ? 'SILVERMORPH 運營商天使投資網絡' : 'SILVERMORPH OPERATOR ANGEL NETWORK'}
                </span>
              </div>
              <p className="text-sm font-serif text-[#E0DDD5] leading-relaxed">
                {isZh
                  ? '我們相信照護科技必須融入一線動線。如果你正在研發適配香港照護現場的產品，需要真實的床位、動線與臨床對照試點，歡迎帶著一頁紙備忘錄與我們交流。'
                  : 'We believe care technology must integrate into frontline clinical workflows. If you are building solutions for Hong Kong with pilot readiness, reach out with a one-page memo.'}
              </p>
              <div className="text-xs font-mono text-[#C86646] pt-1">
                kelly.yung@sillvermorph.com
              </div>
            </div>

            {/* Bottom In-Column Pagination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => setSelectedInsightId(prevArticle.id)}
                  className="p-5 border border-[#D8D2C4] bg-[#FAF8F5] hover:border-[#142218] hover:bg-[#F3EFE6] text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6A786F] group-hover:text-[#142218]">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{isZh ? '上一篇專題' : 'Previous Essay'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-serif font-medium text-[#142218] line-clamp-2 leading-snug">
                    {getArticleTitle(prevArticle)}
                  </div>
                </button>
              ) : (
                <div className="p-5 border border-dashed border-[#DDD5C5] text-[#8C9890] text-xs font-mono flex items-center justify-center">
                  {isZh ? '已是本專欄首篇' : 'First Essay in Column'}
                </div>
              )}

              {nextArticle ? (
                <button
                  onClick={() => setSelectedInsightId(nextArticle.id)}
                  className="p-5 border border-[#D8D2C4] bg-[#FAF8F5] hover:border-[#142218] hover:bg-[#F3EFE6] text-right transition-all cursor-pointer flex flex-col justify-between items-end space-y-2 group"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6A786F] group-hover:text-[#142218]">
                    <span>{isZh ? '下一篇專題' : 'Next Essay'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-sm sm:text-base font-serif font-medium text-[#142218] line-clamp-2 leading-snug">
                    {getArticleTitle(nextArticle)}
                  </div>
                </button>
              ) : (
                <div className="p-5 border border-dashed border-[#DDD5C5] text-[#8C9890] text-xs font-mono flex items-center justify-center">
                  {isZh ? '本專欄已全篇完結' : 'End of Column Series'}
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setSelectedInsightId(null)}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#142218] hover:text-[#C86646] font-bold transition-colors cursor-pointer border-b border-[#142218] pb-1"
              >
                <span>{isZh ? '返回全部專欄目錄' : 'Return to All Columns Index'}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: Bloomberg Editorial Column Overview
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111813] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* BLOOMBERG-STYLE INTELLIGENCE HEADER */}
        <header className="border-t-2 border-[#142218] pt-6 space-y-6">
          {/* Masthead Title & Editorial Stance */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D2C4]">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#111813] font-normal tracking-tight leading-[1.1]">
                {isZh ? '文章 · 專欄文集' : 'Articles · Research & Opinion Columns'}
              </h1>
            </div>

            {/* Quick Status Box */}
            <div className="bg-[#FAF8F5] border border-[#D8D2C4] p-4 rounded-xs shrink-0 text-xs font-mono space-y-1.5 min-w-[240px]">
              <div className="text-[10px] uppercase tracking-wider text-[#8C9890] font-bold">
                {isZh ? '專欄目錄架構' : 'COLUMNS ARCHITECTURE'}
              </div>
              <div className="flex items-center justify-between text-[#142218]">
                <span>{isZh ? '專欄一 · 照護經濟學' : 'Col 1 · Care Economics'}</span>
                <span className="font-bold text-[#C86646]">{isZh ? '6 篇完結' : '6 Essays Completed'}</span>
              </div>
              <div className="flex items-center justify-between text-[#142218]">
                <span>{isZh ? '專欄二 · 投資方向篇' : 'Col 2 · Investment Directions'}</span>
                <span className="font-bold text-[#C86646]">{isZh ? '6 篇完結' : '6 Essays Completed'}</span>
              </div>
            </div>
          </div>

          {/* Clean Segmented Column Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setSelectedColumnFilter('all')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                selectedColumnFilter === 'all'
                  ? 'bg-[#142218] text-[#FAF8F5] border-[#142218] font-bold shadow-xs'
                  : 'bg-[#FAF8F5] text-[#4A5950] border-[#D8D2C4] hover:bg-[#F3EFE6] hover:text-[#142218]'
              }`}
            >
              {isZh ? '全部專欄 · ALL (12)' : 'All Columns (12)'}
            </button>

            <button
              onClick={() => setSelectedColumnFilter('care-economics')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                selectedColumnFilter === 'care-economics'
                  ? 'bg-[#142218] text-[#FAF8F5] border-[#142218] font-bold shadow-xs'
                  : 'bg-[#FAF8F5] text-[#4A5950] border-[#D8D2C4] hover:bg-[#F3EFE6] hover:text-[#142218]'
              }`}
            >
              {isZh ? '專欄 01 · 照護經濟學 (6)' : 'Col 01 · Care Economics (6)'}
            </button>

            <button
              onClick={() => setSelectedColumnFilter('investment-directions')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                selectedColumnFilter === 'investment-directions'
                  ? 'bg-[#142218] text-[#FAF8F5] border-[#142218] font-bold shadow-xs'
                  : 'bg-[#FAF8F5] text-[#4A5950] border-[#D8D2C4] hover:bg-[#F3EFE6] hover:text-[#142218]'
              }`}
            >
              {isZh ? '專欄 02 · 投資方向篇 (6)' : 'Col 02 · Investment Directions (6)'}
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* COLUMN 1 SECTION: 照護經濟學 (CARE ECONOMICS) */}
        {/* ============================================================ */}
        {(selectedColumnFilter === 'all' || selectedColumnFilter === 'care-economics') && (
          <section className="space-y-8">
            {/* Column 1 Editorial Masthead Banner */}
            <div className="border-t-2 border-[#142218] pt-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#111813] font-normal tracking-tight">
                {isZh ? '專欄一：照護經濟學' : 'Column 01: Care Economics'}
              </h2>
              <span className="text-xs font-mono text-[#58665E]">
                {isZh ? '全 6 篇完結 · 宏觀賬本與產業鏈解構' : 'Complete 6 Essays · Macro Balance Sheets & Value Chain'}
              </span>
            </div>

            {/* Bloomberg-Style Editorial Grid: 1 Hero Lead + 5 Supporting Grid Cards */}
            <div className="space-y-6">
              {/* HERO LEAD ARTICLE (Article 1) */}
              {careEconomicsArticles.length > 0 && (
                <div className="border border-[#142218] bg-[#FAF8F5] p-6 sm:p-8 lg:p-10 transition-all hover:bg-[#F5F1E8] group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="bg-[#142218] text-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          LEAD OP-ED
                        </span>
                        <span className="text-[#C86646] font-semibold uppercase tracking-wider">
                          [{getArticleSeriesType(careEconomicsArticles[0])}]
                        </span>
                        <span className="text-[#8C9890]">·</span>
                        <span className="text-[#58665E]">{getArticleReadTime(careEconomicsArticles[0])}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#111813] group-hover:text-[#C86646] transition-colors leading-[1.25] font-normal">
                        <button
                          onClick={() => setSelectedInsightId(careEconomicsArticles[0].id)}
                          className="text-left cursor-pointer hover:underline decoration-1 underline-offset-4"
                        >
                          {getArticleTitle(careEconomicsArticles[0])}
                        </button>
                      </h3>

                      <p className="text-base sm:text-lg font-serif text-[#324237] leading-relaxed font-light">
                        {getArticleSummary(careEconomicsArticles[0])}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedInsightId(careEconomicsArticles[0].id)}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#142218] group-hover:text-[#C86646] font-bold cursor-pointer"
                        >
                          <span>{isZh ? '閱讀首篇頭條長文' : 'Read Lead Editorial'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Right Rail Key Data / Editorial Pullout */}
                    <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#D8D2C4] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C9890] font-bold">
                        {isZh ? '核心算術公式' : 'MACRO ARITHMETIC'}
                      </div>
                      <div className="text-sm font-serif italic text-[#202F25] leading-relaxed bg-[#ECE7DC] p-4 border-l-2 border-[#142218]">
                        {isZh
                          ? '「65 歲以上佔人口兩成，卻佔去一半住院日次；一次本可被防跌攔截的骨折，平均製造一張 20 萬醫療賬單。」'
                          : '“Aged 65+ represents 24% of Hong Kong’s population yet consumes over half of all hospital bed days; a single preventable fracture generates a HK$200,000 acute healthcare bill.”'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID OF REMAINING ARTICLES (Articles 2 to 6) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careEconomicsArticles.slice(1).map((article, idx) => (
                  <article
                    key={article.id}
                    className="border border-[#D8D2C4] bg-[#FAF8F5] p-6 flex flex-col justify-between space-y-4 hover:border-[#142218] hover:bg-[#F6F2E9] transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#C86646] font-semibold tracking-wider">
                          [{getArticleSeriesType(article)}]
                        </span>
                        <span className="text-[#8C9890]">
                          0{idx + 2} / 06
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-serif text-[#111813] group-hover:text-[#C86646] transition-colors leading-snug font-normal">
                        <button
                          onClick={() => setSelectedInsightId(article.id)}
                          className="text-left cursor-pointer hover:underline decoration-1 underline-offset-4"
                        >
                          {getArticleTitle(article)}
                        </button>
                      </h4>

                      <p className="text-xs sm:text-sm font-serif text-[#415247] leading-relaxed line-clamp-3 font-light">
                        {getArticleSummary(article)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DFD3] flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() => setSelectedInsightId(article.id)}
                        className="inline-flex items-center gap-1.5 text-[#142218] group-hover:text-[#C86646] font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        <span>{isZh ? '閱讀全文' : 'Read Essay'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[#7C8880] inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getArticleReadTime(article)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* COLUMN 2 SECTION: 投資方向篇（我們會投什麼、不投什麼） */}
        {/* ============================================================ */}
        {(selectedColumnFilter === 'all' || selectedColumnFilter === 'investment-directions') && (
          <section className="space-y-8 pt-4">
            {/* Column 2 Editorial Masthead Banner */}
            <div className="border-t-2 border-[#142218] pt-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#111813] font-normal tracking-tight">
                {isZh ? '專欄二：投資方向篇' : 'Column 02: Investment Directions'}
              </h2>
              <span className="text-xs font-mono text-[#58665E]">
                {isZh ? '全 6 篇完整收錄 · 6 大賽道投資硬標準' : 'Complete 6 Directions · Operator Mandates & Standards'}
              </span>
            </div>

            {/* Bloomberg-Style Editorial Grid: 1 Hero Lead + 5 Supporting Grid Cards */}
            <div className="space-y-6">
              {/* HERO LEAD ARTICLE (Direction 1: Telehealth) */}
              {column2Articles.length > 0 && (
                <div className="border border-[#142218] bg-[#FAF8F5] p-6 sm:p-8 lg:p-10 transition-all hover:bg-[#F5F1E8] group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="bg-[#C86646] text-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          DIRECTION LEAD
                        </span>
                        <span className="text-[#C86646] font-semibold uppercase tracking-wider">
                          [{getArticleSeriesType(column2Articles[0])}]
                        </span>
                        <span className="text-[#8C9890]">·</span>
                        <span className="text-[#58665E]">{getArticleReadTime(column2Articles[0])}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#111813] group-hover:text-[#C86646] transition-colors leading-[1.25] font-normal">
                        <button
                          onClick={() => setSelectedInsightId(column2Articles[0].id)}
                          className="text-left cursor-pointer hover:underline decoration-1 underline-offset-4"
                        >
                          {getArticleTitle(column2Articles[0])}
                        </button>
                      </h3>

                      <p className="text-base sm:text-lg font-serif text-[#324237] leading-relaxed font-light">
                        {getArticleSummary(column2Articles[0])}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedInsightId(column2Articles[0].id)}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#142218] group-hover:text-[#C86646] font-bold cursor-pointer"
                        >
                          <span>{isZh ? '閱讀方向篇首發長文' : 'Read Direction Lead Memo'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Right Rail Key Takeaway */}
                    <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#D8D2C4] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#8C9890] font-bold">
                        {isZh ? '運營商天使投資準則' : 'INVESTMENT MANDATE'}
                      </div>
                      <div className="text-sm font-serif italic text-[#202F25] leading-relaxed bg-[#ECE7DC] p-4 border-l-2 border-[#C86646]">
                        {isZh
                          ? '「技術和支付方都已驗證，遙距醫療在養老場景缺的不是 App，是『最後一米』的響應層——誰把監測、響應、轉介打包進照護流程，我們投誰。」'
                          : '“Technology and reimbursement models are already proven. Eldercare telehealth lacks neither apps nor video; it lacks the last-mile triage response. Whoever packages monitoring, triage, and referral into clinical workflows, we back.”'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID OF REMAINING 5 DIRECTIONS (Directions 2, 3, 4, 5, 6) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {column2Articles.slice(1).map((article, idx) => (
                  <article
                    key={article.id}
                    className="border border-[#D8D2C4] bg-[#FAF8F5] p-6 flex flex-col justify-between space-y-4 hover:border-[#142218] hover:bg-[#F6F2E9] transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#C86646] font-semibold tracking-wider">
                          [{getArticleSeriesType(article)}]
                        </span>
                        <span className="text-[#8C9890]">
                          0{idx + 2} / 06
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-serif text-[#111813] group-hover:text-[#C86646] transition-colors leading-snug font-normal">
                        <button
                          onClick={() => setSelectedInsightId(article.id)}
                          className="text-left cursor-pointer hover:underline decoration-1 underline-offset-4"
                        >
                          {getArticleTitle(article)}
                        </button>
                      </h4>

                      <p className="text-xs sm:text-sm font-serif text-[#415247] leading-relaxed line-clamp-3 font-light">
                        {getArticleSummary(article)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DFD3] flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() => setSelectedInsightId(article.id)}
                        className="inline-flex items-center gap-1.5 text-[#142218] group-hover:text-[#C86646] font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        <span>{isZh ? '閱讀投資備忘' : 'Read Memo'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[#7C8880] inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getArticleReadTime(article)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM NEWSLETTER / DIALOGUE CTA */}
        <div className="border-t-2 border-[#142218] pt-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-[#142218] font-bold">
              {isZh ? 'SILVERMORPH 文章專欄 · 讀者交流' : 'SILVERMORPH ARTICLES · READER DIALOGUE'}
            </div>
            <p className="text-sm font-serif text-[#55665A]">
              {isZh 
                ? '對上述數據、算術或投資邏輯有不同看法？或有適合我們 12 間院舍的試點產品？'
                : 'Have questions, counter-evidence, or an alternative calculus on these macro models? Pitch your pilot-ready product.'}
            </p>
          </div>
          <a
            href="mailto:kelly.yung@sillvermorph.com"
            className="px-6 py-3 bg-[#142218] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#C86646] transition-colors shrink-0"
          >
            {isZh ? '聯繫投資團隊 · 提交備忘' : 'Contact Investment Fund · Submit Memo'}
          </a>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Compass, FileText, Layers, ShieldCheck, User, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, activeTab, setActiveTab, scrollToSection } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states for desktop
  const [activeDropdown, setActiveDropdown] = useState<'perspectives' | null>(null);
  // Accordion states for mobile
  const [mobilePerspectivesOpen, setMobilePerspectivesOpen] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileFirstLinkRef = useRef<HTMLButtonElement>(null);
  const isZh = language === 'zh-TW';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      mobileFirstLinkRef.current?.focus();
    }, 50);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    setActiveDropdown(null);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setActiveDropdown(null);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    setActiveDropdown(null);
    scrollToSection('about');
    setMobileMenuOpen(false);
  };

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const isPerspectivesActive = activeTab === 'convictions' || activeTab === 'framework' || activeTab === 'field-notes';

  return (
    <>
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-[transform,opacity] duration-300 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4">
          <div
            className={`pointer-events-auto rounded-full transition-[background-color,border-color,box-shadow] duration-300 flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 border ${
              isScrolled
                ? 'bg-[#FAF8F5]/95 backdrop-blur-xl border-[#D8CFBC] shadow-[0_4px_24px_rgba(22,36,27,0.08)]'
                : 'bg-[#FAF8F5]/90 backdrop-blur-md border-[#E0D8C8] shadow-xs'
            }`}
          >
            {/* Brand Logo */}
            <button
              id="nav-brand-logo-btn"
              onClick={handleLogoClick}
              className="group flex items-center text-left cursor-pointer rounded-xs py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A84528]"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-medium text-[16px] sm:text-lg tracking-tight text-[#16241B] group-hover:text-[#C86646] transition-colors whitespace-nowrap">
                  {isZh ? '啟航創投' : 'New Chapter Ventures'}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#C86646] hidden sm:inline-block" />
              </div>
            </button>

            {/* Desktop Navigation Links with Clean Dropdowns (No "菜單" badges, short concise titles) */}
            <nav 
              ref={dropdownRef}
              id="desktop-navigation" 
              className="hidden lg:flex items-center gap-1 bg-[#EFEAE0]/85 p-1 rounded-full border border-[#DDD5C4]"
            >
              {/* 1. 首頁 (Home) */}
              <button
                id="nav-link-home"
                onClick={handleHomeClick}
                className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-full transition-colors duration-200 cursor-pointer flex items-center ${
                  activeTab === 'home'
                    ? 'text-[#16241B] font-semibold bg-[#FFFFFF] shadow-xs border border-[#D5CCA8]'
                    : 'text-[#6A7870] hover:text-[#16241B]'
                }`}
              >
                {isZh ? '首頁' : 'Home'}
              </button>

              {/* 2. 關於我們 (About Us - 跳轉回首頁介紹我們區域) */}
              <button
                id="nav-link-about"
                onClick={handleAboutClick}
                className="relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-full transition-colors duration-200 cursor-pointer text-[#6A7870] hover:text-[#16241B]"
              >
                {isZh ? '關於我們' : 'About'}
              </button>

              {/* 3. 視角 (Dropdown: 核心判斷 / 採用模型 / 田野筆記) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('perspectives')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id="nav-dropdown-perspectives-btn"
                  onClick={() => setActiveDropdown(activeDropdown === 'perspectives' ? null : 'perspectives')}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isPerspectivesActive
                      ? 'text-[#16241B] font-semibold bg-[#FFFFFF] shadow-xs border border-[#D5CCA8]'
                      : 'text-[#6A7870] hover:text-[#16241B]'
                  }`}
                >
                  <span>{isZh ? '視角' : 'Perspectives'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'perspectives' ? 'rotate-180 text-[#C86646]' : 'text-[#8C9890]'}`} />
                </button>

                {/* Dropdown Floating Menu */}
                <AnimatePresence>
                  {activeDropdown === 'perspectives' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#FAF8F5] border border-[#DDD5C5] rounded-xl p-1.5 shadow-xl space-y-1 z-50 backdrop-blur-md"
                    >
                      {/* 核心判斷 */}
                      <button
                        id="nav-link-convictions"
                        onClick={() => handleNavigate('convictions')}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'convictions'
                            ? 'bg-[#142218] text-[#FAF8F5]'
                            : 'text-[#334237] hover:bg-[#EFEAE0]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'convictions' ? 'text-[#C86646]' : 'text-[#7C8880]'}`} />
                          <span className="font-medium">{isZh ? '核心判斷' : 'Core Convictions'}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70">08</span>
                      </button>

                      {/* 採用模型 */}
                      <button
                        id="nav-link-framework"
                        onClick={() => handleNavigate('framework')}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'framework'
                            ? 'bg-[#142218] text-[#FAF8F5]'
                            : 'text-[#334237] hover:bg-[#EFEAE0]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Compass className={`w-3.5 h-3.5 ${activeTab === 'framework' ? 'text-[#C86646]' : 'text-[#7C8880]'}`} />
                          <span className="font-medium">{isZh ? '採用模型' : 'Adoption Model'}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70">4+3</span>
                      </button>

                      {/* 田野筆記 */}
                      <button
                        id="nav-link-field-notes"
                        onClick={() => handleNavigate('field-notes')}
                        className={`w-full text-left px-3 py-2 rounded-md text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          activeTab === 'field-notes'
                            ? 'bg-[#142218] text-[#FAF8F5]'
                            : 'text-[#334237] hover:bg-[#EFEAE0]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className={`w-3.5 h-3.5 ${activeTab === 'field-notes' ? 'text-[#C86646]' : 'text-[#7C8880]'}`} />
                          <span className="font-medium">{isZh ? '田野筆記' : 'Field Notes'}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70">12</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. 文章 (Articles) */}
              <button
                id="nav-link-insights"
                onClick={() => handleNavigate('insights')}
                className={`relative px-4 py-1.5 text-xs font-mono tracking-wider uppercase rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'insights'
                    ? 'text-[#16241B] font-semibold bg-[#FFFFFF] shadow-xs border border-[#D5CCA8]'
                    : 'text-[#6A7870] hover:text-[#16241B]'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'insights' ? 'text-[#C86646]' : 'text-[#8C9890]'}`} />
                <span>{isZh ? '文章' : 'Articles'}</span>
              </button>
            </nav>

            {/* Actions & Language Switcher */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Language Switcher Capsule */}
              <div className="flex items-center bg-[#EFEAE0] rounded-full p-0.5 border border-[#DDD5C5]">
                <button
                  id="lang-btn-en"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-colors duration-150 cursor-pointer ${
                    !isZh
                      ? 'bg-[#1A261F] text-[#FAF8F5] shadow-xs'
                      : 'text-[#6B796F] hover:text-[#16241B]'
                  }`}
                >
                  EN
                </button>
                <button
                  id="lang-btn-zh"
                  onClick={() => setLanguage('zh-TW')}
                  className={`px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-full transition-colors duration-150 cursor-pointer ${
                    isZh
                      ? 'bg-[#1A261F] text-[#FAF8F5] shadow-xs'
                      : 'text-[#6B796F] hover:text-[#16241B]'
                  }`}
                >
                  繁中
                </button>
              </div>

              {/* Share Problem Action */}
              <button
                id="nav-share-problem-btn"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-1.5 ps-4 pe-3.5 py-1.5 rounded-full bg-[#1A261F] text-[#FAF8F5] text-[11px] font-mono uppercase tracking-wider hover:bg-[#2C3E33] transition-colors duration-150 active:scale-[0.96] shadow-xs group cursor-pointer"
              >
                <span>{isZh ? '提交照護問題' : 'Submit Problem'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86646] group-hover:scale-125 transition-transform" />
              </button>
            </div>

            {/* Mobile Header Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="mobile-lang-toggle-btn"
                onClick={() => setLanguage(isZh ? 'en' : 'zh-TW')}
                className="px-3 py-1.5 min-h-[38px] text-[11px] font-mono rounded-full bg-[#EFEAE0] text-[#16241B] border border-[#DDD5C5] cursor-pointer flex items-center justify-center font-medium active:scale-[0.96] transition-transform duration-150"
              >
                {isZh ? 'EN' : '繁中'}
              </button>

              <button
                ref={mobileMenuBtnRef}
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-[#EFEAE0] text-[#16241B] hover:bg-[#E5DFD4] active:scale-[0.96] transition-[background-color,transform,border-color] duration-150 cursor-pointer border border-[#DDD5C5] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#A84528]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={mobileMenuOpen ? 'open' : 'closed'}
                    initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                    transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                    className="flex items-center justify-center"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.75} /> : <Menu className="w-5 h-5" strokeWidth={1.75} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Clean Hierarchy */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] lg:hidden pointer-events-auto"
            />

            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={isZh ? '導航菜單' : 'Navigation Menu'}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-16 z-40 lg:hidden bg-[#FAF8F5] border border-[#D8CFBC] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 pointer-events-auto max-h-[85vh] overflow-y-auto"
            >
              <div className="space-y-1.5">
                {/* 1. 首頁 */}
                <button
                  ref={mobileFirstLinkRef}
                  onClick={handleHomeClick}
                  className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A84528] ${
                    activeTab === 'home'
                      ? 'bg-[#1A261F] text-[#FAF8F5]'
                      : 'text-[#334237] hover:bg-[#EFEAE0]'
                  }`}
                >
                  <span>{isZh ? '首頁' : 'Home'}</span>
                  {activeTab === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-[#C86646]" />}
                </button>

                {/* 2. 關於我們 */}
                <button
                  onClick={handleAboutClick}
                  className="w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer text-[#334237] hover:bg-[#EFEAE0]"
                >
                  <span>{isZh ? '關於我們' : 'About'}</span>
                </button>

                {/* 3. 視角 Group */}
                <div className="pt-2 border-t border-[#E8E2D4] space-y-1">
                  <div className="px-4 py-1 text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#7C8880] font-semibold">
                    {isZh ? '視角' : 'Perspectives'}
                  </div>
                  <button
                    onClick={() => handleNavigate('convictions')}
                    className={`w-full min-h-[42px] text-left px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer pl-6 ${
                      activeTab === 'convictions'
                        ? 'bg-[#1A261F] text-[#FAF8F5]'
                        : 'text-[#334237] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C86646]" />
                      <span>{isZh ? '核心判斷' : 'Core Convictions'}</span>
                    </div>
                    <span className="text-[10px] opacity-70">08</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('framework')}
                    className={`w-full min-h-[42px] text-left px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer pl-6 ${
                      activeTab === 'framework'
                        ? 'bg-[#1A261F] text-[#FAF8F5]'
                        : 'text-[#334237] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#C86646]" />
                      <span>{isZh ? '採用模型' : 'Adoption Model'}</span>
                    </div>
                    <span className="text-[10px] opacity-70">4+3</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('field-notes')}
                    className={`w-full min-h-[42px] text-left px-4 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer pl-6 ${
                      activeTab === 'field-notes'
                        ? 'bg-[#1A261F] text-[#FAF8F5]'
                        : 'text-[#334237] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#C86646]" />
                      <span>{isZh ? '田野筆記' : 'Field Notes'}</span>
                    </div>
                    <span className="text-[10px] opacity-70">12</span>
                  </button>
                </div>

                {/* 4. 文章 (Articles) */}
                <div className="pt-2 border-t border-[#E8E2D4]">
                  <button
                    onClick={() => handleNavigate('insights')}
                    className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                      activeTab === 'insights'
                        ? 'bg-[#1A261F] text-[#FAF8F5]'
                        : 'text-[#334237] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#C86646]" />
                      <span>{isZh ? '文章 · 專欄文集' : 'Articles · Columns'}</span>
                    </div>
                    <span className="text-[10px] opacity-70">12</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E2D4]">
                <button
                  onClick={() => {
                    scrollToSection('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[46px] py-3 rounded-lg bg-[#C86646] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 active:bg-[#B85838] transition-colors cursor-pointer shadow-xs"
                >
                  <span>{isZh ? '提交照護難題' : 'Submit Problem'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

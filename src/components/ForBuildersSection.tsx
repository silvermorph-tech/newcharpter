import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

export const ForBuildersSection: React.FC<{ isStandalonePage?: boolean }> = ({ isStandalonePage = false }) => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  const [activeFocusIdx, setActiveFocusIdx] = useState(0);
  const focusScrollRef = useRef<HTMLDivElement>(null);

  // 6 Areas of Focus - 100% Pure Chinese or 100% Pure English
  const focusAreas = [
    {
      num: '01',
      tag: isZh ? '遠程醫療' : 'TELEHEALTH',
      title: isZh ? '遠程醫療與遠端監測' : 'Telehealth & remote monitoring',
      desc: isZh
        ? '連接設備讓臨床醫療與健康管理更貼近長者真實生活場所。'
        : 'Connected devices bring clinical access closer to where older adults live.'
    },
    {
      num: '02',
      tag: isZh ? '預測算法' : 'PREDICTIVE AI',
      title: isZh ? '人工智能預測分析' : 'AI predictive analytics',
      desc: isZh
        ? '基於傳感器與照護數據，實現更早期、更個性化的干預。'
        : 'Earlier, more personal intervention, often from sensor and care data.'
    },
    {
      num: '03',
      tag: isZh ? '運營系統' : 'OPERATIONS',
      title: isZh ? '智慧運營管理系統' : 'Intelligent ERP',
      desc: isZh
        ? '消除健康記錄、排班調度與計費結算中的運營摩擦。'
        : 'Less operational friction across records, schedules and billing.'
    },
    {
      num: '04',
      tag: isZh ? '社交連繫' : 'COMMUNITY',
      title: isZh ? '智慧社交' : 'Intelligent social',
      desc: isZh
        ? '建立長者、家庭與社區之間的實質連接。'
        : 'Connection among older adults, families and communities.'
    },
    {
      num: '05',
      tag: isZh ? '機器人與輔具' : 'ROBOTICS & IOT',
      title: isZh ? '輔助與機器人技術' : 'Assistive & robotic technologies',
      desc: isZh
        ? '輔具、機器人與物聯網技術，支撐更安全、更自主的獨立生活。'
        : 'Devices, robotics and IoT for safer, more independent living.'
    },
    {
      num: '06',
      tag: isZh ? '人力協同' : 'WORKFORCE',
      title: isZh ? '一線人力資源管理' : 'Workforce management',
      desc: isZh
        ? '將更多時間留給照護本身，減少繁瑣協調摩擦。'
        : 'More time caring, less time coordinating.'
    }
  ];

  // 5 Founder Characteristics - Exact wording provided by user
  const founderCriteria = [
    {
      title: isZh ? '你為什麼是解這道題的人' : 'Why You Are the One to Solve This',
      desc: isZh
        ? '你在照護一線待過、擁有機構分銷渠道、或掌握監管與支付端的關鍵關係——這些是市場報告給不了你的優勢，也是我們判斷「為什麼是你」的起點。我們不接受「市場很大所以我來做」，我們要的是你比任何人都更早、更深地活過這個問題。'
        : "You've worked on the care frontlines, possess institutional distribution, or command regulatory/payer relationships. We don't accept 'the market is big so I entered'—we look for founders who lived this problem earlier and deeper than anyone else."
    },
    {
      title: isZh ? '為什麼是現在' : 'Why Now',
      desc: isZh
        ? '老齡化不是理由，理由是具體發生的變化——一項新規落地、一條支付通道剛打通、一項硬件成本降到臨界點。你要能指出這個時間點上究竟哪個變數，讓這件事現在可行、過去不可行。'
        : 'Aging is not a reason; specific inflection points are—a newly enacted regulation, a freshly opened reimbursement pathway, or hardware costs dropping below threshold. Pinpoint the exact variable that makes this viable now, but impossible before.'
    },
    {
      title: isZh ? '剛需止痛，而非錦上添花' : 'Must-Have Painkiller, Not a Nice-to-Have',
      desc: isZh
        ? '你的方案要解決的，是長者或護理現場在沒有它時必須承受的真實代價——時間成本、風險成本、人力成本。我們看的不是「痛點聽起來合理」，而是使用者是否願意停止用舊方法、轉而依賴你的方案，並持續留下來。'
        : 'Address real costs incurred without your solution—time, clinical risk, and labor strain. Not whether it sounds reasonable, but whether frontline users abandon legacy habits, depend on your product, and stay.'
    },
    {
      title: isZh ? '用迭代速度證明執行力' : 'Prove Velocity via Rapid Iteration',
      desc: isZh
        ? '在人工智能時代，構建的門檻已經很低，真正稀缺的是把一線反饋轉化為產品變化的速度。我們關注你過去半年做了什麼——是否以兩週為單位完成一個「假設驗證—迭代」循環，而不是停留在一個打磨很久的原型上。'
        : 'In the AI era, software is cheap; true scarcity lies in the speed of turning frontline care feedback into shipped improvements across two-week hypothesis-iteration cycles.'
    },
    {
      title: isZh ? '多方閉環，缺一不可' : 'Multi-Stakeholder Alignment is Non-Negotiable',
      desc: isZh
        ? '長者願意用、護理員願意採用、機構管理層願意採購——這三者要同時成立，任何一環缺失都意味着模式尚未成立。我們更看重試點期內的留存與使用時長，而不是意向調研或口頭認可。'
        : 'Seniors willing to use, caregivers willing to adopt, and care home management willing to procure. Verifiable pilot retention and daily usage duration outweigh verbal surveys.'
    }
  ];

  const handleFocusScroll = () => {
    if (focusScrollRef.current) {
      const { scrollLeft, clientWidth } = focusScrollRef.current;
      const idx = Math.round(scrollLeft / (clientWidth * 0.82));
      setActiveFocusIdx(Math.min(Math.max(idx, 0), focusAreas.length - 1));
    }
  };

  const scrollToFocus = (idx: number) => {
    if (focusScrollRef.current) {
      const cardWidth = focusScrollRef.current.clientWidth * 0.82 + 14;
      focusScrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveFocusIdx(idx);
    }
  };

  return (
    <section
      id="for-builders"
      className="relative py-16 sm:py-28 bg-[#F6F3EC] border-t border-[#DDD3C2]/70 overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full space-y-14 sm:space-y-24"
      >
        
        {/* ========================================================
            PART 1: 我們關注 (What We Focus On)
        ======================================================== */}
        <div className="space-y-6 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DDD4C4]/80">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86646]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#7C8880] font-bold">
                  {isZh ? '關注賽道' : 'SECTORS'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-5xl font-serif text-[#142218] font-light tracking-tight leading-[1.1]">
                {isZh ? '我們關注' : 'What We Focus On'}
              </h2>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#556358] font-sans max-w-md leading-[1.68] font-light">
              {isZh
                ? '聚焦具備臨床可行性、能為一線護理減負並擁有可持續支付閉環的核心切入點。'
                : 'High-conviction technology vectors anchored in frontline care workflows and unit economics.'}
            </p>
          </div>

          {/* MOBILE SWIPEABLE CAROUSEL (block md:hidden) */}
          <div className="block md:hidden space-y-4">
            {/* Header Hint */}
            <div className="flex items-center justify-between text-xs font-mono text-[#526056] px-1">
              <span className="text-[11px] tracking-wider text-[#A84528] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84528] animate-pulse motion-reduce:animate-none" />
                {isZh ? '左右滑動探索' : 'Swipe to explore'}
              </span>
            </div>

            {/* Horizontal Scroll Track */}
            <div 
              ref={focusScrollRef}
              onScroll={handleFocusScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-5 px-5 no-scrollbar scroll-smooth"
            >
              {focusAreas.map((item) => (
                <div
                  key={item.tag}
                  className="w-[82vw] max-w-[310px] shrink-0 snap-center bg-[#FAF8F5] border border-[#DDD4C4] rounded-xs p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-baseline justify-between border-b border-[#DDD4C4]/50 pb-2.5">
                    <span className="tactile-chip text-[10px] font-mono uppercase tracking-[0.18em] text-[#4F5E54] px-2 py-0.5 bg-[#F4EFE6] border border-[#DDD4C4] font-medium">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-serif font-normal text-[#142218] tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#334237] font-sans leading-[1.65] font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EBE4D6]/70 flex items-center justify-between text-[10.5px] font-mono text-[#526056]">
                    <span>{isZh ? '方向標籤' : 'VECTOR'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicator Dots / Quick Selector */}
            <div className="flex items-center justify-center gap-1 pt-1">
              {focusAreas.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToFocus(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="min-w-[28px] min-h-[28px] flex items-center justify-center p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A84528] rounded-full"
                >
                  <span
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 block ${
                      activeFocusIdx === idx ? 'w-6 bg-[#142218]' : 'w-1.5 bg-[#DDD4C4]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DESKTOP Focus Areas Grid (hidden md:grid) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 border-t border-[#DDD4C4]/80">
            {focusAreas.map((item, idx) => (
              <div
                key={item.tag}
                className={`py-8 px-6 sm:px-8 flex flex-col justify-between space-y-5 border-b border-[#DDD4C4]/80 transition-colors duration-200 hover:bg-[#EFEAE0]/60 ${
                  idx % 3 !== 2 ? 'lg:border-r lg:border-[#DDD4C4]/80' : ''
                } ${idx % 2 === 0 ? 'md:border-r md:border-[#DDD4C4]/80 lg:border-r-0' : ''}`}
              >
                <div className="flex items-baseline justify-between border-b border-[#DDD4C4]/40 pb-3">
                  <span className="tactile-chip text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#7C8880] px-2 py-0.5 bg-[#FAF8F5]/80 border border-[#DDD4C4]">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-2 py-1">
                  <h3 className="text-lg sm:text-xl font-serif font-normal text-[#142218] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#4A574E] font-sans leading-[1.68] font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 2: 創始人特質 (Founder Traits) - Direct Points List
        ======================================================== */}
        <div id="founder-traits" className="space-y-6 sm:space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#DDD4C4]/80">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-4xl font-serif text-[#142218] font-light tracking-tight leading-[1.1]">
                {isZh ? '創始人特質' : 'Founder Traits'}
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#556358] font-sans max-w-md leading-relaxed font-light">
              {isZh
                ? '我們尋找的，不是能把痛點講清楚的人，而是能把痛點轉化為可驗證成果的人。'
                : 'We look not for those who merely describe the pain, but those who transform pain into verifiable outcomes.'}
            </p>
          </div>

          {/* Direct Clean Minimalist List (No serial numbers) */}
          <div className="border-t border-[#DDD4C4] divide-y divide-[#DDD4C4]/80">
            {founderCriteria.map((item) => (
              <div
                key={item.title}
                className="py-5 sm:py-6 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-10 hover:bg-[#FAF8F5]/80 transition-colors"
              >
                <div className="sm:w-5/12 shrink-0">
                  <h3 className="text-base sm:text-lg font-serif font-medium text-[#142218] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="sm:w-7/12">
                  <p className="text-xs sm:text-[13.5px] text-[#4A574E] font-sans leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

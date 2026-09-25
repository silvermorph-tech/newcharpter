import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

// D. 新增「使命」版塊 (單獨一屏，大字居中排版)
export const ElderMissionSection: React.FC = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section
      id="elder-mission"
      className="relative w-full min-h-[64vh] sm:min-h-[76vh] flex flex-col justify-center items-center py-24 sm:py-32 md:py-40 bg-[#F5EFE6] border-t border-b border-[#DDD3C2]/90 overflow-hidden text-[14px]"
    >
      {/* Subtle radial depth highlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 255, 255, 0.55) 0%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 w-full text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-7 sm:space-y-10"
        >
          {/* Eyebrow */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center gap-2.5 px-3 py-1 rounded-full bg-[#EAE2D4]/70 border border-[#DDD3C2]/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86646] animate-pulse motion-reduce:animate-none" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#637267] font-semibold">
              {isZh ? '使命 · MISSION' : 'OUR MISSION'}
            </span>
          </motion.div>

          {/* Large Centered Headline with generous scale */}
          <motion.h2 
            variants={itemVariants}
            className="text-[60px] font-serif text-[#142218] font-light tracking-tight sm:tracking-[-0.02em] leading-[1.25] text-center max-w-5xl mx-auto"
          >
            {isZh
              ? '「讓每一位長者，都能快樂、體面地老去。」'
              : '“Enabling every elder to age with joy and dignity.”'}
          </motion.h2>

          {/* Subtitle / Poetic anchor */}
          <motion.p 
            variants={itemVariants}
            className="text-[17px] font-serif text-[#7C8880] italic font-light tracking-[0.18em] sm:tracking-[0.24em]"
          >
            Fade with dignity.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// E. 新增「價值觀」版塊 (緊接使命版塊之後，四條橫排卡片，每條一個詞＋一句話)
export const CoreValuesSection: React.FC = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  const values = [
    {
      num: '01',
      titleZh: '以人為本',
      titleEn: 'People-First',
      descZh: '從長者的真實處境出發，而非從技術與概念出發。',
      descEn: 'Starting from the lived reality of elders, not from tech or abstract concepts.'
    },
    {
      num: '02',
      titleZh: '長期主義',
      titleEn: 'Long-Termism',
      descZh: '照護是時間的事業，我們用耐心，換經得起檢驗的答案。',
      descEn: 'Care is an endeavor of time. We exchange patience for answers that withstand scrutiny.'
    },
    {
      num: '03',
      titleZh: '腳踏實地',
      titleEn: 'Grounded in Field',
      descZh: '答案在現場，不在簡報裡。沒去過一線的團隊，我們不投。',
      descEn: 'Answers live on the frontline, not in slide decks. We do not fund teams that haven’t walked the floor.'
    },
    {
      num: '04',
      titleZh: '科技賦能',
      titleEn: 'Tech as Enabler',
      descZh: '讓技術延伸照護者的手，而不是抬高長者的門檻。',
      descEn: 'Letting technology extend the hands of caregivers, rather than raising barriers for elders.'
    }
  ];

  return (
    <section
      id="core-values"
      className="relative w-full py-16 sm:py-24 md:py-28 bg-[#F8F6F1] border-b border-[#DDD3C2]/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDD3C2]/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86646]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#7C8880] font-semibold">
                {isZh ? '核心價值觀 · VALUES' : 'CORE VALUES'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#142218] font-light tracking-tight">
              {isZh ? '我們的投資與實踐原則' : 'Our Operating & Investment Principles'}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7C8880] tracking-wider">
            [ 04 PILLARS ]
          </span>
        </div>

        {/* 4 Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF7F0] border border-[#DDD3C2] rounded-xs p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C86646]/60 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] group"
            >
              <div className="space-y-3">
                <h4 className="text-xl sm:text-2xl font-serif font-medium text-[#142218] tracking-tight group-hover:text-[#C86646] transition-colors">
                  {isZh ? v.titleZh : v.titleEn}
                </h4>
              </div>

              <p className="text-sm sm:text-[14.5px] font-serif text-[#3E5045] leading-relaxed pt-2">
                {isZh ? v.descZh : v.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// F. 新增「願景」版塊 + H. Slogan 情感收口 (緊接價值觀之後)
export const VisionAndSloganSection: React.FC = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section
      id="vision"
      className="relative w-full flex flex-col justify-center items-center py-20 sm:py-28 md:py-32 bg-[#F6F1E8] border-b border-[#DDD3C2]/90 overflow-hidden"
    >
      {/* Subtle radial depth highlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 w-full text-center space-y-10 sm:space-y-14">
        {/* Selector 1: Vision Statement Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="space-y-5 sm:space-y-6 flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D4]/90 border border-[#D8CEBE]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86646]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.26em] text-[#55655A] font-semibold">
              {isZh ? '未來願景 · VISION' : 'OUR VISION'}
            </span>
          </motion.div>

          {/* F: Vision Statement with harmonized, balanced typography */}
          <motion.h3 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-serif text-[#142218] font-light tracking-tight sm:tracking-[-0.01em] leading-[1.42] sm:leading-[1.32] text-center max-w-3xl mx-auto"
          >
            {isZh ? (
              <>
                「讓香港成為長壽時代的先行範式——<br className="hidden sm:inline" />
                率先抵達問題的城市，率先交出答案。」
              </>
            ) : (
              <>
                “Making Hong Kong a pioneer paradigm for the longevity era—<br className="hidden sm:inline" />
                the city that arrives first at the challenge, delivering answers first.”
              </>
            )}
          </motion.h3>
        </motion.div>

        {/* H: Slogan (居中，作為整頁的情感收口) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2 sm:pt-4 flex flex-col items-center justify-center"
        >
          {/* Animated decorative hairline */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#C86646]/60 to-transparent mb-6 sm:mb-8 origin-center" 
          />
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-serif text-[#C86646] tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-relaxed text-center">
            {isZh ? '「資本向善，老，有所安。」' : '“Capital for Good. Aging in Serenity.”'}
          </p>
          <p className="text-xs sm:text-sm font-serif italic text-[#7C8880] tracking-[0.14em] sm:tracking-[0.18em] mt-2 font-light">
            {isZh ? 'Capital for Good. Aging in Serenity.' : 'Old age, peacefully anchored.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC<{ isStandalonePage?: boolean }> = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';
  const [copied, setCopied] = useState(false);

  const emailAddress = 'kelly.yung@silvermorph.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const invitedRoles = [
    {
      role: isZh ? '投資者' : 'Investors',
      desc: isZh 
        ? '探討銀髮賽道投資趨勢、專項合作與生態協同。' 
        : 'Explore longevity care trends, co-investments, and thesis sharing.'
    },
    {
      role: isZh ? '創業者' : 'Builders & Founders',
      desc: isZh 
        ? '交流項目構想、尋求早期資金支持與真實照護場景試點。' 
        : 'Discuss early ideas, seed funding, and live care testbed deployments.'
    },
    {
      role: isZh ? '同行業運營者' : 'Care Operators & Peers',
      desc: isZh 
        ? '院舍院長、護理管理者、日間中心等，交流一線運營與技術導入。' 
        : 'Care home leaders, RNs, and day care hubs exchanging frontline practices.'
    },
    {
      role: isZh ? '研究學者' : 'Researchers & Scholars',
      desc: isZh 
        ? '老年學、康復科技、長期護理政策與臨床實證合作。' 
        : 'Academic, clinical, and policy collaboration on eldercare solutions.'
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#DDD5C5]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="pb-6 border-b border-[#DDD5C5]">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#142218] font-light tracking-tight leading-[1.08]">
            {isZh ? '期待與你直接對話' : 'Get in Touch Directly'}
          </h2>
        </div>

        {/* Direct Email Action Center */}
        <div className="py-8 sm:py-12 border-b border-[#DDD4C4] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#526056] uppercase tracking-wider font-medium">
              {isZh ? '官方聯絡郵箱' : 'DIRECT EMAIL'}
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent(isZh ? '交流與合作 - 啟航創投' : 'Dialogue & Inquiry - New Chapter Ventures')}`}
                className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#142218] hover:text-[#A84528] transition-colors tracking-tight underline decoration-1 underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A84528] rounded-xs"
              >
                {emailAddress}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${emailAddress}?subject=${encodeURIComponent(isZh ? '交流與合作 - 啟航創投' : 'Dialogue & Inquiry - New Chapter Ventures')}`}
              className="inline-flex items-center gap-2 ps-5 pe-4 py-3 rounded-xs bg-[#142218] text-[#FAF8F5] text-xs font-mono tracking-wider hover:bg-[#283C30] transition-[background-color,transform] duration-150 active:scale-[0.96] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A84528]"
            >
              <Mail className="w-4 h-4 text-[#A84528]" strokeWidth={1.75} />
              <span>{isZh ? '發送郵件' : 'Open Mail Client'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8EA094]" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center min-h-[42px] px-5 py-3 rounded-xs bg-[#EFEAE0] text-[#142218] text-xs font-mono tracking-wider hover:bg-[#E5DFD4] transition-[background-color,transform] duration-150 active:scale-[0.96] cursor-pointer border border-[#DDD5C5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A84528]"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? 'copied' : 'idle'}
                  initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2E6B47]" strokeWidth={2} />
                      <span className="text-[#2E6B47] font-semibold">{isZh ? '已複製郵箱' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#526056]" strokeWidth={1.75} />
                      <span>{isZh ? '複製郵件地址' : 'Copy Email Address'}</span>
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <span className="text-xs font-mono text-[#526056] ml-2">
              {isZh ? '團隊與合夥人親自查閱與回覆 · 香港 / 大灣區' : 'Reviewed directly by partners · Hong Kong & GBA'}
            </span>
          </div>
        </div>

        {/* Invited Roles - Open Typographic Spread (No cards, no boxes, no numbers) */}
        <div className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-2">
            {invitedRoles.map((item, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="flex items-center gap-2 text-[#142218]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A84528]" />
                  <h4 className="text-lg font-serif font-medium text-[#142218] tracking-tight">
                    {item.role}
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-[#445248] font-sans leading-relaxed font-light pl-3.5 border-l border-[#DDD4C4]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

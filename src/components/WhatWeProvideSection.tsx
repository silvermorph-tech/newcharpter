import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Coins, 
  Network, 
  Building2, 
  Stethoscope
} from 'lucide-react';

export const WhatWeProvideSection: React.FC<{ isStandalonePage?: boolean }> = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  const items = [
    {
      title: isZh ? '天使種子資金' : 'Angel & Seed Capital',
      icon: Coins,
      content: isZh ? '港幣 5 萬 - 200 萬' : 'HK$50k - HK$2M'
    },
    {
      title: isZh ? '網絡' : 'Network',
      icon: Network,
      content: isZh ? '人脈網絡資源' : 'Network & Resources'
    },
    {
      title: isZh ? '試點場景' : 'Testbeds',
      icon: Building2,
      content: isZh ? '居家試點 · 院舍試點' : 'In-Home & Care Homes'
    },
    {
      title: isZh ? '運營者視角' : 'Operator Lens',
      icon: Stethoscope,
      content: isZh ? '倉庫團隊 · 註冊護士 · 院舍院長' : 'Warehouse · RNs · Superintendents'
    }
  ];

  return (
    <section
      id="what-we-provide"
      className="relative py-16 sm:py-20 bg-[#F4EFE6] border-t border-[#DDD3C2]/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full space-y-10">
        
        {/* Header - Simple & Clean */}
        <div className="border-b border-[#DDD4C4] pb-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#142218] font-light tracking-tight">
            {isZh ? '我們能夠提供什麼' : 'What We Provide'}
          </h2>
        </div>

        {/* 4 Vector Icons Side-by-Side (Completely Open, No Boxes, No Numbers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-3">
                <Icon className="w-8 h-8 text-[#C86646]" strokeWidth={1.5} />
                <h3 className="text-xl font-serif text-[#142218] font-normal tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-sans text-[#4D5B52] leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

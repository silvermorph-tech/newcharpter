import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  Brain, 
  Users, 
  Compass
} from 'lucide-react';

export const OurDefinitionSection: React.FC = () => {
  const { language } = useApp();
  const isZh = language === 'zh-TW';

  // Holistic 4 Pillars Data
  const pillars4 = [
    {
      id: 'physical',
      kanji: '身',
      en: 'Physical',
      num: '01',
      subtitleZh: '機能自理',
      subtitleEn: 'Functional Autonomy',
      icon: HeartPulse,
      accent: '#1D3B2E',
      tagBg: '#E9EFEB',
      outcomeZh: '自理尊嚴 · 減少跌倒',
      outcomeEn: 'Autonomy & Fall Prevention'
    },
    {
      id: 'psychological',
      kanji: '心',
      en: 'Psychological',
      num: '02',
      subtitleZh: '認知與情緒',
      subtitleEn: 'Cognitive & Purpose',
      icon: Brain,
      accent: '#8C4D26',
      tagBg: '#F7EFE8',
      outcomeZh: '情緒平穩 · 被需要的尊嚴',
      outcomeEn: 'Purpose & Emotional Calm'
    },
    {
      id: 'social',
      kanji: '社',
      en: 'Social',
      num: '03',
      subtitleZh: '人際連結',
      subtitleEn: 'Social Connection',
      icon: Users,
      accent: '#264E68',
      tagBg: '#EAF0F4',
      outcomeZh: '消除孤獨 · 家屬安心',
      outcomeEn: 'Connected & Family Peace'
    },
    {
      id: 'spiritual',
      kanji: '靈',
      en: 'Spiritual',
      num: '04',
      subtitleZh: '心靈安頓',
      subtitleEn: 'Life Solace',
      icon: Compass,
      accent: '#5A4668',
      tagBg: '#F2ECF5',
      outcomeZh: '生命無憾 · 圓滿安頓',
      outcomeEn: 'Peace & Final Dignity'
    }
  ];

  return (
    <section 
      id="our-definition"
      className="relative py-16 sm:py-20 bg-[#F4EFE6] border-t border-[#DDD4C4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* SECTION HEADER */}
        <div className="pb-5 border-b border-[#DDD4C4]">
          <h2 className="text-2xl sm:text-4xl font-serif text-[#142218] font-light tracking-tight">
            {isZh ? '身心社靈' : 'Body, Mind, Social & Spirit'}
          </h2>
        </div>

        {/* 4 PILLARS CONTENT */}
        <div className="w-full bg-[#FAF8F5] border border-[#DDD5C5] rounded-xs p-4 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {pillars4.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  className="group relative bg-[#FCFBF8] border border-[#DDD5C5] rounded-xs p-5 flex flex-col justify-between space-y-4 transition-all duration-200 hover:border-[#142218] hover:shadow-xs overflow-hidden"
                >
                  {/* Top Accent Hairline */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: pillar.accent }}
                  />

                  {/* Top Meta */}
                  <div className="flex items-start justify-between pb-3 border-b border-[#EBE4D6]">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#7C8880] font-semibold">
                        {isZh ? `${pillar.kanji}維度` : pillar.en}
                      </span>
                      <div className="text-base font-serif text-[#16241B] font-medium mt-0.5">
                        {isZh ? `${pillar.kanji} · ${pillar.subtitleZh}` : `${pillar.en} · ${pillar.subtitleEn}`}
                      </div>
                    </div>

                    <div 
                      className="w-7 h-7 rounded-xs flex items-center justify-center shrink-0"
                      style={{ backgroundColor: pillar.tagBg }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: pillar.accent }} />
                    </div>
                  </div>

                  {/* Outcome Tag */}
                  <div className="pt-3 border-t border-[#EBE4D6]/70 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#7C8880] text-[10px] uppercase">
                      {isZh ? '成果' : 'Outcome'}
                    </span>
                    <span className="font-medium text-[#16241B] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillar.accent }} />
                      {isZh ? pillar.outcomeZh : pillar.outcomeEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};


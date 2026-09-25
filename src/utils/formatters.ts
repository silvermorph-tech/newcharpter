export const formatFieldNoteTag = (tag: string, isZh: boolean): string => {
  if (!isZh) return tag;
  const map: Record<string, string> = {
    'Friction': '現場摩擦',
    'Conviction': '照護定論',
    'Opportunity': '突破機會',
    'Observation': '田野觀察',
    'Procurement': '採購與資助',
    'Care Workforce': '前線人力',
    'Residential Care': '院舍照護',
    'Ageing at Home': '居家安老',
    'Family Caregiving': '家庭照顧',
  };
  return map[tag] || tag;
};

export const formatFieldNoteDate = (date: string, isZh: boolean): string => {
  if (!isZh) return date;
  const months: Record<string, string> = {
    Jan: '1月', Feb: '2月', Mar: '3月', Apr: '4月', May: '5月', Jun: '6月',
    Jul: '7月', Aug: '8月', Sep: '9月', Oct: '10月', Nov: '11月', Dec: '12月'
  };
  const parts = date.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]] || parts[0];
    const day = parts[1].replace(',', '') + '日';
    const year = parts[2] + '年';
    return `${year}${month}${day}`;
  }
  return date;
};

export const formatReadTime = (readTime: string, isZh: boolean): string => {
  if (!isZh) return readTime;
  return readTime.replace(/(\d+)\s*min read/i, '$1 分鐘閱讀');
};

// 網站基本資訊
export const SITE_INFO = {
  name: '精緻洗衣',
  title: '精緻洗衣專業網站',
  description: '專業乾洗、濕洗、手洗服務，皮件保養、鞋子清潔專家。環保洗劑，到府收送，用心呵護您的每件衣物。',
  keywords: '台中洗衣, 乾洗, 皮件保養, 鞋子清潔, 到府收送, 專業洗衣',
  url: 'https://your-domain.com',
  phone: '(04) XXXX-XXXX',
  email: 'info@laundry.com',
  address: '台中市XX區XX路XX號',
  businessHours: {
    weekday: '週一至週五 09:00-21:00',
    weekend: '週六至週日 10:00-18:00',
    closed: '國定假日公休',
  },
};

// 社群媒體連結
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/your-page',
  instagram: 'https://instagram.com/your-account',
  line: 'https://line.me/R/ti/p/@your-line-id',
  threads: 'https://threads.net/@your-account',
};

// 導航選單
export const NAVIGATION = [
  { name: '首頁', href: '/' },
  { name: '洗滌須知', href: '/care-guide' },
  { name: '服務項目', href: '/services' },
  { name: '服務流程', href: '/process' },
  { name: '最新貼文', href: '/blog' },
  { name: '常見問題', href: '/faq' },
  { name: '關於我們', href: '/about' },
  { name: '聯絡我們', href: '/contact' },
];

// 服務類型
export const SERVICE_TYPES = [
  { value: 'wet-clean', label: '專業濕洗' },
  { value: 'hand-wash', label: '精緻手洗' },
  { value: 'dry-clean', label: '環保乾洗' },
  { value: 'leather-care', label: '皮件保養' },
  { value: 'shoe-clean', label: '鞋子洗滌' },
  { value: 'stain-removal', label: '專業除汙' },
  { value: 'mold-removal', label: '除黴處理' },
];

// 預約時段
export const TIME_SLOTS = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
];

// FAQ 分類
export const FAQ_CATEGORIES = {
  storage: '保存問題',
  material: '材質問題',
  type: '類型問題',
  detergent: '洗劑問題',
  price: '價格問題',
};

// 服務特色
export const FEATURES = [
  {
    icon: '🏆',
    title: '專業設備',
    description: '引進日本先進洗衣設備，確保洗淨效果',
  },
  {
    icon: '🌿',
    title: '環保洗劑',
    description: '使用環保認證洗劑，對衣物溫和不傷害',
  },
  {
    icon: '🚚',
    title: '到府收送',
    description: '免費到府收送服務，節省您寶貴時間',
  },
  {
    icon: '✅',
    title: '品質保證',
    description: '專人品檢每件衣物，確保完美交付',
  },
  {
    icon: '⚡',
    title: '急件處理',
    description: '提供24小時急件服務，滿足緊急需求',
  },
  {
    icon: '💰',
    title: '價格透明',
    description: '明碼標價，絕無隱藏費用',
  },
];

// Google Maps 座標（請替換為實際座標）
export const LOCATION = {
  lat: 24.1477,
  lng: 120.6736,
  zoom: 16,
};

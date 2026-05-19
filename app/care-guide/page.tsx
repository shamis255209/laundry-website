import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '洗滌須知 | 精緻洗衣',
  description: '詳細的衣物洗護指南，包含洗滌標籤解讀、各材質洗護方式、常見洗滌錯誤，幫助您正確保養每件衣物。',
};

const FABRIC_GUIDES = [
  {
    emoji: '👔',
    name: '棉質 Cotton',
    tags: ['耐洗', '吸汗', '易皺'],
    tips: [
      '可用 40°C 以下溫水機洗',
      '深色棉料建議冷水洗，防止褪色',
      '可使用一般洗劑，汙漬可預先處理',
      '可低溫烘乾，容易縮水請留意',
    ],
    caution: '深色棉料第一次洗滌建議單獨清洗，避免染色。',
    color: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    emoji: '🧣',
    name: '羊毛 Wool',
    tags: ['保暖', '易縮水', '需手洗'],
    tips: [
      '冷水（30°C 以下）輕柔手洗或機洗羊毛模式',
      '使用專用羊毛洗劑，不可用一般洗衣精',
      '輕壓排水，絕對不要擰乾',
      '攤平晾乾，不可掛起（會變形拉長）',
    ],
    caution: '切勿高溫洗滌或烘乾，一旦縮水無法復原。',
    color: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    emoji: '✨',
    name: '絲質 Silk',
    tags: ['柔滑', '脆弱', '建議乾洗'],
    tips: [
      '優先選擇乾洗或專業手洗',
      '若必須水洗，使用冷水加絲質洗劑',
      '絕不可搓揉，輕壓清洗',
      '陰乾，避免陽光直射造成褪色',
    ],
    caution: '絲質碰水容易留下水漬，建議全部交給專業乾洗處理。',
    color: 'from-pink-50 to-pink-100',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
  },
  {
    emoji: '🧥',
    name: '聚酯纖維 Polyester',
    tags: ['耐洗', '快乾', '易起毛球'],
    tips: [
      '可用 40°C 以下機洗',
      '翻面洗滌減少摩擦，降低起毛球機率',
      '使用洗衣網袋更佳',
      '低溫烘乾或自然晾乾皆可',
    ],
    caution: '高溫容易讓聚酯纖維變形或起靜電。',
    color: 'from-green-50 to-green-100',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
  },
  {
    emoji: '👖',
    name: '牛仔布 Denim',
    tags: ['耐穿', '易褪色', '需冷洗'],
    tips: [
      '翻面冷水機洗，防止褪色',
      '新買的牛仔褲前幾次建議單獨洗',
      '使用牛仔洗劑或中性洗劑',
      '自然晾乾，避免高溫烘乾',
    ],
    caution: '與淺色衣物分開洗，牛仔布容易染色到其他衣物。',
    color: 'from-indigo-50 to-indigo-100',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  {
    emoji: '🩱',
    name: '彈性纖維 Spandex',
    tags: ['彈性', '貼身', '怕高溫'],
    tips: [
      '冷水手洗或機洗精緻模式',
      '避免使用含漂白劑的洗劑',
      '不可高溫烘乾，會破壞彈性',
      '陰乾為主，避免陽光長時間直射',
    ],
    caution: '高溫是彈性纖維的天敵，烘乾機或熱水都會損壞彈性。',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
  },
];

const LABEL_SYMBOLS = [
  {
    group: '洗滌',
    items: [
      { symbol: '🪣', label: '可機洗', desc: '圓框內有數字表示最高溫度' },
      { symbol: '✋', label: '手洗', desc: '只能輕柔手洗，不可機洗' },
      { symbol: '🚫', label: '不可水洗', desc: '只能乾洗或交給專業處理' },
    ],
  },
  {
    group: '漂白',
    items: [
      { symbol: '△', label: '可漂白', desc: '空三角形表示可使用任何漂白劑' },
      { symbol: '△̸', label: '不可漂白', desc: '叉叉三角形，禁止使用漂白劑' },
    ],
  },
  {
    group: '烘乾',
    items: [
      { symbol: '○', label: '可烘乾', desc: '圓點數量代表溫度（點越多溫度越高）' },
      { symbol: '○̸', label: '不可烘乾', desc: '叉叉圓形，需自然晾乾' },
    ],
  },
  {
    group: '熨燙',
    items: [
      { symbol: '🔸', label: '低溫熨燙', desc: '熨斗圖示中點數表示溫度' },
      { symbol: '🔶', label: '不可熨燙', desc: '叉叉熨斗，避免直接加熱' },
    ],
  },
];

const COMMON_MISTAKES = [
  {
    wrong: '把所有衣物混在一起洗',
    right: '依顏色（淺色/深色）和材質（精緻/一般）分開洗',
    icon: '🔴',
  },
  {
    wrong: '使用過多洗劑',
    right: '過多洗劑難以清洗乾淨，反而讓衣物殘留化學物質，依標示用量即可',
    icon: '🔴',
  },
  {
    wrong: '衣物直接塞進洗衣機',
    right: '精緻衣物、有鉤子的內衣應放入洗衣網袋保護',
    icon: '🔴',
  },
  {
    wrong: '不看標籤直接洗',
    right: '每件衣物都有護理標籤，先確認再洗能避免大多數損壞',
    icon: '🔴',
  },
  {
    wrong: '汙漬用力搓揉',
    right: '搓揉會讓汙漬擴散並深入纖維，應從外往內輕壓處理',
    icon: '🔴',
  },
  {
    wrong: '羊毛或絲質衣物掛起晾乾',
    right: '這類材質應攤平晾乾，掛起會因重力造成變形',
    icon: '🔴',
  },
];

export default function CareGuidePage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            專業洗護知識
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            洗滌須知
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
            正確的洗護方式是衣物長壽的關鍵。
            <br className="hidden md:block" />
            了解各種材質的特性，讓每件衣物都能陪伴您更長久。
          </p>
        </div>
      </section>

      {/* 各材質洗護指南 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              各材質洗護指南
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              不同材質需要不同的照護方式，找到您衣物的材質類型
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {FABRIC_GUIDES.map((fabric, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 ${fabric.border} overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s backwards` }}
              >
                {/* 頂部 */}
                <div className={`bg-gradient-to-br ${fabric.color} p-6`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{fabric.emoji}</span>
                    <div>
                      <h3 className="font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                        {fabric.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {fabric.tags.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${fabric.badge}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 洗護要點 */}
                <div className="p-6 bg-white">
                  <ul className="space-y-2 mb-4">
                    {fabric.tips.map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-neutral-600)]">
                        <CheckCircle className="w-4 h-4 text-[var(--color-primary-400)] mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">{fabric.caution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 洗滌標籤解讀 */}
      <section className="py-20 bg-[var(--color-neutral-50)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              看懂衣物標籤符號
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              每件衣物都有護理標籤，學會解讀才能正確洗護
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {LABEL_SYMBOLS.map((group) => (
              <div key={group.group} className="bg-white rounded-2xl border-2 border-[var(--color-neutral-100)] p-6">
                <h3 className="font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-[var(--color-primary-500)] inline-block" />
                  {group.group}符號
                </h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--color-primary-50)] transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-neutral-100)] flex items-center justify-center text-2xl flex-shrink-0 font-bold text-[var(--color-neutral-700)]">
                        {item.symbol}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-neutral-800)] text-sm">{item.label}</p>
                        <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 常見洗滌錯誤 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              6 大常見洗滌錯誤
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              這些錯誤幾乎每個人都犯過，了解後就能避免衣物受損
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMON_MISTAKES.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-[var(--color-neutral-100)] overflow-hidden hover:border-[var(--color-primary-200)] hover:shadow-md transition-all duration-300"
                style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.07}s backwards` }}
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-red-50 border-b border-red-100">
                  <span className="text-lg">❌</span>
                  <p className="text-sm font-medium text-red-700">{item.wrong}</p>
                </div>
                <div className="flex items-start gap-3 px-5 py-4 bg-white">
                  <span className="text-lg mt-0.5">✅</span>
                  <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 還是不確定？交給我們 */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-heading)]">
            還是不確定怎麼洗？
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
            把衣物交給我們，專業師傅會依材質與狀況選擇最合適的洗護方式
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-10 py-4 bg-white text-[var(--color-primary-600)] rounded-full font-bold text-lg hover:bg-[var(--color-neutral-100)] transition-all hover:scale-105 shadow-2xl"
            >
              立即預約送洗
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
            >
              查看服務項目
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

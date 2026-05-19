import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle, Clock, Zap, ArrowRight } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '服務流程 | 精緻洗衣',
  description: '精緻洗衣服務流程說明：從預約收送、專業評估、精心洗護到品檢交件，讓您清楚了解衣物的每個洗護環節。',
};

const STEPS = [
  {
    number: '01',
    emoji: '📅',
    title: '線上或電話預約',
    duration: '5 分鐘',
    desc: '透過官網預約表單、電話或 LINE 告知收送需求。提供姓名、電話、地址與希望收送的日期時段即可。',
    details: [
      '可選擇到府收送或自行送達門市',
      '告知大概衣物數量，方便師傅備妥材料',
      '若有急件需求請提前說明',
      '可備註特殊汙漬或材質讓我們提前準備',
    ],
  },
  {
    number: '02',
    emoji: '🚚',
    title: '專人到府收取',
    duration: '按預約時段',
    desc: '專業收送人員按預約時段準時到府，將衣物逐件清點並開立收件單，讓您隨時掌握衣物狀態。',
    details: [
      '準時到府，不讓您久等',
      '每件衣物逐一確認並記錄',
      '開立收件單，詳列件數與狀態',
      '當場告知預計完成時間',
    ],
  },
  {
    number: '03',
    emoji: '🔍',
    title: '專業評估與報價',
    duration: '收件當天',
    desc: '師傅仔細檢查每件衣物的材質、標籤指示及污漬狀況，給予最適合的洗護建議，並提供透明報價。',
    details: [
      '確認衣物標籤洗護符號',
      '評估污漬類型與去除可行性',
      '特殊材質或情況主動告知',
      '報價後確認才開始洗護',
    ],
  },
  {
    number: '04',
    emoji: '🧺',
    title: '精心洗護處理',
    duration: '1–5 個工作天',
    desc: '依材質選擇最適合的洗護方式，使用專業設備與環保認證洗劑，細心呵護每件衣物的每個細節。',
    details: [
      '依材質分別進行專業洗護',
      '使用環保認證洗劑，溫和不傷衣物',
      '特殊污漬進行針對性除汙處理',
      '完整記錄洗護流程',
    ],
  },
  {
    number: '05',
    emoji: '🔎',
    title: '品質檢驗',
    duration: '洗護完成後',
    desc: '洗護完成後由資深師傅逐件進行品質檢查，確認洗淨效果、外觀完整性，達到標準才進行包裝。',
    details: [
      '確認污漬是否完全去除',
      '檢查衣物外觀有無異狀',
      '若有任何問題主動告知並重新處理',
      '達到品質標準後才包裝',
    ],
  },
  {
    number: '06',
    emoji: '📦',
    title: '包裝送回',
    duration: '按約定時間',
    desc: '衣物以防塵套妥善包裝，專人送回您手中。您也可以選擇到門市自取，方便又彈性。',
    details: [
      '使用透氣防塵套包裝，保持清潔',
      '提前電話確認送達時間',
      '當面點交，確認件數無誤',
      '提供保養收納小建議',
    ],
  },
];

const TIMELINES = [
  { type: '標準件', duration: '3–5 個工作天', surcharge: '無加價', color: 'bg-[var(--color-primary-50)] border-[var(--color-primary-200)]', badge: 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]' },
  { type: '急件（48 小時）', duration: '2 個工作天', surcharge: '加收 30%', color: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  { type: '急急件（24 小時）', duration: '1 個工作天', surcharge: '加收 50%', color: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700' },
];

const FAQS = [
  { q: '可以指定收送時間嗎？', a: '可以，預約時提供希望的時段（早上 9–12 點、下午 1–6 點、傍晚 6–9 點），我們將盡量配合安排。' },
  { q: '衣物件數很少，也可以預約嗎？', a: '當然可以！我們沒有最低件數限制，哪怕只有一件珍貴的衣物也歡迎預約。' },
  { q: '如果洗後不滿意怎麼辦？', a: '請在收件當天告知，我們會立即安排免費重洗。若確認是我們的疏失造成損壞，將依實際價值賠償。' },
  { q: '可以自行送來門市嗎？', a: '當然！到府收送是我們的便民服務，但您也可以自行帶來門市，現場評估後立即開單。' },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 right-0 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            透明、簡單、放心
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            服務流程
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
            從預約到取件，每個環節都公開透明。
            <br className="hidden md:block" />
            讓您的衣物在我們手中得到最完善的照護。
          </p>
        </div>
      </section>

      {/* 六步驟流程 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              六個步驟，全程守護
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              每個環節都有專業師傅負責，確保衣物得到最好的對待
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group relative flex gap-6 p-7 rounded-2xl border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl transition-all duration-300 bg-white"
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.07}s backwards` }}
              >
                {/* 步驟號碼 */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[var(--color-primary-200)] group-hover:scale-105 transition-transform">
                    {step.number}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[1rem] bg-gradient-to-b from-[var(--color-primary-200)] to-transparent" />
                  )}
                </div>

                {/* 內容 */}
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-2xl">{step.emoji}</span>
                    <h3 className="text-xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                      {step.title}
                    </h3>
                    <span className="flex items-center gap-1 px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[var(--color-neutral-600)] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-neutral-500)]">
                        <CheckCircle className="w-4 h-4 text-[var(--color-primary-400)] mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 時程說明 */}
      <section className="py-20 bg-[var(--color-neutral-50)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              完成時程說明
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              依需求選擇最適合的時程，急件也能安心交給我們
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIMELINES.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 p-7 text-center ${item.color} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${item.badge}`}>
                  {item.surcharge}
                </span>
                <h3 className="font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] text-lg mb-2">
                  {item.type}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-[var(--color-primary-600)]">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold text-xl">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--color-neutral-400)] text-sm mt-6">
            ※ 工作天不含週六、日及國定假日。特殊材質或大量件數可能需要額外時間。
          </p>
        </div>
      </section>

      {/* 流程 FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
                關於流程的常見問題
              </h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[var(--color-neutral-50)] border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-200)] transition-colors"
                >
                  <h3 className="font-bold text-[var(--color-neutral-900)] mb-2 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary-500)] text-white text-xs flex items-center justify-center font-bold mt-0.5">Q</span>
                    {faq.q}
                  </h3>
                  <p className="text-[var(--color-neutral-600)] leading-relaxed pl-9">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[var(--color-neutral-500)] mb-3">還有其他問題？</p>
              <Link href="/faq" className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium hover:underline">
                查看完整常見問題 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              準備好了嗎？
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg mb-10">
              立即預約，讓我們為您的衣物提供最專業的照護
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-[var(--color-primary-500)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 shadow-lg shadow-[var(--color-primary-200)]"
              >
                立即預約收送
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
                className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-[var(--color-primary-400)] text-[var(--color-primary-600)] rounded-full font-bold text-lg hover:bg-[var(--color-primary-50)] transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                電話預約
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

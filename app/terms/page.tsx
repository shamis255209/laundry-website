import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '服務條款 | 精緻洗衣',
  description: '精緻洗衣服務條款，包含預約規範、衣物收件規定、賠償辦法及雙方權利義務說明。',
};

const LAST_UPDATED = '2025 年 5 月 1 日';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '一、條款接受',
    icon: '📜',
    content: [
      {
        body: `使用「${SITE_INFO.name}」（以下稱「本公司」）之服務，即表示您已閱讀、理解並同意遵守本服務條款。若您不同意本條款，請勿使用本公司提供之任何服務。\n\n本公司保留隨時修改本條款之權利，修改後之條款將公告於本網站，繼續使用服務即表示接受修改後之條款。`,
      },
    ],
  },
  {
    id: 'booking',
    title: '二、預約與收送規範',
    icon: '📅',
    content: [
      {
        subtitle: '預約方式',
        items: [
          '客戶可透過本網站線上表單、電話或 LINE 進行預約',
          '預約後本公司將於 24 小時內以電話確認收送時間',
          '若無法取得聯繫，本公司保留取消預約之權利',
        ],
      },
      {
        subtitle: '取消與變更',
        items: [
          '如需取消或變更預約，請於預約收送時間前一天來電告知',
          '當日取消或臨時不在家，可能影響下次預約排程',
          '急件訂單確認後取消，視情況收取作業費用',
        ],
      },
      {
        subtitle: '收送規定',
        items: [
          '到府收送服務範圍依本公司公告為準',
          '收送時間為預約時段，實際時間可能因交通狀況略有調整',
          '請於收送時段內確保有人在家或安排代收',
          '收件時雙方共同確認件數，完成後開立收件單',
        ],
      },
    ],
  },
  {
    id: 'items',
    title: '三、衣物收件規定',
    icon: '👔',
    content: [
      {
        subtitle: '收件前請確認',
        items: [
          '清空衣物口袋內的所有物品（鑰匙、零錢、證件等）',
          '告知衣物上的特殊汙漬、損壞或需特別注意之處',
          '確認衣物標籤完整，若已脫落請事先告知材質',
          '高價值衣物（如婚紗、名牌精品）請事先聲明並投保',
        ],
      },
      {
        subtitle: '本公司不受理以下衣物',
        items: [
          '嚴重污染到可能影響其他衣物或設備之物品',
          '有傳染性疾病疑慮的衣物（須事先告知並特殊處理）',
          '標示「不可水洗」且無乾洗標示的衣物',
          '客戶無法說明材質且標籤缺失的高風險衣物',
        ],
      },
    ],
  },
  {
    id: 'service',
    title: '四、服務說明',
    icon: '🧺',
    content: [
      {
        subtitle: '服務執行',
        items: [
          '本公司依衣物標籤及材質選擇最適合的洗護方式',
          '特殊污漬處理前將評估可行性，無法去除者會事先告知',
          '完成時間依服務類型及件數而定，急件需額外費用',
          '洗護完成後進行品質檢驗，達標後才出件',
        ],
      },
      {
        subtitle: '完成時程',
        items: [
          '標準件：3–5 個工作天（不含例假日）',
          '急件（48 小時）：加收原價 30%',
          '急急件（24 小時）：加收原價 50%',
          '特殊材質或大量件數可能需要額外時間，將事先告知',
        ],
      },
    ],
  },
  {
    id: 'payment',
    title: '五、計價與付款',
    icon: '💰',
    content: [
      {
        subtitle: '計價方式',
        items: [
          '依衣物材質、尺寸、服務類型及污漬狀況計價',
          '基本價格列於本公司服務項目頁面',
          '特殊處理項目將於評估後另行報價，確認後執行',
          '本公司不設定最低消費金額',
        ],
      },
      {
        subtitle: '付款方式',
        items: [
          '現金付款：送回衣物時以現金支付',
          '轉帳付款：依本公司提供之帳戶資訊於取件前完成',
          '如有任何計費疑問，請於取件時當場提出',
        ],
      },
    ],
  },
  {
    id: 'compensation',
    title: '六、衣物損壞賠償辦法',
    icon: '🛡️',
    content: [
      {
        subtitle: '本公司責任範圍',
        items: [
          '因本公司疏失造成衣物損壞、遺失，本公司負賠償責任',
          '賠償金額依衣物購買發票或市場行情評估，最高賠償為衣物實際價值',
          '衣物損壞賠償以單件洗護費用之 10 倍為上限，特殊聲明者另計',
          '收件時雙方確認之既有損壞不在賠償範圍內',
        ],
      },
      {
        subtitle: '免責情形',
        items: [
          '衣物因材質老化、纖維脆化等自然因素造成的損壞',
          '客戶未告知特殊材質，導致按一般程序洗護後的損壞',
          '未申報的高價值衣物超過一般賠償上限的部分',
          '因不可抗力因素（天災、停電等）造成的影響',
        ],
      },
      {
        subtitle: '申訴程序',
        body: '如對服務結果有任何異議，請於收件後 48 小時內聯繫本公司，並保留相關衣物及證明文件，以利後續處理。',
      },
    ],
  },
  {
    id: 'guarantee',
    title: '七、滿意保證',
    icon: '✅',
    content: [
      {
        body: '若您對洗護結果不滿意，請於收件當天告知，本公司將安排免費重洗一次。重洗後仍不滿意者，依本公司評估結果退還該件洗護費用。',
      },
    ],
  },
  {
    id: 'disclaimer',
    title: '八、免責聲明',
    icon: '⚠️',
    content: [
      {
        items: [
          '本公司對本網站內容之正確性、完整性不做絕對保證',
          '本公司不對因使用本服務而產生的間接、附帶或衍生損失負責',
          '本網站連結之第三方網站內容，本公司不負任何責任',
        ],
      },
    ],
  },
  {
    id: 'jurisdiction',
    title: '九、準據法與管轄法院',
    icon: '⚖️',
    content: [
      {
        body: '本服務條款依中華民國法律解釋與適用。因本服務條款所生之爭議，雙方同意以臺灣臺中地方法院為第一審管轄法院。',
      },
    ],
  },
];

interface ContentBlock {
  subtitle?: string;
  body?: string;
  items?: string[];
}

function renderBody(body: string) {
  return body.split('\n').map((line, i) => (
    <p key={i} className={`text-[var(--color-neutral-600)] leading-relaxed ${i > 0 ? 'mt-2' : ''}`}>{line}</p>
  ));
}

function renderItem(item: string) {
  const parts = item.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-[var(--color-neutral-800)]">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

export default function TermsPage() {
  const tableOfContents = SECTIONS.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="min-h-screen bg-white">
      {/* 頂部色帶 */}
      <div className="h-2 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)]" />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* 左側目錄（桌面版） */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-xs font-bold text-[var(--color-neutral-400)] tracking-widest uppercase mb-4">目錄</p>
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-2 px-3 rounded-lg text-sm text-[var(--color-neutral-500)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  {item.title.replace(/^[一二三四五六七八九]、/, '')}
                </a>
              ))}
              <div className="pt-4 border-t border-[var(--color-neutral-100)]">
                <Link href="/privacy" className="block py-2 px-3 rounded-lg text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">
                  → 隱私權政策
                </Link>
              </div>
            </div>
          </aside>

          {/* 主要內容 */}
          <main className="lg:col-span-3">
            {/* 標題區 */}
            <div className="mb-10 pb-8 border-b border-[var(--color-neutral-100)]">
              <h1 className="text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-3">
                服務條款
              </h1>
              <p className="text-[var(--color-neutral-500)]">最後更新：{LAST_UPDATED}</p>
              <div className="mt-5 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-800 leading-relaxed text-sm">
                  請在使用本公司服務前仔細閱讀以下條款。使用本服務即代表您同意受本條款約束。
                  如有任何疑問，歡迎先行聯繫我們說明。
                </p>
              </div>
            </div>

            {/* 各章節 */}
            <div className="space-y-12">
              {SECTIONS.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-6">
                    <span className="text-2xl">{section.icon}</span>
                    {section.title}
                  </h2>
                  <div className="space-y-6 pl-2">
                    {(section.content as ContentBlock[]).map((block, bi) => (
                      <div key={bi}>
                        {block.subtitle && (
                          <h3 className="font-bold text-[var(--color-neutral-800)] mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-5 rounded-full bg-[var(--color-primary-400)] inline-block" />
                            {block.subtitle}
                          </h3>
                        )}
                        {block.body && renderBody(block.body)}
                        {block.items && (
                          <ul className="space-y-2 mt-2">
                            {block.items.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-2.5 text-[var(--color-neutral-600)] text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-400)] mt-2 flex-shrink-0" />
                                <span>{renderItem(item)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 border-b border-[var(--color-neutral-100)]" />
                </section>
              ))}
            </div>

            {/* 聯絡資訊 */}
            <div className="mt-12 p-6 rounded-2xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)]">
              <h3 className="font-bold text-[var(--color-neutral-900)] mb-3 font-[var(--font-heading)]">聯絡我們</h3>
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed mb-3">
                對本服務條款有任何疑問，歡迎直接聯繫我們：
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-[var(--color-neutral-700)]">公司名稱：{SITE_INFO.name}</p>
                <p className="text-[var(--color-neutral-700)]">電話：<a href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`} className="text-[var(--color-primary-500)] hover:underline">{SITE_INFO.phone}</a></p>
                <p className="text-[var(--color-neutral-700)]">Email：<a href={`mailto:${SITE_INFO.email}`} className="text-[var(--color-primary-500)] hover:underline">{SITE_INFO.email}</a></p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/" className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">← 回首頁</Link>
              <Link href="/privacy" className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">隱私權政策 →</Link>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

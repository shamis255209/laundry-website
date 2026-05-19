import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '隱私權政策 | 精緻洗衣',
  description: '精緻洗衣隱私權政策，說明我們如何收集、使用及保護您的個人資料。',
};

const LAST_UPDATED = '2025 年 5 月 1 日';

const SECTIONS = [
  {
    id: 'collection',
    title: '一、個人資料的收集',
    icon: '📋',
    content: [
      {
        subtitle: '我們收集哪些資料',
        items: [
          '**基本識別資料**：姓名、電話號碼、電子郵件地址',
          '**服務相關資料**：收送地址、預約日期與時段、服務項目、備註事項',
          '**交易紀錄**：預約記錄、服務歷程、付款資訊',
          '**技術資料**：瀏覽器類型、IP 位址、瀏覽頁面紀錄（Cookie）',
        ],
      },
      {
        subtitle: '資料收集方式',
        items: [
          '您主動填寫線上預約表單時',
          '您透過電話或 LINE 與我們聯繫時',
          '您使用本網站時自動產生的技術資料',
        ],
      },
    ],
  },
  {
    id: 'usage',
    title: '二、個人資料的使用目的',
    icon: '🎯',
    content: [
      {
        subtitle: '我們將您的資料用於以下目的',
        items: [
          '**提供服務**：處理預約申請、安排到府收送、完成洗護服務',
          '**服務確認**：透過電話或 Email 確認預約細節與服務進度',
          '**客戶服務**：回覆您的詢問、處理問題與投訴',
          '**服務改善**：分析服務使用情況，優化您的使用體驗',
          '**法規遵循**：依法律規定保存交易紀錄',
        ],
      },
    ],
  },
  {
    id: 'sharing',
    title: '三、個人資料的分享',
    icon: '🤝',
    content: [
      {
        subtitle: '我們不會販售您的個人資料',
        body: '精緻洗衣承諾不會將您的個人資料出售、出租或交換給第三方用於商業目的。',
        items: [
          '**服務夥伴**：僅在提供服務所需範圍內，與協助執行業務的服務商共享（如物流、金流）',
          '**法律要求**：依法律規定或政府機關要求時，依規定提供必要資料',
          '**徵得同意**：在您明確同意的情況下，與特定第三方共享',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: '四、個人資料的保護',
    icon: '🔒',
    content: [
      {
        subtitle: '我們採取以下安全措施保護您的資料',
        items: [
          '資料傳輸使用 SSL/TLS 加密技術',
          '資料庫存取設有嚴格權限控制',
          '定期進行安全性審查與更新',
          '員工均簽署保密協議，接受個資保護教育訓練',
        ],
      },
      {
        subtitle: '資料保存期限',
        body: '我們僅在提供服務所需期間及法律規定期限內保存您的個人資料。服務關係終止後，我們將依照相關法規規定進行資料銷毀。',
      },
    ],
  },
  {
    id: 'cookies',
    title: '五、Cookie 使用說明',
    icon: '🍪',
    content: [
      {
        subtitle: 'Cookie 的用途',
        body: '本網站使用 Cookie 以改善您的瀏覽體驗：',
        items: [
          '**必要 Cookie**：維持網站基本功能運作',
          '**功能 Cookie**：記住您的偏好設定',
          '**分析 Cookie**：了解訪客如何使用本網站（如 Google Analytics）',
        ],
      },
      {
        subtitle: '如何管理 Cookie',
        body: '您可以透過瀏覽器設定管理或拒絕 Cookie。請注意，停用部分 Cookie 可能影響網站功能的正常使用。',
      },
    ],
  },
  {
    id: 'rights',
    title: '六、您的權利',
    icon: '⚖️',
    content: [
      {
        subtitle: '依據個人資料保護法，您享有以下權利',
        items: [
          '**查詢與閱覽**：查詢我們持有的您的個人資料',
          '**製給複製本**：要求提供您個人資料的複本',
          '**補充或更正**：要求更正不正確的個人資料',
          '**停止蒐集、處理或利用**：在特定情形下要求停止使用您的資料',
          '**刪除**：要求刪除您的個人資料（法律規定保存者除外）',
        ],
      },
      {
        subtitle: '如何行使您的權利',
        body: `如需行使上述權利，請透過以下方式聯繫我們：\n電話：${SITE_INFO.phone}\nEmail：${SITE_INFO.email}`,
      },
    ],
  },
  {
    id: 'update',
    title: '七、政策更新',
    icon: '🔄',
    content: [
      {
        body: '我們可能會不定期更新本隱私權政策。政策修訂後，我們將在本頁面發布更新版本，並標示最新更新日期。若有重大變更，我們將透過網站公告或 Email 通知您。建議您定期查閱本頁面以了解最新隱私保護措施。',
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
    <p key={i} className="text-[var(--color-neutral-600)] leading-relaxed mb-1">{line}</p>
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

export default function PrivacyPage() {
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
                  {item.title.replace(/^[一二三四五六七]、/, '')}
                </a>
              ))}
              <div className="pt-4 border-t border-[var(--color-neutral-100)]">
                <Link href="/terms" className="block py-2 px-3 rounded-lg text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">
                  → 服務條款
                </Link>
              </div>
            </div>
          </aside>

          {/* 主要內容 */}
          <main className="lg:col-span-3">
            {/* 標題區 */}
            <div className="mb-10 pb-8 border-b border-[var(--color-neutral-100)]">
              <h1 className="text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-3">
                隱私權政策
              </h1>
              <p className="text-[var(--color-neutral-500)]">最後更新：{LAST_UPDATED}</p>
              <div className="mt-5 p-5 bg-[var(--color-primary-50)] rounded-2xl border border-[var(--color-primary-100)]">
                <p className="text-[var(--color-neutral-700)] leading-relaxed text-sm">
                  <strong>{SITE_INFO.name}</strong>（以下稱「本公司」）非常重視您的個人資料與隱私保護。
                  本政策說明我們如何收集、使用、保護您的個人資料，以及您所享有的相關權利。
                  使用本網站或接受本公司服務，即表示您同意本政策之內容。
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
              <p className="text-[var(--color-neutral-600)] text-sm leading-relaxed">
                若您對本隱私權政策有任何疑問或需要行使個人資料相關權利，請聯繫：
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-[var(--color-neutral-700)]">公司名稱：{SITE_INFO.name}</p>
                <p className="text-[var(--color-neutral-700)]">電話：<a href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`} className="text-[var(--color-primary-500)] hover:underline">{SITE_INFO.phone}</a></p>
                <p className="text-[var(--color-neutral-700)]">Email：<a href={`mailto:${SITE_INFO.email}`} className="text-[var(--color-primary-500)] hover:underline">{SITE_INFO.email}</a></p>
                <p className="text-[var(--color-neutral-700)]">地址：{SITE_INFO.address}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link href="/" className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">← 回首頁</Link>
              <Link href="/terms" className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-primary-500)] transition-colors">服務條款 →</Link>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

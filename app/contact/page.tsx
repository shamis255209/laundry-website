import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE_INFO, SOCIAL_LINKS } from '@/lib/constants';
import BookingForm from '@/components/contact/BookingForm';

export const metadata: Metadata = {
  title: '聯絡我們 | 精緻洗衣',
  description: '預約到府收送洗衣服務，填寫表單或直接致電，我們將於 24 小時內確認。',
};

const CONTACT_ITEMS = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: '電話',
    value: SITE_INFO.phone,
    href: `tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`,
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: SITE_INFO.email,
    href: `mailto:${SITE_INFO.email}`,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: '地址',
    value: SITE_INFO.address,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            免費到府收送
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            預約收送服務
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
            填寫以下表單，或直接致電我們。
            <br className="hidden md:block" />
            專人將於 24 小時內確認收送時間。
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">

            {/* 左側：聯絡資訊 */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-2">
                  聯絡資訊
                </h2>
                <p className="text-[var(--color-neutral-500)]">
                  有任何疑問歡迎直接聯繫我們
                </p>
              </div>

              {/* 聯絡方式 */}
              <div className="space-y-4">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-neutral-50)] hover:bg-[var(--color-primary-50)] transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-500)] flex-shrink-0 group-hover:bg-[var(--color-primary-200)] transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-neutral-400)] mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[var(--color-neutral-700)] font-medium hover:text-[var(--color-primary-600)] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[var(--color-neutral-700)] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 營業時間 */}
              <div className="p-5 rounded-2xl bg-[var(--color-primary-50)] border border-[var(--color-primary-100)]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[var(--color-primary-500)]" />
                  <h3 className="font-bold text-[var(--color-neutral-900)]">營業時間</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-[var(--color-neutral-700)]">
                    <span>週一 ～ 週五</span>
                    <span className="font-medium">09:00 – 21:00</span>
                  </li>
                  <li className="flex justify-between text-[var(--color-neutral-700)]">
                    <span>週六 ～ 週日</span>
                    <span className="font-medium">10:00 – 18:00</span>
                  </li>
                  <li className="flex justify-between text-[var(--color-neutral-400)] text-xs mt-1">
                    <span>國定假日</span>
                    <span>公休</span>
                  </li>
                </ul>
              </div>

              {/* 社群媒體 */}
              <div>
                <p className="text-sm font-medium text-[var(--color-neutral-500)] mb-3">也可以透過以下方式聯繫</p>
                <div className="flex gap-3">
                  <a
                    href={SOCIAL_LINKS.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#06C755] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    LINE 聯繫
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* 右側：預約表單 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border-2 border-[var(--color-neutral-100)] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-2">
                  線上預約表單
                </h2>
                <p className="text-[var(--color-neutral-500)] mb-8">
                  填寫完成後，我們將主動聯繫您確認細節
                </p>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-12 bg-[var(--color-neutral-50)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-[var(--color-neutral-700)] mb-4 font-[var(--font-heading)]">
              預約注意事項
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--color-neutral-600)]">
              {[
                '請於預約時段前將衣物備妥',
                '特殊材質或嚴重污漬請事先告知',
                '急件加急費用將於評估後另行通知',
                '如需取消請於前一天來電告知',
                '首次預約享 9 折優惠',
                '皮件、鞋類請裝袋避免刮傷',
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-primary-500)] mt-0.5">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}

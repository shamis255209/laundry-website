import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/lib/supabase';
import FaqAccordion from '@/components/faq/FaqAccordion';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '常見問題 | 精緻洗衣',
  description: '洗衣常見問題解答，包含保存方式、材質洗護、服務類型、洗劑選擇與計價方式。',
};

const STATIC_FAQS: FAQ[] = [
  { id: '1', category: '保存問題', question: '洗好的衣服如何保存？', answer: '建議使用透氣防塵套保護，放置在乾燥通風處。羊毛、絲質等天然纖維衣物應避免塑膠袋密封，以免發霉。', order_number: 1, is_active: true, created_at: '' },
  { id: '2', category: '保存問題', question: '需要多久送洗一次？', answer: '日常穿著的衣物建議每3-5次穿著後送洗。西裝、大衣等外套則可視髒污程度，約每季送洗一次即可。', order_number: 2, is_active: true, created_at: '' },
  { id: '3', category: '材質問題', question: '羊毛會縮水嗎？', answer: '我們使用專業羊毛洗劑與低溫處理，能夠有效防止縮水。但仍建議選擇手洗或乾洗服務，確保衣物完整性。', order_number: 3, is_active: true, created_at: '' },
  { id: '4', category: '材質問題', question: '絲質衣物能水洗嗎？', answer: '純絲材質較為脆弱，建議選擇乾洗服務。若必須水洗，我們會使用專業絲質洗劑與手洗方式處理。', order_number: 4, is_active: true, created_at: '' },
  { id: '5', category: '類型問題', question: '西裝需要多久乾洗一次？', answer: '建議每季或穿著20-30次後乾洗一次。過度清洗可能損傷纖維，平時可用衣物刷清潔灰塵即可。', order_number: 5, is_active: true, created_at: '' },
  { id: '6', category: '類型問題', question: '羽絨衣可以水洗嗎？', answer: '可以的！我們有專業的羽絨衣清洗設備，能夠在不破壞羽絨結構的情況下深層清潔。', order_number: 6, is_active: true, created_at: '' },
  { id: '7', category: '洗劑問題', question: '使用什麼洗劑？', answer: '我們使用通過環保認證的洗劑，對環境友善且溫和不傷衣物，同時具備優異的去汙效果。', order_number: 7, is_active: true, created_at: '' },
  { id: '8', category: '洗劑問題', question: '對皮膚敏感者友善嗎？', answer: '是的！我們的洗劑經過多次漂洗，不殘留化學物質，適合皮膚敏感者使用。如有特殊需求，也可以使用您自備的洗劑。', order_number: 8, is_active: true, created_at: '' },
  { id: '9', category: '價格問題', question: '如何計價？', answer: '依照衣物材質、尺寸、髒污程度計價。基本價格已列於服務項目中，特殊處理項目會於評估時詳細說明。', order_number: 9, is_active: true, created_at: '' },
  { id: '10', category: '價格問題', question: '急件需要加價嗎？', answer: '24小時急件服務需加收原價50%，48小時急件加收30%。標準件3-5個工作天無須加價。', order_number: 10, is_active: true, created_at: '' },
];

async function getFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('category')
    .order('order_number');

  if (error || !data?.length) return STATIC_FAQS;
  return data;
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-20 right-0 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            {faqs.length} 個常見問題
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            常見問題
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
            找不到答案？歡迎直接聯繫我們，
            <br className="hidden md:block" />
            專業客服將為您解答。
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FaqAccordion faqs={faqs} categories={categories} />
          </div>
        </div>
      </section>

      {/* 找不到答案 CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">🤔</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-3">
              還有其他問題？
            </h2>
            <p className="text-[var(--color-neutral-500)] mb-8 leading-relaxed">
              我們的專業客服團隊隨時為您解答，
              不論是材質疑問還是服務詢問，歡迎直接聯繫。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary-500)] text-white rounded-full font-bold hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 shadow-lg shadow-[var(--color-primary-200)]"
              >
                <MessageCircle className="w-5 h-5" />
                線上詢問
              </Link>
              <a
                href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--color-primary-400)] text-[var(--color-primary-600)] rounded-full font-bold hover:bg-[var(--color-primary-50)] transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {SITE_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/lib/supabase';
import { CheckCircle, Clock, Truck, Star, Shield, Leaf } from 'lucide-react';
import Link from 'next/link';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '服務項目 | 精緻洗衣',
  description: '提供專業濕洗、精緻手洗、環保乾洗、皮件保養、鞋子洗滌、專業除汙等全方位洗護服務。',
};

const STATIC_SERVICES: Service[] = [
  { id: '1', name: '專業濕洗', description: '使用純淨水質與環保洗劑，適合棉質、混紡等日常衣物的深層清潔', price_range: '單件 $80 起', order_number: 1, is_active: true, created_at: '' },
  { id: '2', name: '精緻手洗', description: '針對高級衣物、精緻蕾絲、羊毛羊絨等材質，由專業師傅手工清洗', price_range: '單件 $150 起', order_number: 2, is_active: true, created_at: '' },
  { id: '3', name: '環保乾洗', description: '採用環保溶劑，不傷害衣物纖維，適合西裝、大衣、絲質衣物', price_range: '單件 $120 起', order_number: 3, is_active: true, created_at: '' },
  { id: '4', name: '皮件保養', description: '專業皮革清潔、保養、補色服務，延長皮件使用壽命', price_range: '依項目報價', order_number: 4, is_active: true, created_at: '' },
  { id: '5', name: '鞋子洗滌', description: '各式鞋類深層清潔、除臭、美白服務，讓鞋子煥然一新', price_range: '單雙 $200 起', order_number: 5, is_active: true, created_at: '' },
  { id: '6', name: '專業除汙', description: '咖啡、紅酒、醬油、口紅等頑固汙漬的專業處理', price_range: '依汙漬狀況報價', order_number: 6, is_active: true, created_at: '' },
  { id: '7', name: '除黴處理', description: '發霉衣物的深層清潔與殺菌，恢復衣物原有狀態', price_range: '單件 $150 起', order_number: 7, is_active: true, created_at: '' },
];

const SERVICE_ICONS: Record<string, string> = {
  '專業濕洗': '💧',
  '精緻手洗': '🤲',
  '環保乾洗': '🌿',
  '皮件保養': '👜',
  '鞋子洗滌': '👟',
  '專業除汙': '✨',
  '除黴處理': '🛡️',
};

type ServiceWithIcon = Service & { icon: string };

async function getServices(): Promise<ServiceWithIcon[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_number');

  const source = (!error && data?.length) ? data : STATIC_SERVICES;
  return source.map((s) => ({ ...s, icon: SERVICE_ICONS[s.name] ?? '🧺' }));
}

const PROCESS_STEPS = [
  { icon: <Truck className="w-8 h-8" />, step: '01', title: '預約到府收送', desc: '線上或電話預約，專人按時到府收取衣物' },
  { icon: <Star className="w-8 h-8" />, step: '02', title: '專業評估', desc: '師傅仔細檢查材質、汙漬，給予最適合的洗護方案' },
  { icon: <Leaf className="w-8 h-8" />, step: '03', title: '精心洗護', desc: '使用專業設備與環保洗劑，細心呵護每件衣物' },
  { icon: <Shield className="w-8 h-8" />, step: '04', title: '品檢送回', desc: '專人品質檢驗，包裝完好後準時送回您手中' },
];

const GUARANTEES = [
  { icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '洗後不滿意免費重洗' },
  { icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '衣物損壞全額賠償' },
  { icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '環保認證洗劑，安心無殘留' },
  { icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '準時收送，絕不延誤' },
  { icon: <Clock className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '標準件 3-5 個工作天' },
  { icon: <Clock className="w-6 h-6 text-[var(--color-primary-500)]" />, text: '急件 24 小時快速處理' },
];

export default async function ServicesPage() {
  const services: ServiceWithIcon[] = await getServices();

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-0 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            全方位洗護服務
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            服務項目
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
            從日常衣物到珍貴皮件，我們提供全方位的專業洗護服務，
            <br className="hidden md:block" />
            用最細心的態度，守護您的每件衣物。
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              我們的服務
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              依衣物材質與需求，選擇最適合的洗護方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-400)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s backwards` }}
              >
                {/* 頂部裝飾條 */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-8">
                  <div className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                    {service.name}
                  </h3>
                  <p className="text-[var(--color-neutral-500)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-primary-600)] font-bold text-lg">
                      {service.price_range ?? '詢問報價'}
                    </span>
                    <Link
                      href="/contact"
                      className="px-4 py-2 text-sm font-medium text-[var(--color-primary-600)] border border-[var(--color-primary-300)] rounded-full hover:bg-[var(--color-primary-500)] hover:text-white hover:border-[var(--color-primary-500)] transition-all duration-200"
                    >
                      立即預約
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--color-neutral-400)] text-sm mt-10">
            * 實際價格依衣物材質、尺寸與狀況而定，歡迎致電或線上詢問報價
          </p>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              服務流程
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg max-w-xl mx-auto">
              簡單四步驟，讓衣物煥然一新
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* 連接線（非最後一項） */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-0.5 bg-gradient-to-r from-[var(--color-primary-300)] to-[var(--color-primary-100)]" />
                )}

                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg border-2 border-[var(--color-primary-200)] text-[var(--color-primary-500)] mb-5 group-hover:border-[var(--color-primary-400)] transition-colors">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-primary-500)] text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                  {step.title}
                </h3>
                <p className="text-[var(--color-neutral-500)] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] rounded-3xl p-10 md:p-14">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
                我們的承諾
              </h2>
              <p className="text-[var(--color-neutral-600)] text-lg">
                每件衣物都是我們的責任，品質不達標絕不交件
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {GUARANTEES.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
                  {item.icon}
                  <span className="text-[var(--color-neutral-700)] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-[var(--font-heading)]">
            立即預約，享受專業洗護服務
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-xl mx-auto">
            首次預約享 9 折優惠，到府收送不加價
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-white text-[var(--color-primary-600)] rounded-full font-bold text-lg hover:bg-[var(--color-neutral-100)] transition-all hover:scale-105 shadow-2xl"
            >
              立即預約收送
            </Link>
            <a
              href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
              className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
            >
              電話諮詢
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

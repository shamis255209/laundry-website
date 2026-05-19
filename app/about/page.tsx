import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Leaf, Award, Users, ArrowRight } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: '關於我們 | 精緻洗衣',
  description: '精緻洗衣的品牌故事、服務理念與創立歷程。用專業與溫度，守護每件衣物背後的珍貴記憶。',
};

const VALUES = [
  {
    icon: <Award className="w-7 h-7" />,
    title: '專業技術',
    desc: '持續進修最新洗護技術，引進日本頂級設備，確保每件衣物都得到最適合的處理方式。',
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: '環保理念',
    desc: '堅持使用通過環保認證的洗劑，減少對環境的衝擊，讓洗衣這件事對地球更友善。',
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: '用心服務',
    desc: '每件送來的衣物，我們都當作自己最珍貴的物品來對待，因為它承載著您生命中的美好時刻。',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: '信任關係',
    desc: '超過千位回頭客是我們最大的驕傲。透明計價、誠實評估，用真誠建立長久的信任。',
  },
];

const MILESTONES = [
  { year: '2015', title: '創立', desc: '在台中西區開設第一家店，以「用心洗護每件衣物」為信念出發。' },
  { year: '2017', title: '引進設備', desc: '投入引進日本洗護設備，大幅提升洗淨品質與處理能力。' },
  { year: '2019', title: '到府收送', desc: '推出免費到府收送服務，讓忙碌的現代人不再為洗衣煩惱。' },
  { year: '2021', title: '環保認證', desc: '取得環保洗劑使用認證，成為台中首批通過認證的精緻洗衣店。' },
  { year: '2023', title: '數位升級', desc: '推出線上預約系統，客戶可隨時追蹤衣物洗護進度。' },
  { year: '2025', title: '持續前進', desc: '服務超過 5,000 位顧客，持續精進，守護更多衣物背後的故事。' },
];

const TEAM_STATS = [
  { number: '10+', label: '年洗護經驗' },
  { number: '5,000+', label: '服務顧客' },
  { number: '98%', label: '顧客滿意度' },
  { number: '24hr', label: '急件處理' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-700)] to-[var(--color-primary-500)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            創立於 2015 年
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[var(--font-heading)]">
            關於我們
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            我們不只是洗衣店，
            <br className="hidden md:block" />
            我們是守護衣物記憶的人。
          </p>
        </div>
        {/* 波浪底部 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左側：文字 */}
            <div>
              <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-6 leading-snug">
                一件衣物，<br />一段故事
              </h2>
              <div className="space-y-4 text-[var(--color-neutral-600)] leading-relaxed">
                <p>
                  創辦人阿志從小跟著外婆在洗衣店長大，看著外婆用雙手細心對待每件送來的衣物，學到的不只是洗衣技術，更是對衣物背後故事的尊重。
                </p>
                <p>
                  2015 年，帶著這份信念，他在台中西區開設了「精緻洗衣」。從最初只有兩台機器的小店，到如今擁有完整洗護設備的專業店面，不變的是那份對每件衣物的用心。
                </p>
                <p>
                  婚紗、西裝、童年的小毛衣⋯⋯這些衣物承載著人生的重要時刻。我們明白，您送來的不只是一件布料，而是一段珍貴的記憶。
                </p>
              </div>
            </div>

            {/* 右側：數據卡片 */}
            <div className="grid grid-cols-2 gap-5">
              {TEAM_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary-50)] to-white border-2 border-[var(--color-primary-100)] text-center hover:border-[var(--color-primary-300)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-[var(--color-primary-500)] font-[var(--font-heading)] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[var(--color-neutral-500)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 我們的理念 */}
      <section className="py-20 bg-[var(--color-neutral-50)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)]">
              我們的核心理念
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {VALUES.map((val, i) => (
              <div
                key={i}
                className="group p-7 bg-white rounded-2xl border-2 border-transparent hover:border-[var(--color-primary-200)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s backwards` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center text-[var(--color-primary-500)] mb-5 group-hover:bg-[var(--color-primary-500)] group-hover:text-white transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-3">
                  {val.title}
                </h3>
                <p className="text-[var(--color-neutral-500)] text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 發展歷程時間軸 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[var(--color-primary-500)] font-medium text-sm tracking-widest uppercase mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)]">
              我們的成長歷程
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {MILESTONES.map((item, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                {/* 時間軸線 */}
                {i < MILESTONES.length - 1 && (
                  <div className="absolute left-[2.35rem] top-12 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary-200)] to-[var(--color-primary-50)]" />
                )}

                {/* 年份節點 */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-[4.7rem] h-[4.7rem] rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--color-primary-200)]">
                    {item.year}
                  </div>
                </div>

                {/* 內容 */}
                <div className="pt-3 pb-2">
                  <h3 className="text-lg font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-neutral-500)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
              讓我們一起守護<br className="md:hidden" />您的衣物故事
            </h2>
            <p className="text-[var(--color-neutral-500)] text-lg mb-10 leading-relaxed">
              每件送來的衣物，都是我們新的使命。
              <br />
              歡迎預約，感受 {SITE_INFO.name} 的專業溫度。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-[var(--color-primary-500)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 shadow-lg shadow-[var(--color-primary-200)]"
              >
                立即預約
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-[var(--color-primary-400)] text-[var(--color-primary-600)] rounded-full font-bold text-lg hover:bg-[var(--color-primary-50)] transition-all hover:scale-105"
              >
                了解服務項目
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

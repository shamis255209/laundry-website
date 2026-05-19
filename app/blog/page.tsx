import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/lib/supabase';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '最新貼文 | 精緻洗衣',
  description: '洗衣知識、衣物保養技巧、材質洗護指南，由專業洗衣師傅分享實用資訊。',
};

const STATIC_POSTS: Post[] = [
  {
    id: '1', slug: 'how-to-care-wool', title: '羊毛衣物的正確保養方式',
    content: '', excerpt: '羊毛是嬌貴的天然纖維，錯誤的洗滌方式容易造成縮水變形。本文分享專業師傅的羊毛護理秘訣。',
    category: '洗滌知識', is_published: true, published_at: '2025-03-10T00:00:00Z', created_at: '2025-03-10T00:00:00Z', updated_at: '2025-03-10T00:00:00Z',
  },
  {
    id: '2', slug: 'remove-coffee-stain', title: '咖啡漬急救指南：黃金 5 分鐘法則',
    content: '', excerpt: '衣物不小心沾到咖啡？別慌！掌握黃金 5 分鐘處理原則，在送洗前先做這幾個步驟，能大大提升去漬成功率。',
    category: '污漬處理', is_published: true, published_at: '2025-03-01T00:00:00Z', created_at: '2025-03-01T00:00:00Z', updated_at: '2025-03-01T00:00:00Z',
  },
  {
    id: '3', slug: 'suit-care-guide', title: '西裝保養完全指南：讓名牌西裝穿出十年',
    content: '', excerpt: '西裝是男士衣櫃中的重要投資。正確的保養方式不只能延長壽命，更能讓您每次穿著都保持完美儀態。',
    category: '洗滌知識', is_published: true, published_at: '2025-02-20T00:00:00Z', created_at: '2025-02-20T00:00:00Z', updated_at: '2025-02-20T00:00:00Z',
  },
  {
    id: '4', slug: 'leather-bag-care', title: '皮件保養 Q&A：常見問題一次解答',
    content: '', excerpt: '皮包、皮帶、皮鞋該多久保養一次？遇到發霉、刮傷、褪色怎麼辦？本篇整理最常被問到的皮件保養問題。',
    category: '皮件保養', is_published: true, published_at: '2025-02-10T00:00:00Z', created_at: '2025-02-10T00:00:00Z', updated_at: '2025-02-10T00:00:00Z',
  },
  {
    id: '5', slug: 'seasonal-storage-tips', title: '換季必看：衣物收納與防霉秘訣',
    content: '', excerpt: '換季時如何正確清洗、收納衣物？台灣潮濕氣候下的防霉對策，讓您的衣物明年拿出來依然嶄新。',
    category: '收納保存', is_published: true, published_at: '2025-01-25T00:00:00Z', created_at: '2025-01-25T00:00:00Z', updated_at: '2025-01-25T00:00:00Z',
  },
];

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error || !data?.length) return STATIC_POSTS;
  return data;
}

const CATEGORIES = ['全部', '洗滌知識', '污漬處理', '皮件保養', '收納保存'];

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-primary-100)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[var(--color-primary-200)] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-primary-300)] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
            專業洗護知識
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-neutral-900)] font-[var(--font-heading)]">
            最新貼文
          </h1>
          <p className="text-xl text-[var(--color-neutral-600)] max-w-xl mx-auto leading-relaxed">
            由專業師傅分享洗護知識與衣物保養技巧
          </p>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* 分類標籤 */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-default ${
                  cat === '全部'
                    ? 'bg-[var(--color-primary-500)] text-white'
                    : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* 精選文章 */}
          {featured && (
            <div className="mb-12">
              <p className="text-xs font-medium text-[var(--color-primary-500)] tracking-widest uppercase mb-4">
                精選文章
              </p>
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* 其餘文章 */}
          {rest.length > 0 && (
            <>
              <p className="text-xs font-medium text-[var(--color-neutral-400)] tracking-widest uppercase mb-6">
                更多文章
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post, i) => (
                  <div
                    key={post.id}
                    style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s backwards` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 新增文章提示（當只有靜態資料時） */}
          <div className="mt-16 p-8 rounded-2xl bg-[var(--color-neutral-50)] border-2 border-dashed border-[var(--color-neutral-200)] text-center">
            <p className="text-[var(--color-neutral-400)] text-sm mb-2">想要發布新文章？</p>
            <p className="text-[var(--color-neutral-500)]">
              前往{' '}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary-500)] hover:underline"
              >
                Supabase Dashboard
              </a>
              {' '}→ Table Editor → posts 資料表新增內容
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[var(--color-primary-50)] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4">
            有衣物保養的疑問？
          </h2>
          <p className="text-[var(--color-neutral-500)] mb-8">直接詢問我們的專業師傅</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary-500)] text-white rounded-full font-bold hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 shadow-lg shadow-[var(--color-primary-200)]"
          >
            聯絡我們
          </Link>
        </div>
      </section>

    </div>
  );
}

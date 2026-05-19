import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/lib/supabase';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const STATIC_POSTS: Record<string, Post> = {
  'how-to-care-wool': {
    id: '1', slug: 'how-to-care-wool', title: '羊毛衣物的正確保養方式',
    content: `羊毛是嬌貴的天然纖維，擁有優異的保暖性與吸濕性，但也因此需要特別的照護。

## 為什麼羊毛容易縮水？

羊毛纖維表面有細小鱗片，在高溫或強烈摩擦下，這些鱗片會相互糾結，導致衣物縮水變形。這個過程是不可逆的，因此預防勝於治療。

## 正確洗滌方式

**手洗（推薦）**
- 使用低於 30°C 的冷水
- 加入專用羊毛洗劑，輕輕按壓，不要搓揉
- 清洗完輕壓排水，不要擰乾
- 鋪平放在乾淨毛巾上晾乾

**機洗（謹慎）**
- 選擇洗衣機的「手洗/羊毛模式」
- 裝入洗衣網袋保護
- 水溫設定 30°C 以下
- 脫水轉速不超過 400 轉

## 晾乾注意事項

羊毛衣物最怕直接掛起晾乾，因為重力會讓衣物變形拉長。正確做法是：

1. 輕輕按壓排水後，用乾毛巾包裹吸水
2. 鋪平放在晾衣架或乾淨桌面上
3. 整理好形狀，避免陽光直射
4. 完全乾燥後再收納

## 收納保存

- 羊毛衣物應折疊收納，不要掛起
- 加入防蟲劑（樟腦丸或雪松木片）
- 放入透氣袋，避免密封塑膠袋
- 儲存在陰涼乾燥處

如果衣物已經縮水，建議交給專業洗衣師處理，有機會透過特殊手法恢復部分形狀。`,
    excerpt: '羊毛是嬌貴的天然纖維，錯誤的洗滌方式容易造成縮水變形。本文分享專業師傅的羊毛護理秘訣。',
    category: '洗滌知識', is_published: true, published_at: '2025-03-10T00:00:00Z', created_at: '2025-03-10T00:00:00Z', updated_at: '2025-03-10T00:00:00Z',
  },
  'remove-coffee-stain': {
    id: '2', slug: 'remove-coffee-stain', title: '咖啡漬急救指南：黃金 5 分鐘法則',
    content: `早上一杯咖啡，不小心灑到白襯衫上——相信很多人都有這樣的慘痛經歷。別慌！處理咖啡漬有黃金 5 分鐘法則。

## 為什麼要快速處理？

咖啡中的單寧酸與色素，在接觸衣物後會迅速滲入纖維。時間越久，色素氧化越深，去除難度也越高。

## 黃金 5 分鐘急救步驟

**第一步：立刻吸附**
用乾淨的紙巾或布，從漬的外圍往中心輕壓吸附，不要用力擦拭，否則會讓咖啡漬擴散。

**第二步：冷水沖洗**
將沾到咖啡漬的部位翻到背面，用冷水從背面往外沖，讓水流將咖啡色素沖出纖維，而不是往深處壓。

**第三步：輕輕搓洗**
加少量中性洗劑，用手指輕輕搓揉，再用冷水沖洗。重複 2-3 次。

## 回家後的處理

- 用含有酵素的洗劑浸泡 20-30 分鐘
- 按照衣物標籤選擇適合的洗滌方式
- 確認污漬去除後再放入烘乾機，高溫會讓殘留的咖啡漬永久固著

## 頑固咖啡漬怎麼辦？

如果咖啡漬已經乾燥固著，建議交給專業洗衣店處理。我們使用專業除汙劑，能有效去除大多數固著的咖啡漬，成功率遠高於自行處理。`,
    excerpt: '衣物不小心沾到咖啡？別慌！掌握黃金 5 分鐘處理原則，在送洗前先做這幾個步驟。',
    category: '污漬處理', is_published: true, published_at: '2025-03-01T00:00:00Z', created_at: '2025-03-01T00:00:00Z', updated_at: '2025-03-01T00:00:00Z',
  },
};

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return STATIC_POSTS[slug] ?? null;
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: '文章不存在 | 精緻洗衣' };
  return {
    title: `${post.title} | 精緻洗衣`,
    description: post.excerpt ?? post.title,
  };
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-bold text-[var(--color-neutral-800)] mt-4 mb-2">
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="text-[var(--color-neutral-600)] leading-relaxed ml-4 mb-1 list-disc">
          {line.slice(2)}
        </li>
      );
    }
    if (/^\d+\./.test(line)) {
      return (
        <li key={i} className="text-[var(--color-neutral-600)] leading-relaxed ml-4 mb-1 list-decimal">
          {line.replace(/^\d+\.\s/, '')}
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-3" />;
    return (
      <p key={i} className="text-[var(--color-neutral-600)] leading-relaxed mb-3">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = post.published_at ?? post.created_at;

  return (
    <div className="min-h-screen bg-white">

      {/* 頂部色帶 */}
      <div className="h-2 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)]" />

      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* 返回按鈕 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-neutral-500)] hover:text-[var(--color-primary-500)] transition-colors mb-10 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          返回所有文章
        </Link>

        {/* 文章 Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            {post.category && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium">
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[var(--color-neutral-400)] text-sm">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] leading-snug mb-5">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-[var(--color-neutral-500)] leading-relaxed border-l-4 border-[var(--color-primary-300)] pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* 分隔線 */}
        <hr className="border-[var(--color-neutral-100)] mb-10" />

        {/* 文章內容 */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* 分隔線 */}
        <hr className="border-[var(--color-neutral-100)] mt-12 mb-10" />

        {/* 文章底部 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="p-5 rounded-2xl bg-[var(--color-primary-50)] flex-1">
            <p className="text-sm text-[var(--color-neutral-500)] mb-1">有衣物保養的問題？</p>
            <p className="font-medium text-[var(--color-neutral-800)]">直接諮詢我們的專業師傅</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-6 py-3 bg-[var(--color-primary-500)] text-white rounded-full font-medium hover:bg-[var(--color-primary-600)] transition-all hover:scale-105 shadow-md"
          >
            立即諮詢
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            查看更多文章
          </Link>
        </div>

      </div>
    </div>
  );
}

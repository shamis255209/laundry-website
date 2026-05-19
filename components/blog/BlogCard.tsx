import Link from 'next/link';
import type { Post } from '@/lib/supabase';

interface Props {
  post: Post;
  featured?: boolean;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogCard({ post, featured = false }: Props) {
  const date = post.published_at ?? post.created_at;

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-300)] hover:shadow-2xl transition-all duration-300">
          {/* 圖片區 */}
          <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-500)] flex items-center justify-center text-8xl min-h-[240px]">
            {post.cover_image ? (
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <span className="opacity-60">🧺</span>
            )}
          </div>
          {/* 文字區 */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-xs font-medium">
                  {post.category}
                </span>
              )}
              <span className="text-[var(--color-neutral-400)] text-xs">{formatDate(date)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-4 group-hover:text-[var(--color-primary-600)] transition-colors leading-snug">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-[var(--color-neutral-500)] leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <span className="inline-flex items-center gap-2 text-[var(--color-primary-500)] font-medium text-sm group-hover:gap-3 transition-all">
              閱讀全文
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full rounded-2xl overflow-hidden border-2 border-[var(--color-neutral-100)] hover:border-[var(--color-primary-300)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white">
        {/* 圖片 */}
        <div className="aspect-[16/9] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-300)] flex items-center justify-center text-6xl overflow-hidden">
          {post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <span className="opacity-50">🧺</span>
          )}
        </div>
        {/* 內容 */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="px-2.5 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-full text-xs font-medium">
                {post.category}
              </span>
            )}
            <span className="text-[var(--color-neutral-400)] text-xs">{formatDate(date)}</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-[var(--color-neutral-500)] text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

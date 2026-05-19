'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/lib/supabase';

interface Props {
  faqs: FAQ[];
  categories: string[];
}

export default function FaqAccordion({ faqs, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* 分類篩選 */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => { setActiveCategory('all'); setOpenId(null); }}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-[var(--color-primary-500)] text-white shadow-md'
              : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]'
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenId(null); }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[var(--color-primary-500)] text-white shadow-md'
                : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 手風琴列表 */}
      <div className="space-y-3">
        {filtered.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${
                isOpen
                  ? 'border-[var(--color-primary-300)] shadow-md'
                  : 'border-[var(--color-neutral-100)] hover:border-[var(--color-primary-200)]'
              }`}
              style={{ animation: `fadeInUp 0.3s ease-out ${index * 0.05}s backwards` }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4 pr-4">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                    isOpen
                      ? 'bg-[var(--color-primary-500)] text-white'
                      : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]'
                  }`}>
                    Q
                  </span>
                  <span className="font-medium text-[var(--color-neutral-800)]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-[var(--color-primary-400)] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] text-xs font-bold flex items-center justify-center">
                      A
                    </span>
                    <p className="text-[var(--color-neutral-600)] leading-relaxed pt-0.5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--color-neutral-400)]">
          此分類目前沒有問題
        </div>
      )}
    </div>
  );
}

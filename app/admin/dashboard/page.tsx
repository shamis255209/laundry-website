'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Sparkles, FileText, HelpCircle, Shirt, ArrowRight } from 'lucide-react';

const SECTIONS = [
  { href: '/admin/services', label: '服務項目', icon: Sparkles, table: 'services', color: 'bg-blue-50 text-blue-600' },
  { href: '/admin/posts', label: '最新貼文', icon: FileText, table: 'posts', color: 'bg-green-50 text-green-600' },
  { href: '/admin/faq', label: '常見問題', icon: HelpCircle, table: 'faqs', color: 'bg-amber-50 text-amber-600' },
  { href: '/admin/care-guide', label: '洗滌須知', icon: Shirt, table: 'care_items', color: 'bg-purple-50 text-purple-600' },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      const results = await Promise.all(
        SECTIONS.map(async (s) => {
          const { count } = await supabase.from(s.table).select('*', { count: 'exact', head: true });
          return [s.table, count ?? 0] as [string, number];
        })
      );
      setCounts(Object.fromEntries(results));
    }
    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">總覽</h2>
          <p className="text-gray-500 text-sm mt-1">管理網站各區塊內容</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map(({ href, label, icon: Icon, table, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{counts[table] ?? '—'}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase, FAQ } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

const EMPTY: Omit<FAQ, 'id' | 'created_at'> = {
  category: '',
  question: '',
  answer: '',
  order_number: 0,
  is_active: true,
};

export default function AdminFaqPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('全部');

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('faqs').select('*').order('category').order('order_number');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const categories = ['全部', ...Array.from(new Set(items.map(i => i.category))).sort()];
  const filtered = filterCategory === '全部' ? items : items.filter(i => i.category === filterCategory);

  function openNew() {
    setEditing({ id: '', created_at: '', ...EMPTY });
    setForm(EMPTY);
  }

  function openEdit(item: FAQ) {
    setEditing(item);
    setForm({
      category: item.category,
      question: item.question,
      answer: item.answer,
      order_number: item.order_number,
      is_active: item.is_active,
    });
  }

  async function save() {
    if (!form.question || !form.answer || !form.category) return;
    setSaving(true);

    if (editing?.id) {
      await supabase.from('faqs').update(form).eq('id', editing.id);
    } else {
      await supabase.from('faqs').insert(form);
    }

    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    await supabase.from('faqs').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">常見問題</h2>
            <p className="text-gray-500 text-sm mt-1">管理 FAQ 列表</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增問題
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{item.category}</span>
                    {!item.is_active && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">隱藏</span>}
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{item.question}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                尚無問題，點擊「新增問題」開始
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{editing.id ? '編輯問題' : '新增問題'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">分類 <span className="text-red-500">*</span></label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="例：預約收送" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                  <input type="number" value={form.order_number} onChange={(e) => setForm({ ...form, order_number: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">問題 <span className="text-red-500">*</span></label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">回答 <span className="text-red-500">*</span></label>
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="faq-active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="faq-active" className="text-sm text-gray-700">顯示於網站</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
              <button onClick={save} disabled={saving || !form.question || !form.answer || !form.category} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                <Check className="w-4 h-4" /> {saving ? '儲存中...' : '儲存'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">確認刪除</h3>
            <p className="text-gray-500 text-sm mb-6">此操作無法復原，確定要刪除這個問題嗎？</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">取消</button>
              <button onClick={() => remove(deleteId)} className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">刪除</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

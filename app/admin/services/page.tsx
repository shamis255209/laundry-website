'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase, Service } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check, GripVertical } from 'lucide-react';

const EMPTY: Omit<Service, 'id' | 'created_at'> = {
  name: '',
  description: '',
  detail_content: '',
  price_range: '',
  image_url: '',
  order_number: 0,
  is_active: true,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('order_number');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing({ id: '', created_at: '', ...EMPTY });
    setForm(EMPTY);
  }

  function openEdit(item: Service) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      detail_content: item.detail_content ?? '',
      price_range: item.price_range ?? '',
      image_url: item.image_url ?? '',
      order_number: item.order_number,
      is_active: item.is_active,
    });
  }

  async function save() {
    if (!form.name || !form.description) return;
    setSaving(true);

    if (editing?.id) {
      await supabase.from('services').update(form).eq('id', editing.id);
    } else {
      await supabase.from('services').insert(form);
    }

    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    await supabase.from('services').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">服務項目</h2>
            <p className="text-gray-500 text-sm mt-1">管理首頁服務介紹</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增服務
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    {!item.is_active && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">隱藏</span>}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{item.description}</p>
                  {item.price_range && <p className="text-xs text-blue-600 mt-0.5">{item.price_range}</p>}
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
            {items.length === 0 && (
              <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                尚無服務項目，點擊「新增服務」開始
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
              <h3 className="text-lg font-bold text-gray-900">{editing.id ? '編輯服務' : '新增服務'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">服務名稱 <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">簡短說明 <span className="text-red-500">*</span></label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">詳細說明</label>
                <textarea value={form.detail_content ?? ''} onChange={(e) => setForm({ ...form, detail_content: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">價格說明</label>
                <input value={form.price_range ?? ''} onChange={(e) => setForm({ ...form, price_range: e.target.value })} placeholder="例：NT$200 起" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面圖片</label>
                <ImageUpload value={form.image_url ?? ''} onChange={(url) => setForm({ ...form, image_url: url })} folder="services" />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                  <input type="number" value={form.order_number} onChange={(e) => setForm({ ...form, order_number: Number(e.target.value) })} className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" id="svc-active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="svc-active" className="text-sm text-gray-700">顯示於網站</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
              <button onClick={save} disabled={saving || !form.name || !form.description} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
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
            <p className="text-gray-500 text-sm mb-6">此操作無法復原，確定要刪除這項服務嗎？</p>
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

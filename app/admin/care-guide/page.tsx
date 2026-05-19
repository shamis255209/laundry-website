'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase, CareItem } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

type CareType = 'fabric' | 'mistake';

const EMPTY_FABRIC: Omit<CareItem, 'id' | 'created_at'> = {
  type: 'fabric',
  emoji: '',
  name: '',
  tags: [],
  tips: [],
  caution: '',
  wrong_text: '',
  right_text: '',
  order_number: 0,
  is_active: true,
};

export default function AdminCareGuidePage() {
  const [activeTab, setActiveTab] = useState<CareType>('fabric');
  const [items, setItems] = useState<CareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CareItem | null>(null);
  const [form, setForm] = useState(EMPTY_FABRIC);
  const [tipsInput, setTipsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('care_items').select('*').order('order_number');
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = items.filter(i => i.type === activeTab);

  function openNew() {
    const empty = { ...EMPTY_FABRIC, type: activeTab };
    setEditing({ id: '', created_at: '', ...empty });
    setForm(empty);
    setTipsInput('');
    setTagsInput('');
  }

  function openEdit(item: CareItem) {
    setEditing(item);
    setForm({
      type: item.type,
      emoji: item.emoji ?? '',
      name: item.name,
      tags: item.tags ?? [],
      tips: item.tips ?? [],
      caution: item.caution ?? '',
      wrong_text: item.wrong_text ?? '',
      right_text: item.right_text ?? '',
      order_number: item.order_number,
      is_active: item.is_active,
    });
    setTipsInput((item.tips ?? []).join('\n'));
    setTagsInput((item.tags ?? []).join(', '));
  }

  async function save() {
    if (!form.name) return;
    setSaving(true);

    const tips = tipsInput.split('\n').map(t => t.trim()).filter(Boolean);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...form, tips, tags };

    if (editing?.id) {
      await supabase.from('care_items').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('care_items').insert(payload);
    }

    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    await supabase.from('care_items').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">洗滌須知</h2>
            <p className="text-gray-500 text-sm mt-1">管理布料指南與常見錯誤</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增項目
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
          {(['fabric', 'mistake'] as CareType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'fabric' ? '布料指南' : '常見錯誤'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4">
                {item.emoji && <span className="text-2xl flex-shrink-0">{item.emoji}</span>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    {!item.is_active && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">隱藏</span>}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                  {item.type === 'fabric' && item.caution && (
                    <p className="text-xs text-amber-600 mt-1 truncate">{item.caution}</p>
                  )}
                  {item.type === 'mistake' && item.wrong_text && (
                    <p className="text-xs text-red-500 mt-1 truncate">✗ {item.wrong_text}</p>
                  )}
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
                尚無項目，點擊「新增項目」開始
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
              <h3 className="text-lg font-bold text-gray-900">
                {editing.id ? '編輯' : '新增'}{form.type === 'fabric' ? '布料指南' : '常見錯誤'}
              </h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                  <input value={form.emoji ?? ''} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🧸" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">名稱 <span className="text-red-500">*</span></label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">標籤 (以逗號分隔)</label>
                <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="棉質, 柔軟, 透氣" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>

              {form.type === 'fabric' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">洗護技巧 (每行一項)</label>
                    <textarea value={tipsInput} onChange={(e) => setTipsInput(e.target.value)} rows={5} placeholder="使用冷水洗滌&#10;避免高溫烘乾&#10;輕柔搓洗" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">特別注意</label>
                    <input value={form.caution ?? ''} onChange={(e) => setForm({ ...form, caution: e.target.value })} placeholder="高溫會縮水" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">錯誤做法</label>
                    <input value={form.wrong_text ?? ''} onChange={(e) => setForm({ ...form, wrong_text: e.target.value })} placeholder="直接丟入熱水" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">正確做法</label>
                    <input value={form.right_text ?? ''} onChange={(e) => setForm({ ...form, right_text: e.target.value })} placeholder="先浸泡在冷水中" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">說明 (每行一項)</label>
                    <textarea value={tipsInput} onChange={(e) => setTipsInput(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                  </div>
                </>
              )}

              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                  <input type="number" value={form.order_number} onChange={(e) => setForm({ ...form, order_number: Number(e.target.value) })} className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" id="care-active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="care-active" className="text-sm text-gray-700">顯示於網站</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
              <button onClick={save} disabled={saving || !form.name} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
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
            <p className="text-gray-500 text-sm mb-6">此操作無法復原，確定要刪除這個項目嗎？</p>
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

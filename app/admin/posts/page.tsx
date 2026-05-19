'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase, Post } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react';

const EMPTY: Omit<Post, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  cover_image: '',
  category: '',
  tags: [],
  published_at: '',
  is_published: false,
};

function toSlug(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export default function AdminPostsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing({ id: '', created_at: '', updated_at: '', ...EMPTY });
    setForm(EMPTY);
    setTagsInput('');
  }

  function openEdit(item: Post) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt ?? '',
      cover_image: item.cover_image ?? '',
      category: item.category ?? '',
      tags: item.tags ?? [],
      published_at: item.published_at ?? '',
      is_published: item.is_published,
    });
    setTagsInput((item.tags ?? []).join(', '));
  }

  async function save() {
    if (!form.title || !form.content) return;
    setSaving(true);

    const slug = form.slug || toSlug(form.title);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...form, slug, tags, updated_at: new Date().toISOString() };

    if (editing?.id) {
      await supabase.from('posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('posts').insert({ ...payload, created_at: new Date().toISOString() });
    }

    setSaving(false);
    setEditing(null);
    load();
  }

  async function togglePublish(item: Post) {
    await supabase.from('posts').update({
      is_published: !item.is_published,
      published_at: !item.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }).eq('id', item.id);
    load();
  }

  async function remove(id: string) {
    await supabase.from('posts').delete().eq('id', id);
    setDeleteId(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">最新貼文</h2>
            <p className="text-gray-500 text-sm mt-1">管理部落格文章</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增文章
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">載入中...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                {item.cover_image && (
                  <img src={item.cover_image} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900">{item.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.is_published ? '已發布' : '草稿'}
                    </span>
                    {item.category && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{item.category}</span>}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{item.excerpt || item.content.slice(0, 60)}</p>
                  {item.published_at && <p className="text-xs text-gray-400 mt-0.5">{new Date(item.published_at).toLocaleDateString('zh-TW')}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => togglePublish(item)} title={item.is_published ? '取消發布' : '發布'} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                尚無文章，點擊「新增文章」開始
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{editing.id ? '編輯文章' : '新增文章'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">標題 <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (網址)</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="自動產生" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
                  <input value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="例：洗滌技巧" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea value={form.excerpt ?? ''} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">內文 <span className="text-red-500">*</span></label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none font-mono" />
                <p className="text-xs text-gray-400 mt-1">支援 Markdown 語法</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">標籤 (以逗號分隔)</label>
                <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="洗滌, 保養, 技巧" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面圖片</label>
                <ImageUpload value={form.cover_image ?? ''} onChange={(url) => setForm({ ...form, cover_image: url })} folder="posts" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="post-published" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="post-published" className="text-sm text-gray-700">立即發布</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">取消</button>
              <button onClick={save} disabled={saving || !form.title || !form.content} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
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
            <p className="text-gray-500 text-sm mb-6">此操作無法復原，確定要刪除這篇文章嗎？</p>
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

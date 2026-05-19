# 🚀 精緻洗衣網站 - 完整部署指南

## 📦 專案概覽

這是一個使用 **Next.js 14 + Supabase** 打造的現代化洗衣店網站，具備以下特色：

- ✨ **Tiffany 藍**主題設計
- 📱 完全響應式設計（RWD）
- 🎨 優雅的動畫效果
- 📝 內建 CMS 文章管理系統
- 📅 線上預約收送系統
- 🔍 SEO 優化

---

## 🛠️ 技術棧

- **前端框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS v4
- **動畫**: Framer Motion
- **圖示**: Lucide React
- **資料庫**: Supabase (PostgreSQL)
- **儲存**: Supabase Storage
- **部署**: Vercel

---

## 📋 開始之前的準備

### 1. 註冊必要服務

#### Supabase（必須）
1. 前往 https://supabase.com
2. 點擊 "Start your project"
3. 建立新專案（選擇離您最近的區域）
4. 等待專案建立完成（約 2 分鐘）

#### Vercel（必須）
1. 前往 https://vercel.com
2. 使用 GitHub 帳號登入
3. 準備將專案推送到 GitHub

#### Google Fonts（自動處理）
- 專案已設定使用 Google Fonts
- Noto Sans TC（內文）
- Playfair Display（標題）

---

## 🚀 快速開始

### Step 1: 複製專案

```bash
# 如果您已有專案檔案，跳過此步驟
# 否則請從 GitHub 或其他來源取得專案
```

### Step 2: 安裝依賴

```bash
cd laundry-website
npm install
```

### Step 3: 設定 Supabase 資料庫

#### 3.1 執行 SQL Schema

1. 開啟 Supabase Dashboard
2. 點擊左側選單 **SQL Editor**
3. 點擊 **New Query**
4. 複製 `supabase-schema.sql` 的內容貼上
5. 點擊 **Run** 執行

#### 3.2 建立 Storage Bucket

1. 點擊左側選單 **Storage**
2. 點擊 **Create a new bucket**
3. 名稱輸入：`images`
4. 設定為 **Public bucket** ✅
5. 點擊 **Save**

#### 3.3 設定 Storage Policy

1. 選擇剛建立的 `images` bucket
2. 點擊 **Policies** 標籤
3. 點擊 **New Policy**
4. 選擇 **For full customization** > **Create policy**

**允許公開讀取：**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );
```

**允許認證用戶上傳：**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );
```

### Step 4: 設定環境變數

#### 4.1 獲取 Supabase 金鑰

1. 在 Supabase Dashboard 點擊 **Settings** (齒輪圖示)
2. 點擊 **API**
3. 複製以下資訊：
   - Project URL
   - anon public (API Key)

#### 4.2 建立環境變數檔案

```bash
# 複製範例檔案
cp .env.example .env.local

# 編輯 .env.local
# 貼上您的 Supabase 資訊
```

`.env.local` 內容：
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5: 執行開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問：http://localhost:3000

---

## 📝 內容管理指南

### 新增文章（部落格貼文）

#### 方法一：透過 Supabase Dashboard

1. 開啟 **Table Editor**
2. 選擇 `posts` 表
3. 點擊 **Insert row**
4. 填寫資料：
   - `title`: 文章標題
   - `slug`: 網址別名（英文，例如：first-post）
   - `content`: 文章內容（支援 Markdown）
   - `excerpt`: 摘要（顯示在列表頁）
   - `category`: 分類（例如：洗滌知識）
   - `is_published`: 勾選以發布
5. 點擊 **Save**

#### 方法二：透過後台管理（需額外開發）

未來可以建立管理後台，提供更友善的編輯介面。

### 新增服務項目

1. 開啟 **Table Editor**
2. 選擇 `services` 表
3. 點擊 **Insert row**
4. 填寫服務資訊
5. 上傳圖片到 Storage 後，將 URL 填入 `image_url`

### 上傳圖片

1. 點擊左側 **Storage**
2. 選擇 `images` bucket
3. 點擊 **Upload file**
4. 選擇圖片上傳
5. 上傳後點擊圖片，複製 **Public URL**
6. 將 URL 貼到對應的資料欄位

---

## 🌐 部署到 Vercel

### 方法一：從 GitHub 部署（推薦）

#### Step 1: 推送到 GitHub

```bash
# 初始化 Git（如果還沒有）
git init

# 加入所有檔案
git add .

# 提交
git commit -m "Initial commit"

# 連接到 GitHub 倉庫（請先在 GitHub 建立新倉庫）
git remote add origin https://github.com/your-username/laundry-website.git

# 推送
git push -u origin main
```

#### Step 2: 在 Vercel 部署

1. 登入 https://vercel.com
2. 點擊 **Add New Project**
3. 選擇剛才的 GitHub 倉庫
4. 點擊 **Import**
5. 設定環境變數：
   - 點擊 **Environment Variables**
   - 新增：
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. 點擊 **Deploy**

等待約 2-3 分鐘，部署完成！

### 方法二：使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel

# 生產部署
vercel --prod
```

---

## 🎨 自訂設計

### 更改主題色

編輯 `app/globals.css`：

```css
:root {
  /* 將 Tiffany 藍改為您想要的顏色 */
  --color-primary-500: #0ABAB5; /* 改這裡 */
}
```

### 更改字體

編輯 `app/layout.tsx`：

```typescript
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});
```

### 更改網站資訊

編輯 `lib/constants.ts`：

```typescript
export const SITE_INFO = {
  name: '您的店名',
  phone: '您的電話',
  address: '您的地址',
  // ...
};
```

---

## 📱 頁面結構說明

### 已實現頁面

- ✅ **首頁** (`/`) - Hero Section + 小故事 + 特色
- ⏳ **洗滌須知** (`/care-guide`) - 待開發
- ⏳ **服務項目** (`/services`) - 待開發
- ⏳ **服務流程** (`/process`) - 待開發
- ⏳ **最新貼文** (`/blog`) - 待開發
- ⏳ **常見問題** (`/faq`) - 待開發
- ⏳ **關於我們** (`/about`) - 待開發
- ⏳ **聯絡我們** (`/contact`) - 待開發

### 頁面開發順序建議

1. **首頁** ← 最重要，優先完成
2. **服務項目** ← 展示核心業務
3. **聯絡我們** ← 讓客戶能聯繫您
4. **關於我們** ← 建立信任
5. **常見問題** ← 減少客服負擔
6. **部落格** ← SEO 與內容行銷
7. **其他頁面**

---

## 🐛 常見問題排除

### Q1: `npm install` 失敗

**解決方案：**
```bash
# 清除快取
rm -rf node_modules package-lock.json
npm cache clean --force

# 重新安裝
npm install
```

### Q2: Supabase 連線失敗

**檢查清單：**
- ✅ `.env.local` 檔案存在
- ✅ 環境變數格式正確
- ✅ Supabase URL 以 `https://` 開頭
- ✅ 沒有多餘的空格或引號

### Q3: 圖片無法顯示

**可能原因：**
1. Storage Bucket 沒有設為 Public
2. Storage Policy 沒有設定
3. 圖片 URL 錯誤

**解決方案：**
重新檢查 Step 3.2 和 3.3

### Q4: 部署後環境變數無效

**Vercel 環境變數設定：**
1. 進入專案 Settings
2. 點擊 Environment Variables
3. 確認所有變數都已新增
4. 重新部署（Deployments > 點擊最新部署 > Redeploy）

---

## 📊 效能優化建議

### 圖片優化

```typescript
// 使用 Next.js Image 組件
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="描述"
  width={800}
  height={600}
  priority // 首屏圖片使用
/>
```

### 字體優化

專案已自動配置字體優化，無需額外設定。

### 快取策略

```typescript
// 在 page.tsx 中設定
export const revalidate = 3600; // 每小時重新驗證
```

---

## 🔒 安全性建議

### 1. 保護環境變數

- ❌ 絕對不要將 `.env.local` 提交到 Git
- ✅ 已加入 `.gitignore`

### 2. Supabase RLS (Row Level Security)

專案已啟用 RLS，確保資料安全：
- 公開內容：所有人可讀取
- 管理功能：需要認證

### 3. API 速率限制

考慮在 API Routes 加入速率限制（未來擴充）

---

## 📈 後續擴充功能

### 短期（1-3 個月）

- [ ] 完成所有頁面開發
- [ ] 建立後台管理介面
- [ ] Google Analytics 整合
- [ ] Facebook Pixel 追蹤

### 中期（3-6 個月）

- [ ] 會員系統
- [ ] 線上支付
- [ ] 訂單追蹤系統
- [ ] Email 通知自動化

### 長期（6-12 個月）

- [ ] PWA（漸進式網頁應用）
- [ ] 多語言支援
- [ ] AI 客服機器人
- [ ] 行動 App

---

## 📞 需要協助？

### 技術文檔

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs

### 社群資源

- Next.js Discord: https://discord.gg/nextjs
- Supabase Discord: https://discord.supabase.com

---

## 📄 授權

此專案為客製化專案，版權歸專案所有者所有。

---

## ✨ 開始使用

```bash
# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env.local
# 編輯 .env.local 填入您的 Supabase 資訊

# 執行開發伺服器
npm run dev

# 建置生產版本
npm run build

# 啟動生產伺服器
npm start
```

---

**祝您的洗衣事業蒸蒸日上！🎉**

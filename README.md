# 🌊 精緻洗衣專業網站

> 一個以 **Tiffany 藍**為主題的現代化洗衣店網站
> 
> 技術棧：Next.js 14 + Supabase + Tailwind CSS v4

---

## ✨ 專案特色

- 🎨 **精美設計**：Tiffany 藍主題，溫馨優雅
- 📱 **響應式設計**：完美支援手機、平板、桌機
- ⚡ **效能優化**：Next.js 14 App Router，極速載入
- 🗄️ **內容管理**：整合 Supabase，輕鬆管理文章和預約
- 🌐 **SEO 友善**：完整 Meta Tags 與結構化資料
- 🎭 **流暢動畫**：細膩的互動效果

---

## 🚀 快速開始

### 1. 安裝依賴
\`\`\`bash
npm install
\`\`\`

### 2. 設定環境變數
\`\`\`bash
cp .env.example .env.local
# 編輯 .env.local 填入您的 Supabase 資訊
\`\`\`

### 3. 設定資料庫
在 Supabase Dashboard 執行 \`supabase-schema.sql\`

### 4. 啟動開發伺服器
\`\`\`bash
npm run dev
\`\`\`

開啟 http://localhost:3000

---

## 📚 完整文檔

- 📖 [詳細規劃文檔](./laundry-website-plan.md) - 設計系統、頁面規劃、資料庫設計
- 🚀 [部署指南](./DEPLOYMENT_GUIDE.md) - Supabase 設定、Vercel 部署、問題排除

---

## 📦 專案結構

\`\`\`
laundry-website/
├── app/                    # Next.js 14 App Router
├── components/             # React 組件
├── lib/                    # 工具函數與配置
├── public/                 # 靜態資源
├── supabase-schema.sql     # 資料庫 Schema
└── 文檔...
\`\`\`

---

## 🎨 設計系統

- **主色**：Tiffany 藍 (#0ABAB5)
- **標題字體**：Playfair Display
- **內文字體**：Noto Sans TC

---

## 🛠️ 技術棧

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase
- Vercel

---

**用心呵護每件衣物 💙**

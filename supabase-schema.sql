-- ============================================
-- 精緻洗衣網站 - Supabase 資料庫 Schema
-- ============================================

-- 啟用 UUID 擴充
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 文章表 (posts)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX idx_posts_category ON posts(category);

-- 更新時間觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. 預約表單 (bookings)
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  services TEXT[] NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_bookings_date ON bookings(booking_date DESC);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);

-- ============================================
-- 3. 常見問題 (faqs)
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_number INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_faqs_category ON faqs(category, order_number);
CREATE INDEX idx_faqs_active ON faqs(is_active);

-- ============================================
-- 4. 小故事 (stories)
-- ============================================
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  icon TEXT,
  order_number INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_stories_order ON stories(order_number);
CREATE INDEX idx_stories_active ON stories(is_active);

-- ============================================
-- 5. 服務項目 (services)
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  detail_content TEXT,
  price_range TEXT,
  image_url TEXT,
  order_number INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_services_order ON services(order_number);
CREATE INDEX idx_services_active ON services(is_active);

-- ============================================
-- 範例資料插入
-- ============================================

-- 插入範例小故事
INSERT INTO stories (title, content, icon, order_number, is_active) VALUES
('那件婚紗的重生', '李小姐珍藏了20年的婚紗，因為時間久遠而泛黃。經過我們的專業處理，婚紗重現當年的純白光澤，讓她能夠將這份美好傳承給女兒。', '💍', 1, true),
('爺爺的西裝', '張先生帶來了已故爺爺生前最愛的西裝，希望能在追思會上穿著。我們用最溫柔的手法清潔保養，讓這份思念得以延續。', '🎩', 2, true),
('第一次約會的裙子', '陳小姐不小心在重要約會前把咖啡灑在新買的白裙子上。我們的急件除汙服務，讓她能夠自信地赴約，最後還促成了一段美好姻緣！', '👗', 3, true);

-- 插入範例服務項目
INSERT INTO services (name, description, price_range, order_number, is_active) VALUES
('專業濕洗', '使用純淨水質與環保洗劑，適合棉質、混紡等日常衣物的深層清潔', '單件 $80 起', 1, true),
('精緻手洗', '針對高級衣物、精緻蕾絲、羊毛羊絨等材質，由專業師傅手工清洗', '單件 $150 起', 2, true),
('環保乾洗', '採用環保溶劑，不傷害衣物纖維，適合西裝、大衣、絲質衣物', '單件 $120 起', 3, true),
('皮件保養', '專業皮革清潔、保養、補色服務，延長皮件使用壽命', '依項目報價', 4, true),
('鞋子洗滌', '各式鞋類深層清潔、除臭、美白服務，讓鞋子煥然一新', '單雙 $200 起', 5, true),
('專業除汙', '咖啡、紅酒、醬油、口紅等頑固汙漬的專業處理', '依汙漬狀況報價', 6, true),
('除黴處理', '發霉衣物的深層清潔與殺菌，恢復衣物原有狀態', '單件 $150 起', 7, true);

-- 插入範例常見問題
INSERT INTO faqs (category, question, answer, order_number) VALUES
('保存問題', '洗好的衣服如何保存？', '建議使用透氣防塵套保護，放置在乾燥通風處。羊毛、絲質等天然纖維衣物應避免塑膠袋密封，以免發霉。', 1),
('保存問題', '需要多久送洗一次？', '日常穿著的衣物建議每3-5次穿著後送洗。西裝、大衣等外套則可視髒污程度，約每季送洗一次即可。', 2),
('材質問題', '羊毛會縮水嗎？', '我們使用專業羊毛洗劑與低溫處理，能夠有效防止縮水。但仍建議選擇手洗或乾洗服務，確保衣物完整性。', 3),
('材質問題', '絲質衣物能水洗嗎？', '純絲材質較為脆弱，建議選擇乾洗服務。若必須水洗，我們會使用專業絲質洗劑與手洗方式處理。', 4),
('類型問題', '西裝需要多久乾洗一次？', '建議每季或穿著20-30次後乾洗一次。過度清洗可能損傷纖維，平時可用衣物刷清潔灰塵即可。', 5),
('類型問題', '羽絨衣可以水洗嗎？', '可以的！我們有專業的羽絨衣清洗設備，能夠在不破壞羽絨結構的情況下深層清潔。', 6),
('洗劑問題', '使用什麼洗劑？', '我們使用通過環保認證的洗劑，對環境友善且溫和不傷衣物，同時具備優異的去汙效果。', 7),
('洗劑問題', '對皮膚敏感者友善嗎？', '是的！我們的洗劑經過多次漂洗，不殘留化學物質，適合皮膚敏感者使用。如有特殊需求，也可以使用您自備的洗劑。', 8),
('價格問題', '如何計價？', '依照衣物材質、尺寸、髒污程度計價。基本價格已列於服務項目中，特殊處理項目會於評估時詳細說明。', 9),
('價格問題', '急件需要加價嗎？', '24小時急件服務需加收原價50%，48小時急件加收30%。標準件3-5個工作天無須加價。', 10);

-- ============================================
-- Row Level Security (RLS) 設定
-- ============================================

-- 啟用 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 公開讀取權限（所有人都可以讀取已發布的內容）
CREATE POLICY "Public read access for published posts" ON posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for active faqs" ON faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active stories" ON stories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active services" ON services
  FOR SELECT USING (is_active = true);

-- 預約表單：任何人都可以建立
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- 管理員完全權限（需要設定認證後再啟用）
-- CREATE POLICY "Admin full access on posts" ON posts
--   USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- Storage Bucket 設定（需在 Supabase Dashboard 執行）
-- ============================================

-- 建立公開的圖片儲存桶
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('images', 'images', true);

-- 允許所有人讀取
-- CREATE POLICY "Public Access"
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'images' );

-- 允許認證用戶上傳
-- CREATE POLICY "Authenticated users can upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- ============================================
-- 完成！
-- ============================================
-- 使用說明：
-- 1. 在 Supabase Dashboard 的 SQL Editor 執行此腳本
-- 2. 在 Storage 中手動建立 'images' bucket 並設為 public
-- 3. 複製 Project URL 和 anon key 到 .env.local
-- 4. 開始使用！

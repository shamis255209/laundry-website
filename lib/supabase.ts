import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 資料型別定義
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  booking_date: string;
  booking_time: string;
  services: string[];
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order_number: number;
  is_active: boolean;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  icon?: string;
  order_number: number;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  detail_content?: string;
  price_range?: string;
  image_url?: string;
  order_number: number;
  is_active: boolean;
  created_at: string;
}

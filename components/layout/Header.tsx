'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { NAVIGATION, SITE_INFO } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 關閉行動選單（路由改變時）
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
                精
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--color-neutral-900)] font-[var(--font-heading)]">
                  {SITE_INFO.name}
                </h1>
                <p className="text-xs text-[var(--color-neutral-500)]">
                  您的衣物，我們的藝術
                </p>
              </div>
            </Link>

            {/* 桌面版導航 */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    pathname === item.href
                      ? 'text-[var(--color-primary-500)]'
                      : 'text-[var(--color-neutral-700)] hover:text-[var(--color-primary-500)]'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary-500)] transform origin-left transition-transform duration-300 ${
                      pathname === item.href
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* 聯絡按鈕 */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary-500)] text-white rounded-full font-medium hover:bg-[var(--color-primary-600)] transition-all hover:shadow-lg hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE_INFO.phone}</span>
              </a>
            </div>

            {/* 行動版選單按鈕 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-neutral-700)] hover:text-[var(--color-primary-500)] transition-colors"
              aria-label="選單"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 行動版選單 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[var(--color-neutral-200)] shadow-xl">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                      : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-primary-500)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-600)] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{SITE_INFO.phone}</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Header 佔位空間 */}
      <div className="h-20" />
    </>
  );
}

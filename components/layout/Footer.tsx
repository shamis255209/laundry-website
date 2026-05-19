'use client';

import Link from 'next/link';
import { Send, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
  </svg>
);
import { NAVIGATION, SITE_INFO, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-neutral-900)] text-white">
      {/* 主要內容區 */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 品牌資訊 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-xl">
                精
              </div>
              <div>
                <h3 className="text-xl font-bold font-[var(--font-heading)]">{SITE_INFO.name}</h3>
                <p className="text-sm text-[var(--color-neutral-300)]">您的衣物，我們的藝術</p>
              </div>
            </div>
            <p className="text-[var(--color-neutral-300)] text-sm leading-relaxed mb-6">
              {SITE_INFO.description}
            </p>
            {/* 社群媒體 */}
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-neutral-800)] flex items-center justify-center hover:bg-[var(--color-primary-500)] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-neutral-800)] flex items-center justify-center hover:bg-[var(--color-primary-500)] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL_LINKS.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-neutral-800)] flex items-center justify-center hover:bg-[var(--color-primary-500)] transition-colors"
                aria-label="LINE"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-neutral-800)] flex items-center justify-center hover:bg-[var(--color-primary-500)] transition-colors"
                aria-label="Threads"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-[var(--font-heading)]">快速連結</h4>
            <ul className="space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--color-neutral-300)] hover:text-[var(--color-primary-300)] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-[var(--font-heading)]">聯絡資訊</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-primary-400)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--color-neutral-300)] text-sm">
                  {SITE_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--color-primary-400)] flex-shrink-0" />
                <a
                  href={`tel:${SITE_INFO.phone.replace(/[\s()-]/g, '')}`}
                  className="text-[var(--color-neutral-300)] hover:text-[var(--color-primary-300)] transition-colors text-sm"
                >
                  {SITE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-primary-400)] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-[var(--color-neutral-300)] hover:text-[var(--color-primary-300)] transition-colors text-sm"
                >
                  {SITE_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 營業時間 */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-[var(--font-heading)]">營業時間</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--color-primary-400)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-neutral-300)] text-sm">
                    {SITE_INFO.businessHours.weekday}
                  </p>
                  <p className="text-[var(--color-neutral-300)] text-sm mt-1">
                    {SITE_INFO.businessHours.weekend}
                  </p>
                  <p className="text-[var(--color-neutral-400)] text-xs mt-2">
                    {SITE_INFO.businessHours.closed}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部版權 */}
      <div className="border-t border-[var(--color-neutral-800)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-neutral-400)]">
            <p>
              <Link href="/admin" className="hover:opacity-60 transition-opacity" tabIndex={-1} aria-hidden="true">©</Link>
              {' '}{currentYear} {SITE_INFO.name}. 版權所有
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[var(--color-primary-300)] transition-colors">
                隱私權政策
              </Link>
              <Link href="/terms" className="hover:text-[var(--color-primary-300)] transition-colors">
                服務條款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

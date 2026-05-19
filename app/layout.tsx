import type { Metadata } from "next";
import { Noto_Sans_TC, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "精緻洗衣專業網站 | 台中洗衣推薦",
  description: "專業乾洗、濕洗、手洗服務，皮件保養、鞋子清潔專家。環保洗劑，到府收送，用心呵護您的每件衣物。",
  keywords: "台中洗衣, 乾洗, 皮件保養, 鞋子清潔, 到府收送, 專業洗衣",
  authors: [{ name: "精緻洗衣" }],
  openGraph: {
    title: "精緻洗衣專業網站",
    description: "您的衣物，我們的藝術",
    type: "website",
    locale: "zh_TW",
    siteName: "精緻洗衣",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSansTC.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


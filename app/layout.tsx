import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/data/site";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], variable: "--font-cormorant", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Kiến trúc, Nội thất & Xây dựng`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "vi_VN"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

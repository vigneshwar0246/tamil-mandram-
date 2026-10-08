import type { Metadata } from "next";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import { siteUrl } from "./data/siteUrl";
import "./globals.css";

const tamilSans = Noto_Sans_Tamil({ subsets: ["tamil"], display: "swap", preload: false, variable: "--font-tamil-sans" });
const tamilSerif = Noto_Serif_Tamil({ subsets: ["tamil"], display: "swap", preload: false, variable: "--font-tamil-serif" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Tamil Heritage | Explore a Living Culture",
  description: "Explore Tamil language, architecture, arts, festivals, food and living traditions through an immersive bilingual cultural journey.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tamil Heritage | Explore a Living Culture",
    description: "A bilingual digital journey through the stories, places and traditions of Tamil culture.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${tamilSans.variable} ${tamilSerif.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Буратино AI - AI Ассистент",
  description: "Твой дружелюбный ИИ-ассистент из цифрового леса с голосовым общением и видео приветствием",
  manifest: "/manifest.json",
  themeColor: "#F59E0B",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Буратино AI",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-512.png",
  },
  keywords: ["AI", "assistant", "Буратино", "chatbot", "voice", "помощник", "искусственный интеллект"],
  authors: [{ name: "Buratino AI Team" }],
  openGraph: {
    title: "Буратино AI - AI Ассистент",
    description: "Твой дружелюбный ИИ-ассистент из цифрового леса",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F59E0B" />
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

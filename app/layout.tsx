import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'https';
  const origin = host ? `${protocol}://${host}` : undefined;
  const title = 'じょうずかん | 動物診断アプリ';
  const description = 'ニックネームだけで楽しめる、JOHNANのレジェンド動物診断アプリです。';
  const socialImage = origin ? `${origin}/og.png` : undefined;

  return {
    title,
    description,
    icons: {
      icon: '/logo-jouzukan.jpg',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: socialImage ? [{ url: socialImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

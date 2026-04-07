import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CartProvider } from '@/lib/cart-context';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pick Me — Arte Decorativo',
    template: '%s — Pick Me',
  },
  description: 'Pick Me — Cuadros decorativos únicos. Arte que habla por vos.',
  openGraph: {
    title: 'Pick Me — Arte Decorativo',
    description: 'Cuadros decorativos únicos y personalizados. Arte que habla por vos.',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

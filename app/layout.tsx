import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { StoreProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Aura Apparel | Modern E-commerce',
  description: 'Aura Apparel - Modern E-commerce Clothing Storefront',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

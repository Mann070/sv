
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Care Nexus: Healthcare Connection',
  description: 'Your one-stop solution for managing healthcare.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://accounts.google.com/gsi/client" async defer strategy="beforeInteractive" />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          ptSans.variable,
          playfairDisplay.variable
        )}
      >
        <LanguageProvider>
          <AuthProvider>
            <AppProvider>
              {children}
              <Toaster />
            </AppProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

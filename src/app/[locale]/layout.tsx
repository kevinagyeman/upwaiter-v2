import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { stackServerApp } from '../../stack';
import '../globals.css';
import { Suspense } from 'react';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <StackProvider app={stackServerApp} lang={locale}>
              <StackTheme>
                <Suspense fallback={'caricamento'}>
                  <Navbar />
                  {children}
                </Suspense>
              </StackTheme>
            </StackProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

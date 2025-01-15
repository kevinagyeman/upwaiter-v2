import Navbar from '@/components/navbar';
import { routing } from '@/i18n/routing';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  loadErrorMessages();
  loadDevMessages();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ApolloWrapper>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </ApolloWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Cormorant } from 'next/font/google';
import { dir } from 'i18next';

import i18nConfig from '@/i18nConfig';
import '../globals.css';
import { Footer } from '@/components/custom/Footer';
import { cn } from '@/lib/utils';

import AuthProvider from '@/components/providers/SessionProvider';
import AppStatusDialog from '@/components/custom/AppStatusDialog';
import TranslationsProvider from '@/components/providers/TranslationsProvider';
import initTranslations from '@/lib/i18n';
import { Suspense } from 'react';

const cormorant = Cormorant({ subsets: ['latin'] });

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Chef Bautista Catering',
  description: 'Chef Bautista Catering',
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const { t, resources } = await initTranslations(locale, 'default');
  return (
    <AuthProvider>
      <TranslationsProvider
        locale={locale}
        namespaces={[]}
        resources={resources}
      >
        <html lang={locale} dir={dir(locale)}>
          <body className={cn('relative h-full', cormorant.className)}>
            <div className="relative flex min-h-screen flex-col">
              <Suspense>
                <AppStatusDialog />
              </Suspense>
              <div className="flex-1 flex-grow">{children}</div>
            </div>
            <Footer locale={locale} />
          </body>
        </html>
      </TranslationsProvider>
    </AuthProvider>
  );
}

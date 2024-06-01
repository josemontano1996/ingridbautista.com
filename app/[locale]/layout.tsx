import type { Metadata } from 'next';
import { Cormorant } from 'next/font/google';
import { dir } from 'i18next';

import '../globals.css';
import { Footer } from '@/presentation/components/custom/Footer';

import AuthProvider from '@/presentation/components/providers/SessionProvider';
import AppStatusDialog from '@/presentation/components/custom/AppStatusDialog';

import { Suspense } from 'react';
import TranslationsProvider from '@/presentation/components/providers/TranslationsProvider';
import { cn } from '@/shared/utils/utils';
import initTranslations from '@/infrastructure/i18n/i18n';
import i18nConfig from '@/infrastructure/i18n/i18nConfig';

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

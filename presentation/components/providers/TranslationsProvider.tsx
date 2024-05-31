'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/infrastructure/i18n/i18n';


interface Props {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Record<string, Record<string, string>>;
}

/**
 * TranslationsProvider component provides translations to its children components.
 *
 * @param props - The component props.
 * @param props.children - The child components to render.
 * @param props.locale - The locale for translations.
 * @param props.namespaces - The namespaces for translations.
 * @param props.resources - The translation resources.
 * @returns The rendered component.
 */
export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: Props) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

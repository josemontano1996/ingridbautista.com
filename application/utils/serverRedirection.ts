import { TLocales } from '@/shared/types/TLocales';
import { redirect } from 'next/navigation';

export const serverRedirect = ({
  url,
  message,
  locale,
  success,
}: {
  url: string;
  message: string;
  locale: TLocales;
  success: boolean;
}) => {
  const isSuccess = success ? '?sucess=' : '?error=';
  redirect(`/${locale}${url}${isSuccess}${encodeURIComponent(message)}`);
};

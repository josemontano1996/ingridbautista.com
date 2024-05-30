import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { IAuthUser } from './shared/interfaces/IAuthUser';

export async function middleware(req: NextRequest) {
  const requestedPage = req.nextUrl.pathname;
  const authToken = await getToken({ req });
  const user = (authToken?.user as IAuthUser) || undefined;
  const userRole = user?.role;

  let locale = requestedPage.split('/')[1];

  //checking if the first param is a locale
  if (!i18nConfig.locales.includes(locale)) {
    locale = i18nConfig.defaultLocale;
  }

  if (requestedPage.includes('/admin')) {
    if (!user) {
      const url = new URL(`/${locale}/login`, process.env.DOMAIN_URL);

      return NextResponse.redirect(url);
    }

    if (userRole !== 'admin' && userRole !== 'superadmin') {
      const encodedMessage = encodeURI('You are not authorized');
      const url = new URL(
        `/${locale}?error=${encodedMessage}`,
        process.env.DOMAIN_URL,
      );

      return NextResponse.redirect(url);
    }
  }

  return i18nRouter(req, i18nConfig as any);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

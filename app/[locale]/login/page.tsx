import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/auth/next-auth-config';
import LogInForm from '@/app/[locale]/login/LogInForm';
import MainNavBar from '@/presentation/components/custom/NavBar/MainNavBar';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { TLocales } from '@/shared/types/TLocales';

interface Props {
  params: { locale: TLocales };
}

const LoginPage = async ({ params: { locale } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect(`/${locale}/admin`);
  }

  return (
    <>
      <MainNavBar locale={locale} />
      <MaxWidthWrapper>
        <LogInForm />
      </MaxWidthWrapper>
    </>
  );
};

export default LoginPage;

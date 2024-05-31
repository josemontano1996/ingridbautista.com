import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';

import MainNavBar from '@/presentation/components/custom/NavBar/MainNavBar';
import HeroSection from '@/app/[locale]/HeroSection';
import ChefSection from '@/app/[locale]/ChefSection';

import HomeMidNav from '@/app/[locale]/HomeMidNav';
import { TLocales } from '@/shared/types/TLocales';
import { ExperiencesSectionBig } from '@/app/[locale]/ExperienceSectionBig';
import { ExperiencesSectionSmall } from '@/app/[locale]/ExperienceSectionSmall';

export default function Home({ params }: { params: { locale: TLocales } }) {
  const { locale } = params;

  return (
    <>
      <MainNavBar
        midNavBarElement={<HomeMidNav locale={locale} />}
        locale={locale}
      />
      <HeroSection locale={locale} />
      <MaxWidthWrapper>
        <ChefSection locale={locale} />
        <section id="experiences">
          <ExperiencesSectionBig locale={locale} />
          <ExperiencesSectionSmall locale={locale} />
        </section>
      </MaxWidthWrapper>
    </>
  );
}

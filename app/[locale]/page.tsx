import MaxWidthWrapper from '@/components/custom/wrappers/MaxWidthWrapper';

import MainNavBar from '@/components/custom/NavBar/MainNavBar';
import HeroSection from '@/app/[locale]/HeroSection';
import ChefSection from '@/app/[locale]/ChefSection';
import { ExperiencesSectionSmall } from '@/app/[locale]/ExperienceSectionSmall';
import { ExperiencesSectionBig } from '@/app/[locale]/ExperienceSectionBig';
import HomeMidNav from '@/app/[locale]/HomeMidNav';
import { TLocales } from '@/shared/types/TLocales';

export default function Home({ params }: { params: { locale: TLocales } }) {
  const { locale } = params;

  return (
    <>
      <MainNavBar
        midNavBarElement={<HomeMidNav locale={locale} />}
        locale={locale}
      />
      <HeroSection />
      <MaxWidthWrapper>
        <ChefSection />
        <section id="experiences">
          <ExperiencesSectionBig />
          <ExperiencesSectionSmall />
        </section>
      </MaxWidthWrapper>
    </>
  );
}

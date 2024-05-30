import { BookOpen } from 'lucide-react';
import LocaleLink from '../LocaleLink';
import HamburgerMenu from './HamburgerMenu';
import { TLocales } from '@/shared/types/TLocales';
import { ContactComponent } from '../ContactComponent/ContactComponent';

interface Props {
  locale: TLocales;
  midNavBarElement?: JSX.Element;
}

const MainNavBar = async ({ locale, midNavBarElement }: Props) => {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-white px-[2vw] py-1">
      <div className="flex-1">
        <h1 className="text-5xl font-semibold">
          <LocaleLink path="/" isNextLink={true}>
            IB
          </LocaleLink>
        </h1>
      </div>

      {midNavBarElement && midNavBarElement}

      <nav className="flex flex-1 justify-end ">
        <ul className="flex items-center justify-between space-x-2">
          <li className="h-full p-0.5">
            <LocaleLink isNextLink={true} path={`/menu`}>
              <BookOpen className="h-full" />
            </LocaleLink>
          </li>
          <li className="h-full p-0.5">
            <ContactComponent locale={locale} />
          </li>

          <li className="h-full">
            <HamburgerMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavBar;

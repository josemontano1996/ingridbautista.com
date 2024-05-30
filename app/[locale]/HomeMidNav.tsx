import { SmoothScrollLink } from '@/presentation/components/custom/SmoothScrollLink';
import LocaleLink from '@/presentation/components/custom/LocaleLink';

/**
 * The mid navbar component for the home page.
 * @param props The element props.
 * @param props.locale The locale.
 * @returns
 */

const HomeMidNav = ({ locale }: { locale: string }) => {
  return (
    <ul className="hidden justify-between space-x-4 text-lg sm:flex sm:space-x-10 sm:text-xl md:text-2xl">
      <li className="font-medium italic hover:underline">
        <SmoothScrollLink scrollToId="chef">The Chef</SmoothScrollLink>
      </li>
      <li className="font-medium italic hover:underline">
        <SmoothScrollLink scrollToId="experiences">
          The Experience
        </SmoothScrollLink>
      </li>
      <li className="font-medium italic hover:underline">
        <LocaleLink isNextLink={true} path={`/menu`}>
          The Menu
        </LocaleLink>
      </li>
    </ul>
  );
};

export default HomeMidNav;

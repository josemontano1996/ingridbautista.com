import { SmoothScrollLink } from '@/presentation/components/custom/SmoothScrollLink';

const MenuMidNav = ({ locale }: { locale: string }) => {
  return (
    <SmoothScrollLink scrollToId="menu" className="text-xl italic sm:text-2xl">
      The Menu
    </SmoothScrollLink>
  );
};

export default MenuMidNav;

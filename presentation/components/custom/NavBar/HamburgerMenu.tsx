import { Menu } from 'lucide-react';
import LocaleLink from '../LocaleLink';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/presentation/components/ui/menubar';
import { cn } from '@/shared/lib/utils';
import LanguageChanger from '../LanguageChanger';

interface Props {
  sideBarContent?: React.ReactNode;
}

const HamburgerMenu = async ({ sideBarContent }: Props) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="p-0.5">
          <Menu />
        </MenubarTrigger>

        <MenubarContent
          className={cn('z-40 mr-[1vw] space-y-2 bg-white px-[2vw] py-4')}
        >
          {sideBarContent ? (
            sideBarContent
          ) : (
            <>
              <MenubarItem className="text-xl">
                <LocaleLink
                  isNextLink={true}
                  path={`/menu`}
                  styling="italic hover:underline"
                >
                  Menu
                </LocaleLink>
              </MenubarItem>
              <MenubarItem className="text-xl">
                <LocaleLink
                  isNextLink={true}
                  path={`/delivery`}
                  styling="italic hover:underline"
                >
                  Private events
                </LocaleLink>
              </MenubarItem>
              <MenubarItem className="text-xl">
                <LocaleLink
                  isNextLink={true}
                  path={`/delivery`}
                  styling="italic hover:underline"
                >
                  Workshops
                </LocaleLink>
              </MenubarItem>
              <MenubarSeparator />
              <LanguageChanger />
              {/*  <MenubarSeparator />
              <AuthButton /> */}
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default HamburgerMenu;

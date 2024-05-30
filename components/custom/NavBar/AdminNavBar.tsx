import { ArrowDownAZ, BoltIcon, BookOpen } from 'lucide-react';
import LocaleLink from '../LocaleLink';
import AuthButton from '../AuthButton';

const AdminNavBar = async () => {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-white px-[2vw] py-1">
      <div className="flex-1">
        <h1 className="text-5xl font-semibold">
          <LocaleLink path="/" isNextLink={true}>
            IB
          </LocaleLink>
        </h1>
      </div>

      <nav className="flex flex-1 justify-end ">
        <ul className="flex items-center justify-between space-x-2">
          <li className="px-2 text-xl font-medium">
            <LocaleLink
              isNextLink={false}
              path="/admin/menu"
              styling="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground px-2 py-1"
            >
              <BookOpen />
              Menu
            </LocaleLink>
          </li>
          <li className="px-2 text-xl font-medium">
            <LocaleLink
              isNextLink={false}
              path="/admin/product/categories"
              styling="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground px-2 py-1"
            >
              <ArrowDownAZ />
              Categorias
            </LocaleLink>
          </li>
          <li className="px-2 text-xl font-medium">
            <LocaleLink
              isNextLink={false}
              path="/admin/config"
              styling="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground px-2 py-1"
            >
              <BoltIcon />
              Configuration
            </LocaleLink>
          </li>
          <AuthButton />
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavBar;

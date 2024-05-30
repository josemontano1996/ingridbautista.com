import React from 'react';
import Image from 'next/image';
import { TLocales } from '@/shared/types/TLocales';

interface Props {
  locale: TLocales;
}

export const MenuHeader: React.FC<Props> = ({ locale }) => {
  return (
    <header className="relative">
      <div>
        <div className="l-0 absolute top-[28%] z-10 space-y-1 bg-white py-4 pl-8 pr-4  lg:pl-[7vw]">
          <h1 className="text-4xl font-bold sm:text-5xl xl:text-6xl">
            You are what you eat, so
          </h1>
          <h2 className="text-2xl font-medium italic  xl:text-4xl">
            Don{`'`}t eat Fast, Cheap, Easy Or Fake
          </h2>
        </div>
        <div>
          <Image
            src="/assets/images/menu-header.webp"
            alt="menu-header"
            width={1920}
            height={400}
            className="z-0 h-[50vh] w-full object-cover lg:h-[70vh]"
            priority
          />
        </div>
      </div>
    </header>
  );
};

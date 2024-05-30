import { FC } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import LocaleLink from '@/components/custom/LocaleLink';

export const ExperiencesSectionSmall: FC = () => {
  return (
    <div className="text-center md:hidden">
      <h2 className="mb-12 mt-16 text-5xl">The Experience</h2>
      <div className="grid grid-cols-1 items-center sm:text-lg">
        <h3 className="my-8 text-2xl sm:text-3xl">
          Chef-curated food delivered to you
        </h3>
        <div className="mx-auto">
          <Image
            src="/assets/images/focaccia.webp"
            alt="foccacia image"
            width={640}
            height={480}
          />
        </div>
        <p className="my-5 sm:px-[3vw]">
          Indulge in a delightful culinary experience from the comfort of your
          own home with Ingrid
          {`'`}s exclusive food delivery service. Experience the magic of having
          a skilled chef prepare and deliver exquisite, handcrafted meals right
          to your doorstep.
        </p>

        <div>
          <LocaleLink
            isNextLink={true}
            path="/menu"
            styling={cn(buttonVariants(), 'sm:text-lg')}
          >
            Check the Menu
          </LocaleLink>
        </div>

        <h3 className="mb-8 mt-12 text-2xl sm:text-3xl">
          Private chef for your favourite events
        </h3>
        <div className="mx-auto">
          <Image
            src="/assets/images/chef-2.webp"
            width={640}
            height={480}
            alt="making bread image"
          />
        </div>
        <p className="my-5 sm:px-[3vw]">
          Ingrid offers a private chef service that caters to a range of events,
          including weddings, birthdays, and company meals. From intimate
          gatherings to large celebrations, she provides a personalized culinary
          experience that is tailored to your tastes and preferences.
        </p>

        <div>
          <LocaleLink
            isNextLink={true}
            path="/services"
            styling={cn(buttonVariants(), 'sm:text-lg')}
          >
            Book an Event
          </LocaleLink>
        </div>

        <h3 className="mb-8 mt-12 text-2xl sm:text-3xl">
          Cooking lessons and workshops
        </h3>
        <div className="mx-auto">
          <Image
            src="/assets/images/chef-3.jpg"
            width={640}
            height={480}
            alt="making bread image"
          />
        </div>
        <p className="my-5 sm:px-[3vw]">
          Discover the art of culinary excellence with Ingrid{`'`}s immersive
          cooking classes and captivating demonstrations. Unleash your inner
          chef as you learn the secrets of Mediterranean cuisine under her
          expert guidance.
        </p>

        <div>
          <LocaleLink
            isNextLink={true}
            path="/services"
            styling={cn(buttonVariants(), 'sm:text-lg')}
          >
            Book a Workshop
          </LocaleLink>
        </div>
      </div>
    </div>
  );
};

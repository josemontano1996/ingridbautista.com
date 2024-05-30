import { FC } from 'react';
import { cn } from '@/shared/lib/utils';

import Image from 'next/image';
import { buttonVariants } from '@/presentation/components/ui/button';
import LocaleLink from '@/presentation/components/custom/LocaleLink';

export const ExperiencesSectionBig: FC = () => {
  return (
    <div className="hidden md:block">
      <h2 className="mb-12 mt-16 text-center text-5xl">The Experience</h2>
      <div className="grid grid-cols-2 items-center gap-10">
        <div>
          <h3 className="text-3xl lg:text-4xl">
            Chef-curated food delivered to you
          </h3>
          <p className="my-6 lg:text-lg">
            Indulge in a delightful culinary experience from the comfort of your
            own home with Ingrid{`'`}s exclusive food delivery service.
            Experience the magic of having a skilled chef prepare and deliver
            exquisite, handcrafted meals right to your doorstep.
          </p>

          <div className="text-center">
            <LocaleLink
              isNextLink={true}
              path="/menu"
              styling={cn(buttonVariants(), 'text-lg lg:text-xl')}
            >
              Check the Menu
            </LocaleLink>
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/focaccia.webp"
            width={640}
            height={480}
            alt="Hero-Image"
          />
        </div>
        <div>
          <Image
            src="/assets/images/chef-2.webp"
            alt="Hero-Image"
            width={640}
            height={480}
          />
        </div>
        <div>
          <h3 className="text-3xl lg:text-4xl">
            Private chef for your favourite events
          </h3>
          <p className="my-6 lg:text-lg">
            Ingrid offers a private chef service that caters to a range of
            events, including weddings, birthdays, and company meals. From
            intimate gatherings to large celebrations, she provides a
            personalized culinary experience that is tailored to your tastes and
            preferences.
          </p>

          <div className="text-center">
            <LocaleLink
              isNextLink={true}
              path="/services"
              styling={cn(buttonVariants(), 'text-lg lg:text-xl')}
            >
              Book an Event
            </LocaleLink>
          </div>
        </div>

        <div>
          <h3 className="text-3xl lg:text-4xl">
            Cooking Classes and Demonstrations
          </h3>
          <p className="my-6 lg:text-lg">
            Meet Chef DArconso, a culinary virtuoso with over 25 years of
            culinary expertise. Her journey in the world of gastronomy has been
            nothing short of extraordinary. Having honed her skills in the most
            prestigious kitchens around the globe, she now stands at the
            threshold of a new culinary adventure.
          </p>

          <div className="text-center">
            <LocaleLink
              isNextLink={true}
              path="/services"
              styling={cn(buttonVariants(), 'text-lg lg:text-xl')}
            >
              Book a Workshop
            </LocaleLink>
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/chef-3.jpg"
            alt="Hero-Image"
            width={640}
            height={480}
          />
        </div>
      </div>
    </div>
  );
};

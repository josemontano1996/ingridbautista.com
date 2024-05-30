import Image from 'next/image';
import { SmoothScrollLink } from '@/components/custom/SmoothScrollLink';
import LocaleLink from '@/components/custom/LocaleLink';
import MaxWidthWrapper from '@/components/custom/wrappers/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <>
      <div className=" bg-bgAlt py-8">
        <MaxWidthWrapper>
          <section className="grid grid-cols-1 items-center gap-6 px-[3vw] md:grid-cols-2 md:px-0">
            <div className="mx-auto md:w-full">
              <h2 className="text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
                A healthy meal delivered to your door, every single day
              </h2>
              <h6 className="mb-6 mt-8 text-center text-xl md:text-left lg:text-2xl">
                The smart 365-days-year food subscription that will make you eat
                healthy again. Tailored to your personal tastes and nutritional
                needs.
              </h6>

              <div className="text-center lg:space-x-8">
                <LocaleLink
                  isNextLink={true}
                  path="/menu"
                  styling={cn(
                    buttonVariants({ size: 'lg' }),
                    'hidden text-xl lg:inline-flex',
                  )}
                >
                  Check our menu
                </LocaleLink>
                <SmoothScrollLink
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'text-xl lg:inline-flex',
                  )}
                  scrollToId={'chef'}
                >
                  Learn More
                </SmoothScrollLink>
              </div>
            </div>
            <div>
              <Image
                src="/assets/images/hero-image.webp"
                width={750}
                height={740}
                alt="Hero-Image"
                priority
              />
            </div>
          </section>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default HeroSection;

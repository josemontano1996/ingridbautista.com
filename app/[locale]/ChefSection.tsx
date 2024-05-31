import Image from 'next/image';
import { buttonVariants } from '@/presentation/components/ui/button';
import { cn } from '@/shared/utils/utils';
import { TLocales } from '@/shared/types/TLocales';

const ChefSection = ({ locale }: { locale: TLocales }) => {
  return (
    <>
      <section id="chef" className="text-center">
        <h2 className="my-16 text-center text-5xl">The Chef</h2>
        <div className="grid grid-cols-1 items-center space-y-4 sm:grid-cols-2 sm:gap-6 sm:space-y-0">
          <div className="mx-auto">
            <Image
              src="/assets/images/chef.jpg"
              width={720}
              height={1280}
              alt="chef photo"
            />
          </div>
          <div className="sm:flex sm:flex-col sm:justify-center md:text-left">
            <h3 className="text-2xl sm:text-4xl">
              Chef Bautista: A culinary journey
            </h3>
            <p className="my-6 sm:text-lg">
              Meet Chef DArconso, a culinary virtuoso with over 25 years of
              culinary expertise. Her journey in the world of gastronomy has
              been nothing short of extraordinary. Having honed her skills in
              the most prestigious kitchens around the globe, she now stands at
              the threshold of a new culinary adventure.
            </p>

            <p className="mb-6 hidden sm:text-lg lg:block">
              Now, Chef DArconso embarks on a new standalone project, bringing
              her unparalleled passion and expertise directly to you. Her
              dedication to culinary excellence remains unwavering as she
              introduces a range of experiences on this webpage that reflect her
              commitment to culinary innovation and the art of food.
            </p>

            <div className="text-center">
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'sm:text-xl',
                )}
              >
                Check my Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChefSection;

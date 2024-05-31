import translationObjectAllergens from '@/shared/consts/allergens';
import { TAllergen } from '@/shared/types/TAllergens';
import { TLocales } from '@/shared/types/TLocales';

/**
 * Translates an array of allergens into the specified locale.
 *
 * @param allergens - The array of allergens to be translated.
 * @param locale - The locale to translate the allergens into.
 * @returns An array of translated allergens.
 */
export const translateAllergens = (
  allergens: TAllergen[],
  locale: TLocales,
): string[] => {
  let translatedAllergens: string[] = [];

  allergens.map((all) => {
    translatedAllergens.push(translationObjectAllergens[all][locale]);
  });

  return translatedAllergens;
};

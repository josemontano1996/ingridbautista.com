import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

/**
 * Translates the category name based on the specified locale, the default one being 'es'.
 * @param  locale - The locale to use for translation.
 * @param  category - The category name to be translated.
 * @param  fetchedCategories - The array of fetched categories containing translations.
 * @returns - The translated category name.
 */
export const displayCategoryLocaleName = (
  locale: string,
  category: string,
  fetchedCategories: IFecthedCategory[] | null,
) => {
  let translatedCategory: string = category;

  if (!fetchedCategories) return null;

  switch (locale) {
    case 'es':
      break;
    case 'fr':
      translatedCategory =
        fetchedCategories.find(
          (fetchedCategory) => fetchedCategory.name === category,
        )?.fr || 'Esta categoria no esta activada';
      break;
    case 'en':
      translatedCategory =
        fetchedCategories.find(
          (fetchedCategory) => fetchedCategory.name === category,
        )?.en || 'Esta categoria no esta activada';
    default:
      break;
  }

  return translatedCategory;
};

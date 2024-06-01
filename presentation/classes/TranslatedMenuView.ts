import { MenuDto } from '@/application/dto/MenuDto';
import { ProductCategoryDto } from '@/application/dto/ProductCategoryDto';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';
import { TLocales } from '@/shared/types/TLocales';
import { translateAllergens } from '@/shared/utils/translateAllergens';

export interface ITranslatedMenuView {
  getTranslatedAndSortedMenu: () => Record<string, ITranslatedProduct[]>;
  displayCategoryLocaleName: (category: string) => string | null;
}

export class TranslatedMenuView implements ITranslatedMenuView {
  private translatedMenuItems: ITranslatedProduct[] = [];
  private categoriesObject:
    | Record<string, ITranslatedProduct[] | undefined>
    | undefined = {};
  private translatedAndOrderedMenu: Record<string, ITranslatedProduct[]> = {};

  constructor(
    private locale: TLocales,
    private products: MenuDto | undefined,
    private categories: ProductCategoryDto[] | undefined,
    private strictMode: boolean = false,
  ) {
    this.locale = locale;
    this.products = products;
    this.categories = categories;
  }

  public getTranslatedAndSortedMenu = () => {
    this.genenerateMenuItemsArray();
    this.orderCategories();
    this.generateCategoriesObject();
    this.populateCategoriesObjectWithMenuItems();

    return this.translatedAndOrderedMenu;
  };

  public displayCategoryLocaleName = (category: string) => {
    let translatedCategory = category;

    if (!this.categories) return null;

    switch (this.locale) {
      case 'es':
        break;
      case 'fr':
        translatedCategory =
          this.categories.find((cat) => cat.name === category)?.fr ||
          'Esta categoria no esta activada';
        break;
      case 'en':
        translatedCategory =
          this.categories.find((cat) => cat.name === category)?.en ||
          'Esta categoria no esta activada';
      default:
        break;
    }

    return translatedCategory || null;
  };

  public static orderCategoriesByOrder = (
    categories: ProductCategoryDto[] | undefined,
  ) => {
    return categories?.sort((a, b) => a.order - b.order);
  };

  private genenerateMenuItemsArray = () => {
    if (!this.products) return [];

    let menuItems: ITranslatedProduct[] = this.products?.map((product) => ({
      id: product.id!,
      name: product[this.locale].name,
      description: product[this.locale].description,
      image: product.image,
      price: product.price,
      portion: product.portion,
      type: product.type,
      allergens: product.allergens
        ? translateAllergens(product.allergens, this.locale)
        : null,
    }));

    menuItems.sort((a, b) => a.name.localeCompare(b.name));

    this.translatedMenuItems = menuItems;
  };

  private orderCategories = () => {
    this.categories?.sort((a, b) => a.order - b.order);
  };

  private generateCategoriesObject = () => {
    this.categoriesObject = this.categories?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name.toLowerCase()]: [],
      }),
      {} as Record<string, ITranslatedProduct[] | undefined> | undefined,
    );
  };

  private populateCategoriesObjectWithMenuItems = () => {
    const populatedCategories = this.translatedMenuItems.reduce(
      (acc, item) => {
        // Check if the key exists before pushing
        const categoryKey = item.type!.toLowerCase();

        if (acc.hasOwnProperty(categoryKey)) {
          // Check if the category exists in the accumulator object
          acc[categoryKey].push(item);
        } else {
          // If strict mode is enabled, do not add the item to the accumulator object
          if (!this.strictMode) {
            acc[categoryKey] = [item];
          }
        }
        return acc as Record<string, ITranslatedProduct[]>;
      },
      this.categoriesObject as Record<string, ITranslatedProduct[]>,
    );

    this.translatedAndOrderedMenu = populatedCategories;
  };
}

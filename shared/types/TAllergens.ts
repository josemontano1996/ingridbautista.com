import { TLocales } from './TLocales';

export type TAllergen =
  | 'gluten'
  | 'crustaceos'
  | 'huevo'
  | 'pescado'
  | 'cacahuete'
  | 'soja'
  | 'leche'
  | 'frutosSecos'
  | 'apio'
  | 'mostaza'
  | 'sesamo'
  | 'so2'
  | 'altramuces'
  | 'moluscos';

type AllergenTranslation = {
  [locale in TLocales]: string;
};

export type TTranslationObjectAllergens = {
  [allergen in TAllergen]: AllergenTranslation;
};

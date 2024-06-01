import { z } from 'zod';
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

export const zodAllergenType = z.union([
  z.literal<TAllergen>('gluten'),
  z.literal<TAllergen>('crustaceos'),
  z.literal<TAllergen>('huevo'),
  z.literal<TAllergen>('pescado'),
  z.literal<TAllergen>('cacahuete'),
  z.literal<TAllergen>('soja'),
  z.literal<TAllergen>('leche'),
  z.literal<TAllergen>('frutosSecos'),
  z.literal<TAllergen>('apio'),
  z.literal<TAllergen>('mostaza'),
  z.literal<TAllergen>('sesamo'),
  z.literal<TAllergen>('so2'),
  z.literal<TAllergen>('altramuces'),
  z.literal<TAllergen>('moluscos'),
]);

type AllergenTranslation = {
  [locale in TLocales]: string;
};

export type TTranslationObjectAllergens = {
  [allergen in TAllergen]: AllergenTranslation;
};

export interface ITranslationDetails {
  name: string;
  description: string;
}

export type TTranslationObject = {
  [key in 'en' | 'es' | 'fr']: ITranslationDetails;
};

import {
  TAllergen,
  TTranslationObjectAllergens,
} from '@/shared/types/TAllergens';

export const allergensArray: TAllergen[] = [
  'gluten',
  'crustaceos',
  'huevo',
  'pescado',
  'cacahuete',
  'soja',
  'leche',
  'frutosSecos',
  'apio',
  'mostaza',
  'sesamo',
  'so2',
  'altramuces',
  'moluscos',
];

const translationObjectAllergens: TTranslationObjectAllergens = {
  gluten: {
    en: 'gluten',
    es: 'gluten',
    fr: 'gluten',
  },
  crustaceos: {
    en: 'crustaceans',
    es: 'crustáceos',
    fr: 'crustacés',
  },
  huevo: {
    en: 'egg',
    es: 'huevo',
    fr: 'œuf',
  },
  pescado: {
    en: 'fish',
    es: 'pescado',
    fr: 'poisson',
  },
  cacahuete: {
    en: 'peanut',
    es: 'cacahuete',
    fr: 'cacahuète',
  },
  soja: {
    en: 'soy',
    es: 'soja',
    fr: 'soja',
  },
  leche: {
    en: 'milk',
    es: 'leche',
    fr: 'lait',
  },
  frutosSecos: {
    en: 'nuts',
    es: 'frutos secos',
    fr: 'fruits à coque',
  },
  apio: {
    en: 'celery',
    es: 'apio',
    fr: 'céleri',
  },
  mostaza: {
    en: 'mustard',
    es: 'mostaza',
    fr: 'moutarde',
  },
  sesamo: {
    en: 'sesame',
    es: 'sésamo',
    fr: 'sésame',
  },
  so2: {
    en: 'sulfites',
    es: 'sulfitos',
    fr: 'sulfites',
  },
  altramuces: {
    en: 'lupins',
    es: 'altramuces',
    fr: 'lupins',
  },
  moluscos: {
    en: 'mollusks',
    es: 'moluscos',
    fr: 'mollusques',
  },
};

export default translationObjectAllergens;

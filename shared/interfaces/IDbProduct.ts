import { TAllergen } from '@/shared/types/TAllergens';

export interface IDbProduct {
  _id: string;
  image: string;
  type: string;
  price: number;
  portion: string;
  allergens?: TAllergen[];

  [key: string]: any; // Index signature

  en: {
    name: string;
    description: string;
  };
  es: { name: string; description: string };
  fr: { name: string; description: string };
}

import { TAllergen } from '@/shared/types/TAllergens';
import { TUserRole } from '@/shared/types/TUserRole';

export interface IDbProduct {
  image: string;
  type: string;
  price: number;
  portion?: string;
  allergens?: TAllergen[];
  _id?: string;

  [key: string]: any; // Index signature

  en: {
    name: string;
    description: string;
  };
  es: { name: string; description: string };
  fr: { name: string; description: string };
}

export interface IDbProductCategory {
  _id: string;
  name: string;
  order: number;
  en: string;
  fr: string;
}

export interface IDbSocialMedia {
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
}

export interface IDbUser {
  _id: string;
  name: string;
  email: string;
  role?: TUserRole;
  password: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IDbCategory {
  name: string;
  order: number;
  en: string;
  fr: string;

  _id?: string;
}

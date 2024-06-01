export interface ITranslatedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string | undefined;
  price: number;
  portion?: string | undefined;
  allergens?: string[] | null;
}


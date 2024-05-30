
export interface IMenuItem {
  name: string;
  description: string;
  image: string;
  type: string;
  price: number;
  portion: string;
  allergens?: string[] | null;
  _id?: string;
}

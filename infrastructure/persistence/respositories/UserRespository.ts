import Product from '@/models/Product';
import { IDbProduct } from '../db-types';

export class MenuRepository {
  public static async getMenu(): Promise<IDbProduct> {
    return Product.find().lean();
  }
}

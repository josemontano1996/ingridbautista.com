import { IDbProduct } from '../db-types';
import Product from '../models/Product';

export class MenuRepository {
  public static async getMenu(): Promise<IDbProduct> {
    return Product.find().lean();
  }
}

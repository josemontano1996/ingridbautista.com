import { connectDB } from '../database-config';
import { IDbProduct } from '../db-types';
import Product from '../models/Product';

export interface IMenuRepository {
  getMenu(): Promise<IDbProduct[]>;
}

export class MenuRepository implements IMenuRepository {
  public async getMenu(): Promise<IDbProduct[]> {
    await connectDB();
    return Product.find().lean();
  }
}

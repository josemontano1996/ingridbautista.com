import { connectDB } from '../database-config';
import { IDbProductCategory } from '../db-types';
import ProductCategory from '../models/ProductCategory';

export interface IProductCategoryRepository {
  getCategories(): Promise<IDbProductCategory[]>;
}

export class ProductCategoryRepository implements IProductCategoryRepository {
  public async getCategories(): Promise<IDbProductCategory[]> {
    await connectDB();
    return ProductCategory.find().lean();
  }
}

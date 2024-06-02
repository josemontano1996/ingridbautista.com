import { connectDB } from '../database-config';
import {
  DbDeleteResult,
  DbUpdateResult,
  IDbProductCategory,
} from '../db-types';
import ProductCategory from '../models/ProductCategory';

export interface IProductCategoryRepository {
  createCategory(data: IDbProductCategory): Promise<IDbProductCategory>;
  getCategories(): Promise<IDbProductCategory[]>;
  getOrderedCategories(): Promise<IDbProductCategory[]>;
  findOneAndUpdate(
    catId: string,
    data: IDbProductCategory,
    retrieveNew?: boolean,
  ): Promise<IDbProductCategory | null>;
  deleteCategory(catId: string): Promise<DbDeleteResult>;
}

export class ProductCategoryRepository implements IProductCategoryRepository {
  public async createCategory(
    data: IDbProductCategory,
  ): Promise<IDbProductCategory> {
    await connectDB();
    return ProductCategory.create(new ProductCategory(data));
  }
  public async getCategories(): Promise<IDbProductCategory[]> {
    await connectDB();
    return ProductCategory.find().lean();
  }
  public async getOrderedCategories(): Promise<IDbProductCategory[]> {
    await connectDB();
    return ProductCategory.find().sort({ order: 1 }).lean();
  }
  public async findOneAndUpdate(
    catId: string,
    data: IDbProductCategory,
    retrieveNew: boolean = true,
  ): Promise<IDbProductCategory | null> {
    await connectDB();
    return ProductCategory.findOneAndUpdate(
      { _id: catId },
      { ...data },
      { new: retrieveNew },
    ).lean();
  }

  public async deleteCategory(catId: string): Promise<DbDeleteResult> {
    await connectDB();
    return ProductCategory.deleteOne({ _id: catId });
  }
}

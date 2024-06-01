import { DeleteResult } from 'mongodb';
import { connectDB } from '../database-config';

import Product from '../models/Product';
import { DbDeleteResult, DbUpdateResult, IDbProduct } from '../db-types';
import { ProductDto } from '@/application/dto/ProductDto';

export interface IProductRepository {
  createProduct(product: IDbProduct): Promise<IDbProduct>;
  getProduct(prodId: string): Promise<IDbProduct | null>;
  updateProduct(product: ProductDto): Promise<DbUpdateResult>;
  deleteProduct(prodId: string): Promise<DeleteResult>;
}

export class ProductRepository implements IProductRepository {
  public async createProduct(product: IDbProduct): Promise<IDbProduct> {
    await connectDB();
    return Product.create(new Product(product));
  }

  public async getProduct(prodId: string): Promise<IDbProduct | null> {
    await connectDB();
    return Product.findOne({ _id: prodId }).lean();
  }

  public async updateProduct(product: ProductDto): Promise<DbUpdateResult> {
    await connectDB();
    return Product.updateOne(
      { _id: product.id },
      {
        ...product,
      },
    );
  }
  public async deleteProduct(prodId: string): Promise<DbDeleteResult> {
    await connectDB();
    return Product.deleteOne({ _id: prodId });
  }
}

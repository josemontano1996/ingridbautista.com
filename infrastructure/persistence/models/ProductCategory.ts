import mongoose, { Schema, model, Model } from 'mongoose';
import { IDbProductCategory } from '../db-types';

const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, required: true, min: 0 },
  en: { type: String, required: true, unique: true },
  fr: { type: String, required: true, unique: true },
});

const ProductCategory: Model<IDbProductCategory> =
  mongoose.models.ProductCategory ||
  model<IDbProductCategory>('ProductCategory', ProductCategorySchema);

export default ProductCategory;

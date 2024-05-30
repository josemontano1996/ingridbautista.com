import mongoose, { Schema, model, Model } from 'mongoose';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  en: { type: String, required: true, unique: true },
  fr: { type: String, required: true, unique: true },
});

const ProductCategory: Model<IFecthedCategory> =
  mongoose.models.ProductCategory ||
  model<IFecthedCategory>('ProductCategory', ProductCategorySchema);

export default ProductCategory;

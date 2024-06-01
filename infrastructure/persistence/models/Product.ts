import mongoose, { Model, Schema, model } from 'mongoose';
import { IDbProduct } from '../db-types';

const productSchema = new Schema(
  {
    image: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true, min: 0.1 },
    portion: { type: String },
    allergens: [
      {
        type: String,
        enum: {
          values: [
            'gluten',
            'crustaceos',
            'huevo',
            'pescado',
            'cacahuete',
            'soja',
            'leche',
            'frutosSecos',
            'apio',
            'mostaza',
            'sesamo',
            'so2',
            'altramuces',
            'moluscos',
          ],
        },
      },
    ],
    en: {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
    },
    es: {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
    },
    fr: {
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const Product: Model<IDbProduct> =
  mongoose.models.Product || model<IDbProduct>('Product', productSchema);

export default Product;

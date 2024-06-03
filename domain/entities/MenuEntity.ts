import { z } from 'zod';
import { ProductEntity, productEntitySchema } from './ProductEntity';
import { ProductDto } from '@/application/dto/ProductDto';
import { Entity } from './Entity';

export interface IMenuEntity {
  getProductArray(): ProductEntity[];
  toDto(): ProductDto[];
}

export class MenuEntity implements IMenuEntity {
  constructor(private productArray: ProductEntity[]) {
    this.productArray = productArray;

    this.validate();
  }
  getProductArray(): ProductEntity[] {
    return this.productArray;
  }

  toDto(): ProductDto[] {
    return this.productArray.map((product) => product.toDto());
  }

  private validate() {
    Entity.validate(menuEntitySchema, this.productArray);
  }
}

export const menuEntitySchema = z.array(productEntitySchema);

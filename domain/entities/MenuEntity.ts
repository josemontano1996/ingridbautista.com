import { ZodError, z } from 'zod';
import { ProductEntity, productEntitySchema } from './ProductEntity';
import { ZodValidationError } from '@/application/errors/ValidationError';
import { ProductDto } from '@/application/dto/ProductDto';

export interface IMenuEntity {
  getProductArray(): ProductEntity[];
  toMenuDto(): ProductDto[];
}

export class MenuEntity implements IMenuEntity {
  constructor(private productArray: ProductEntity[]) {
    this.productArray = productArray;

    this.validate();
  }
  getProductArray(): ProductEntity[] {
    return this.productArray;
  }

  toMenuDto(): ProductDto[] {
    return this.productArray.map((product) => product.toProductDto());
  }

  private validate() {
    try {
      menuEntitySchema.safeParse(this);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  }
}

export const menuEntitySchema = z.array(productEntitySchema);

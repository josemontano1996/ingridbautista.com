import { IDbProduct } from '@/infrastructure/persistence/db-types';
import { ProductDto, mapDbProductToDto } from './ProductDto';

export type MenuDto = ProductDto[];

export const mapDbMenutoDto = (data: IDbProduct[]): MenuDto => {
  return data.map((product) => mapDbProductToDto(product));
};

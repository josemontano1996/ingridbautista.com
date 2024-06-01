import { UserDto } from '../dto/UserDto';
import { ProductDto } from '../dto/ProductDto';
import { ProductCategoryDto } from '../dto/ProductCategoryDto';

export interface IActionResponse {
  success: boolean;
  payload?: {};
  message?: string;
}

export interface ICategoryActionResponse extends IActionResponse {
  payload?: ProductCategoryDto;
}

export interface IProductActionResponse extends IActionResponse {
  payload?: ProductDto;
}
export interface IUserActionResponse extends IActionResponse {
  payload?: UserDto;
}

import { IDbCategory, IDbProduct } from '@/infrastructure/persistence/db-types';

import { IUser } from '@/shared/interfaces/IUser';

export interface IActionResponse {
  success: boolean;
  payload?: {};
  message?: string;
}

export interface ICategoryActionResponse extends IActionResponse {
  payload?: IDbCategory;
}

export interface IProductActionResponse extends IActionResponse {
  payload?: IDbProduct;
}
export interface IUserActionResponse extends IActionResponse {
  payload?: IUser;
}

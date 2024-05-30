import { IDbProduct } from './IDbProduct';
import { IFecthedCategory } from './IFetchedCategory';
import { IUser } from './IUser';

export interface IActionResponse {
  success: boolean;
  payload?: {};
  message?: string;
}

export interface ICategoryActionResponse extends IActionResponse {
  payload?: IFecthedCategory;
}

export interface IProductActionResponse extends IActionResponse {
  payload?: IDbProduct;
}
export interface IUserActionResponse extends IActionResponse {
  payload?: IUser;
}


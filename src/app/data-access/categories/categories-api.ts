import { BaseAPI } from '../base-api';
import { ICategory } from './interfaces/category.interface';

export class CategoriesAPI extends BaseAPI<ICategory> {
  constructor() {
    super('categories');
  }
}

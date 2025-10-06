import { Injectable } from '@angular/core';
import { BaseAPI } from '../base-api';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsAPI extends BaseAPI<IProduct> {
  constructor() {
    super('products');
  }
}

import { inject, Injectable } from '@angular/core';
import { map, BehaviorSubject, switchMap, shareReplay, of } from 'rxjs';
import { Product } from './models/product.model';
import { IProduct } from './interfaces/product.interface';
import { IFilter } from '../interfaces/filter.interface';
import { ProductsAPI } from './products-api';
import { MOCK_PRODUCTS } from '../consts/products';

@Injectable()
export class ProductsStore {
  private readonly api = inject(ProductsAPI);
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly products$ = this.filters$.pipe(
    switchMap((filters) =>
      of(MOCK_PRODUCTS).pipe(map((items: IProduct[]) => items.map((item) => new Product(item)))),
    ),
    shareReplay(1),
  );

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Product } from './models/product.model';
import { MOCK_PRODUCTS } from '../consts/products';
import { IFilter } from '../interfaces/filter.interface';

@Injectable()
export class ProductsStore {
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly products$ = this.filters$.pipe(
    switchMap((filters) =>
      of(MOCK_PRODUCTS).pipe(map((products) => this.applyFilters(products, filters))),
    ),
    shareReplay(1),
  );

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }

  public getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.products$.pipe(
      map((products) => products.filter((product) => product.idCat === categoryId)),
    );
  }

  private applyFilters(products: Product[], filters: Partial<IFilter>): Product[] {
    const { diameter, steelGrade, gost, name } = filters;

    const hasFilters =
      (diameter && diameter > 0) ||
      (steelGrade && steelGrade.trim() !== '') ||
      (gost && gost.trim() !== '') ||
      (name && name.trim() !== '');

    if (!hasFilters) return products;

    return products.filter((product) => {
      const diameterMatch = !diameter || product.diameter === diameter;

      const steelGradeMatch =
        !steelGrade || product.steelGrade.toLowerCase().includes(steelGrade.toLowerCase());

      const gostMatch = !gost || product.gost.toLowerCase().includes(gost.toLowerCase());

      const nameMatch = !name || product.name.toLowerCase().includes(name.toLowerCase());

      return diameterMatch && steelGradeMatch && gostMatch && nameMatch;
    });
  }
}

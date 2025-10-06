import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, switchMap } from 'rxjs';
import { IFilter } from '../interfaces/filter.interface';
import { CategoriesAPI } from './categories-api';
import { ICategory } from './interfaces/category.interface';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesStore {
  private readonly api = inject(CategoriesAPI);
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly categories$ = this.filters$.pipe(
    switchMap((filters) =>
      this.api
        .getAll(filters)
        .pipe(map((items: ICategory[]) => items.map((item) => new Category(item)))),
    ),
    shareReplay(1),
  );

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }
}

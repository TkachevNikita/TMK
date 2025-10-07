import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, of, shareReplay, switchMap } from 'rxjs';
import { IFilter } from '../interfaces/filter.interface';
import { CategoriesAPI } from './categories-api';
import { ICategory } from './interfaces/category.interface';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesStore {
  private readonly api = inject(CategoriesAPI);
  private readonly filters$ = new BehaviorSubject<Partial<IFilter>>({});

  public readonly categories$ = this.filters$.pipe(
    switchMap(
      (filters) =>
        of(
          [
            {
              id: 'a58d54b6-25ea-4818-afc9-1faa8c630d9a',
              type: 'Бесшовные холоднодеформированные',
              idParentType: '',
            },
            {
              id: 'd21de9df-f3dd-442f-8b9f-89d8f1865698',
              type: 'Прямошовные',
              idParentType: '',
            },
            {
              id: '4ae51348-d619-4bf2-a35f-1c6931b68bf1',
              type: 'Холоднокатаные',
              idParentType: '',
            },
            {
              id: '403389a6-3f81-4cd0-bf1d-e43fe6adaa48',
              type: 'Горячекатаные',
              idParentType: '',
            },
          ].map((c) => new Category(c)),
        ),
      // this.api
      //   .getAll(filters)
      //   .pipe(map((items: ICategory[]) => items.map((item) => new Category(item)))),
    ),
    shareReplay(1),
  );

  public reload(filters?: Partial<IFilter>): void {
    this.filters$.next(filters || {});
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('./categories/components/category-page/category-page.component').then(
        (c) => c.CategoryPageComponent,
      ),
  },
  {
    path: 'catalog/:id',
    loadComponent: () =>
      import('./products/components/products-page/products-page.component').then(
        (c) => c.ProductsPageComponent,
      ),
  },
  {
    path: 'tmk',
    loadComponent: () =>
      import('./info/components/info-page.component').then(
        (c) => c.InfoPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

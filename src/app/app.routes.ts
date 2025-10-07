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
    path: 'quiz',
    loadComponent: () =>
      import('./quiz/components/quiz-page/quiz-page.component').then((c) => c.QuizPageComponent),
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

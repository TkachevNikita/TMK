import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { AsyncPipe } from '@angular/common';
import { CategoriesStore } from '../../../data-access/categories/categories-store';
import { CategoriesAPI } from '../../../data-access/categories/categories-api';

@Component({
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CategoryCardComponent, AsyncPipe],
  providers: [CategoriesStore, CategoriesAPI],
})
export class CategoryPageComponent {
  private readonly categoryService = inject(CategoriesStore);

  public categories$ = this.categoryService.categories$;
}

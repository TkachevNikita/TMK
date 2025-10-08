import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Category } from '../../../data-access/categories/models/category.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class CategoryCardComponent {
  @Input({
    required: true,
  })
  public category!: Category;
}

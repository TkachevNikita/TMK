import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../../../data-access/categories/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  @Input({
    required: true,
  })
  public category!: Category;

  @Input()
  public iconPosition: 'top' | 'right' | 'left' | 'bottom' = 'right';
}

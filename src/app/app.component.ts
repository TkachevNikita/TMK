import { TuiIcon, TuiRoot } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { Category } from './data-access/categories/models/category.model';
import { CategoryCardComponent } from './categories/components/category-card/category-card.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, TuiRoot, TuiIcon, CategoryCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public categories = [
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
  ].map((c) => new Category(c));
}

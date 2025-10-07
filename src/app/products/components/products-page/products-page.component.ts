import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TuiButton } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, FormsModule, InputComponent, TuiButton],
})
export class ProductsPageComponent {
  public value: string = '';
}

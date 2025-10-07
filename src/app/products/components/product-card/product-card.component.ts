import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../data-access/products/models/product.model';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton],
})
export class ProductCardComponent {
  @Input({
    required: true,
  })
  public product!: Product;

  @Input()
  public direction: 'column' | 'row' = 'column';

  @Input()
  public editMode = false;

  public removeItem(): void {}
}

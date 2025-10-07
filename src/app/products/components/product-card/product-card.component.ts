import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../data-access/products/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({
    required: true,
  })
  public product!: Product;
}

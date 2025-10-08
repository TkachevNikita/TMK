import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CartService, ICartProduct } from '../../../cart/services/cart.service';
import { QuantityComponent } from '../../../shared/components/quantity/quantity.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuantityComponent, FormsModule],
})
export class OrderProductComponent {
  private readonly cartService = inject(CartService);

  @Input({
    required: true,
  })
  public item!: ICartProduct;

  public updateQuantity(value: number): void {
    if (value === 0) {
      this.cartService.removeProduct(this.item.product.id);
    }
  }
}

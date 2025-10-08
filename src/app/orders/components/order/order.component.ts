import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CartService } from '../../../cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { OrderProductComponent } from '../order-product/order-product.component';

@Component({
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, ButtonComponent, AsyncPipe, OrderProductComponent],
})
export class OrderComponent {
  protected readonly cartService = inject(CartService);

  public createOrder(): void {}
}

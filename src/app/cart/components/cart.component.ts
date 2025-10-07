import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../../products/components/product-card/product-card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CartService } from '../services/cart.service';
import { tuiDialog, TuiDialogContext, TuiIcon } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { injectContext } from '@taiga-ui/polymorpheus';
import { ProductOverviewComponent } from '../../products/components/product-overview/product-overview.component';
import { OrderComponent } from '../../orders/components/order/order.component';
import { take } from 'rxjs';

@Component({
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ProductCardComponent, ButtonComponent, TuiIcon],
})
export class CartComponent {
  private readonly context = injectContext<TuiDialogContext>();
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly dialog = tuiDialog(OrderComponent, {
    dismissible: true,
    label: 'Оформление заказа',
  });

  public items$ = this.cartService.items$;

  public navigateToCategories(): void {
    this.context.completeWith();
    this.router.navigate(['/categories']);
  }

  public getOrder(): void {
    this.context.completeWith();
    this.dialog().pipe(take(1)).subscribe();
  }
}

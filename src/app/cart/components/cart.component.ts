import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsStore } from '../../data-access/products/products-store';
import { ProductsAPI } from '../../data-access/products/products-api';
import { AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../../products/components/product-card/product-card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductsStore, ProductsAPI],
  imports: [AsyncPipe, ProductCardComponent, ButtonComponent],
})
export class CartComponent {
  private readonly productsStore = inject(ProductsStore);

  public products$ = this.productsStore.products$;
}

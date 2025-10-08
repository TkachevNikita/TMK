import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Product } from '../../../data-access/products/models/product.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CartService } from '../../../cart/services/cart.service';
import { QuantityComponent } from '../../../shared/components/quantity/quantity.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, startWith, pairwise } from 'rxjs/operators';

@Component({
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, QuantityComponent, ReactiveFormsModule],
})
export class ProductOverviewComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cartService = inject(CartService);

  public readonly context = injectContext<TuiDialogContext<Product, Product>>();
  public readonly quantityControl = new FormControl<number>(0, { nonNullable: true });

  public get product(): Product {
    return this.context.data;
  }

  public get quantity(): number {
    return this.cartService.getQuantity(this.product.id);
  }

  public ngOnInit(): void {
    this.quantityControl.patchValue(this.quantity, { emitEvent: false });

    this.quantityControl.valueChanges
      .pipe(
        startWith(this.quantity),
        pairwise(),
        distinctUntilChanged((a, b) => a[1] === b[1]),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([prev, curr]) => {
        if (curr > prev) {
          this.cartService.addProduct(this.product, curr - prev);
        } else if (curr < prev) {
          const diff = prev - curr;
          for (let i = 0; i < diff; i++) {
            this.cartService.decreaseQuantity(this.product.id);
          }
        }

        if (curr === 0) {
          this.cartService.removeProduct(this.product.id);
        }
      });
  }

  public pushToCart(): void {
    this.cartService.addProduct(this.product, 1);
    this.quantityControl.patchValue(this.quantity, { emitEvent: false });
  }

  public openCart(): void {
    this.cartService.open();
  }
}

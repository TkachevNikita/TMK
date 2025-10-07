import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ProductsStore } from '../../../data-access/products/products-store';
import { ProductsAPI } from '../../../data-access/products/products-api';
import { AsyncPipe } from '@angular/common';
import { ProductOverviewComponent } from '../product-overview/product-overview.component';
import { Product } from '../../../data-access/products/models/product.model';
import { take } from 'rxjs';

@Component({
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, FormsModule, InputComponent, TuiButton, AsyncPipe],
  providers: [ProductsStore, ProductsAPI],
})
export class ProductsPageComponent {
  private readonly productsStore = inject(ProductsStore);
  private readonly dialog = tuiDialog(ProductOverviewComponent, {
    dismissible: true,
    label: 'Heading',
  });

  public products$ = this.productsStore.products$;

  public openProduct(product: Product): void {
    this.dialog(product).pipe(take(1)).subscribe();
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Product } from '../../../data-access/products/models/product.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export class ProductOverviewComponent {
  private readonly dialogs = inject(TuiDialogService);

  public readonly context = injectContext<TuiDialogContext<Product, Product>>();

  public get product(): Product {
    return this.context.data;
  }
}

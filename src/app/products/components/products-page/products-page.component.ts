import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ProductsStore } from '../../../data-access/products/products-store';
import { ProductsAPI } from '../../../data-access/products/products-api';
import { AsyncPipe } from '@angular/common';
import { ProductOverviewComponent } from '../product-overview/product-overview.component';
import { Product } from '../../../data-access/products/models/product.model';
import { debounceTime, merge, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProductCardComponent,
    FormsModule,
    InputComponent,
    TuiButton,
    AsyncPipe,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  providers: [ProductsStore, ProductsAPI],
})
export class ProductsPageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsStore = inject(ProductsStore);
  private readonly dialog = tuiDialog(ProductOverviewComponent, {
    dismissible: true,
    label: 'О товаре',
  });

  public products$ = this.productsStore.products$;
  public filtersOpen = signal(false);

  public nameFilter = new FormControl('', { nonNullable: true });

  public filterForm = new FormGroup({
    diameter: new FormControl('', { nonNullable: true }),
    steelGrade: new FormControl('', { nonNullable: true }),
    gost: new FormControl('', { nonNullable: true }),
  });

  public ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.products$ = this.productsStore.getProductsByCategory(params['id']);
    });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const hasAnyFilter = Object.values(params).some(
        (v) => v !== undefined && v !== null && v !== '' && Number(v) !== 0,
      );

      if (hasAnyFilter) {
        this.filtersOpen.set(true);
      }

      this.filterForm.patchValue(
        {
          diameter: params['diameter'],
          steelGrade: params['steelGrade'] || '',
          gost: params['gost'] || '',
        },
        { emitEvent: false },
      );

      this.nameFilter.setValue(params['name'] || '', { emitEvent: false });

      this.applyFilters();
    });

    merge(this.nameFilter.valueChanges, this.filterForm.valueChanges)
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyFilters();
      });
  }

  public toggleFilters(): void {
    this.filtersOpen.set(!this.filtersOpen());
  }

  public openProduct(product: Product): void {
    this.dialog(product).pipe(take(1)).subscribe();
  }

  public applyFilters(): void {
    const filters = {
      ...this.filterForm.value,
      diameter: Number(this.filterForm.value.diameter),
      name: this.nameFilter.value,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge',
    });

    this.productsStore.reload(filters);
  }
}

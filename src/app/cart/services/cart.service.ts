import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { tuiDialog } from '@taiga-ui/core';
import { CartComponent } from '../components/cart.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly dialog = tuiDialog(CartComponent, {
    dismissible: true,
    label: 'Корзина',
  });

  private readonly cartOpen$ = new BehaviorSubject<boolean>(false);

  public readonly isOpen$ = this.cartOpen$.asObservable();

  public open(): void {
    this.cartOpen$.next(true);

    this.dialog()
      .pipe(take(1))
      .subscribe({
        next: (data) => {},
        complete: () => {
          this.cartOpen$.next(false);
        },
      });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { tuiDialog } from '@taiga-ui/core';
import { CartComponent } from '../components/cart.component';
import { Product } from '../../data-access/products/models/product.model';

export interface ICartProduct {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly dialog = tuiDialog(CartComponent, {
    dismissible: true,
    label: 'Корзина',
  });

  private readonly cartOpen$ = new BehaviorSubject<boolean>(false);
  private readonly cartItems$ = new BehaviorSubject<ICartProduct[]>([]);

  /** Потоки для подписки */
  public readonly isOpen$ = this.cartOpen$.asObservable();
  public readonly items$ = this.cartItems$.asObservable();

  /** Открытие корзины */
  public open(): void {
    this.cartOpen$.next(true);

    this.dialog()
      .pipe(take(1))
      .subscribe({
        next: () => {},
        complete: () => {
          this.cartOpen$.next(false);
        },
      });
  }

  /** Добавить продукт в корзину */
  public addProduct(product: Product, quantity = 1): void {
    const items = this.cartItems$.value;
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      const updated = items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      );
      this.cartItems$.next(updated);
    } else {
      this.cartItems$.next([...items, { product, quantity }]);
    }
  }

  /** Уменьшить количество или удалить */
  public decreaseQuantity(productId: string): void {
    const items = this.cartItems$.value;
    const existing = items.find((item) => item.product.id === productId);

    if (!existing) return;

    if (existing.quantity > 1) {
      const updated = items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      );
      this.cartItems$.next(updated);
    } else {
      this.removeProduct(productId);
    }
  }

  /** Удалить продукт из корзины полностью */
  public removeProduct(productId: string): void {
    const updated = this.cartItems$.value.filter((item) => item.product.id !== productId);
    this.cartItems$.next(updated);
  }

  /** Очистить корзину */
  public clear(): void {
    this.cartItems$.next([]);
  }

  /** Получить текущее количество конкретного товара */
  public getQuantity(productId: string): number {
    return this.cartItems$.value.find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  /** Кол-во товаров (по позициям) */
  public get itemCount(): number {
    return this.cartItems$.value.length;
  }

  /** Общее кол-во единиц товаров */
  public get totalQuantity(): Observable<number> {
    return this.items$.pipe(map((items) => items.reduce((sum, i) => sum + i.quantity, 0)));
  }
}

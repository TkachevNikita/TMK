import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiIcon, RouterLink, AsyncPipe],
})
export class FooterComponent {
  protected readonly router = inject(Router);
  protected readonly cartService = inject(CartService);

  public readonly currentRoute$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map((e) => e.urlAfterRedirects),
    startWith(this.router.url),
  );

  public openCart(): void {
    this.cartService.open();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, ButtonComponent]
})
export class OrderComponent {}

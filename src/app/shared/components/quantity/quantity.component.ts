import {
  Component,
  forwardRef,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantityComponent),
      multi: true,
    },
  ],
})
export class QuantityComponent implements ControlValueAccessor {
  @Input() public min = 0;
  @Input() public max = Infinity;
  @Input() public step = 1;

  @Input() public weightPerUnit?: number;

  @Output()
  public change = new EventEmitter<number>();

  public value = 1;

  public writeValue(value: number): void {
    this.value = value ?? this.min;
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public decrease(): void {
    if (this.value > this.min) {
      this.updateValue(this.value - this.step);
    }
  }

  public increase(): void {
    if (this.value < this.max) {
      this.updateValue(this.value + this.step);
    }
  }

  public get totalWeight(): string | null {
    if (this.weightPerUnit == null) return null;
    return (this.value * this.weightPerUnit).toFixed(3) + ' т';
  }

  private updateValue(value: number): void {
    this.value = value;
    this.change.emit(value);
    this.onChange(value);
    this.onTouched();
  }

  private onChange = (value: number): void => {};
  private onTouched = (): void => {};
}

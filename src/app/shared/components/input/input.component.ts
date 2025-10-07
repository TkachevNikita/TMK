import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiIcon],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public iconStart?: string;
  @Input() public iconEnd?: string;
  @Input() public placeholder?: string;

  public value = '';
  public disabled = false;

  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

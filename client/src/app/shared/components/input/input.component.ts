import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements ControlValueAccessor {
  public value = '';
  @Input() type = 'text';
  @Input() id = '';
  @Input() placeholder = '';

  @ViewChild('inputElement') private _inputElement: ElementRef;
  get inputElement(): ElementRef {
    return this._inputElement;
  }

  constructor(
    private _renderer: Renderer2
  ) { }

  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(this._inputElement.nativeElement, 'disabled', isDisabled);
  }
  onChange(event: any) {
    this._onChange(event.target.value);
  }
  onKeyUp(event: any) {
    this._onChange(event.target.value);
  }
  onBlur(event: any) {
    this._onTouched();
  }
}

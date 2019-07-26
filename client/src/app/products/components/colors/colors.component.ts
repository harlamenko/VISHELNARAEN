import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {
  @Input() allColors: string[];
  @Input() currentVariant: number;

  @Output() clickEvent: EventEmitter<number> = new EventEmitter();


  click(idx: number) {
    this.clickEvent.emit(idx);
  }
}

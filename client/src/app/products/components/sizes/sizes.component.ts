import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {
  @Input() currentVariantSizes: string[];
  @Input() choosedSizeId: number;
  @Input() allSizes: number;

  @Output() clickEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  click(size: string) {
    this.clickEvent.emit(size);
  }

  isExistedSize(size: string): boolean {
    return this.currentVariantSizes.indexOf(size) !== -1;
  }
}

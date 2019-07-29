import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input() isAdmin;
  @Input() group;
  @Input() description;
  @Output() newLineAdded: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  @ViewChild('newLineInput') newLineInput: ElementRef;
  constructor() { }

  resetFocus() {
    this.newLineInput.nativeElement.focus();
  }

  addNewDescrLine(line: string) {
    if (line.length) {
      this.newLineAdded.emit(line);
      this.newLineInput.nativeElement.value = '';
    }
  }

  deleteIfEmpty(index: number) {
    if (!this.description[index].value) {
      this.delete.emit(index);
    }
  }
}

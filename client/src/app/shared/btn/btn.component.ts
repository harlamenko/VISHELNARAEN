import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent implements OnInit {
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  emit() {
    this.clickEvent.emit();
  }
}

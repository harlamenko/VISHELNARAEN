import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {
  @Input() showAdditionalInfo;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}

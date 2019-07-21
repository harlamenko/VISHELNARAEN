import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BaseService } from 'src/app/main/base.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  
  @Input() popup: any;
  constructor(public baseService: BaseService) { }

  ngOnInit() {
  }
}

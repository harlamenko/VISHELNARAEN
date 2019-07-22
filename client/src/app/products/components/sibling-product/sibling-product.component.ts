import { Component, OnInit, Input } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-sibling-product',
  templateUrl: './sibling-product.component.html',
  styleUrls: ['./sibling-product.component.scss']
})
export class SiblingProductComponent implements OnInit {
  @Input() product: any;
  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }

}

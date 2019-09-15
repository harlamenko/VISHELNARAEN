import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../../models/Product';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct | string;
  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }

}

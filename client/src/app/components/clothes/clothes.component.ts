import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../models/Product';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent implements OnInit {
  @Input() product: IProduct;
  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-cart-clothes',
  templateUrl: './cart-clothes.component.html',
  styleUrls: ['./cart-clothes.component.scss']
})
export class CartClothesComponent implements OnInit {
  @Input() product: IProduct;
  constructor(
    public webStorageService: WebStorageService
  ) { }

  ngOnInit() {
  }

  removeFromCart(id){
    this.webStorageService.removeFromLocalStorage('cart', id);
    delete this.product;
  }

}

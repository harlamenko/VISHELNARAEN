import { Component, OnInit, Input } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { ICartProduct } from 'src/app/models/CartProduct';

@Component({
  selector: 'app-cart-clothes',
  templateUrl: './cart-clothes.component.html',
  styleUrls: ['./cart-clothes.component.scss']
})
export class CartClothesComponent implements OnInit {
  @Input() product: ICartProduct;
  constructor(
    public webStorageService: WebStorageService
  ) { }

  ngOnInit() {
  }

  removeFromCart(id) {
    this.webStorageService.removeFromLocalStorage('cart', id);
    delete this.product;
  }

}

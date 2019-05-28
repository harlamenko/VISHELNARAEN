import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: Product[];
  public sum: number;

  constructor(
    private _webStorageService: WebStorageService
  ) { }

  ngOnInit() {
    this._webStorageService.cartLength.subscribe(
      res => {
        this.products = this._webStorageService.getFromLocalStorage('cart');
        this._countSum();
      }
    )
  }

  private _countSum(){
    this.sum = 0;
    this.products.forEach(el => this.sum += el.price)

    return this.sum;
  }
}

import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { ProductService } from 'src/app/products/services/product.service';
import { Router } from '@angular/router';
import { ICartProduct } from 'src/app/models/CartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: ICartProduct[];
  public sum: number;

  constructor(
    private _router: Router,
    public webStorageService: WebStorageService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.webStorageService.cartLength.subscribe(
      _ => {
        this.products = this.webStorageService.getFromLocalStorage('cart');
        this.sum = this.products.reduce((accum, product) => accum += product.price, 0);
      }
    );
  }

  public buy() {
    const ids = [];
    this.products.forEach(p => ids.push(p.id));
    this.productService.buyProducts({ ids: ids }).subscribe(res => console.log(res), err => console.log(err));
    window.localStorage.setItem('cart', '[]');
    this.webStorageService.cartLength.next(0);
    this._router.navigateByUrl(`/products/all/all`);
  }
}

import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { ProductService } from 'src/app/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: IProduct[];
  public sum: number;

  constructor(
    private _router: Router,
    public webStorageService: WebStorageService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.webStorageService.cartLength.subscribe(
      res => {
        this.products = this.webStorageService.getFromLocalStorage('cart');
        this._countSum();
      }
    )
  }

  private _countSum(){
    this.sum = 0;
    this.products.forEach(el => this.sum += el.price)

    return this.sum;
  }

  public buy() {
    const ids = [];
    this.products.forEach(p => ids.push(p.id));
    this.productService.buyProducts({ids: ids}).subscribe(res => console.log(res), err => console.log(err));
    window.localStorage.setItem('cart', '[]');
    this.webStorageService.cartLength.next(0);
    this._router.navigateByUrl(`/products/all/all`);
  }
}

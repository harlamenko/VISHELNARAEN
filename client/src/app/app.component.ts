import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageService } from './services/web-storage.service';
import { BaseService } from './services/base.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit{
  public needLayout: boolean;
  public needFilter: boolean;
  public needBreadCrumbs: boolean;
  private clothesUrlRegexp = /\/clothes\/\d/;
  public cartLength;
  public product;
  public showAdditionalInfo = false;

  constructor(
    private _router: Router,
    public webStorageService: WebStorageService,
    private _productService: ProductService,
    public baseService: BaseService
    ) {}

  ngDoCheck() {
    this.needLayout = this._router.url.length > 1;
    this.needFilter = !this.clothesUrlRegexp.test(this._router.url);
    this.needBreadCrumbs = this.clothesUrlRegexp.test(this._router.url);
  }
  ngOnInit() {
    this.webStorageService.cartLength.subscribe(len => this.cartLength = len)
    this._productService.product.subscribe(product => this.product = product);
  }
}

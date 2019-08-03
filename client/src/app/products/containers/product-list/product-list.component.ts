import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from 'src/app/products/services/product.service';
import { IProduct } from 'src/app/models/Product';
import { ProductParams } from 'src/app/models/ProductParams';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from 'src/app/main/web-storage.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: IProduct[];
  public cartLength;
  private _params: ProductParams;
  constructor(
    public productService: ProductService,
    private _activatedRouter: ActivatedRoute,
    public webStorageService: WebStorageService
  ) { }

  ngOnInit() {
    this.webStorageService.cartLength.subscribe(len => this.cartLength = len);

    this._activatedRouter.paramMap.subscribe(params => {
      this._params = new ProductParams();


      if (params.get('sex') !== 'all') {
        this._params.sex = params.get('sex');
      }
      if (params.get('type') !== 'all') {
        this._params.type = params.get('type');
      }

      this._params.qs = params['qs'] !== undefined ? params['qs'] : '';

      this._params.lang = 'en';
      this._params.count = 0;

      this.productService.products.subscribe(products => {
        this.products = products;
      });

      this.productService.getProducts(this._params).subscribe(products => {
        this.productService.products.next(products);
      });
    });
  }

  loadMore(e) {
    // TODO(Harlamenko) переделать на нормальную подгрузку
    this._params.count = this.productService.products.getValue().length;

    this.productService.getProducts(this._params).subscribe(products => {
      this.productService.products.next(this.productService.products.getValue().concat(products));
    });
  }
}

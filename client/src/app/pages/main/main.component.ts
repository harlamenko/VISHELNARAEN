import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { ProductParams } from 'src/app/models/ProductParams';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public products: Product[];
  private _params: ProductParams;
  constructor(
    public productService: ProductService,
    private _activatedRouter: ActivatedRoute,
    public webStorageService: WebStorageService
    ) { }

  ngOnInit() {
    this._activatedRouter.paramMap.subscribe(params => {
      this._params = new ProductParams();

      if (params.get('sex') !== 'all') {
        this._params.sex = params.get('sex');
      }
      if (params.get('type') !== 'all') {
        this._params.type = params.get('type');
      }
      this.productService.products.subscribe(products => {
        this.products = products;
      });
      this.productService.getProducts(this._params).subscribe(products => {
        this.productService.products.next(products);
      });
    });
  }
}

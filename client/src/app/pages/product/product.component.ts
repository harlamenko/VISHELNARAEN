import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public mainProduct: Product;
  public nextProduct: Product;
  public prevProduct: Product;

  public mainId: number;
  public nextId: number;
  public prevId: number;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => {
        this.mainId = +params.get('id');
        this.nextId = this.mainId + 1;
        this.prevId = this.mainId - 1;
        this._productService.getProductById(this.mainId).subscribe(
          product => this.mainProduct = product
        );
        this._productService.getProductById(this.nextId).subscribe(
          product => this.nextProduct = product,
          errors => {
            this.nextProduct = null;
          }
        );
        this._productService.getProductById(this.prevId).subscribe(
          product => this.prevProduct = product,
          errors => {
            this.prevProduct = null;
          }
        );
      },
      errors => console.error(errors)
    );
  }

}

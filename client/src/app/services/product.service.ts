import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product, ProductValidation } from '../models/Product';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public sortType = 'popularity';
  public product: BehaviorSubject<Product> = new BehaviorSubject(new Product());
  public products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  productFG: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _baseService: BaseService
    ) {

      this.productFG = this._fb.group({
        en_title: ['', []],
        rus_title: ['', []],
        cat: ['', []],
        type: ['', []],
        price: ['', []],
        rus_name: ['', []],
        en_name: ['', []],
        rating: ['', []],
        rus_descr: this._fb.array([]),
        en_descr: this._fb.array([]),
        variants: this._fb.array([])
      });
    }

  public getProducts(params): Observable<Product[]> {
    return this._baseService.postHttpRequest('api/products/params', params);
  }

  public getProductById(id: number): Observable<Product> {
    return this._baseService.getHttpRequest(`api/products/${id}`);
  }

  public deleteProductById(id: number): Observable<Product> {
    return this._baseService.deleteHttpRequest(`api/admin/delete/${id}`);
  }

  public updateProduct(product) {
    return this._baseService.postHttpRequest(`api/admin/update/${product.id}`, product);
  }

  public addProduct(product) {
    return this._baseService.postHttpRequest(`api/admin/store`, product);
  }

  public buyProducts(ids) {
    return this._baseService.postHttpRequest(`api/buy`, ids);
  }

  public getSexType() {
    return this._baseService.getHttpRequest(`api/sexType`);
  }

  public changeSortType(type: string) {
    this.sortType = type;
  }

  initProductFG(product) {
    product.variants.forEach(variant => {
      (this.productFG.get('variants') as FormArray).push(
        this._fb.group({
          color: [''],
          photo: [''],
          sizes: this._fb.array(
            variant.sizes.map(size => this._fb.control(''))
          )
        })
      );
    });

    product.rus_descr.map(line => {
      (this.productFG.get('rus_descr') as FormArray).push(this._fb.control(''));
    });

    product.en_descr.map(line => {
      (this.productFG.get('en_descr') as FormArray).push(this._fb.control(''));
    });

    this.setValidatorsTo(this.productFG);

    this.productFG.patchValue(product);
  }

  setValidatorsTo(fg, validators: ProductValidation | any = new ProductValidation()): void {
    if (Array.isArray(fg.controls)) {
      fg.controls.forEach(c => {
        this.setValidatorsTo(c, validators);
      });
      return;
    }

    Object.keys(validators).forEach(controlName => {
      const control = fg.controls[controlName];
      const currentValidators = validators[controlName];

      if (!Array.isArray(currentValidators)) {
        this.setValidatorsTo(control, currentValidators);
        return;
      }

      control.setValidators(currentValidators);
    });
  }
}

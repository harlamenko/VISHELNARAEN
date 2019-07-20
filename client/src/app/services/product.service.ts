import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product, ProductValidation, ProductFormGroupModel } from '../models/Product';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public sortType = 'popularity';
  public products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(
    private _fb: FormBuilder,
    private _baseService: BaseService
    ) {}

  public getProducts(params): Observable<Product[]> {
    return this._baseService.postHttpRequest('api/products/params', params);
  }

  public getProductById(id: number): Observable<Product> {
    return this._baseService.getHttpRequest(`api/products/${id}`);
  }

  public deleteProductById(id: number): Observable<{status: boolean}> {
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

  /**
   * рекурсивный метод для получения сообщений об ошибках валидации
   *
   * @param {AbstractControl} control
   */
  collectValidationMessages(control: AbstractControl): string[] {
    const msgs = [];

    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.keys(control.controls).forEach(key => {
        const ctrl = control.controls[key];
        msgs.push(...this.collectValidationMessages(ctrl));
      });
    }

    const errs = control.errors;

    if (errs) {
      msgs.push(...Object.keys(errs).map(k => errs[k].message));
    }

    return msgs;
  }
}

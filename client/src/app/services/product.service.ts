import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/Product';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public sortType = 'popularity';
  public product: BehaviorSubject<Product> = new BehaviorSubject(new Product());

  constructor(private _baseService: BaseService) { }

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

  public getSexType() {
    return this._baseService.getHttpRequest(`api/sexType`);
  }

  public changeSortType(type: string) {
    this.sortType = type;
  }
}

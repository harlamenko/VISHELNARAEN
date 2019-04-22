import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public sortType: string;

  constructor(private _baseService: BaseService) { }

  public getProducts(params): Observable<Product[]> {
    return this._baseService.postHttpRequest('api/products/params', params);
  }

  public getProductById(id: number): Observable<Product> {
    return this._baseService.getHttpRequest(`api/products/${id}`);
  }

  public changeSortType(type: string) {
    this.sortType = type;
  }
}

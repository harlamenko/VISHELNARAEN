import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/Product';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products';
  public sortType: string;

  constructor(private _baseService: BaseService) { }

  public getAllProducts(): Observable<Product[]> {
    return this._baseService.getHttpRequest(this.productUrl);
  }

  public changeSortType(type: string) {
    this.sortType = type;
  }
}

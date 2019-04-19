import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';
import { isUndefined } from 'util';

@Pipe({name: 'productSort'})
export class ProductSortPipe implements PipeTransform {

  transform(products: Product[], type: string): any {
    switch (type) {
      case 'price':
        products.sort((prev, current) => prev.price - current.price);
        break;
      case 'popularity':
        break;
    }
    return products;
  }

}

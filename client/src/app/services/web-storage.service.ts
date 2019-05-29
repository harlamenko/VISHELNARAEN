import { Injectable } from '@angular/core';
import { isNull } from 'util';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {
  public cartLength: BehaviorSubject<number> = new BehaviorSubject(this.getFromLocalStorage('cart').length);

  constructor() { }

  storeToLocal(k: string, v: any) {
    switch (k) {
      case 'cart':
        const arrayOfProductsInCart = this.getFromLocalStorage(k);
        const isAdded = !!(arrayOfProductsInCart.filter(el => JSON.stringify(el) === JSON.stringify(v))).length;
        if (!isAdded) {
          arrayOfProductsInCart.push(v);
          window.localStorage.setItem(k, JSON.stringify(arrayOfProductsInCart));
          this.cartLength.next(this.cartLength.getValue() + 1);
        }
        break;
      default:
        window.localStorage.setItem(k, JSON.stringify(v));
        break;
    }
  }

  get isAdmin() {
    return this.getFromSessionStorage('isAdmin');
  }

  set isAdmin(val) {
    this.setToSessionStorage('isAdmin', val);
  }

  get username() {
    return  window.localStorage.getItem('username');
  }

  set username(val) {
    this.setToLocaleStorage('username', val);
  }

  getFromLocalStorageForSub(k) {
    return of(this.getFromLocalStorage(k));
  }

  getFromLocalStorage(k: string) {
    const val = window.localStorage.getItem(k);
    return isNull(val) ? [] : JSON.parse(val);
  }

  getFromSessionStorage(k: string) {
    const val = window.sessionStorage.getItem(k);
    switch(k) {
      case 'isAdmin':
        return isNull(val) || !JSON.parse(val) ? false : true;
      default:
        return isNull(val) ? [] : JSON.parse(val);
    }
  }
  setToSessionStorage(k: string, val: any) {
    window.sessionStorage.setItem(k, JSON.stringify(val));
  }

  setToLocaleStorage(k: string, val: any) {
    window.localStorage.setItem(k, JSON.stringify(val));
  }

  removeFromLocalStorage(k: string, id?: number){
    switch (k) {
      case 'cart':
        const arrayOfProductsInCart = this.getFromLocalStorage(k);
        arrayOfProductsInCart.forEach((el, i) => {
          if (el.id === id) {
            arrayOfProductsInCart.splice(i, 1);
          }
        });
        window.localStorage.setItem(k, JSON.stringify(arrayOfProductsInCart));
        this.cartLength.next(this.cartLength.getValue() - 1);
        break;
      default:
        window.localStorage.removeItem(k);
        break;
    }
  }
}

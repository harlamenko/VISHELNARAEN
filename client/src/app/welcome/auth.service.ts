import { Injectable } from '@angular/core';
import { BaseService } from '../main/base.service';
import { WebStorageService } from '../main/web-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(
    private _baseService: BaseService,
    private _webStorageService: WebStorageService,
    private _router: Router
    ) { }

  register(userData){
    return this._baseService.postHttpRequest(`api/register`, userData);
  }
  logIn(userData) {
    return this._baseService.postHttpRequest(`api/login`, userData);
  }
  guest() {
    this._webStorageService.isAdmin = false;

    this.redirect();
  }

  admin() {
    this._webStorageService.isAdmin = true;

    this.redirect();
  }

  redirect() {
    if (this.redirectUrl) { 
      this._router.navigate([this.redirectUrl]);
    }
  }
}

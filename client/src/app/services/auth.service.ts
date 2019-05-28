import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _baseService: BaseService) { }

  register(userData){
    return this._baseService.postHttpRequest(`api/register`, userData);
  }
  logIn(userData) {
    return this._baseService.postHttpRequest(`api/login`, userData);
  }
  
}

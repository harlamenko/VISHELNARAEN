import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductParams } from '../models/ProductParams';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _host = environment.url;

  constructor(
    private _http: HttpClient
  ) {}

  public getHttpRequest(url: string): Observable<any> {
    return this._http.get(this._host + url);
  }
  public postHttpRequest(url: string, params: any): Observable<any> {
    return this._http.post(this._host + url, params);
  }
}

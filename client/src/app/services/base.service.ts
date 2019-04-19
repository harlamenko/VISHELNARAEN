import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _host = environment.url;
  constructor(private _http: HttpClient) {}

  public getHttpRequest(url: string): Observable<any> {
    return this._http.get(this._host + url);
  }
}

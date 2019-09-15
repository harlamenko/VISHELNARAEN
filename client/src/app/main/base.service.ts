import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _host = 'http://127.0.0.1:8000/';
  public popup = {
    isOpen: false,
    message: '',
    confirmAction: () => { },
    denyAction: () => { },
    close: function() { 
      this.isOpen = false;
      document.querySelector('body').style.overflow = 'auto';
    },
    open: function(msg: string | string[], confirmFuncName, ctx, warning = false) {
      this.message = typeof msg === 'string' ? msg : msg.join('\n');
      this.warning = warning;
      this.isOpen = true;
      this.confirmAction = function() {
        ctx[confirmFuncName]();
        this.close();
      };
      document.querySelector('body').style.overflow = 'hidden';
    }
  };

  constructor(
    private _http: HttpClient
  ) {}

  public getHttpRequest(url: string): Observable<any> {
    return this._http.get(this._host + url);
  }
  public deleteHttpRequest(url: string): Observable<any> {
    return this._http.delete(this._host + url);
  }
  public postHttpRequest(url: string, params: any): Observable<any> {
    return this._http.post(this._host + url, params);
  }
  public putHttpRequest(url: string, params: any): Observable<any> {
    return this._http.put(this._host + url, params);
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { AuthService } from 'src/app/welcome/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _webStorageService: WebStorageService,
    private _authService: AuthService,
    private _router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIsAdmin(state.url);
  }

  checkIsAdmin(url: string) {
    if (this._webStorageService.isAdmin) { return true; }

    this._authService.redirectUrl = url;
    this._router.navigate(['/welcome']);
    return false;
  }
}

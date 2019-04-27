import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  public needLayout: boolean;
  public needFilter: boolean;
  public needBreadCrumbs: boolean;
  private clothesUrlRegexp = /\/clothes\/\d/;

  constructor(private _router: Router) {}

  ngDoCheck() {
    this.needLayout = this._router.url.length > 1;
    this.needFilter = !this.clothesUrlRegexp.test(this._router.url);
    this.needBreadCrumbs = this.clothesUrlRegexp.test(this._router.url);
  }
}

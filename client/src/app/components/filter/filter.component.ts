import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductParams } from 'src/app/models/ProductParams';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public params: ProductParams;
  constructor(
    public productService: ProductService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    // check url params
    this.params = new ProductParams;
    this.params.sex = this._activatedRouter.snapshot.paramMap.get('sex') || 'all';
    this.params.type = this._activatedRouter.snapshot.paramMap.get('type') || 'all';
  }

  public changeSexParam(value: string) {
    this.params.sex = value;
    this.redirect();
 }

  private redirect() {
    this._router.navigateByUrl(`/clothes/${this.params.sex}/${this.params.type}`);
  }
}

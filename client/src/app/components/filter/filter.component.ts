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
  private params: ProductParams;
  public types;
  public sexes;

  constructor(
    public productService: ProductService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    this.productService.getSexType().subscribe(res => {
      this.sexes = res.sex;
      this.types = res.types;
    })
    this.params = new ProductParams;
    this.params.sex = this._activatedRouter.snapshot.paramMap.get('sex') || 'all';
    this.params.type = this._activatedRouter.snapshot.paramMap.get('type') || 'all';
  }

  public changeTypeParam(type, e) {
    e.stopPropagation();
    this.params.type = type;
    this.redirect();
  }
  public changeSexParam(value: string, e) {
    e.stopPropagation();
    switch(value) {
      case "for_men":
        this.params.sex = 'men';
        break;
      case "for_women":
        this.params.sex = 'women';
        break;
    }
    this.redirect();
 }

  private redirect() {
    this._router.navigateByUrl(`/clothes/${this.params.sex}/${this.params.type}`);
  }
}

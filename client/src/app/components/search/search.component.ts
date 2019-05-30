import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/services/web-storage.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public qs: string;

  constructor(
    public webStorageService: WebStorageService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.qs = params['qs'] !== undefined ? params['qs'] : '';
    });
  }

  search(e) {
    if (e.code === 'Enter') {
      const qs = e.target.value;

      if (qs && !qs.length) { return; }
      // TODO(Harlamenko) переделать на нормальную реализацию без перезагрузки

      const prms = {
        qs: this.qs,
        lang: 'en',
        count: this.productService.products.getValue().length
      };

      this.productService.getProducts(prms).subscribe(products => {
        this.productService.products.next(products);
      });

      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { qs: qs },
          queryParamsHandling: "merge"
        }
      );

    }
  }
}

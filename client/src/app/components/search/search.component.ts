import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/services/web-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public webStorageService: WebStorageService,
    private productService: ProductService
    ) { }

  ngOnInit() {
  }

  search(e, qs) {
    if (e.code === 'Enter') {
      const params = {
        qs: qs,
        lang: 'en'
      };
      this.productService.getProducts(params).subscribe(products => {
        this.productService.products.next(products);
      })
    }
  }
}

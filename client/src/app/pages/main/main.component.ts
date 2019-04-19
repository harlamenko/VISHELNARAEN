import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public products: Product[];
  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

}

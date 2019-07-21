import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductCardComponent } from './containers/product-card/product-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ProductSortPipe } from './product-sort.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    ProductComponent,
    ProductSortPipe,
    FilterComponent,
    SearchComponent,
  ]
})
export class ProductsModule { }

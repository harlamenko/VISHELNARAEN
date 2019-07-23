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
import { SiblingProductComponent } from './components/sibling-product/sibling-product.component';
import { PhotoWithCaptionComponent } from './containers/photo-with-caption/photo-with-caption.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { ColorsComponent } from './components/colors/colors.component';
import { DescriptionComponent } from './components/description/description.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ProductInfoComponent } from './containers/product-info/product-info.component';


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
    SiblingProductComponent,
    PhotoWithCaptionComponent,
    SizesComponent,
    ColorsComponent,
    DescriptionComponent,
    PhotoComponent,
    ProductInfoComponent,
  ]
})
export class ProductsModule { }

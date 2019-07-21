import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductCardComponent } from './containers/product-card/product-card.component';

const routes: Routes = [
  {path: ':id', component: ProductCardComponent},
  {path: ':sex/:type', component: ProductListComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'all/all'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductCardComponent } from './containers/product-card/product-card.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all/all',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: ProductCardComponent,
    canActivate: [AuthGuard],
    data: {create: true}
  },
  {path: ':id', component: ProductCardComponent},
  {
    path: ':sex/:type',
    component: ProductListComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

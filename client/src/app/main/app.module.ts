import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './containers/app/app.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AboutComponent } from '../about/containers/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedModule } from '../shared/shared.module';

const appRoutes: Routes = [
  {path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)},
  {path: 'cart', loadChildren: () => import('../cart/cart.module').then(m => m.CartModule)},
  {path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutModule)},
  {path: 'admin/create', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AboutComponent,
    PopupComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

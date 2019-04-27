import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MainComponent } from './pages/main/main.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './pages/cart/cart.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductSortPipe } from './pipes/product-sort.pipe';
import { CartClothesComponent } from './components/cart-clothes/cart-clothes.component';
import { AboutComponent } from './pages/about/about.component';

const appRoutes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'cart', component: CartComponent},
  {path: 'about', component: AboutComponent},
  {path: 'clothes', component: MainComponent},
  {path: 'clothes/:id', component: ProductComponent},
  {path: 'clothes/:sex/:type', component: MainComponent, pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainComponent,
    FilterComponent,
    SearchComponent,
    CartComponent,
    ClothesComponent,
    ProductComponent,
    NotFoundComponent,
    ProductSortPipe,
    CartClothesComponent,
    AboutComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MainComponent } from './pages/main/main.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { ClothesComponent } from './components/clothes/clothes.component';

const appRoutes: Routes = [
  {path: '', component: WelcomePageComponent},
  {
    path: 'clothes',
    component: MainComponent,
    data: {
      title: 'Одежда'
    }},
  {
    path: '**',
    redirectTo: '', //TODO: (Харламенко А.В.) перенаправить на страницу 404, как будет
    pathMatch: 'full'
  } 
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainComponent,
    FilterComponent,
    SearchComponent,
    CartComponent,
    ClothesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

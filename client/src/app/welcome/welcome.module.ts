import { NgModule } from '@angular/core';
import {WelcomeRoutingModule} from './welcome.routing-module'
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    SharedModule
  ],
  declarations: [
    WelcomePageComponent,
  ]
})
export class WelcomeModule { }

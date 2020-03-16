import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './containers/about/about.component';
import { AboutRoutingModule } from './about.routing-module';

@NgModule({
  imports: [
    AboutRoutingModule,
    SharedModule,
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }

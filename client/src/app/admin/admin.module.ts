import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { AdminRoutingModule } from './admin.routing-module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
      CreateComponent
  ]
})
export class AdminModule { }

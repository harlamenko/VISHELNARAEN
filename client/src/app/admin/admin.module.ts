import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './components/create/create.component';
import { AdminRoutingModule } from './admin.routing-module';
import { ColorPickerComponent } from './containers/color-picker/color-picker.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
      CreateComponent,
      ColorPickerComponent,
      OptionsComponent
  ]
})
export class AdminModule { }

import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from "./containers/cart/cart.component";
import { CartClothesComponent } from "./components/cart-clothes/cart-clothes.component";
import { CartRoutingModule } from "./cart.routing-module";

@NgModule({
    imports: [
        SharedModule,
        CartRoutingModule
    ],
    declarations: [
        CartComponent,
        CartClothesComponent
    ]
})
export class CartModule { }
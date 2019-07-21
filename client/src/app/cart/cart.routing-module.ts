import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./containers/cart/cart.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: CartComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";
import { NgModule } from "@angular/core";
import { ProductCardComponent } from "../products/containers/product-card/product-card.component";
import { ProductListComponent } from "../products/containers/product-list/product-list.component";

const routes: Routes = [
    {path: 'create', component: CreateComponent},
    {path: 'edit', component: ProductCardComponent},
    {path: 'products', component: ProductListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
import { Routes, RouterModule } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: CreateComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
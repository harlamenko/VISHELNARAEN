import { NgModule } from "@angular/core";
import { AdditionalInfoComponent } from "./additional-info/additional-info.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        AdditionalInfoComponent
    ],
    exports: [
        AdditionalInfoComponent,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }

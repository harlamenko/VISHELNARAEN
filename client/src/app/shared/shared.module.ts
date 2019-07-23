import { NgModule } from "@angular/core";
import { AdditionalInfoComponent } from "./additional-info/additional-info.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { HeaderBreadcrumbsComponent } from './header-breadcrumbs/header-breadcrumbs.component';
import { RouterModule } from "@angular/router";
import { BackBtnComponent } from './back-btn/back-btn.component';
import { BtnComponent } from './btn/btn.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        AdditionalInfoComponent,
        HeaderComponent,
        HeaderBreadcrumbsComponent,
        BackBtnComponent,
        BtnComponent,
    ],
    exports: [
        AdditionalInfoComponent,
        HeaderComponent,
        HeaderBreadcrumbsComponent,
        CommonModule,
        FormsModule,
        RouterModule,
        BackBtnComponent
    ]
})
export class SharedModule { }

import { NgModule } from "@angular/core";
import { AdditionalInfoComponent } from "./additional-info/additional-info.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { HeaderBreadcrumbsComponent } from './header-breadcrumbs/header-breadcrumbs.component';
import { RouterModule } from "@angular/router";
import { BackBtnComponent } from './back-btn/back-btn.component';
import { BtnComponent } from './btn/btn.component';
import { InputComponent } from './components/input/input.component';


const COMPONENTS = [
    AdditionalInfoComponent,
    InputComponent,
    HeaderComponent,
    HeaderBreadcrumbsComponent,
    BackBtnComponent,
    BtnComponent,
];

const MODULES = [
    CommonModule,
    FormsModule,
    RouterModule,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
        ...MODULES
    ]
})
export class SharedModule { }

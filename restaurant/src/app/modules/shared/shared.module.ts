import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from "@angular/router";
import { BtnSelectComponent } from './components/btn-select/btn-select.component';
import { FormsModule } from "@angular/forms";
import { LoadingBarComponent } from "@shared/components/loading-bar/loading-bar.component";
import { AlertComponent } from "@shared/components/alert/alert.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    BtnSelectComponent,
    LoadingBarComponent,
    AlertComponent
  ],
  exports: [
    CommonModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    BtnSelectComponent,
    LoadingBarComponent,
    AlertComponent
  ]
})
export class SharedModule {}

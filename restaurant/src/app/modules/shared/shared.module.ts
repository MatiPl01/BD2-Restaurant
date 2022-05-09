import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from "@angular/router";
import { BtnSelectComponent } from './components/btn-select/btn-select.component';
import { FormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressBarModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    BtnSelectComponent
  ],
  exports: [
    CommonModule,
    MatProgressBarModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    BtnSelectComponent
  ]
})
export class SharedModule {}

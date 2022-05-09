import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent
  ],
  exports: [
    CommonModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent
  ]
})
export class SharedModule {}

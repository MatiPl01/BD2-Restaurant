import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    ResponsiveImageComponent
  ],
  exports: [
    CommonModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent
  ]
})
export class SharedModule {}

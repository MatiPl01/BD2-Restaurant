import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ParallaxDirective } from './directives/parallax.directive';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';
import { LogoComponent } from './components/logo/logo.component';
import { SingleSelectDropdownComponent } from './components/forms/single-select-dropdown/single-select-dropdown.component';
import { FormsModule } from "@angular/forms";
import { LoadingBarComponent } from "@shared/../core/components/loading-bar/loading-bar.component";
import { AlertComponent } from "@shared/components/alert/alert.component";
import { RangeSliderComponent } from './components/forms/range-slider/range-slider.component';
import { MultiSelectDropdownComponent } from './components/forms/mult-iselect-dropdown/multi-select-dropdown.component';
import { GallerySliderComponent } from './components/gallery-slider/gallery-slider.component';
import { ParallaxSliderComponent } from './components/parallax-slider/parallax-slider.component';
import { PopupComponent } from './components/popup/popup.component';
import { PriceComponent } from './components/price/price.component';
import { RatingComponent } from './components/rating/rating.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ResponsiveGalleryComponent } from './components/responsive-gallery/responsive-gallery.component';
import { ObserveVisibilityDirective } from './directives/observe-visibility.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxSliderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    SingleSelectDropdownComponent,
    LoadingBarComponent,
    AlertComponent,
    RangeSliderComponent,
    MultiSelectDropdownComponent,
    GallerySliderComponent,
    ParallaxSliderComponent,
    PopupComponent,
    PriceComponent,
    RatingComponent,
    PaginationComponent,
    ResponsiveGalleryComponent,

    ParallaxDirective,
    ObserveVisibilityDirective
  ],
  exports: [
    CommonModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    SingleSelectDropdownComponent,
    LoadingBarComponent,
    AlertComponent,
    PaginationComponent,
    RatingComponent,
    ResponsiveGalleryComponent,

    ParallaxDirective,
    ObserveVisibilityDirective
  ]
})
export class SharedModule {}

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
import { AlertComponent } from "@core/components/alert/alert.component";
import { RangeSliderComponent } from './components/forms/range-slider/range-slider.component';
import { MultiSelectDropdownComponent } from './components/forms/multi-select-dropdown/multi-select-dropdown.component';
import { GallerySliderComponent } from './components/gallery-slider/gallery-slider.component';
import { ParallaxSliderComponent } from './components/parallax-slider/parallax-slider.component';
import { PopupComponent } from './components/popup/popup.component';
import { PriceComponent } from './components/price/price.component';
import { RatingComponent } from './components/rating/rating.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ResponsiveGalleryComponent } from './components/responsive-gallery/responsive-gallery.component';
import { ObserveVisibilityDirective } from './directives/observe-visibility.directive';
import { ChangeCartQuantityComponent } from './components/change-cart-quantity/change-cart-quantity.component';

import { AuthorizationDirective } from '@shared/directives/authorization.directive';

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
    SingleSelectDropdownComponent,
    GallerySliderComponent,
    ParallaxSliderComponent,
    PopupComponent,
    PriceComponent,
    RatingComponent,
    PaginationComponent,
    ResponsiveGalleryComponent,
    ChangeCartQuantityComponent,
    AuthorizationDirective,

    ParallaxDirective,
    ObserveVisibilityDirective
  ],
  exports: [
    CommonModule,
    FormsModule,

    LoadingSpinnerComponent,
    ResponsiveImageComponent,
    LogoComponent,
    SingleSelectDropdownComponent,
    LoadingBarComponent,
    AlertComponent,
    PaginationComponent,
    RatingComponent,
    ResponsiveGalleryComponent,
    MultiSelectDropdownComponent,
    SingleSelectDropdownComponent,
    RangeSliderComponent,
    PriceComponent,
    ChangeCartQuantityComponent,

    ParallaxDirective,
    ObserveVisibilityDirective,
    AuthorizationDirective
  ]
})
export class SharedModule {}

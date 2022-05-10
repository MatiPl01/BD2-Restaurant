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
import { AddedImagesComponent } from './components/added-images/added-images.component';
import { ChooseCurrencyComponent } from './components/choose-currency/choose-currency.component';
import { FiltersPagesComponent } from './components/filters-pages/filters-pages.component';
import { FiltersRangeComponent } from './components/filters-range/filters-range.component';
import { FiltersSelectComponent } from './components/filters-select/filters-select.component';
import { GallerySliderComponent } from './components/gallery-slider/gallery-slider.component';
import { ParallaxSliderComponent } from './components/parallax-slider/parallax-slider.component';
import { PopupComponent } from './components/popup/popup.component';
import { PriceComponent } from './components/price/price.component';
import { RatingComponent } from './components/rating/rating.component';
import { ScrollTopBtnComponent } from './components/scroll-top-btn/scroll-top-btn.component';

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
    AlertComponent,
    AddedImagesComponent,
    ChooseCurrencyComponent,
    FiltersPagesComponent,
    FiltersRangeComponent,
    FiltersSelectComponent,
    GallerySliderComponent,
    ParallaxSliderComponent,
    PopupComponent,
    PriceComponent,
    RatingComponent,
    ScrollTopBtnComponent
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

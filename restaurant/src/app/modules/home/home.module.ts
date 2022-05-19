import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { HeaderComponent } from './components/header/header.component';
import { ParallaxSliderComponent } from './components/parallax-slider/parallax-slider.component';


@NgModule({
  declarations: [
    HomeViewComponent,
    HeaderComponent,
    ParallaxSliderComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule {}

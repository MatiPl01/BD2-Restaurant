import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutViewComponent } from './views/about-view/about-view.component'
import { AboutRoutingModule } from "./about-routing.module";


@NgModule({
  declarations: [
    AboutViewComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }

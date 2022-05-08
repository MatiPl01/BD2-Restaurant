import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from "./cart-routing.module";
import { CartViewComponent } from './views/cart-view/cart-view.component';


@NgModule({
  declarations: [
    CartViewComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from "./cart-routing.module";
import { CartViewComponent } from './views/cart-view/cart-view.component';
import { CartItemComponent } from "@cart/components/cart-item/cart-item.component";
import { SharedModule } from "@shared/shared.module";


@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule {}

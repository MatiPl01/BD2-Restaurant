import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from "./cart-routing.module";
import { CartViewComponent } from './views/cart-view/cart-view.component';
import {CartItemComponent} from "@cart/components/cart-item/cart-item.component";
import {SharedModule} from "@shared/shared.module";
import { CartChangeComponent } from './components/cart-change/cart-change.component';


@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent,
    CartChangeComponent,
  ],
  exports: [
    CartChangeComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule {}

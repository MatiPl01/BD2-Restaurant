import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from "./cart-routing.module";
import { CartViewComponent } from './views/cart-view/cart-view.component';
import {CartItemComponent} from "@cart/views/cart-item/cart-item.component";
import {CartItemsListComponent} from "@cart/views/cart-items-list/cart-items-list.component";
import {CartSummaryComponent} from "@cart/views/cart-summary/cart-summary.component";


@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent,
    CartItemsListComponent,
    CartSummaryComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { OrderItemComponent } from './componets/order-item/order-item.component';
import { OrderListComponent } from './componets/order-list/order-list.component';
import { OrderDishComponent } from './componets/order-dish/order-dish.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ProfileViewComponent,
    OrderItemComponent,
    OrderListComponent,
    OrderDishComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }

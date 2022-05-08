import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { AdminService } from "./services/admin.service";


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminViewComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {}

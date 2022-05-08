import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerViewComponent } from "./views/manager-view/manager-view.component";

const routes: Routes = [
  {
    path: '',
    component: ManagerViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

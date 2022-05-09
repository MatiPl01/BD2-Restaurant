import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from "./views/profile-view/profile-view.component";
import { AuthenticationGuard } from "@auth/guards/authentication.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfileViewComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
